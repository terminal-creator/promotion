# ContactBlock · 公共组件规范

> 所有 13 套样式必须实现的"联系老师"DOM 锚点契约
> 视觉可以完全不同，但 DOM 标记必须按本文档实现 —— 这是 `channel-loader.js` 注入渠道数据的依据。

---

## 一、最小契约（必须实现）

每套样式的 render.js 输出的 HTML 中，**至少** 要包含以下 3 个绑定元素：

| 标记                           | 类型     | 用途                          | 默认占位                   |
|--------------------------------|----------|-------------------------------|---------------------------|
| `data-cwp-bind="name"`         | 文本元素 | 老师显示名                   | "老师"                     |
| `data-cwp-bind="wechat"`       | 文本元素 | 微信号                       | "S5_LLM_2026"              |
| `data-cwp-bind="qr"`           | `<img>`  | 咨询二维码                   | `/static/qr-placeholder.png` |

### 最小模板（每个样式自由套样式 class）

```html
<section class="any-style-class">
  <h3>联系老师领取试听课</h3>

  <img data-cwp-bind="qr" src="/static/qr-placeholder.png" alt="老师二维码"
       width="160" height="160">

  <p>
    微信：<code data-cwp-bind="wechat">S5_LLM_2026</code>
    （添加请备注「试听」）
  </p>

  <p>
    <span data-cwp-bind="name">老师</span> · 完整试听课
  </p>
</section>
```

---

## 二、可选契约

| 标记                          | 类型    | 用途                                 |
|-------------------------------|---------|--------------------------------------|
| `data-cwp-bind="note"`        | 文本    | 自定义备注（渠道老师在 admin 填的） |
| `data-cwp-bind="qr-link"`     | `<a>`   | 二维码"点击放大"链接                |

`note` 字段为空时元素会自动 `display:none`，所以可以放心写：

```html
<p data-cwp-bind="note">这里会被替换或隐藏</p>
```

---

## 三、出现位置的硬约束

每套样式至少要在 **2 处** 出现联系老师 UI：

1. **正文内自然出现** —— 比如 footer 上方、报名 CTA 旁、或某个独立的「咨询/试听」section
2. **解锁 modal 内** —— 学员点"报名解锁完整章节"后弹出的弹窗，里面也要有完整二维码 + 微信号

第 2 处可以用同一段模板复用。modal 的开关由各样式自己用 JS 控制，但内容字段必须带 `data-cwp-bind`。

---

## 四、视觉差异化建议

13 套样式各有不同语言，ContactBlock 视觉可以差别巨大：

| 样式      | 视觉建议                                                  |
|-----------|----------------------------------------------------------|
| main      | 工业橙边框 + 二维码居左 + 文案居右                       |
| v1 Kraft  | 牛皮纸底 · 蜡封印章风的"联系"标记                         |
| v2 Editorial | 财经版样式 · 二维码做成报纸内嵌印刷品                |
| v3 Mono   | 黑白极简 · 二维码 + 一行 wechat 即可                     |
| v4 Sage   | 鼠尾草色块 · 二维码圆角处理                              |
| v5 Terminal | `qrcode → wxid: S5_LLM_2026 [ctrl+c to copy]` 终端风  |
| v6 Business | 海军蓝商务卡片                                         |
| v7 Editorial+ | 杂志末页 · 衬线大标题 + 二维码居中                  |
| v8 Whitepaper | § 表注脚式 · 二维码做成 §99 编号的附录                |
| v9 Bento  | 圆角大卡 · 二维码做成产品卡片                            |
| v10 CLI   | `$ contact --teacher` 命令行输出风                       |
| v11 Newspaper | 报纸"分类广告"栏目                                  |
| v12 Brutalist | 巨大字号 "TALK TO TEACHER" + 二维码                 |

---

## 五、注入时机

`channel-loader.js` 在 `DOMContentLoaded` 后自动跑。render.js 必须 **同步** 把 DOM 渲染完，否则 channel-loader 找不到 `[data-cwp-bind]` 元素。

推荐脚本顺序：

```html
<script src="/s5-content.js"></script>           <!-- 内容 -->
<script src="/styles/<id>/render.js"></script>   <!-- 渲染器 -->
<script>
  document.getElementById('root').innerHTML =
    window.RENDER_STYLE(window.S5_CONTENT);      <!-- 同步执行 -->
</script>
<script src="/channel-loader.js"></script>       <!-- 注入（最后） -->
```

---

## 六、admin 表单实时预览

admin-form.jsx 在用户填写时，会把数据 postMessage 推到右侧手机 iframe。channel-loader.js 已自带监听，无需 render.js 做任何额外工作。

预览数据 schema：

```js
window.parent.postMessage({
  type: 'cwp:preview',
  data: {
    name: '王晓老师',
    wechat: 'S5_WANGXIAO_24',
    qrDataUrl: 'data:image/png;base64,...',  // 文件 reader 读出来的
    note: '可选',
  }
}, '*');
```

---

## 七、调试

打开浏览器控制台：

```js
window.__CWP_DEBUG = true;  // 启用 verbose 警告
window.__CHANNEL;           // 当前已注入的渠道数据
window.CWP.apply({...});    // 手动重新注入
```

---

## 八、自测 checklist（部署前）

每套样式 render.js 完成后，自查：

- [ ] 渲染后页面里至少有 2 处 `<img data-cwp-bind="qr">`（正文 + modal）
- [ ] 至少有 2 处 `data-cwp-bind="wechat"` 文本元素
- [ ] 至少有 1 处 `data-cwp-bind="name"`
- [ ] 默认 QR src 都是 `/static/qr-placeholder.png`
- [ ] 默认 wechat 文本是 `S5_LLM_2026`
- [ ] `npm run check` 全绿（content-check.js 会扫这些）
