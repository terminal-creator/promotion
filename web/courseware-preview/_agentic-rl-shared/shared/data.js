/* G01-G08 全局 mock 数据
   与 htmlplancc/data_pack.md 对齐，所有章节复用 */

const CASES = [
  {
    id: 'G01',
    name_zh: '取消未发货订单',
    name_en: 'Cancel unshipped order',
    market: 'DE', difficulty: 'low', risk: 'low', avg_seconds: 15,
    color: '#94A3B8',
    role: 'all-high · 弱信号反例',
    customer_message: '请帮我取消订单 ORD-9024113，还没发货，不要了。',
    rewards: [0.96, 0.97, 0.95, 0.96],
    serves_chapters: [4, 5, 6],
    probe: { p_good: 0.93, success_at_4: 1.00, reward_std: 0.008, coverage: 0.82, tool_gap: 0 },
  },
  {
    id: 'G02',
    name_zh: '空气炸锅破损退款',
    name_en: 'Damaged item refund',
    market: 'DE', difficulty: 'mid', risk: 'mid', avg_seconds: 120,
    color: '#0055FF',
    role: '主线 · 全课程数值锚点',
    customer_message: '我收到的空气炸锅外壳裂了，照片已经上传了。这个订单等了十几天才到，现在还坏了，我希望你们直接退款，不要再让我退回去了。',
    rewards: [0.92, 0.31, 0.68, 0.14],
    serves_chapters: [0,1,2,3,4,5,6,7,8,9],
    probe: { p_good: 0.41, success_at_4: 0.71, reward_std: 0.298, coverage: 0.83, tool_gap: 0 },
  },
  {
    id: 'G03',
    name_zh: '物流停滞 14 天',
    name_en: 'Logistics stalled',
    market: 'DE', difficulty: 'mid', risk: 'mid', avg_seconds: 480,
    color: '#0EA5A4',
    role: '长任务 + stale 演示',
    customer_message: '我的订单 ORD-9011827 物流已经卡在中转站 14 天了，到底什么时候能到？',
    rewards: [0.78, 0.65, 0.72, 0.45],
    serves_chapters: [5, 9],
    probe: { p_good: 0.62, success_at_4: 0.88, reward_std: 0.15, coverage: 0.74, tool_gap: 0 },
  },
  {
    id: 'G04',
    name_zh: '部分发货 + 拆单',
    name_en: 'Partial shipment',
    market: 'DE', difficulty: 'high', risk: 'low', avg_seconds: 1200,
    color: '#D97706',
    role: 'all-low · 路径太长（curriculum）',
    customer_message: '我下单了两件商品但只收到一件，另一件物流也查不到，到底什么时候能到？要不就一起退款吧。',
    rewards: [0.10, 0.12, 0.08, 0.11],
    serves_chapters: [4],
    probe: { p_good: 0.02, success_at_4: 0.078, reward_std: 0.018, coverage: 0.34, tool_gap: 0, max_step_hit_rate: 0.47 },
  },
  {
    id: 'G05',
    name_zh: '退货政策咨询',
    name_en: 'Return policy question',
    market: 'DE', difficulty: 'low', risk: 'low', avg_seconds: 25,
    color: '#64748B',
    role: 'all-high · 低价值',
    customer_message: '请问德国市场的退货政策是什么？我可以在多久内退？',
    rewards: [0.91, 0.92, 0.90, 0.91],
    serves_chapters: [4],
    probe: { p_good: 0.91, success_at_4: 1.00, reward_std: 0.008, coverage: 0.78, tool_gap: 0 },
  },
  {
    id: 'G06',
    name_zh: '高频客户二次补发',
    name_en: 'High-risk customer reshipment',
    market: 'DE', difficulty: 'high', risk: 'high', avg_seconds: 240,
    color: '#DC2626',
    role: '高风险 · memory 主案例',
    customer_message: '我上次订单到了发现里面的零件少了，麻烦帮我补发一套。',
    rewards: [0.18, 0.83, 0.65, 0.42],
    serves_chapters: [3, 8, 9],
    probe: { p_good: 0.51, success_at_4: 0.85, reward_std: 0.241, coverage: 0.76, tool_gap: 0 },
  },
  {
    id: 'G07',
    name_zh: 'B2B VAT 发票修正',
    name_en: 'B2B VAT invoice fix',
    market: 'DE', difficulty: 'high', risk: 'mid', avg_seconds: 0,
    color: '#7C3AED',
    role: '工具缺失 · cold start',
    customer_message: '请帮我把 PO-2026-0815 发票上的 VAT 号改成 DE302456789，否则我们无法报销。',
    rewards: [0.24, 0.28, 0.26, 0.25],
    serves_chapters: [4, 9],
    probe: { p_good: 0.00, success_at_4: 0.00, reward_std: 0.014, coverage: 0.18, tool_gap: 2 },
  },
  {
    id: 'G08',
    name_zh: '已发货改地址',
    name_en: 'Change address after dispatch',
    market: 'DE', difficulty: 'high', risk: 'high', avg_seconds: 720,
    color: '#6D28D9',
    role: '长链路 + stale',
    customer_message: '我下单后忘了改收货地址了，但客服 APP 显示已发货，能不能拦截一下重新发到新地址？',
    rewards: [0.62, 0.18, 0.55, 0.71],
    serves_chapters: [5, 7, 9],
    probe: { p_good: 0.55, success_at_4: 0.84, reward_std: 0.218, coverage: 0.71, tool_gap: 0 },
  },
];

/* G02 完整 4 条 rollout — 用于 ch1/ch2/ch3/ch6/ch7 复用 */
const G02_ROLLOUTS = {
  R1: {
    id: 'G02-R1', label: 'R1 · 好轨迹',
    reward: 0.92, raw_reward: 0.94, cap: null, confidence: 0.95,
    terminal: 'closed',
    subscores: { outcome:1.00, policy:1.00, evidence:0.95, efficiency:0.78, communication:0.85, risk:0.95 },
    actions: [
      { step:1, tool:'oms.get_order',          tool_zh:'查订单',       args:{ order_id:'ORD-9023841' },        obs:{ status:'success', data:{ delivered:true, amount_eur:59.99 } },                       latency_ms:80,   risk:'low'  },
      { step:2, tool:'tms.get_tracking',       tool_zh:'查物流',       args:{ tracking:'DHL-998877' },         obs:{ status:'success', data:{ delivered_at:'2026-05-11' } },                              latency_ms:120,  risk:'low'  },
      { step:3, tool:'attachment.inspect',     tool_zh:'看附件',       args:{ attachment_id:'ATT-001' },       obs:{ status:'success', data:{ damage_detected:true, confidence:0.91 } },                  latency_ms:2400, risk:'low'  },
      { step:4, tool:'policy.search',          tool_zh:'查政策',       args:{ q:'DE damaged item refund' },    obs:{ status:'success', data:{ policy_id:'DE-DAMAGE-2025-v3', allows_refund_no_return:true } }, latency_ms:600, risk:'low' },
      { step:5, tool:'risk.check',             tool_zh:'风控检查',     args:{ customer_id:'CUS-DE-49210' },    obs:{ status:'success', data:{ risk_score:0.07 } },                                        latency_ms:150,  risk:'low'  },
      { step:6, tool:'finance.simulate_refund',tool_zh:'退款 dry-run', args:{ order_id:'ORD-9023841', amount:59.99 }, obs:{ status:'success', data:{ would_succeed:true } },                              latency_ms:200,  risk:'med'  },
      { step:7, tool:'finance.issue_refund',   tool_zh:'发起退款',     args:{ order_id:'ORD-9023841', amount:59.99, reason_code:'DAMAGE', evidence_ids:['ATT-001'] }, obs:{ status:'success', data:{ refund_id:'RF-77231', amount:59.99 } }, latency_ms:850, risk:'high' },
      { step:8, tool:'message.reply',          tool_zh:'回复客户',     args:{ text_zh:'非常抱歉给您带来不便。我们已确认空气炸锅破损情况，刚刚为您发起 59.99 欧元的全额退款，无需退回商品。退款会在 3-5 个工作日内退回原支付方式。' }, obs:{ status:'success' }, latency_ms:50,  risk:'low' },
      { step:9, tool:'ticket.close',           tool_zh:'关单',         args:{ resolution:'refund_issued' },     obs:{ status:'success' },                                                                  latency_ms:40,   risk:'low'  },
    ],
    logprobs: {
      old:     [-2.30, -2.10, -1.80, -1.95, -2.05, -1.70, -2.40, -1.60],
      current: [-2.10, -1.95, -1.75, -1.85, -1.92, -1.55, -2.10, -1.50],
      rollout: [-2.32, -2.12, -1.81, -1.97, -2.06, -1.72, -2.45, -1.62],
      ref:     [-2.40, -2.20, -1.90, -2.00, -2.15, -1.80, -2.50, -1.70],
    },
  },
  R2: {
    id: 'G02-R2', label: 'R2 · 漂亮回复但没做事',
    reward: 0.31, raw_reward: 0.38, cap: { value:0.35, reason:'false_promise_cap' }, confidence: 0.92,
    terminal: 'closed',
    subscores: { outcome:0.00, policy:0.40, evidence:0.00, efficiency:0.90, communication:0.75, risk:0.50 },
    actions: [
      { step:1, tool:'message.reply', tool_zh:'回复客户', args:{ text_zh:'非常抱歉给您带来困扰。我们会尽快为您处理退款问题，请您放心，我们一定会给您满意的答复。' }, obs:{ status:'success' }, latency_ms:50, risk:'low' },
      { step:2, tool:'ticket.close',  tool_zh:'关单',     args:{ resolution:'customer_informed' },        obs:{ status:'success' }, latency_ms:40, risk:'low' },
    ],
  },
  R3: {
    id: 'G02-R3', label: 'R3 · 保守 / 转人工',
    reward: 0.68, raw_reward: 0.68, cap: null, confidence: 0.72,
    terminal: 'handoff',
    subscores: { outcome:0.60, policy:0.85, evidence:0.70, efficiency:0.40, communication:0.70, risk:0.85 },
    actions: [
      { step:1, tool:'oms.get_order',      tool_zh:'查订单', args:{ order_id:'ORD-9023841' }, obs:{ status:'success' }, latency_ms:80,   risk:'low' },
      { step:2, tool:'attachment.inspect', tool_zh:'看附件', args:{ attachment_id:'ATT-001' }, obs:{ status:'success', data:{ damage_detected:true } }, latency_ms:2200, risk:'low' },
      { step:3, tool:'policy.search',      tool_zh:'查政策', args:{ q:'DE damage' }, obs:{ status:'success' }, latency_ms:550, risk:'low' },
      { step:4, tool:'message.reply',      tool_zh:'回复客户', args:{ text_zh:'我们已确认您的破损情况，案件已转交专员，预计 24 小时内会有同事联系您处理退款。' }, obs:{ status:'success' }, latency_ms:55, risk:'low' },
      { step:5, tool:'ticket.handoff',     tool_zh:'转人工', args:{ queue:'manual_refund' }, obs:{ status:'success' }, latency_ms:60, risk:'low' },
    ],
  },
  R4: {
    id: 'G02-R4', label: 'R4 · 错政策 / 要求客户退货',
    reward: 0.14, raw_reward: 0.30, cap: { value:0.25, reason:'wrong_policy_cap + customer_harm_cap' }, confidence: 0.88,
    terminal: 'closed',
    subscores: { outcome:0.00, policy:0.10, evidence:0.30, efficiency:0.70, communication:0.55, risk:0.40 },
    actions: [
      { step:1, tool:'oms.get_order',  tool_zh:'查订单', args:{ order_id:'ORD-9023841' }, obs:{ status:'success' }, latency_ms:90, risk:'low' },
      { step:2, tool:'policy.search',  tool_zh:'查政策', args:{ q:'refund return' }, obs:{ status:'success' }, latency_ms:580, risk:'low' },
      { step:3, tool:'message.reply',  tool_zh:'回复客户', args:{ text_zh:'请您先将商品按以下地址寄回，我们收到后在 7 个工作日内为您退款。退货运费由您承担。' }, obs:{ status:'success' }, latency_ms:55, risk:'low' },
      { step:4, tool:'ticket.close',   tool_zh:'关单',  args:{ resolution:'return_requested' }, obs:{ status:'success' }, latency_ms:40, risk:'low' },
    ],
  },
};

const G02_GROUP_STATS = {
  rewards: [0.92, 0.31, 0.68, 0.14],
  mean: 0.5125,
  std: 0.2980,
  advantages_baseline:    [+0.4075, -0.2025, +0.1675, -0.3725],
  advantages_standardized:[+1.367,  -0.679,  +0.562,  -1.250],
};

const SUB_SCORES_META = [
  { key:'outcome',       zh:'结果',       weight:0.40, color:'var(--sub-outcome)' },
  { key:'policy',        zh:'政策',       weight:0.20, color:'var(--sub-policy)' },
  { key:'evidence',      zh:'证据',       weight:0.15, color:'var(--sub-evidence)' },
  { key:'efficiency',    zh:'效率',       weight:0.10, color:'var(--sub-efficiency)' },
  { key:'communication', zh:'沟通',       weight:0.10, color:'var(--sub-communication)' },
  { key:'risk',          zh:'风控',       weight:0.05, color:'var(--sub-risk)' },
];

const HARD_CAPS = [
  { key:'false_promise_cap',       zh:'空头承诺',         cap:0.35 },
  { key:'wrong_policy_cap',        zh:'政策错误',         cap:0.30 },
  { key:'missing_evidence_cap',    zh:'缺证据',           cap:0.55 },
  { key:'unauthorized_refund_cap', zh:'越权退款',         cap:0.20 },
  { key:'customer_harm_cap',       zh:'给客户造成损失',   cap:0.25 },
  { key:'no_side_effect_cap',      zh:'承诺但无副作用',   cap:0.40 },
  { key:'high_risk_no_check_cap',  zh:'高风险未风控',     cap:0.50 },
];

const BUSINESS_SYSTEMS = [
  { id:'crm',      name:'CRM',       cn:'客户系统',  read:true,  write:false, tools:['crm.get_customer'] },
  { id:'oms',      name:'OMS',       cn:'订单系统',  read:true,  write:true,  tools:['oms.get_order','oms.update_address'] },
  { id:'tms',      name:'TMS',       cn:'物流系统',  read:true,  write:true,  tools:['tms.get_tracking','tms.intercept'] },
  { id:'wms',      name:'WMS',       cn:'仓储系统',  read:true,  write:true,  tools:['wms.check_stock','wms.create_backorder'] },
  { id:'policy',   name:'Policy',    cn:'政策引擎',  read:true,  write:false, tools:['policy.search'] },
  { id:'risk',     name:'Risk',      cn:'风控引擎',  read:true,  write:false, tools:['risk.check'] },
  { id:'finance',  name:'Finance',   cn:'结算系统',  read:true,  write:true,  tools:['finance.simulate_refund','finance.issue_refund'] },
  { id:'approval', name:'Approval',  cn:'审批系统',  read:true,  write:true,  tools:['approval.create_case'] },
  { id:'message',  name:'Message',   cn:'消息系统',  read:false, write:true,  tools:['message.reply'] },
  { id:'ticket',   name:'Ticket',    cn:'工单系统',  read:true,  write:true,  tools:['ticket.close','ticket.handoff'] },
];

/* 起手六问 */
const OPENING_QUESTIONS = [
  { q:'一个客服 LLM 回复得很礼貌，但没有真正退款，这条样本应该算高分还是低分？', hint:'ch1 / ch3 会解答（false_promise_cap）。', target:['ch1','ch3'] },
  { q:'如果同一个工单采样 4 条轨迹，4 条都成功，模型还能学到什么？',          hint:'ch3 / ch4 会解答（reward spread 与不变量）。', target:['ch3','ch4'] },
  { q:'如果 4 条轨迹都失败，是不是应该直接把它们拿去 RL？',                    hint:'ch3 / ch4 会解答（全低组的相对最好陷阱）。', target:['ch3','ch4'] },
  { q:'如果一条轨迹 10 秒完成，另一条轨迹 12 分钟才完成，它们应该在同一个 learner batch 里训练吗？', hint:'ch5 会解答（rollout group / learner batch / scheduling round）。', target:['ch5'] },
  { q:'如果 rollout 是 vLLM 生成的，训练是 FSDP 算 logprob，同一个 token 的概率对不上，GRPO 还能正常更新吗？', hint:'ch7 会解答（recompute + TIS 三策略）。', target:['ch7'] },
  { q:'如果 infra 调度总是优先让短任务进入训练，模型最后会不会只学会处理简单工单？', hint:'ch5 / ch9 会解答（分布偏移、FIFO 偏置）。', target:['ch5','ch9'] },
];

window.__DATA = { CASES, G02_ROLLOUTS, G02_GROUP_STATS, SUB_SCORES_META, HARD_CAPS, BUSINESS_SYSTEMS, OPENING_QUESTIONS };
