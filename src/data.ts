export interface Project {
  id: string;
  titleEN: string;
  titleZH: string;
  categoryEN: string;
  categoryZH: string;
  descEN: string;
  descZH: string;
  year: string;
  tagsEN: string[];
  tagsZH: string[];
  color: string;
  accentColor: string;
}

export interface SectionContent {
  titleEN: string;
  titleZH: string;
  subtitleEN: string;
  subtitleZH: string;
  cyanTextEN: string;
  cyanTextZH: string;
  projects?: Project[];
}

export const SECTIONS: Record<string, SectionContent> = {
  ai_concept: {
    titleEN: "AI CONCEPT",
    titleZH: "AI 视觉概念",
    subtitleEN: "Intelligent Cockpit & Generative AI",
    subtitleZH: "智能座舱与 AIGC 创意探索",
    cyanTextEN: "Here is a compilation of AI generative interfaces and concept arts I created for XPeng's smart mobility. It includes automated screen layouts, dynamic dashboard ideas, and thematic AIGC imagery.",
    cyanTextZH: "这里收录的是我利用 AIGC 技术为小鹏未来出行设计的概念大屏与智能座舱主视觉。我们利用扩散模型与自定义控制，重构了车载多媒体系统的视觉调性与交互层级。"
  },
  dynamic_reels: {
    titleEN: "DYNAMIC REELS",
    titleZH: "动态创意短片",
    subtitleEN: "Motion Graphics & Cinematic Transitions",
    subtitleZH: "动态特效与车载动效转场",
    cyanTextEN: "A selection of daily motion design projects at XPeng, including model launch screen assets, key visual teaser animations, and smooth transitions for intelligent cockpit systems.",
    cyanTextZH: "用流畅动效赋予静态界面生命力。这里展示了我在小鹏设计的车型发布会背景动效、社媒预热动效、以及中控屏幕的 3D 卡片切换和流畅的手势过渡动效。"
  },
  production_work: {
    titleEN: "PRODUCTION WORK",
    titleZH: "量产视觉项目",
    subtitleEN: "Key Visuals, Banners & Campaign Materials",
    subtitleZH: "主视觉 BANNER、延展海报及创意设计",
    cyanTextEN: "This compiles selected projects from my three years at university, covering creative design, layout design, and experience design.",
    cyanTextZH: "这里收录的是我大学三年以来精选的项目，包括创意设计、编排设计，体验设计等。",
    projects: [
      {
        id: "kv-g9",
        titleEN: "XPENG G9 Launch Banner",
        titleZH: "小鹏 G9 发布会主视觉 Banner",
        categoryEN: "Key Visual / Material Ext.",
        categoryZH: "主视觉 / 物料延展",
        descEN: "Crafted the core visual layout for XPENG G9 premium SUV launch campaign, deployed across 120+ retail store digital displays and web banners.",
        descZH: "为小鹏 G9 高端 SUV 发布活动定制核心视觉，广泛应用于全国 120 余家门店大屏、官方网站及各大主流媒体宣传位。",
        year: "2024",
        tagsEN: ["Layout", "Key Visual", "SUV"],
        tagsZH: ["排版设计", "主视觉", "SUV 车型"],
        color: "from-pink-500 to-rose-600",
        accentColor: "#ff3366"
      },
      {
        id: "cockpit-ui",
        titleEN: "Smart Cockpit UI Theme Pack",
        titleZH: "智能座舱 UI 锁屏与系统主题包",
        categoryEN: "System Design",
        categoryZH: "系统设计 / 视觉延展",
        descEN: "Designed high-contrast, cyberpunk-themed vehicle dashboard layouts and screen graphics for the standard OTA update.",
        descZH: "为小鹏最新的 OTA 系统更新设计高对比度、赛博朋克风格的仪表盘与智能中控锁屏壁纸，优化日常夜间行车的视觉聚焦度。",
        year: "2025",
        tagsEN: ["HMI", "Theme Design", "OTA"],
        tagsZH: ["车载交互", "主题设计", "OTA 升级"],
        color: "from-purple-600 to-indigo-700",
        accentColor: "#8b5cf6"
      },
      {
        id: "ai-contest",
        titleEN: "XPENG AI Generative Cup Winner",
        titleZH: "小鹏 AI 创意生成大赛获奖作品",
        categoryEN: "Generative Art",
        categoryZH: "生成式艺术 / AIGC",
        descEN: "Award-winning design using customized LoRA to synthesize concept designs blending electric vehicles with traditional oriental line art.",
        descZH: "荣获小鹏 AI 创意视觉金奖。通过训练自定义 LoRA 模型，将科技感爆棚的纯电车型与国风线条艺术进行跨界融合，实现极具张力的主kv设计。",
        year: "2023",
        tagsEN: ["AIGC", "LoRA", "Winner"],
        tagsZH: ["生成式 AI", "LoRA 训练", "金奖作品"],
        color: "from-teal-400 to-emerald-500",
        accentColor: "#06b6d4"
      }
    ]
  },
  contact: {
    titleEN: "CONTACT",
    titleZH: "联系我",
    subtitleEN: "Let's Collaborate",
    subtitleZH: "探索智能座舱与视觉创意的无限可能",
    cyanTextEN: "Ready to co-create the future? Let's connect and discuss design, generative AI, and intelligent cockpit innovations. Drop a message or find me on socials.",
    cyanTextZH: "随时与我取得联系，共同探讨设计、AI 与未来智能座舱出行的无限可能。欢迎填写留言或通过以下联系方式与我交流。"
  }
};

export const NAVIGATION = [
  { id: "ai_concept", labelEN: "AI CONCEPT", labelZH: "AI 视觉概念" },
  { id: "dynamic_reels", labelEN: "DYNAMIC REELS", labelZH: "动态创意短片" },
  { id: "production_work", labelEN: "PRODUCTION WORK", labelZH: "量产视觉项目" },
  { id: "contact", labelEN: "CONTACT", labelZH: "联系我" }
];
