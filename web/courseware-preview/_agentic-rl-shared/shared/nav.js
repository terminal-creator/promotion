/* 章节导航 + 主线进度条
   用法：在每章 HTML 里指定 <meta name="chapter" content="0..9">
   会自动渲染顶部 tab 条和 footer 主线进度。 */

const CHAPTERS = [
  { id: 0, file: 'ch0.html',  num: '0', title: '业务场景 & 数据' },
  { id: 1, file: 'ch1.html',  num: '1', title: 'RLVR vs Agentic RL' },
  { id: 2, file: 'ch2.html',  num: '2', title: 'Workflow · 三不变量' },
  { id: 3, file: 'ch3.html',  num: '3', title: '环境搭建' },
  { id: 4, file: 'ch4.html',  num: '4', title: 'Rollout 异步' },
  { id: 5, file: 'ch5.html',  num: '5', title: 'Verified · Reward' },
  { id: 6, file: 'ch6.html',  num: '6', title: 'Train · GRPO + 训推一致' },
  { id: 7, file: 'ch7.html',  num: '7', title: '训练翻车怎么救' },
  { id: 8, file: 'ch8.html',  num: '8', title: 'Memory' },
  { id: 9, file: 'ch9.html',  num: '9', title: 'Infra · 自进化' },
];

const COURSE_STEPS = [
  { key: 'data',        name: 'Data',         cn: '数据',     ch: 0 },
  { key: 'paradigm',    name: 'Paradigm',     cn: '范式',     ch: 1 },
  { key: 'overview',    name: 'Workflow',     cn: '全景',     ch: 2 },
  { key: 'environment', name: 'Environment',  cn: '环境',     ch: 3 },
  { key: 'rollout',     name: 'Rollout',      cn: '采样',     ch: 4 },
  { key: 'verified',    name: 'Verified',     cn: '验证',     ch: 5 },
  { key: 'train',       name: 'Train',        cn: '训练',     ch: 6 },
  { key: 'debug',       name: 'Debug',        cn: '调优',     ch: 7 },
  { key: 'memory',      name: 'Memory',       cn: '记忆',     ch: 8 },
  { key: 'infra',       name: 'Infra+Evolve', cn: '闭环',     ch: 9 },
];

function currentChapter() {
  const meta = document.querySelector('meta[name="chapter"]');
  if (!meta) return null;
  return parseInt(meta.content, 10);
}

function renderTopNav() {
  const root = document.getElementById('topnav-root');
  if (!root) return;
  const cur = currentChapter();
  const tabs = CHAPTERS.map(c => {
    const active = c.id === cur ? 'active' : '';
    return `<a class="chapter-tab ${active}" href="${c.file}">
      <span class="ch-num">${c.num}</span><span>${c.title}</span>
    </a>`;
  }).join('');
  root.innerHTML = `
    <nav class="topnav">
      <div class="topnav-inner">
        <a href="index.html" class="brand" style="text-decoration:none;color:inherit;">
          <span class="dot"></span>
          <span>Agentic RL · 实战课件</span>
        </a>
        <div class="chapter-tabs">${tabs}</div>
      </div>
    </nav>
  `;
}

function renderCourseProgress() {
  const root = document.getElementById('course-progress-root');
  if (!root) return;
  const cur = currentChapter();
  // 高亮当前章节落在主线哪一段（取最近的 step）
  let activeKey = COURSE_STEPS[0].key;
  for (const s of COURSE_STEPS) { if (s.ch <= cur) activeKey = s.key; }
  const items = COURSE_STEPS.map(s => {
    const active = s.key === activeKey ? 'active' : '';
    return `<div class="step ${active}" title="${s.name}（${s.cn}）">
      <div class="num">${s.name}</div>
      <div style="font-size:9px;opacity:.7;margin-top:2px;">${s.cn}</div>
    </div>`;
  }).join('');
  root.innerHTML = `
    <div class="eyebrow-text" style="margin-bottom:8px;">课程主线 · COURSE FLOW</div>
    <div class="course-progress">${items}</div>
  `;
}

// 渲染章节末尾 summary（5 字段）+ takeaway + 下一章按钮
function renderSummary({ solved, gotTools, step, why, next, takeaway }) {
  const root = document.getElementById('summary-root');
  if (!root) return;
  const cur = currentChapter();
  const nextCh = CHAPTERS[cur + 1];
  const nextBtn = nextCh ? `<a class="btn primary" href="${nextCh.file}" style="margin-top:24px;">
      下一章 · ${nextCh.title}
      <span class="iconify" data-icon="lucide:arrow-right" data-width="16"></span>
    </a>` : '';
  root.innerHTML = `
    <div class="summary-block">
      <h3>章节总结 · CHAPTER SUMMARY</h3>
      <div class="summary-row"><div class="k">你刚解决了什么<br><span style="font-family:'JetBrains Mono',monospace;font-size:9px;opacity:.5;">SOLVED</span></div><div>${solved}</div></div>
      <div class="summary-row"><div class="k">你现在手里有什么<br><span style="font-family:'JetBrains Mono',monospace;font-size:9px;opacity:.5;">YOU HAVE</span></div><div>${gotTools}</div></div>
      <div class="summary-row"><div class="k">主线哪一步<br><span style="font-family:'JetBrains Mono',monospace;font-size:9px;opacity:.5;">STEP</span></div><div>${step}</div></div>
      <div class="summary-row"><div class="k">为什么还不够<br><span style="font-family:'JetBrains Mono',monospace;font-size:9px;opacity:.5;">GAP</span></div><div>${why}</div></div>
      <div class="summary-row"><div class="k">下一章解决<br><span style="font-family:'JetBrains Mono',monospace;font-size:9px;opacity:.5;">NEXT</span></div><div>${next}</div></div>
      <div class="takeaway">${takeaway}</div>
      ${nextBtn}
    </div>
  `;
}

// 渲染网格底纹 + 光束
function renderBackdrop() {
  if (!document.querySelector('.bg-grid')) {
    const grid = document.createElement('div');
    grid.className = 'bg-grid';
    document.body.prepend(grid);
    const beams = document.createElement('div');
    beams.style.cssText = 'position:fixed;inset:0;z-index:0;pointer-events:none;overflow:hidden;';
    beams.innerHTML = `
      <div class="grid-beam" style="left:18%; animation-delay:0s;"></div>
      <div class="grid-beam" style="left:55%; animation-delay:2.4s;"></div>
      <div class="grid-beam" style="left:82%; animation-delay:1.2s;"></div>
    `;
    document.body.prepend(beams);
  }
}

/* ============ 每章 3 道课堂互动题 ============ */
const QA_DATA = {
  0: [
    {
      q: '同样一句"我帮您退款"——为什么在 GRPO / RLVR 里可能 reward 满分，在 Agentic RL 里却被 cap 到 0.35？',
      tags: ['范式之差', 'false_promise_cap'],
      hint: 'GRPO 评的是 final response 的语义；Agentic RL 评的是 verifier_input_fact 的业务事实——refund_issued 是不是真发生了。漂亮回复 + 没调 finance.issue_refund = false_promise，cap 强制截到 0.35。'
    },
    {
      q: '业务数据完全保密、开源模型 zero-shot 准确率 < 40%、又没有干净的人工标注——你为什么不选 SFT 也不选纯 RAG，而要选 Agentic RL？',
      tags: ['技术 1 号位', '路线选择'],
      hint: '三件事：① 数据不能出公司 → 模型权重和训练循环必须在自家 GPU；② 业务 schema 开源模型没见过 → 必须 post-train；③ 没干净标注 → 不能 SFT。剩下能用业务事实做信号 + 沙盒采轨迹的，只有 RL。'
    },
    {
      q: '一个合格的 Agent Runtime 必须提供哪三件事？纯 RAG 缺哪一件？',
      tags: ['Agent Runtime'],
      hint: '① 工具调用 + observation 反馈到下一步状态；② 业务事实可验证（verifier_input_fact）；③ 沙盒隔离 + 可复现（确定性 seed）。纯 RAG 只能"知道更多"，不能"做事"——第 1、2、3 全部缺。'
    },
  ],
  1: [
    {
      q: 'State / Action / Observation / Trajectory 四个概念，分别 ≠ 什么？（prompt / token / reward / final answer）',
      tags: ['Agent 建模'],
      hint: 'State ≠ prompt（state 会随 observation 演化）；Action ≠ token（action 是带语义的工具+参数）；Observation ≠ reward（observation 是下一步决策输入，可成功/超时/失败）；Trajectory ≠ final answer（reward 评的是整条路径）。'
    },
    {
      q: 'G02 R1 reward 0.92、R2 reward 0.31，关键差距出现在第几步？为什么"漂亮回复 + ticket.close"反而比"出错执行"reward 还低？',
      tags: ['G02 trajectory'],
      hint: 'R2 在 step 1 就直接 message.reply，跳过所有读工具/判断/执行。它命中 false_promise_cap = 0.35；R4 错执行（让客户退货）虽然政策错，但发生了"看起来在做事"的副作用，reward 0.14（wrong_policy_cap 截）。两者本质都是 refund_issued 没真发生。'
    },
    {
      q: '"早期一个错误 action 会让 trajectory 不可挽回"——在 G02 上举一个具体例子：第几步、选什么 action，会让这条 trajectory 的 reward 永远 ≤ 0.4？',
      tags: ['操作策略'],
      hint: 'step 1 直接 finance.issue_refund（未查证就退款）→ 触发 unauthorized_refund_cap = 0.20；step 1 直接 ticket.close → no_side_effect_cap = 0.40；step 1 message.reply 承诺退款再 close → false_promise_cap = 0.35。早期 action 直接锁定 reward 上限。'
    },
  ],
  2: [
    {
      q: '为什么 K=4 rollout 不能直接在生产 OMS / Finance 里跑？不做沙盒隔离，4 条轨迹之间会怎样互相污染？',
      tags: ['沙盒隔离'],
      hint: '① 真退款 4 次客户银行卡 → 钱真扣 4 倍；② R1 先 issue_refund 写库 → R2 再 get_order 看到"已退款"→ 跳过退款 → 整组 trajectory 不可比；③ 训练分布被生产顺序污染。沙盒每条 rollout 独立 namespace 才能复现。'
    },
    {
      q: '`finance.simulate_refund` 和 `finance.issue_refund` 为什么必须拆成两个工具？训练时和上线时分别用哪个？',
      tags: ['simulate vs issue'],
      hint: 'simulate 是 dry-run 不写库——用于"模型先看是否合法"。issue 真写沙盒 ledger，必须带 idempotency_key + evidence_ids。训练时两个都用（先 simulate 验证，再 issue 真发起）；上线时一样，issue 写真 Finance。拆开是防"未验证就退款"。'
    },
    {
      q: 'G07（VAT 发票修正）4 条 rollout 全失败 reward ≈ 0.25——这是模型不会，还是环境不行？怎么从 probe 指标区分？',
      tags: ['G07', 'tool gap'],
      hint: '不是模型不会，是 action space 缺失（缺 finance.modify_vat_invoice、oms.update_invoice_meta）。probe 看 tool_gap_count > 0 → 跳到 cold start（修工具+sandbox+verifier+demo+SFT），不是直接 RL。'
    },
  ],
  3: [
    {
      q: 'G02 一组 4 条全部成功（[0.96, 0.97, 0.95, 0.96]）vs 全部失败（[0.10, 0.12, 0.08, 0.11]）——哪一组更值得训练？',
      tags: ['学习信号', '三不变量'],
      hint: '两组都学不动。全成功：spread ≈ 0，advantage 全为 0，梯度方向不存在；全失败：组内相对最好（0.12）可能正是错误捷径（"直接 handoff"），强化它会让模型学会"遇难就转人工"。真正值得训的是 G02 这种 spread = 0.78 的混合组。'
    },
    {
      q: '关掉 false_promise_cap，R2 reward 从 0.31 跳到 0.38——这会引发哪种 reward hacking？',
      tags: ['reward hacking', 'hard cap'],
      hint: '"漂亮回复不执行"模式。模型发现"安抚 + 关单"短期 reward 也不低 → 训练后大量轨迹只 message.reply 不调 finance API。需要 cap + no_side_effect_cap 双重拦截，verifier 必须看 refund_issued 业务事实而不是回复文本。'
    },
    {
      q: '探索 / 信号 / 偏移三个不变量，诊断顺序为什么必须是这个顺序？先查偏移会怎样？',
      tags: ['三不变量'],
      hint: '先看探索（p_good > 0、coverage 够）——没探到好轨迹，谈何信号；再看信号（spread / SNR）——有探索没差异也学不动；最后看偏移（policy_lag、ratio_p95）。顺序错了会盲调：明明是 tool_gap，却去调 ε / KL coef，永远治不好。'
    },
  ],
  4: [
    {
      q: '原始数据占比 G05 政策咨询 26%、G02 破损 15.5%——直接按这个比例训会发生什么？probe-driven 调度后 G05 应该降到多少？',
      tags: ['采样调度', '降采样'],
      hint: 'G05 全高弱信号会淹没 batch，learner 大量梯度浪费在已 master 的简单 case；G02 进步慢。降到 3-5% 做 replay 防遗忘即可，腾出预算给 G02（21%）、G03（16%）、G06（12%）这些有学习信号的。'
    },
    {
      q: 'G04（部分发货拆单，path 太长）和 G07（VAT 修正，工具缺失）都是全低组——处理完全不同。怎么从 probe 指标一眼区分？',
      tags: ['curriculum vs cold start'],
      hint: 'G04：tool_gap = 0、max_step_hit_rate 高、coverage 中等 → 路径太长 → curriculum 拆 5 阶段 + subgoal reward。G07：tool_gap > 0、p_good = 0、coverage 极低 → action space 缺失 → cold start 先补工具+sandbox+verifier。盲目把 G07 进 curriculum 永远学不会。'
    },
    {
      q: 'learner batch 配方：short_mastered ≤ 5%、long_good_signal ≥ 20%、risk ≥ 10%——为什么这三条约束不能违反？',
      tags: ['learner batch'],
      hint: 'short ≤ 5%：防 G01/G05 短任务淹没 batch。long ≥ 20%：保留长任务高分轨迹，否则被 stale filter 全丢，模型再不会处理长链路。risk ≥ 10%：高风险 case 留配额给人工 shadow review，否则 reward 漂移没人发现。'
    },
  ],
  5: [
    {
      q: '同步 / FIFO 异步 / 配额异步——FIFO 异步看起来最快，工业系统为什么几乎不用它？',
      tags: ['调度模式'],
      hint: 'FIFO 谁先回谁先训 → G05/G01 15 秒回来淹没 learner（占 batch 60%），G08 12 分钟回来时已经 stale 被丢。表面延迟低、吞吐高，实际训练分布被任务时长扭曲——模型只学会处理短任务。'
    },
    {
      q: 'G08 group K=4，3 条 8min 完成，R4 还在 12min 跑——你选 wait_all / timeout_partial / replacement / eval_only 哪一个？每种代价是什么？',
      tags: ['group assembly'],
      hint: 'wait_all：等齐但其他 3 条 stale 累积；timeout_partial：K=3 估 μ/σ 偏差 ±0.15；replacement：补一条新 R4，但 policy_version 已变；eval_only：partial 进 eval 池不参与训练。长任务通常 wait_all + 放宽 staleness window。'
    },
    {
      q: '单步 ratio 平均 1.03 看起来微不足道，30 步连乘 = 2.43；0.97 连乘 = 0.40——这意味着工业上对长 trajectory 的 ratio 应该如何处理？',
      tags: ['staleness', '长任务'],
      hint: '① 粒度要细：用 action-chunk 级 ratio 而不是 trajectory 级；② 长任务必须 length-aware loss normalization（w = min(1, √(T*/T))）防长轨迹主导梯度；③ 长任务专属 worker lane，staleness threshold 放宽。'
    },
  ],
  6: [
    {
      q: 'G02 step 7（finance.issue_refund）：old logprob = -2.40, current = -2.10, advantage = +1.367。ratio = ? ε = 0.2 时它会被 clip 吗？objective = ?',
      tags: ['ratio · clip'],
      hint: 'ratio = exp(-2.10 - (-2.40)) = exp(0.30) ≈ 1.350。ε = 0.2 → clip 区间 [0.8, 1.2]，1.350 > 1.2 → 被 clip 到 1.2。objective = min(1.350·1.367, 1.2·1.367) = 1.640。clip 此时起作用，单步幅度被约束。'
    },
    {
      q: 'ratio 用 token 级 / action-chunk 级 / trajectory 级——为什么工业上不可用 trajectory 级？',
      tags: ['粒度'],
      hint: 'trajectory 级整条 logprob 连乘极端化（1.03^30 = 2.43），完全被 staleness 主宰，clip 失效。token 级噪声高。工业默认 action-chunk 级：粒度对齐一次工具调用，与业务语义对齐，clip / KL 都好控。'
    },
    {
      q: 'KL penalty、entropy bonus、clip 都防"π_θ 跑歪"——它们各自防的是哪种不同的歪？',
      tags: ['loss 解剖'],
      hint: 'clip 防"单步更新太大"；KL 防"长期累积漂离 π_ref"（避免遗忘 base 能力）；entropy 防"分布塌缩到单一 action"。clip 管步幅、KL 管累计位移、entropy 管多样性，三件事互不替代。'
    },
  ],
  7: [
    {
      q: 'recompute logold 和 TIS 解决的是不同问题——各自解决什么？为什么不能只用一个？',
      tags: ['训推一致'],
      hint: 'recompute：trainer 里"old policy 的概率锚点"必须用 trainer 自己重算，否则 ratio 分母混了 rollout backend 数值噪声。TIS：样本采样分布其实来自 vLLM（π_rollout_old），不是 trainer 的 π_train_old——用 w = π_train_old/π_rollout_old 修正。一个修锚点，一个修采样偏差，必须串联。'
    },
    {
      q: '同一个 token 在 vLLM 和 FSDP 算出的 logprob 不同——列举 3 种原因。',
      tags: ['数值不一致'],
      hint: '① 推理引擎差异：tokenizer special token / chat template / tool call 序列化；② kernel：flash attention 变体 / BF16 vs FP8 / batch reduction；③ MoE 路由：router score 微差导致 top-k expert 翻转，下游 logits 跳变。'
    },
    {
      q: '长 trajectory 单 token 平均偏差 0.002——500 token 累积是多少倍？为什么 action-chunk 级 audit 比 trajectory 总和 audit 严格？',
      tags: ['累积漂移'],
      hint: '500 × 0.002 = 1.0，exp(1.0) ≈ 2.718 倍。total 看 abs_delta_sum = 0.40 看似 OK，但若 0.40 全集中在 finance.issue_refund 一个 action 上 → 关键 action exp(0.40) = 1.49 倍灾难。chunk_delta_p95 才能 catch 局部集中漂移。'
    },
  ],
  8: [
    {
      q: 'G06 二次补发：R1（无 memory）reward 0.18，R2（读 risk_memory）reward 0.83——让模型学这一对，关键是让它学到什么动作？',
      tags: ['memory 是 action'],
      hint: '不是"知道客户历史"——是"在收到补发请求时先 memory.search(namespace=risk) → 路由到 risk.check(elevated) + approval/handoff，而不是直接 finance.issue_refund"。memory 改变 action path，不只是上下文。'
    },
    {
      q: '为什么 memory write 必须是 proposal、必须经 verifier 审核？模型自己直接 write 会发生什么自我污染？',
      tags: ['防自污染'],
      hint: '模型可能写入"客户疑似欺诈"这种无证据猜测 → 下次 retrieval 把它当事实 → 决策被错误 memory 带歪 → 上线后 reject 上升 → 再写更多错误 memory（恶性循环）。必须 evidence_refs ≥ 2 + confidence ≥ 0.7 + verifier 通过才入库。'
    },
    {
      q: '同一组 K=4 rollout 必须 pin 到同一个 memory_snapshot_id——为什么？不 pin 会怎样？',
      tags: ['memory 训推一致'],
      hint: '不 pin → K=4 跑得有先后，前两条读 v8、后两条读 v9 → 组内 4 条 prompt 实际不同 → advantage 估计偏差 ±0.25 → 组内不可比。必须 pin 到 scheduler_round，rollout 期间 memory 视图冻结。'
    },
  ],
  9: [
    {
      q: 'QPS 上升、GPU 利用率上升、完成率上升——为什么可能正是训练分布被带歪的信号？',
      tags: ['infra 即分布'],
      hint: 'QPS 上 → short_task 偏置（G01/G05 占比飙 60%）；GPU 利用率上 → 关掉了 staleness filter 把过期数据全吞；完成率上 → 降低了 group_complete_rate 阈值（partial group 直接进训练）。真正健康指标是"有效可训练 trajectory / 单位成本"，不是吞吐。'
    },
    {
      q: 'memory / verifier / policy 三种适应周期分别是分钟-小时 / 天-周 / 周-月——一个线上 reject 出来，优先用哪一层修？',
      tags: ['自进化分层'],
      hint: '先看规则补丁能否解（verifier hard_gate 加一条）→ 天内；再看 memory 不全（write_proposal 补 risk 标记）→ 小时内；都不行再 policy 重训（周-月）。70% 线上问题前两层就能解，全压重训既慢又浪费 GPU。'
    },
    {
      q: 'Canary 1% → 10% → 50% → 100%，每档 release gate 看哪些指标？什么情况必须 rollback？',
      tags: ['canary · rollback'],
      hint: '看 risk_violation_rate ≤ baseline + 0.005、missing_approval_rate ≤ 0.01、refund_cost_delta ≤ 0、regression baseline（G02/G05）≤ 0.5%。任一越阈值 → 立刻 rollback。rollback_policy_version 必填，无回滚目标禁止发布——5 条红线最后一条。'
    },
  ],
};

function renderInteractiveQuestions() {
  const root = document.getElementById('qa-root');
  if (!root) return;
  const cur = currentChapter();
  const questions = QA_DATA[cur];
  if (!questions) return;
  const ch = CHAPTERS.find(c => c.id === cur);
  const cards = questions.map((q, i) => `
    <div class="qa-card">
      <div class="qa-num">Q${i + 1}</div>
      <p class="qa-q">${q.q}</p>
      ${q.tags ? `<div class="qa-tags">${q.tags.map(t => `<span class="qa-tag">${t}</span>`).join('')}</div>` : ''}
      ${q.hint ? `
        <details class="qa-hint">
          <summary>点击查看答案 · CLICK FOR ANSWER</summary>
          <div class="qa-hint-body">${q.hint}</div>
        </details>` : ''}
    </div>
  `).join('');
  root.innerHTML = `
    <section class="qa-section">
      <div class="container">
        <div class="qa-eyebrow">本章疑问 · QUESTIONS${ch ? ' · ' + ch.title : ''}</div>
        <h2 class="qa-title">3 个问题</h2>
        <p class="qa-desc">本章核心 3 个疑问。先想一下自己的答案，再点击"查看答案"展开对照。</p>
        <div class="qa-grid">${cards}</div>
      </div>
    </section>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  renderBackdrop();
  renderTopNav();
  renderCourseProgress();
  // renderInteractiveQuestions(); // 已下线，保留函数与 QA_DATA 备用
});

window.__AgenticRL = { CHAPTERS, COURSE_STEPS, QA_DATA, renderSummary, renderInteractiveQuestions };
