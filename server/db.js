/**
 * server/db.js
 * SQLite 封装（better-sqlite3 同步 API · 性能足够 · 错误处理直接抛）
 *
 * 用法：
 *   const db = require('./db');           // 自动初始化
 *   db.prepare('SELECT * FROM channels').all();
 *
 * CLI：
 *   node server/db.js --init             显式建表（首次部署调）
 *   node server/db.js --info             查看当前表结构与统计
 */

const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');

// 加载环境变量（如果 .env 存在）
try {
  require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
} catch (_) { /* dotenv 可选 */ }

const DB_PATH = process.env.DB_PATH
  ? path.resolve(__dirname, '..', process.env.DB_PATH)
  : path.join(__dirname, '..', 'channels.db');

// 确保目录存在
fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });

const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');           // 并发读写更友好
db.pragma('foreign_keys = ON');
db.pragma('synchronous = NORMAL');

/* --------------------------------------------------------------
   Schema · channels 表
   -------------------------------------------------------------- */
function initSchema() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS channels (
      slug           TEXT PRIMARY KEY,
      edit_token     TEXT NOT NULL,
      display_name   TEXT NOT NULL,
      wechat_id      TEXT NOT NULL,
      qr_image_path  TEXT,
      style_version  TEXT NOT NULL DEFAULT 'main',
      custom_note    TEXT,
      created_at     TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at     TEXT,
      created_ip     TEXT,
      visits         INTEGER NOT NULL DEFAULT 0
    );

    CREATE INDEX IF NOT EXISTS idx_channels_style    ON channels(style_version);
    CREATE INDEX IF NOT EXISTS idx_channels_created  ON channels(created_at DESC);

    CREATE TABLE IF NOT EXISTS audit_log (
      id           INTEGER PRIMARY KEY AUTOINCREMENT,
      action       TEXT NOT NULL,            -- create | update | delete
      slug         TEXT NOT NULL,
      ip           TEXT,
      ua           TEXT,
      created_at   TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE INDEX IF NOT EXISTS idx_audit_slug    ON audit_log(slug);
    CREATE INDEX IF NOT EXISTS idx_audit_created ON audit_log(created_at DESC);
  `);
}

/* --------------------------------------------------------------
   CLI 入口
   -------------------------------------------------------------- */
if (require.main === module) {
  const arg = process.argv[2];
  if (arg === '--init') {
    initSchema();
    console.log(`✓ DB initialized at ${DB_PATH}`);
    process.exit(0);
  }
  if (arg === '--info') {
    initSchema();
    const total = db.prepare('SELECT COUNT(*) AS n FROM channels').get().n;
    const styles = db.prepare('SELECT style_version, COUNT(*) AS n FROM channels GROUP BY style_version ORDER BY n DESC').all();
    console.log(`DB: ${DB_PATH}`);
    console.log(`Total channels: ${total}`);
    console.log(`By style:`);
    styles.forEach(s => console.log(`  ${s.style_version}: ${s.n}`));
    process.exit(0);
  }
  console.error('Usage: node db.js [--init | --info]');
  process.exit(1);
}

/* --------------------------------------------------------------
   作为模块 require 时，自动确保表存在
   -------------------------------------------------------------- */
initSchema();

module.exports = db;
module.exports.DB_PATH = DB_PATH;
