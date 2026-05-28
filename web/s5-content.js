/**
 * s5-content.js · 单一内容源
 *
 * 所有 13 套样式的所有文案/数字/列表都从这里读。
 * 改一处 → 13 套样式同步生效。
 *
 * 由 channel-loader.js 注入的渠道字段（wechat_id / qr_image_url / display_name）
 * 是另一层；这里只放课程基础内容。
 *
 * 提取自当前主 index.html（决策版 v3）·  最后同步：2026-05-28
 */
(function () {
  'use strict';

  // Node 兼容：在 Node 环境下 window 不存在
  const root = (typeof window !== 'undefined') ? window : (typeof globalThis !== 'undefined' ? globalThis : this);

  root.S5_CONTENT = {
    /* ============================================================
       META
       ============================================================ */
    meta: {
      brand: 'S5 · 2026',
      edition: '第 5 期 · 10 周冲刺',
      slogan: 'Agentic 系统工程与 Post-Train 落地',
      newTag: 'Agent × Post-Train · 全面更新',
      copyright: 'S5 · 2026 · 大模型冲刺营 · AGENT × POST-TRAIN × INDUSTRIAL DEPLOY',
    },

    /* ============================================================
       HERO
       ============================================================ */
    hero: {
      eyebrow: { brand: 'S5 · 2026', desc: '第 5 期 · 10 周冲刺', newTag: 'NEW', newDesc: 'Agent × Post-Train · 全面更新' },
      title: {
        l1: '2026 大模型冲刺营',
        l2a: 'Agentic 系统工程',
        l2b: '与 Post-Train 落地。',
        l2aHighlight: 'Agentic',
        l2bHighlight: 'Post-Train',
      },
      sub: '2026 想拿 LLM 高薪 offer？还在 LangChain 跑 demo？还在脚本一键训练公开数据集？—— 是带你拆解世界级 Agent 源码、完全掌握核心架构、熟悉工业级 Post-Train 训练管线、再把整套系统部署上线、最后落到真实业务。10 套交互式课件 · 5 个工业级项目 · 算法 × 工程双修。',
      subHighlight: '还在 LangChain 跑 demo？还在脚本一键训练公开数据集？',
      subBold: '拆解世界级 Agent 源码、完全掌握核心架构、熟悉工业级 Post-Train 训练管线、再把整套系统部署上线、最后落到真实业务',
      stats: [
        { n: '10', u: '周',  l: '完整路线' },
        { n: '3V1', u: '',    l: '答疑' },
        { n: '5',   u: '个',  l: '工业级项目' },
        { n: '1V1', u: '',    l: '定制路线' },
        { n: '4090', u: '',   l: '独享算力' },
      ],
      selfCheck: {
        title: '面试 Self-Check',
        ct: '5 题 / 答不上 ≈ 你需要这门课',
        questions: [
          { n: 'Q1', text: 'verl 双 node 4 GPU 和 TRL 的本质差距在哪？3D-HybridEngine 怎么训推同卡切换？', bold: ['双 node 4 GPU'] },
          { n: 'Q2', text: 'GRPO 公式终态 5 步推导 —— loss_mask 怎么落到 trajectory 上？', bold: ['loss_mask'] },
          { n: 'Q3', text: 'Agent Swarm 的 Gateway 怎么把"五花八门"翻译成"长得一样"？协议四帧是哪四帧？', bold: ['Gateway'] },
          { n: 'Q4', text: 'SFT 冷启动数据怎么造？Curriculum 排课为什么全低 group 不能直接上 RL？', bold: ['Curriculum'] },
          { n: 'Q5', text: 'ClaudeCode 的 Memory 怎么提取、什么时候触发、怎么作用于当前对话？', bold: ['Memory'] },
        ],
        foot: '每一题都在课件里有完整答案 · 看完课能反向考面试官',
      },
    },

    /* ============================================================
       HOOK · 6 条求职痛点
       ============================================================ */
    hook: {
      label: '2026 求职 · 真实卡点',
      title: '是不是卡在就业这一关？',
      titleBr: '是不是卡在<br>就业这一关？',
      rows: [
        { n: '01', main: '对 LLM 方向非常迷茫',     strike: '你知道是机会',      blame: '但路径不明、不知道从哪入手' },
        { n: '02', main: '简历投了 100+ 封',         strike: '都说有兴趣',         blame: '到面试就被刷' },
        { n: '03', main: '面试官问 "你写过 Agent 系统吗？"', strike: '嗯…',           blame: '只用过 LangChain' },
        { n: '04', main: '简历项目都是 demo 级',     strike: '看着挺多',           blame: '面试官扫一眼就过' },
        { n: '05', main: '跑过几次「一键训练脚本」', strike: '公开数据集出了点分', blame: '面试官一看就是 toy' },
        { n: '06', main: '想转 LLM / 想拿高薪',      strike: '方向有了',           blame: '但碎片化能力撑不起议价' },
      ],
    },

    /* ============================================================
       S 系列演进
       ============================================================ */
    series: {
      eyebrow: { num: '00 · THE S-SERIES', end: '第五次系统迭代' },
      title: '这不是"又一门 Agent 课"。是 5 期沉淀打磨出来的系统化训练营。',
      titleSwash: '系统化训练营',
      lead: '从 2024 年的 S2 算法系统课，到 2025 年的 S3 求职急救营 + S4 Agent 工程工业级，再到这一期 S5 —— 每一期都对准当时市场最稀缺的能力栈做迭代。S5 把工业级 Agentic 系统 + Post-Train 全闭环装上去，这是 2026 年最值钱的两块硬骨头。',
      cards: [
        {
          id: 'S2', tag: 'S2 · 2024 SECOND HALF', name: '大模型算法系统课', span: '14 周 · 算法地基',
          modulesLabel: '核心模块 · 9 个主题',
          modules: [
            'Transformer · 注意力 / Position Encoding / KV-Cache',
            '预训练 · Causal LM / Tokenizer / Scaling Law',
            '微调 SFT · LoRA / QLoRA / Adapter / PEFT',
            'RAG · 向量库 / Embedding / Rerank / 混合检索',
            'Agent 概念入门 · ReAct / Tool Use',
            'RLHF · PPO / Reward Model / KL 约束',
            '多模态 · CLIP / BLIP / VLM 基础',
            '分布式 · DeepSpeed / FSDP / TP / PP',
            '推理加速 · vLLM / 量化 / KV reuse',
          ],
          outputs: ['从 Transformer 到 Agent 的完整理论底座', '一份能看懂论文 + 改得动代码的能力'],
          foot: '打通算法基本盘',
        },
        {
          id: 'S3', tag: 'S3 · 2024 秋招', name: '大模型求职急救营', span: '6 周 · 秋招冲刺',
          modulesLabel: '核心模块 · 求职导向',
          modules: [
            'Function Call SFT · 数据构造 / 训练脚本 / Loss',
            'GRPO · 微调 Reward Model / Group Relative',
            'Agent 实战项目 · 快速堆栈上简历',
            '简历重写 · STAR 法 / 深度包装 / 量化产出',
            '面经体系 · 大厂高频题 + 拆解套路',
            'Mock 面试 · 模拟一面 / 二面 / HR 面',
            '薪资谈判 · 投递策略 / 谈 offer',
          ],
          outputs: ['一份能过初筛、能扛面的大厂简历', '一套面试开局 90s 套路'],
          foot: '短期求职冲刺包',
        },
        {
          id: 'S4', tag: 'S4 · 2025 春招', name: 'Agent 工程工业级课程', span: '6 周 · 工程落地',
          modulesLabel: '核心模块 · 业务工程化',
          modules: [
            'DeepResearch · 多 Agent 架构拆解 (33k 行)',
            'LangGraph DAG · 状态机 / fork-join / 断点续传',
            'MCP 协议 · Server / Client / Tool Discovery',
            'FastAPI 微服务 · 依赖注入 / SSE / 异步',
            '11 个 Router · research / database / knowledge / chat',
            '6 大专家 Agent · ChiefArchitect / DeepScout / CodeWizard',
            'Text2SQL + Schema 发现 + 可视化推荐',
            'RAG 知识库 · 15K 文档 / 200K chunks / 混合检索',
          ],
          outputs: ['一段 33k 行实战项目的工程经验', '能讲透 Agent 微服务架构的面试能力'],
          foot: '真实业务工程经验',
        },
        {
          id: 'S5', tag: 'S5 · 2026 NEW', name: 'Agentic 系统工程 · Post-Train 落地', span: '10 周 · 算法 × 工程双修',
          isCurrent: true,
          modulesLabel: '本期重磅新增 · 10 套课件',
          modules: [
            'Agent Skill 系统 0–1 实现',
            'ClaudeCode 单 Agent 复现',
            'OpenClaw Agent 集群拆解',
            'verl HybridFlow 工业训练框架',
            'Agentic RL 范式 + 三不变量',
            'SFT + Curriculum + RL 闭环',
            'GRPO / GSPO / DAPO 横评',
            '工程架构基建 · Docker / K8s / FastAPI',
            'GUI Agent + 多模态 RAG',
            '企业级 Swarm 平台落地',
          ],
          outputs: ['算法 + 工程双修的硬资产', '企业级 AI 平台项目经历'],
          foot: '这一期 = 工业级 Agent + 完整 Post-Train',
        },
      ],
      axis: [
        { t: '2024 H2', d: '算法地基' },
        { t: '2024 秋招', d: '短跑冲刺' },
        { t: '2025 春招', d: '工程深度' },
        { t: '2026 新一年', d: '算法 × 工程双修' },
      ],
      delta: {
        tag: 'S4 → S5 · DELTA',
        title: '3 个根本变化',
        desc: '为什么 S5 不是 S4 的小升级，而是一次彻底重构的训练营。',
        items: [
          { n: '+ 模型基座层', h: 'verl + Agentic RL', b: '第一次把"工业级 Post-Train"完整放进课程：HybridFlow 训练框架 + Agentic RL 范式 + SFT/Curriculum/RL 闭环。' },
          { n: '+ 集群级 Agent', h: 'ClaudeCode + OpenClaw', b: '从单 Agent 上升到 Agent Swarm 工业范本：Gateway / Harness / Subagent / 沙箱 / 工具协议四帧全套。' },
          { n: '+ 端到端业务', h: '企业级 Swarm 平台', b: '10 周的产物不是 demo，是一个能在企业内部跑起来的智能协同助手 —— 5 渠道接入、4 专家 Agent、20+ Skill。' },
        ],
      },
    },

    /* ============================================================
       引入 · 算法 vs 工程
       ============================================================ */
    intro: {
      eyebrow: { num: '01 · WHY THIS COURSE', end: '市场信号 · 课程定位' },
      title: '"我到底是做算法，还是做工程？"',
      titleSwash: ['算法', '工程'],
      lead: '过去一年，每天都有同学私信问我这个问题。答案在 2026 年的市场上已经非常清楚 —— 除非你做基座层（pre-train、训练框架最底层），否则只懂算法、或者只懂工程，都拿不到真正的高薪 offer。',
      quote: '能让你提升上限的，从来不是单点能力。而是同时能把工业级 Agent 系统写出来、又能把 Post-Train 训练管线跑通、再把整套东西部署上线的 "算法 + 工程兼具" 的工程师。',
      quoteHighlight: '"算法 + 工程兼具"',
      cards: [
        {
          lab: 'A · 只懂算法', ans: '看完论文跑 demo', ansStrike: true,
          desc: '能调通 SFT、能改 PPO，但代码只能跑在 notebook 里；不知道怎么把模型变成服务、不知道 Agent 系统的工程边界在哪。在企业里只能做研究员的活，岗位窄、议价低。',
        },
        {
          lab: 'B · 只懂工程', ans: '能搭服务但不懂模型', ansStrike: true,
          desc: 'Docker / FastAPI / K8s 玩得很顺，能搭后端、能上线、能扛流量；但模型层一改就抓瞎、Reward 一调就崩、训练管线一动就翻车。永远在 LLM 业务的外围打转。',
        },
        {
          lab: 'A × B · 真正的 LLM 工程师', ans: '算法 + 工程 双修', isMerge: true,
          desc: '能从 Agent 应用层、Agent 工程层一路打通到 Post-Train 训练框架，再把整套系统部署成线上服务、最后落到真实业务 —— 这就是这门课要带你成为的人。',
        },
      ],
      bullets: [
        { n: '01', t: '2026 年的市场信号', d: 'Agent 产品落地潮 + Post-Train 工业化 → 双修岗位薪资上限提升 30%+。' },
        { n: '02', t: '这门课的定位', d: '最新工业级 Agentic 系统 + Post-Train 端到端落地，全程从 0–1 自己写。' },
        { n: '03', t: '不教什么', d: '不教调 LangChain · 不做"听懂就行"的导读 · 不停留在论文层。' },
        { n: '04', t: '教什么', d: '拆解 → 重写 → 训练 → 部署 → 落地，10 周打通完整链路。' },
      ],
    },

    /* ============================================================
       ROADMAP · 10 周 6 阶段
       ============================================================ */
    roadmap: {
      eyebrow: { num: '02 · ROADMAP', end: '10 周 · 6 大阶段' },
      title: '10 周 × 6 大阶段的递进逻辑',
      titleSwash: '递进逻辑',
      lead: '从理解 Agent 的本质 → 看世界级范本 → 打通模型基座 → 工业化部署 → 拓展模态 → 真实业务落地。每一周都和前后强耦合，不是 6 门孤立的课。',
      stages: [
        { n: 'STAGE 1', t: '理解本质 · Skill 抽象' },
        { n: 'STAGE 2', t: '看顶级范本 · 单 Agent + 集群' },
        { n: 'STAGE 3', t: '打通模型层 · SFT + RL 闭环' },
        { n: 'STAGE 4', t: '工程化基建 · Docker + 微服务' },
        { n: 'STAGE 5', t: '拓展模态 · 多模态 + GUI' },
        { n: 'STAGE 6', t: '真实业务 · 企业级落地' },
      ],
      weeks: [
        { wk: 'W1',  topic: 'Agent Skill 系统拆解和实现',        pos: '理解 Agent 的本质抽象（Skill 是手脚）',     stage: '一 · 系统性设计' },
        { wk: 'W2',  topic: 'ClaudeCode 架构拆解和实现',         pos: '看世界级单 Agent 的工程范本',              stage: '二 · 工程实现' },
        { wk: 'W3',  topic: 'OpenClaw 核心架构拆解和实现',       pos: '看工业级 Agent 集群的架构范本',            stage: '二 · 工程实现' },
        { wk: 'W4',  topic: 'verl · HybridFlow 训练框架剖析',    pos: '看 RL 训练框架的 infra 范本',              stage: '三 · 模型基座' },
        { wk: 'W5',  topic: 'Agentic RL · 架构与三不变量',       pos: '理解 Agentic RL 的系统架构',               stage: '三 · 模型基座' },
        { wk: 'W6',  topic: 'SFT + Curriculum · 冷启动闭环',     pos: '把数据 / 训练 / 评测三工厂跑成闭环',       stage: '三 · 模型基座' },
        { wk: 'W7',  topic: 'GRPO / GSPO / DAPO · RL 自我进化',  pos: '让 Agent 通过 RL 自我进化',                stage: '三 · 模型基座' },
        { wk: 'W8',  topic: '工程架构基建 · 6 章打通后端',       pos: '把整套系统变成线上服务',                   stage: '四 · 工程基建' },
        { wk: 'W9',  topic: '多模态 RAG + GUI Agent',            pos: '让 Agent 能看屏幕、能操作 GUI',            stage: '五 · 模态扩展' },
        { wk: 'W10', topic: '企业内部智能协同助手平台',          pos: '端到端落地真实业务',                       stage: '六 · 项目落地' },
      ],
    },

    /* ============================================================
       WEEK BY WEEK · 10 周详解
       ============================================================ */
    weeksSection: {
      eyebrow: { num: '03 · WEEK BY WEEK', end: '含交互式课件在线预览' },
      title: '每周详解 · 含课件在线预览',
      titleSwash: '课件在线预览',
      lead: '每一周都包含：为什么这一周 / 课件的真实章节地图 / 在线预览课件（可点击展开互动）/ 这一周的产出。课件不是 PDF，是可交互的网页式教学系统。',
    },

    weeks: [
      /* ====== W1 ====== */
      {
        wk: 'W1', idx: '1 / 10', stage: '系统性设计', meta: '阶段一 · Agentic 系统性设计',
        title: 'Agent Skill 系统拆解和实现',
        narr: 'Agent = LLM 大脑 + Skill 手脚。先把 "Skill 是什么、为什么 Agent 必须有 Skill、Skill 怎么从 0-1 设计实现" 这件事彻底搞清楚，后面所有的复杂架构（ClaudeCode 的 Tools、OpenClaw 的工具协议、Agentic RL 的 trajectory）全都是在 Skill 这个本源抽象上叠加的。这一周是整门课的"地基"。',
        narrSub: '看完这一周你会明白：Function Call 是协议、Tool 是粒度太粗的封装、Skill 才是 Agent 的"手脚"抽象 —— 这是 ClaudeCode、OpenClaw、Cursor 这些工业级 Agent 都遵循的底层范式。',
        highlights: [
          { n: '亮点 01', lab: '真实代码量', h: '4 级 Skill 全栈手写', b: 'Calculator（语法层）→ FileOps（IO 层）→ WebSearch（网络层）→ CodeRunner（subprocess 沙箱）—— 不是 demo，是能上线的完整代码。' },
          { n: '亮点 02', lab: '工程深度',  h: '@skill 装饰器',         b: '一行装饰器把任意 Python 函数转成 LLM 可调用工具，tool_schema 自动生成，全链路无 hardcode。' },
          { n: '亮点 03', lab: '面试可复用', h: '完整 ReAct 推理循环',   b: 'thought → action → observation → … 所有面试官都想听的"你自己写过 ReAct 吗"问题，从此能答透。' },
        ],
        chaptersTitle: 'Agent Skill 交互式课件',
        chaptersCt: '8 章 · 30+ 互动模块',
        chapters: [
          { ch: 'CH0 · Intro',           ti: '开篇：Agent Skill 在 Agent 体系里的定位' },
          { ch: 'CH1 · WhatIsSkill',     ti: '什么是 Skill：Agent 的"手脚"如何被抽象' },
          { ch: 'CH2 · WhySkill',        ti: '为什么 Agent 必须有 Skill：没 Skill 只能对话，有 Skill 才能交互' },
          { ch: 'CH3 · Implementation',  ti: '基类 / 注册中心 / @skill 装饰器 / tool_schema 自动转换' },
          { ch: 'CH4 · BuildFromScratch',ti: '从零构建 4 级 Skill：Calculator → FileOps → WebSearch → CodeRunner' },
          { ch: 'CH5 · Scenarios',       ti: '场景应用：天气 / 翻译 / 知识库检索 / 数据分析 / 通知' },
          { ch: 'CH6 · DeepTeardown',    ti: '深度拆解：agentskill 元技能 / superpowers / react_loop / skill_creator' },
          { ch: 'CH7 · Essence',         ti: 'Skill 的本质 —— 从代码抽象回到设计哲学' },
        ],
        coursewareName: 'Agent Skill 交互式课件',
        coursewareSrc: './courseware-preview/agentskill/index.html',
        coursewareDesc: '8 章 · 含 SkillRegistry / @skill 装饰器 / tool_schema 自动转换 / 4 级 Skill 实现 / 完整 ReAct 循环互动演示。',
        tags: ['SkillRegistry', '@skill 装饰器', 'tool_schema', 'subprocess 沙箱', 'ReAct Loop', 'CodeRunner'],
        output: {
          summary: '产出一套从零写出来的 Agent Skill 系统：SkillRegistry / @skill 装饰器 / tool_schema 自动转换 / 4 级基础 Skill / subprocess 沙箱 / 完整 ReAct 推理循环。',
          bullets: [
            '从零写一套 SkillRegistry + @skill 装饰器系统，全栈手写不依赖 LangChain',
            '用一行注解把任意 Python 函数变成 Agent 可调用工具',
            '实现 4 级 Skill 沙箱化的完整 ReAct 推理 Agent',
            '面试讲透 "Skill vs Tool vs Function Call" 的本质区别 —— 大厂高频题',
          ],
        },
      },

      /* ====== W2 ====== */
      {
        wk: 'W2', idx: '2 / 10', stage: '单 Agent 工程范本', meta: '阶段二 · Agent 工程实现',
        title: 'ClaudeCode 架构拆解和实现',
        narr: '看世界级 Agent 系统（Anthropic 的 ClaudeCode）是怎么造出来的。我们不做源码导读 —— 是把核心架构 0-1 拆开，再用自己的代码重新写一遍。看完这一周你就会知道：QueryLoop 怎么转、Tools 协议怎么定、Memory 在什么时候触发、Agent Teams 怎么互相 spawn —— 这些都是工业级 Agent 系统的最低公约数。',
        narrSub: 'ClaudeCode 是 Anthropic 自己用来开发产品的 Agent —— 工程密度甩开 LangChain / AutoGen 几个量级。拆这个等于看业界顶点的工程范本。',
        highlights: [
          { n: '亮点 01', lab: '消息三层结构', h: 'UI · API · Provider', b: '看清楚为什么不能直接传 string——工业级 Agent 必备的消息数据建模，跨版本兑现/重现都靠这三层。' },
          { n: '亮点 02', lab: 'Memory 触发链', h: '提取 · 存储 · 注入',  b: 'Memory 不是简单"记笔记"。提取时机 / 存储内容 / 怎么作用于当前 prompt —— 三个问题一次讲透。' },
          { n: '亮点 03', lab: '主子 Agent',   h: 'Spawn 协作',            b: 'SpawnParams · SubagentRunRecord 主子 Agent 协作的关键数据结构 —— 工业级 Agent 集群的核心抽象。' },
        ],
        chaptersTitle: 'ClaudeCode 从零到一复现',
        chaptersCt: '7 章 · 含完整 Runtime 追踪',
        chapters: [
          { ch: 'CH1 · 整体架构',     ti: '三种启动模式 / 项目包结构 / 顶层依赖关系' },
          { ch: 'CH2 · QueryLoop',    ti: '对话循环：消息三层数据结构 / QueryLoop 循环全貌' },
          { ch: 'CH3 · Tools',        ti: '工具协议：看代码、读文档、修改文件背后的工具注册和分发' },
          { ch: 'CH4 · Memory',       ti: '记忆系统：怎么提取 / 记什么 / 什么时候触发 / 怎么作用于当前对话' },
          { ch: 'CH5 · 完整 Runtime', ti: '一次请求的完整 Runtime 逐步追踪' },
          { ch: 'CH6 · Agent Teams',  ti: '多 Agent 协作：主子 Agent / SpawnParams / SubagentRunRecord' },
          { ch: 'CH7 · Ultimate Map', ti: '终极地图：所有模块的关系一张图说清' },
        ],
        coursewareName: 'ClaudeCode 从零到一复现',
        coursewareSrc: './courseware-preview/claudecode/index.html',
        coursewareDesc: '7 章交互式课件，含 QueryLoop 动画、Tools 调用时序、Memory 触发流、Agent Teams Spawn 全过程。',
        tags: ['QueryLoop', 'Tools Protocol', 'Memory Multi-Tier', 'SpawnParams', 'SubagentRunRecord', 'Runtime Trace'],
        output: {
          summary: '产出一套自己实现的单 Agent 完整运行时 —— QueryLoop + Tools + Memory + Agent Teams 四大子系统能跑通。',
          bullets: [
            '自己实现 QueryLoop + Tools + Memory + Agent Teams 四大子系统',
            '讲透 ClaudeCode 一次请求的完整 Runtime 时序',
            '设计 spawn 子 Agent 的 SpawnParams 与 SubagentRunRecord 数据结构',
            '拿出"ClaudeCode 架构复现"项目作为简历压舱石',
          ],
        },
      },

      /* ====== W3 ====== */
      {
        wk: 'W3', idx: '3 / 10', stage: 'Agent 集群范本', meta: '阶段二 · Agent 工程实现',
        title: 'OpenClaw 核心架构拆解和实现',
        narr: '单 Agent 跑通了，下一步是工业级 Agent 集群（Agent Swarm）。OpenClaw 的核心架构展示了从单体到集群的演进路径 —— Gateway 控制面把"五花八门的接入"翻译成"长得一样的消息"，多 Agent 编排、安全护栏、沙箱、上下文管理形成集群的骨架。这一周是从"会造 Agent"到"会造 Agent 平台"的关键跃迁。',
        narrSub: 'OpenClaw 是开源世界里少有的工业级 Agent 集群示范。看清楚从单 Agent 跨到集群需补哪几层基建：Gateway 控制面 / Harness 调度 / 4 种沙箱 / 协议四帧。',
        highlights: [
          { n: '亮点 01', lab: '工具协议四帧', h: '比 MCP 更本质',  b: 'user_msg / tool_call / tool_result / final_answer —— LLM 用工具的全部协议只需四帧。' },
          { n: '亮点 02', lab: '沙箱选型',     h: '4 种隔离机制',   b: 'subprocess（轻）→ Docker（中）→ microVM（重）→ wasm（按需），按 Skill 类型动态选型。' },
          { n: '亮点 03', lab: 'Harness 一轮', h: '接收 → 调度 → 回写', b: '集群级的"一次请求"到底有多复杂：完整 Harness 走法实际拆解。' },
        ],
        chaptersTitle: 'Deep-OpenClaw 核心架构与原理',
        chaptersCt: '多章节 · Gateway / Harness / 沙箱全景',
        chapters: [
          { ch: '⓪',         ti: 'OpenClaw 整体长什么样 · Gateway 是什么 · 集群顶层视图' },
          { ch: '①',         ti: 'Agent vs Chatbot · 为什么 Agent 不是 Chatbot' },
          { ch: '②',         ti: '服务器怎么主动告诉你新消息 · WebSocket 异步通信底座' },
          { ch: '③',         ti: '进程 · 容器 · 虚拟机 · 沙箱 · 4 种隔离机制对比与选型' },
          { ch: '④',         ti: '上下文窗口 · 模型不能无限记 → 怎么管理' },
          { ch: '⑤',         ti: '工具调用协议 · 模型怎么用工具：协议四帧' },
          { ch: 'Gateway',   ti: '把"五花八门"翻译成"长得一样" + 4 件正经活' },
          { ch: 'Harness',   ti: '一轮 Harness 完整走法 · 消息协议术语对照' },
          { ch: 'Subagent',  ti: 'SpawnParams · SubagentRunRecord · 主子 Agent 协作关键数据结构' },
        ],
        coursewareName: 'Deep-OpenClaw 核心架构与原理',
        coursewareSrc: './courseware-preview/openclaw/index.html',
        coursewareDesc: '从单体到集群的完整演进 · Gateway / WebSocket / 沙箱 / 工具协议四帧 / Harness / Subagent。',
        tags: ['Gateway', 'WebSocket', 'Sandbox · 4 隔离机制', '工具协议四帧', 'Harness', '主子 Agent 协作'],
        output: {
          summary: '产出一套 Agent 集群核心架构的理解 + 关键模块复现。',
          bullets: [
            '拆解 Gateway / Harness / Subagent 这些工业级抽象',
            '实现工具调用协议四帧的数据建模与序列化',
            '设计 Agent 集群的沙箱隔离与资源管理策略',
            '讲透 "Agent vs Chatbot" 在工业系统层面的本质差异 —— 面试官想听的"集群级"经验',
          ],
        },
      },

      /* ====== W4 ====== */
      {
        wk: 'W4', idx: '4 / 10', stage: 'infra 基座', meta: '阶段三 · 模型基座层加强',
        title: 'verl · HybridFlow 训练框架深入剖析',
        narr: 'W1-W3 都在应用层，从这一周开始下沉到模型层。verl 是字节开源的工业级强化学习训练框架（HybridFlow），是 Agentic RL 的 infra 基座。不理解 verl 的设计，就只会跑脚本，不会改、不会扩展。这一周把 entrypoint → driver → TaskRunner → Trainer → WorkerGroup → Worker → Engine 一次 step 的完整调用链走通。',
        narrSub: 'verl 是 2025–2026 最值钱的"懂源码"技能之一。看完这一周你才有资格说"我会改训练框架"，不再只是脚本工。',
        highlights: [
          { n: '亮点 01', lab: '实场景对比', h: 'verl vs TRL',          b: '双 node 4 GPU 实际场景本质差距：3D-HybridEngine 训推同卡切换 是 verl 独门绝技，TRL 完全做不到。' },
          { n: '亮点 02', lab: '7 层调用链', h: '一次 step 时序',        b: 'entrypoint → driver → TaskRunner → Trainer → WorkerGroup → Worker → Engine —— 一目了然。' },
          { n: '亮点 03', lab: 'Rollout 多后端', h: 'vLLM · SGLang · TRT-LLM', b: 'Rollout Engine 与 Trainer Engine 解耦的工程艺术 —— 任选后端。' },
        ],
        chaptersTitle: 'verl · HybridFlow 深入剖析',
        chaptersCt: '6 章 + 附录 · 含真实技术细节',
        chapters: [
          { ch: 'CH1 · Why verl',            ti: '为什么是 verl 不是 TRL：双 node 4 GPU 实际场景对比' },
          { ch: 'CH2 · 前置概念',            ti: 'DataProto / WorkerGroup / Driver / Ray 概念体系' },
          { ch: 'CH3 · 整体架构',            ti: 'HybridFlow 完整调用链：一次 step 的全流程时序追踪' },
          { ch: 'CH4 · PPO/GRPO Walkthrough', ti: '一次 PPO step 的完整时间线 · 梯度怎么算出来' },
          { ch: 'CH5 · Agentic RL',          ti: '承接下一周：verl 如何支撑 Agentic RL' },
          { ch: 'CH6 · 怎么改',              ti: '配置树 / 6 种 BaseEngine 实现 / Checkpoint Engine 后端' },
          { ch: 'Appendix',                  ti: '3D-HybridEngine 训推同卡切换 / DispatchPipeline / RemovePadding / TokenPacking' },
        ],
        coursewareName: 'verl · HybridFlow 深入剖析',
        coursewareSrc: './courseware-preview/verl/index.html',
        coursewareDesc: '6 章交互式课件 · 完整调用链可视化 · PPO/GRPO 一次 step 全程动画。',
        tags: ['HybridFlow', 'DataProto', 'WorkerGroup', '3D-HybridEngine', 'DispatchPipeline', 'FSDP vs TP', 'vLLM / SGLang / TRT-LLM'],
        output: {
          summary: '这是后面 W5-W7 整个 Post-Train 模块的 infra 基础。',
          bullets: [
            '读懂 verl 源码，能改 verl 配置树',
            '在 verl 上启动 PPO / GRPO 训练任务，跑出自己业务的训练曲线',
            '改造 DispatchPipeline 适配自定义 Rollout 后端',
            '面试讲透 "为什么是 verl 不是 TRL" —— 大厂面试官想听的源码视角答案',
          ],
        },
      },

      /* ====== W5 ====== */
      {
        wk: 'W5', idx: '5 / 10', stage: 'Agentic RL 的范式', meta: '阶段三 · 模型基座层加强',
        title: 'Agentic RL · 架构与三不变量',
        narr: 'verl 是 infra，Agentic RL 是上面跑的范式。这一周从理论 + 系统架构两个维度，把 Agentic RL 和传统 GRPO/RLHF/RLVR 的本质区别讲透 —— trajectory 不是 completion、reward 不是单点打分、rollout 不是 batch、memory 不是长上下文。看完这周你才有资格谈"Agentic"两个字。',
        narrSub: 'Agentic RL 不是 RLHF 的升级，是范式跃迁。trajectory 怎么标、reward 怎么算、rollout 怎么调度、memory 怎么布局 —— 2026 最值钱的算法领域。',
        highlights: [
          { n: '亮点 01', lab: '三不变量',     h: '防三种坍缩',           b: 'trajectory / reward / probability —— 三个不能动的量，dashboard 拨灯看红灯。' },
          { n: '亮点 02', lab: '异步 Rollout', h: '20k · 4k/round',       b: '分桶 → probe → 池 → budget 重分配 —— 真实工业级调度策略，不是戏言。' },
          { n: '亮点 03', lab: 'Memory 5 Lane', h: 'reward 0.18 → 0.83', b: 'session / episodic / semantic / procedural / profile · 五 TTL · 五写权限。' },
        ],
        chaptersTitle: 'Agentic RL · 实战课件',
        chaptersCt: '10 章 CH0–CH9 · 含 dashboard / 翻车手册',
        chapters: [
          { ch: 'CH0',                ti: '同一条工单两种"客服"如何回应 · 纯 LLM/RAG 为什么不够' },
          { ch: 'CH1 · 轨迹',         ti: '从 completion 到 trajectory · 7 步范式切换 · 4 个新认识' },
          { ch: 'CH2 · 全景 + 三不变量', ti: '训练走完哪几步 · 三不变量防三种坍缩 · 拨灯看红灯 dashboard' },
          { ch: 'CH3 · 环境',         ti: '八组件训练环境 · 5 行代码定义沙盒' },
          { ch: 'CH4 · Rollout 异步采样', ti: '20k 工单 4k rollout/round · 分桶 → probe → 池 → budget 重分配' },
          { ch: 'CH5 · Reward',       ti: 'Verifier / Judge / Reward / RM 各做什么 · 6 子分 + 7 hard cap' },
          { ch: 'CH6 · GRPO + 训推一致 TIS', ti: '终态公式 5 步拆 · π_old · π_θ · π_ref 钉死' },
          { ch: 'CH7 · 翻车手册',     ti: '诊断 → 修法 5 把手术刀 · 训练时盯哪些指标' },
          { ch: 'CH8 · Memory',       ti: 'Memory ≠ 长上下文 · 5 lane / 5 TTL / 5 写权限 · reward 0.18 → 0.83' },
          { ch: 'CH9',                ti: '一张图看完 Agentic RL 训练操作系统 · Infra 是分布生成器' },
        ],
        coursewareName: 'Agentic RL · 实战课件',
        coursewareSrc: './courseware-preview/agentic-rl-cover/index.html',
        coursewareDesc: '10 章 · 跨境电商售后 Agent 全流程贯穿 · 三不变量 dashboard 可视化 · 翻车诊断动画。',
        tags: ['trajectory', '三不变量', '异步 Rollout', 'Verifier · Judge · RM', 'GRPO + TIS', 'Memory 5 lane'],
        output: {
          summary: '理解力直接对标头部公司面试官的提问深度。',
          bullets: [
            '用工业级语言讲清 trajectory → gradient update 的全过程',
            '在 verl 上搭起 Agentic RL 训练管线，跑通自己业务的 trajectory pool',
            '看懂三不变量 dashboard 的红灯告警，知道翻车了往哪里修',
            '设计自己业务的 Reward / Verifier / Judge / RM 综合评分体系',
          ],
        },
      },

      /* ====== W6 ====== */
      {
        wk: 'W6', idx: '6 / 10', stage: '数据 · 训练 · 评测', meta: '阶段三 · 模型基座层加强',
        title: 'SFT + Curriculum · Post-Train 冷启动闭环',
        narr: '上一周把架构讲透了，这一周落到工业级训练管线。Agentic RL 不是直接上 RL —— 而是 SFT 冷启动 → Curriculum Learning 排课 → RL 训练 → 评测验收，形成一个完整的 Post-Train 闭环。这是工业界最容易翻车、也是最值钱的部分：全低 group 不能直接上 RL、curriculum 怎么排、SFT 数据怎么造，每一步都有坑。',
        narrSub: '全低 group 直接上 RL —— 工业界翻车一万次的开端。这一周告诉你：SFT 冷启动怎么造数据、Curriculum 怎么排课、三工厂怎么协同。',
        highlights: [
          { n: '亮点 01', lab: 'SFT 数据构造', h: 'loss_mask 工业实现', b: 'trajectory → preference pair → loss_mask —— 哪些 token 计 loss、哪些不计，工业级细节一次讲清。' },
          { n: '亮点 02', lab: 'Curriculum 排课', h: '难度梯度自适应',   b: '分桶 / probe / 自适应进阶 —— 模型不能一上来吃硬骨头，难度梯度怎么设。' },
          { n: '亮点 03', lab: '三工厂协同',   h: 'Post-Train OS',       b: '数据工厂 → 训练工厂 → 评测工厂 → 数据工厂 —— 闭环回灌的 Post-Train OS。' },
        ],
        chaptersTitle: 'Post-Train 工业级管线',
        chaptersCt: '3 大工厂 + 冷启动 + 课程学习',
        chapters: [
          { ch: '数据工厂',    ti: '贯穿全流程的真实业务 Case（跨境电商售后 Agent）· 采集 → 清洗 → 增强 → 偏好对构建' },
          { ch: 'SFT 冷启动',  ti: 'SFT 数据构造与训练流 · 为什么 SFT 是 RL 的必要前置 · loss_mask 的工业实现' },
          { ch: 'Curriculum',  ti: '课程学习排课策略 · 全低 group 为什么不能直接上 RL · 难度梯度 / 桶分配 / 自适应进阶' },
          { ch: '训练工厂',    ti: '基于 verl 的 SFT 管线 + PPO/DPO/GRPO 管线 · 分布式训练调度' },
          { ch: '评测工厂',    ti: '多维度自动化评测 · 三不变量 dashboard · Reward / Verifier 综合评分' },
          { ch: '闭环视角',    ti: 'SFT → Curriculum → RL → Eval → 回灌数据 · 完整 Post-Train OS' },
        ],
        coursewareName: 'Post-Train 闭环课件',
        coursewareSrc: './courseware-preview/agentic-rl-ch4/index.html',
        coursewareDesc: '基于 Agentic RL 课件的 CH4 / CH5 章节扩展 · SFT 冷启动 · Curriculum 排课 · 数据工厂 / 训练工厂 / 评测工厂 三工厂协同动画。',
        tags: ['SFT', 'Curriculum Learning', '数据工厂', '训练工厂', '评测工厂', 'loss_mask', '三不变量 dashboard'],
        output: {
          summary: '产出一套可以独立运转的 Post-Train 完整闭环（SFT 冷启动 + Curriculum 排课 + RL 训练 + 自动化评测）。',
          bullets: [
            '跑通 SFT + Curriculum + RL 完整闭环',
            '设计 Curriculum 难度梯度的自适应进阶策略',
            '在 verl 上实现三工厂之间的数据回灌与版本治理',
            '讲透"为什么不能直接上 RL" —— Post-Train 工业级面试核心问题',
          ],
        },
      },

      /* ====== W7 ====== */
      {
        wk: 'W7', idx: '7 / 10', stage: 'RL 算法实战', meta: '阶段三 · 模型基座层加强',
        title: 'GRPO / GSPO / DAPO · Agent 自我进化',
        narr: '有了闭环，这一周做算法实战 + Agent 自我进化。基于 Qwen 模型在 verl 上复现 GRPO，对比 GSPO（Group Scoring Policy Optimization）和 DAPO（Direct Alignment from Preferences with Optimization）这两个 2025-2026 年最有前景的前沿算法在同一业务场景下的效果。最后把 Self-Evolving 范式装上去，让 Agent 持续适应环境。',
        narrSub: 'GRPO 已经成为基础，2026 面试官真在问的是：GSPO 和 DAPO 你怎么看？不是抄论文，是看你有没有真跑过、能不能说出现实业务上的取舍。',
        highlights: [
          { n: '亮点 01', lab: 'Qwen + verl 复现', h: '每一行 loss 都跑通',         b: '基于 Qwen 14B 在 verl 上完整复现 GRPO，对照 W5 策略优化理论 —— 公式可调到 token 粒度。' },
          { n: '亮点 02', lab: '算法横评',         h: 'DPO / GRPO / GSPO / DAPO',  b: '同一业务场景下效果对比 —— 不是抄论文，是真实数据。' },
          { n: '亮点 03', lab: 'Self-Evolving',    h: 'Agent 自主进化闭环',         b: 'env → trajectory → train → deploy → 数据回灌 —— Agent 自我进化的完整循环，不是概念。' },
        ],
        chaptersTitle: 'RL 算法实战 + Self-Evolving',
        chaptersCt: '复现 / 横评 / 自我进化',
        chapters: [
          { ch: 'GRPO 复现',   ti: '基于 Qwen + verl 完整复现 GRPO · 对照 W5 策略优化理论' },
          { ch: 'GSPO',         ti: 'Group Scoring Policy Optimization · 与 GRPO 的本质区别 / 何时选 GSPO' },
          { ch: 'DAPO',         ti: 'Direct Alignment from Preferences · 偏好对训练新范式' },
          { ch: '算法横评',     ti: 'DPO / GRPO / GSPO / DAPO 在同一业务场景下效果对比' },
          { ch: 'Self-Evolving', ti: 'Agent 自主进化范式 · 从训练 Agent 到让 Agent 持续适应环境' },
          { ch: '工程化',       ti: 'RL 训练任务的工程化封装 · 任务调度 / 失败重试 / 资源回收' },
        ],
        coursewareName: 'RL 算法实战课件',
        coursewareSrc: './courseware-preview/agentic-rl-ch6/index.html',
        coursewareDesc: '基于 Agentic RL 课件 CH6 + 自我进化模块 · GRPO/GSPO/DAPO 公式可视化 · Self-Evolving 范式演示。',
        tags: ['GRPO', 'GSPO', 'DAPO', 'DPO 横评', 'Self-Evolving', 'Qwen + verl'],
        output: {
          summary: '拿"GRPO 调到 GSPO / DAPO"的实战经验上面试。',
          bullets: [
            '在自己业务上复现 GRPO 并跑出训练曲线',
            '横评 4 种 RL 算法的工程取舍 —— 业务场景选型有据可依',
            '训出一个会自我进化的 Agent，能持续适应环境',
            '讲透 "GRPO 与 GSPO 的本质区别" —— 2026 最值钱的算法面经',
          ],
        },
      },

      /* ====== W8 ====== */
      {
        wk: 'W8', idx: '8 / 10', stage: '从 notebook 到线上服务', meta: '阶段四 · 工程架构基建',
        title: '工程架构基建 · 6 章打通后端',
        narr: 'W1-W7 把 Agent 写完了、把模型训完了，但这些东西此刻还在 notebook / 本地脚本里。这一周教你把整套系统真正变成线上服务 —— 这是从"算法工程师"到"全栈 AI 工程师"的关键一步。课件按"新手村 → 沼泽地 → 工厂区 → 高原 → 云端 → BOSS"6 章设计，刻意把工程化路线游戏化、可消化。',
        narrSub: '"会训模型、不会上线"是算法工程师的通病。这一周把你从脚本工变成能独立交付 AI 服务的全栈工程师。',
        highlights: [
          { n: '亮点 01', lab: '游戏化路线', h: '6 大关卡',                     b: '新手村 → 沼泽地 → 工厂区 → 高原 → 云端 → BOSS · 每关对应一个工程能力栈，最易上手的一次工程化课。' },
          { n: '亮点 02', lab: 'AI 中台合体', h: 'BOSS 关解锁',                   b: '模型推理（vLLM cluster）+ Agent Runtime + Gateway 真实合体上线。' },
          { n: '亮点 03', lab: '可观测栈',   h: 'Prometheus · Jaeger · Loki',     b: '出问题 5 分钟 能定位到具体 Agent / 具体 Skill —— 全链路可观测。' },
        ],
        chaptersTitle: '大模型架构课程 · 工程化路线 Roadmap',
        chaptersCt: '6 章 · 新手村 → BOSS · 全工程链路',
        chapters: [
          { ch: 'CH1 · 新手村', ti: '工程素养与 Web 基础 · HTTP / REST / 异步 IO / 工程项目结构' },
          { ch: 'CH2 · 沼泽地', ti: '异步与数据 · asyncio / 消息队列 / 缓存 / 数据库选型' },
          { ch: 'CH3 · 工厂区', ti: '容器化与微服务 · Docker / Docker Compose / 多阶段构建 / 服务编排' },
          { ch: 'CH4 · 高原',   ti: '高并发与高可用 · 负载均衡 / 限流 / 熔断 / 灰度发布' },
          { ch: 'CH5 · 云端',   ti: 'K8s 与可观测 · Kubernetes / 日志 / 指标 / 链路追踪' },
          { ch: 'CH6 · BOSS',   ti: 'AI 中台合体 · 把模型推理 + Agent Runtime + Gateway 真实合体上线' },
        ],
        coursewareName: '大模型架构课程 · Roadmap',
        coursewareSrc: './courseware-preview/code-structure/index.html',
        coursewareDesc: '游戏化工程进阶路线 · 6 大关卡 · 每一章对应一个工程能力栈，配套互动课件与实战代码。',
        tags: ['Docker', 'FastAPI', '异步 / 消息队列', 'K8s', '可观测性', '灰度 / 限流', 'AI 中台'],
        output: {
          summary: '这是 LLM 业务能不能上线的分水岭。',
          bullets: [
            '把 Agent 系统 + 训练好的模型打包成容器集群',
            '在 K8s 上部署 vLLM cluster + Agent Runtime + Gateway 全栈',
            '设计灰度发布 / 影子流量 / 一键回滚的工程策略',
            '搭建完整可观测性栈 —— 大厂面试官想听的"AI 中台经验"',
          ],
        },
      },

      /* ====== W9 ====== */
      {
        wk: 'W9', idx: '9 / 10', stage: '看屏幕、能操作', meta: '阶段五 · 模态扩展',
        title: '多模态 RAG + GUI Agent',
        narr: '到此为止 Agent 只会处理文本。这一周把模态边界拓到 图像、屏幕、GUI 操作。多模态 RAG 解决"信息能进来"，GUI Agent 解决"能动手做" —— 这两个能力是 2026 年 Agent 产品化最有商业价值的方向。',
        narrSub: '文本 Agent 是上半场。下半场是能看屏幕、能动手做的 GUI Agent —— 2026 年 Agent 产品化最有商业价值的方向。',
        highlights: [
          { n: '亮点 01', lab: '跨模态 Embedding', h: 'CLIP / SigLIP',        b: '文本 + 图像联合 Embedding · 多模态 chunk 切分 —— 图文混合检索的工业级实现。' },
          { n: '亮点 02', lab: '视觉 Grounding',   h: 'bbox + 语义对齐',      b: '理解屏幕截图中的 UI 元素 · bbox / coord / 语义对齐 —— 让模型真的"看见"按钮在哪。' },
          { n: '亮点 03', lab: 'GUI ReAct',         h: '看 → 思 → 动 → 反馈',  b: '看屏幕 → 理解 → 决策 → 操作 → 看反馈 —— GUI Agent 的核心循环，浏览器实战跑通。' },
        ],
        chaptersTitle: '多模态 RAG + GUI Agent',
        chaptersCt: '视觉 Grounding + Action Space',
        chapters: [
          { ch: '多模态 RAG',    ti: '图文混合检索 · 跨模态对齐（文本-图像联合 Embedding）· 多模态 Chunk 切分策略' },
          { ch: '视觉 Grounding', ti: '理解屏幕截图中的 UI 元素 · bbox / coord / 语义对齐' },
          { ch: 'Action Space',   ti: '点击 / 输入 / 滚动 / 拖拽 · GUI 操作空间定义' },
          { ch: 'GUI ReAct',      ti: '看屏幕 → 理解 → 决策 → 操作 · GUI Agent 的 ReAct 循环' },
          { ch: 'SFT 微调',       ti: '构造 GUI 操作指令数据集 · 基于 SFT 赋予模型 GUI 操作能力' },
          { ch: '浏览器实战',     ti: '完成填表 / 提取信息 / 跨页操作的端到端 GUI Agent 任务' },
        ],
        coursewareName: '多模态 + GUI Agent 课件',
        coursewareLocked: true,
        coursewareDesc: '跨模态 Embedding 实战 · Grounding bbox 演示 · GUI Agent 浏览器任务录屏 · SFT 数据构造工具链。',
        lockMeta: ['CLIP / SigLIP', '视觉 Grounding', 'GUI ReAct', 'SFT 数据工厂'],
        tags: ['CLIP / SigLIP', '跨模态 Embedding', '视觉 Grounding', 'Action Space', 'GUI ReAct', '浏览器自动化'],
        output: {
          summary: '拿"我的 Agent 会动手"的硬 demo 上面试。',
          bullets: [
            '实现一个能看屏幕、能在浏览器里完成任务的 GUI Agent',
            '构造 GUI 操作 SFT 数据集（bbox + action sequence）',
            '设计图文混合检索的工业级多模态 RAG 管线',
            '面试讲透"为什么 GUI Agent 需要 SFT、不能只靠 prompting"',
          ],
        },
      },

      /* ====== W10 ====== */
      {
        wk: 'W10', idx: '10 / 10', stage: '端到端业务落地', meta: '阶段六 · 项目落地',
        title: '企业内部智能协同助手平台',
        narr: '前 9 周积累的能力（Skill 系统 + 单 Agent 架构 + Agent 集群 + 训练好的模型 + 工程化部署 + 多模态 GUI）端到端集成成一个真实业务可用的平台。这就是你简历最末端那段"项目经历"：一个工业级、可上线、企业内部真在用的智能协同助手平台。详细架构在下一节"工业级实战项目"。',
        narrSub: '前 9 周是零件，这一周是整车。把所有积累端到端集成成一个企业内部真在用的智能平台—— 你简历压舱石的那段项目。',
        highlights: [
          { n: '亮点 01', lab: '5 渠道接入',  h: '飞书 · Web · Mobile · API · Voice', b: '一套 Gateway 统一翻译 —— 企业全场景覆盖，发个问题不管从哪个入口都走同一套 Agent。' },
          { n: '亮点 02', lab: '总控 + 4 专家', h: 'LangGraph DAG 编排',              b: 'Chief Coordinator + 知识检索 / 数据分析 / 任务执行 / 文档生成 —— 5 个 Agent 分工协作。' },
          { n: '亮点 03', lab: '私有化 + 治理', h: 'On-Prem · Skill 治理',             b: '数据不出内网 · 20+ Skill 注册中心 · Prompt Vault 版本治理 · Audit 全链路可追溯。' },
        ],
        chaptersTitle: '企业智能协同助手平台 · 整合周',
        chaptersCt: '飞书 / Web / Open API · Agent Swarm · 私有化部署',
        chapters: [
          { ch: '多渠道接入', ti: '飞书 / Web / Mobile / Open API / Voice · 一套 Gateway 统一翻译' },
          { ch: 'Agent Swarm', ti: '总控 Agent + 4 个专家 Agent · 编排 / 路由 / 状态共享' },
          { ch: 'Skill 治理',  ti: '20+ Skill 的注册中心 / 版本管理 / 权限边界' },
          { ch: 'MCP 集成',    ti: 'MCP Server + Client 标准化工具接入 · 第三方系统打通' },
          { ch: '私有化',      ti: '自托管 · 数据不出内网 · 配对鉴权 / 调用链审计' },
          { ch: '落地业务',    ti: '会议纪要 · 周报 · 风险预警 · SOP 问答 · 数据可视化分析' },
        ],
        coursewareName: '企业 Swarm 平台 · 详见下一节项目架构',
        coursewareDesc: '5 渠道 / 4 专家 Agent / 20+ Skill / 私有化部署 · 完整架构图见下方项目节',
        tags: ['企业级多 Agent 平台', '私有化部署', 'MCP 协议', 'Agent Swarm', '飞书 / Web / Open API', 'Skill 治理'],
        output: {
          summary: '这是 LLM 求职 / 转行的简历压舱石。',
          bullets: [
            '整合前 9 周能力为一个企业级 AI 平台项目',
            '跑通飞书 / Web / Open API 全渠道接入与统一消息协议',
            '部署到 K8s 提供 SaaS / On-Prem 双形态服务',
            '拿"工业级企业 AI 平台项目经历"作为简历营销主推',
          ],
        },
      },
    ],

    /* ============================================================
       PROJECT · 工业级实战项目
       ============================================================ */
    project: {
      eyebrow: { num: '04 · INDUSTRIAL CAPSTONE', end: 'W10 整合周 · 项目架构详图' },
      title: '企业内部智能协同助手平台',
      titleSwash: '智能协同助手',
      lead: '集团内部信息散在飞书群、项目文档、FAQ、运营 SOP —— 员工频繁切系统找信息、写周报、整理纪要。最后两周的目标是把整个集成成一个统一智能助手平台：多渠道接入 → Agent Swarm 协作 → 知识问答 + 流程触发 + 自动化协同。',
      meta: [
        { num: '12+',  lab: 'Service Modules',  d: '核心服务模块 · 6 大业务子系统' },
        { num: '5',    lab: 'Specialist Agents', d: '总控 + 知识 + 数据 + 任务 + 文档' },
        { num: '20+',  lab: 'Skill Library',     d: '即插即用 + MCP 协议接入' },
        { num: '5',    lab: 'Channel Adapters',  d: '飞书 · Web · Mobile · API · Voice' },
        { num: '100%', lab: 'On-Prem',           d: '私有化 · 数据不出内网' },
      ],
      archZoomBtn: '⌖ 全屏查看架构大图',
      // 注：详细 SVG 由每套样式自己渲染或留空；这里只放业务清单与特性
      features: [
        { h: '多渠道统一接入', b: '飞书 / Web / Mobile / Open API / Voice · 一套 Gateway 翻译' },
        { h: 'Agent Swarm 集群', b: '总控 Agent 编排 + 4 个专家 Agent · LangGraph DAG · 状态共享' },
        { h: 'Skill 治理',      b: '20+ Skill 注册中心 + @skill 装饰器 + 版本治理' },
        { h: 'MCP 协议',        b: 'MCP Server + Client 标准化工具接入 · 第三方系统打通' },
        { h: 'Memory 5-Lane',   b: 'session / episodic / semantic / procedural / profile · 跨会话连续' },
        { h: 'Sandbox 4 隔离',  b: 'subprocess / docker / firecracker microVM / wasm · 按 Skill 选型' },
        { h: 'Post-Train 闭环', b: '数据 / 训练 / 评测 / 部署 4 工厂打通 · Self-Evolving 回灌' },
        { h: '私有化部署',      b: '自托管 · 数据不出内网 · K8s 容器编排 · 4090/H100' },
        { h: '权限边界',        b: 'RBAC · 配对鉴权 · 调用链审计 · trace_id 可回溯' },
        { h: 'Prompt-Ops',      b: 'git-backed prompt vault · A/B canary · 一键回滚' },
        { h: '可观测性',        b: 'Prometheus · OpenTelemetry · Loki · Jaeger 全链路' },
        { h: '灰度发布',        b: '5% canary · 影子流量 · 自动回滚 · 红灯告警' },
      ],
      businessLines: {
        label: '业务落地能力清单',
        text: '会议纪要自动整理与关键决策提取 · 项目风险项跟踪与预警 · 周报 / 日报智能生成 · 常见 SOP 问答与流程引导 · 定时播报 / 提醒 / 任务触发 · 合同 / 竞品 / 季度报告等文档智能管理 · 数据查询与可视化分析 —— 全部基于上图架构跑通。',
      },
    },

    /* ============================================================
       TECH STACK · 11 层全栈
       ============================================================ */
    techStack: {
      eyebrow: { num: '05 · TECH INDEX', end: '11 层全栈 · 课件 hand-on' },
      title: '技术栈索引 · 11 层全栈',
      titleSwash: '11 层全栈',
      lead: '每一项都是真在课程里 hand-on 写过、跑过的，不是 buzzword。',
      layers: [
        { layer: 'Agent 应用层',  tech: 'Agent Skill 抽象 · SkillRegistry · ReAct 循环 · @skill 装饰器 · tool_schema',     wk: 'W1' },
        { layer: 'Agent 工程层',  tech: 'QueryLoop · Tools 协议 · Memory 多层 · Runtime · Agent Teams · SpawnParams',          wk: 'W2-W3' },
        { layer: 'Agent 集群层',  tech: 'Gateway · WebSocket · 沙箱 · 上下文窗口 · 工具协议四帧 · Harness',                       wk: 'W3' },
        { layer: 'RL 训练框架',   tech: 'verl HybridFlow · Ray · DataProto · WorkerGroup · 3D-HybridEngine · DispatchPipeline', wk: 'W4' },
        { layer: 'RL 算法',       tech: 'PPO · DPO · GRPO · GSPO · DAPO · KL · loss_mask · advantage · ratio',                  wk: 'W4-W7' },
        { layer: 'Post-Train 闭环', tech: 'SFT 冷启动 · Curriculum Learning · 数据/训练/评测三工厂 · Self-Evolving',           wk: 'W6-W7' },
        { layer: 'Agentic RL 范式', tech: 'trajectory · 三不变量 · 异步 Rollout · Verifier · Reward · Memory 5 lane',         wk: 'W5-W7' },
        { layer: '训练 Infra',    tech: 'FSDP vs TP · TokenPacking · RemovePadding · Rollout vLLM/SGLang/TRT-LLM',              wk: 'W4-W6' },
        { layer: '工程基建',      tech: 'Docker · FastAPI · 异步 · K8s · 可观测性 · 限流 · 灰度发布',                            wk: 'W8' },
        { layer: '多模态 / GUI',  tech: '图文混合检索 · 跨模态 Embedding · 视觉 Grounding · GUI ReAct · SFT 微调',                wk: 'W9' },
        { layer: '项目集成',      tech: '多渠道接入 · Agent Swarm · MCP 协议 · 私有化部署 · Skill 治理',                          wk: 'W10' },
      ],
    },

    /* ============================================================
       SUPPORT · 配套支持 7 张卡
       ============================================================ */
    support: {
      eyebrow: { num: '06 · WHAT YOU GET', end: '1v1 · 4090 · 知识星球' },
      title: '配套支持 · 不只是课件',
      titleSwash: '不只是课件',
      lead: '课程之外，还有一系列陪跑、算力、求职辅导和资源访问 —— 你买的不是 10 周视频，是一整段大模型工程师的转型陪伴。',
      cards: [
        { n: '01 · 课程交付',   h: '直播 + 录播 + 代码 + 课件',           b: '每周固定直播 · 全程录播回看 · 课程代码完整开源 · 10 套交互式课件随取随用。' },
        { n: '02 · 1V1 陪跑',   h: '学习路线 + 简历打磨 + Mock 面试',     b: '第一次：背景分析 + 路线定制 + 简历初评。第二次：终版打磨 + 大厂面试官模拟面试。' },
        { n: '03 · 算力',       h: '独享 4090 · 24G 显存',               b: '课程期间每人独享 24G 显存，跑课程代码无忧 —— 不用为算力发愁。' },
        { n: '04 · 社群',       h: '知识星球 + 闭门直播',                 b: '每日更新 AI 岗位信息 · 闭门直播 · 飞书知识库资源 · 个性化指导。' },
        { n: '05 · 答疑',       h: '3V1 答疑群 + 助教',                   b: '每个学员配 3 个答疑老师 · 微信群答疑。' },
        { n: '06 · 面试真题',   h: '真正的大厂面试真题',                  b: '2024-2026 跑通大厂的同学回流的 LLM 真题库 · 算法 + 系统设计 + 八股，全部实战来源。' },
        { n: '07 · Tech 跟踪',  h: '持续跟踪最新 Tech 更新',              b: '每周整理 arxiv / 业界 blog / 新模型动态 · 课程内容随技术演进迭代 —— 让你不被淘汰、也不再 FOMO。', wide: true },
      ],
      extra: {
        title: '额外资源 · 报名 S5 即解锁 S2 / S3 / S4 全套',
        items: [
          { t: 'S2', ti: '大模型算法系统课程 · 14 周', d: 'Transformer · 预训练 · 微调 · RAG · Agent · RLHF · 多模态 · 分布式 · 推理加速' },
          { t: 'S3', ti: '秋招急救营 · 6 周',          d: 'Function Call SFT · GRPO 微调 RM · 求职冲刺' },
          { t: 'S4', ti: 'Agent 工程工业级 · 6 周',    d: 'DeepResearch · MCP · 微服务 · 工程化落地' },
        ],
      },
    },

    /* ============================================================
       FIT · 适合 / 不适合
       ============================================================ */
    fit: {
      eyebrow: { num: '07 · WHO IS THIS FOR', end: '适合 / 不适合' },
      title: '这门课适合 / 不适合谁',
      titleSwash: '适合 / 不适合',
      yes: {
        label: '适合',
        items: [
          '简历项目深度不足、想补一段从 0-1 自己写出来的 Agent 系统经历',
          '在用 LangChain 类框架但不知道底层原理，想看世界级 Agent 是怎么造的',
          '算法基础有，但缺工程化部署能力（Docker / FastAPI / K8s）',
          '想入门 / 进阶 Agentic RL，理解 verl 这种工业级训练框架',
          '求职 / 转行 LLM 方向，需要简历级的硬项目',
          '想在 2026 年市场上拿到"算法 + 工程"双修的高薪 offer',
        ],
      },
      no: {
        label: '不适合',
        items: [
          '完全无 Python / 深度学习基础——建议先过 S2 基础',
          '不愿意花时间做 Lab 和项目——课程深度需要动手投入',
          '还想停留在 Java / Go / TS 老栈时代，没打算真正进入 LLM 赛道',
        ],
      },
    },

    /* ============================================================
       FOOTER CTA
       ============================================================ */
    footerCTA: {
      eyebrow: { num: '08 · GET STARTED' },
      title: '10 周后，你会有一份算法 + 工程双修的硬资产。',
      titleSwash: '双修',
      lead: '从 Agent 应用层一路打通到模型基座、再到工业化部署的完整能力栈，10 套从 0-1 拆解和实现的工业级 Agentic 系统课件，一段企业级业务落地项目经历。',
      teacher: {
        title: 'READY TO ENROLL · 准备报名',
        sub: '报名 / 价格 / 定制路径 等问题，联系老师即可一对一解答，附赠 1 节试听课',
        btn: '联系老师领取试听课',
      },
      meta: 'S5 · 2026 · 大模型冲刺营 · AGENT × POST-TRAIN × INDUSTRIAL DEPLOY',
    },

    /* ============================================================
       MODAL · 解锁 + 联系老师
       ============================================================ */
    modal: {
      enroll: {
        title: '报名后解锁完整课件',
        titleHighlight: '完整课件',
        body: '此课件为 S5 · 大模型冲刺营 · 2026 的配套内容。联系老师可免费领 1 节完整试听课，看完再决定要不要报名。',
        bodyHighlight: '联系老师可免费领 1 节完整试听课',
        btnClose: '我知道了',
        btnPrimary: '联系老师领取试听课 →',
      },
      teacher: {
        title: '联系老师 · 领取免费试听课',
        titleHighlight: '免费试听课',
        sub: '扫码或加微信，老师会发你完整试听课件 + 1 次学习路线诊断，回你的所有报名/课程问题。',
        subHighlight: '完整试听课件 + 1 次学习路线诊断',
        qrLabel: 'WeChat · 微信',
        qrCaption: '备注「试听」可直接领取',
        list: [
          '1 节完整试听课件 · 看完就能判断这门课合不合你',
          '1V1 路线诊断 · 老师亲自给你拍方向',
          '报名 / 价格 / 定制路径 等问题均可直接问',
        ],
        btnClose: '我知道了',
      },
    },

    /* ============================================================
       INLINE LOCK · W9 GUI Agent 锁卡（嵌入每周详解里）
       ============================================================ */
    inlineLock: {
      gui: {
        tag: '完整课件 · 报名后开放',
        title: '多模态 RAG + GUI Agent 课件',
        titleHighlight: 'GUI Agent',
        sub: '跨模态 Embedding 实战 · Grounding bbox 演示 · GUI Agent 浏览器任务录屏 · SFT 数据构造工具链。',
        meta: ['CLIP / SigLIP', '视觉 Grounding', 'GUI ReAct', 'SFT 数据工厂'],
        cta: '报名解锁完整章节',
      },
    },
  };

  // 关键短语清单 · 供 content-check.js 自动校验各样式渲染后是否包含
  root.S5_CONTENT_CRITICAL_PHRASES = [
    'Agentic 系统工程',
    '与 Post-Train 落地',
    '是不是卡在',
    '直播 + 录播 + 代码 + 课件',
    '3V1 答疑',
    '联系老师领取试听课',
    '面试 Self-Check',
    '10 周后，你会有一份',
    '一键训练脚本',
    '面试官一看就是 toy',
    'verl · HybridFlow',
    'Agentic RL · 架构与三不变量',
    '企业内部智能协同助手平台',
  ];

  /* CommonJS 兼容（content-check.js 在 Node 里 require 时用） */
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = root.S5_CONTENT;
    module.exports.CRITICAL_PHRASES = root.S5_CONTENT_CRITICAL_PHRASES;
  }
})();
