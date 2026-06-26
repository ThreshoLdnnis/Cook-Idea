import type { GraphRelation, HeatOption, Ingredient, IngredientCategory, IngredientGroup } from '../types';

export const heatOptions: HeatOption[] = [
  { id: 'low', label: '小火', heat: '🔥', description: '保守、现实、容易执行', detail: '优先选刚需切口和最小成本 MVP。', intensity: 0.8 },
  { id: 'medium', label: '中火', heat: '🔥🔥', description: '平衡创新与可执行性', detail: '把 AI 工作流加入熟悉场景。', intensity: 1 },
  { id: 'high', label: '大火', heat: '🔥🔥🔥', description: '更大胆，跨领域组合', detail: '适合做有记忆点的差异化产品。', intensity: 1.25 },
  { id: 'hell', label: '地狱火', heat: '🔥🔥🔥🔥', description: '实验性、反直觉、突破常规', detail: '概念更激进，但需要更小步验证。', intensity: 1.55 },
];

type Seed = {
  name: string;
  emoji: string;
  subCategory: string;
  aliases?: string[];
  description?: string;
};

type CategoryConfig = {
  id: IngredientCategory;
  title: string;
  subtitle: string;
  color: string;
  baseColor: string;
  seeds: Seed[];
};

const make = (name: string, emoji: string, subCategory: string, aliases: string[] = [], description?: string): Seed => ({
  name,
  emoji,
  subCategory,
  aliases,
  description,
});

const categoryConfigs: CategoryConfig[] = [
  {
    id: 'asset',
    title: '🥬 Assets 已有资源',
    subtitle: '身份、资源、作品、设备与可复用优势',
    color: 'bg-emerald-100 text-emerald-950 border-emerald-200',
    baseColor: '#22C55E',
    seeds: [
      make('UI设计作品集', '🎨', '作品'), make('开源项目', '🌱', '作品'), make('个人博客', '📝', '内容资源'), make('Newsletter 订阅者', '📬', '内容资源'), make('B站账号', '📺', '内容资源'), make('小红书账号', '📕', '内容资源'), make('YouTube 频道', '▶️', '内容资源'), make('播客栏目', '🎙️', '内容资源'), make('摄影设备', '📷', '设备'), make('MacBook', '💻', '设备'), make('iPad', '📱', '设备'), make('相机镜头', '🔭', '设备'), make('3D 打印机', '🖨️', '设备'), make('服务器资源', '🖥️', '数据资源'), make('行业数据集', '🗃️', '数据资源'), make('用户访谈记录', '🗂️', '数据资源'), make('私域社群', '👥', '社群资源'), make('校园社群', '🏫', '社群资源'), make('开发者社区', '🧑‍💻', '社群资源'), make('设计师朋友', '🖌️', '人脉'), make('程序员朋友', '👨‍💻', '人脉'), make('创业者人脉', '🚀', '人脉'), make('投资人关系', '🤝', '人脉'), make('高校资源', '🎓', '身份'), make('学生身份', '🪪', '身份'), make('教师身份', '👩‍🏫', '身份'), make('医生身份', '🩺', '身份'), make('律师身份', '⚖️', '身份'), make('跨境经验', '🌍', '行业经验'), make('教育行业经验', '📚', '行业经验'), make('电商行业经验', '🛒', '行业经验'), make('SaaS 行业经验', '☁️', '行业经验'), make('金融行业经验', '💹', '行业经验'), make('医疗行业经验', '🏥', '行业经验'), make('游戏行业经验', '🎮', '行业经验'), make('AI 项目经验', '🤖', '经验'), make('增长实验经验', '📈', '经验'), make('销售经验', '💬', '经验'), make('课程制作经验', '🧑‍🏫', '经验'), make('线下活动经验', '🎪', '经验'), make('英文证书', '🗣️', '证书'), make('教师资格证', '📜', '证书'), make('CPA', '🧾', '证书'), make('法律职业资格', '⚖️', '证书'), make('心理咨询证书', '🧠', '证书'), make('计算机专业', '💾', '专业'), make('设计专业', '🎨', '专业'), make('商科背景', '📊', '专业'), make('心理学背景', '🧠', '专业'), make('教育背景', '🏫', '专业'), make('工程背景', '🏗️', '专业'), make('医学背景', '🧬', '专业'), make('可投入资金 500 元', '🪙', '资金'), make('可投入资金 5000 元', '💵', '资金'), make('可投入资金 5 万元', '💰', '资金'), make('两人小团队', '👬', '团队'), make('设计开发搭档', '🤜', '团队'), make('内容团队', '✍️', '团队'), make('销售团队', '📞', '团队'), make('个人 IP', '⭐', 'IP'), make('行业专家 IP', '🏅', 'IP'), make('校园 KOL', '📣', 'IP'), make('真实客户案例', '🧪', '案例'), make('可复用模板', '📋', '模板'), make('课程大纲', '🗒️', '内容资源'), make('Prompt 库', '✨', '内容资源'), make('设计素材库', '🧰', '软件资源'), make('付费软件订阅', '🔐', '软件资源'), make('Notion 工作区', '📓', '软件资源'), make('CRM 数据', '📇', '数据资源'), make('邮箱列表', '📨', '增长资源'), make('线下渠道', '🏬', '渠道'), make('海外账号', '🌐', '渠道'), make('App Store 账号', '📲', '渠道'), make('GitHub 组织', '🐙', '渠道'), make('公司内部场景', '🏢', '场景资源'), make('客户支持记录', '🎧', '数据资源'), make('竞品研究文档', '🔍', '知识资源'), make('品牌 Logo', '🔶', '品牌资源'), make('域名', '🌐', '基础设施'), make('支付账户', '💳', '基础设施'), make('海外银行卡', '🏦', '基础设施'),
    ],
  },
  {
    id: 'skill',
    title: '🧠 Skills 技能',
    subtitle: '更细粒度的能力节点',
    color: 'bg-cyan-100 text-cyan-950 border-cyan-200',
    baseColor: '#06B6D4',
    seeds: [
      'Programming,React,Vue,Next.js,TypeScript,JavaScript,Python,Java,Rust,C++,Go,Node.js,Django,FastAPI,SQL,PostgreSQL,Data Analysis,Machine Learning,Deep Learning,NLP,Computer Vision,Prompt Engineering,RAG,AI Agent,Workflow Automation,API Design,Cloud Deployment,DevOps,Docker,Kubernetes,Testing,Security,UI Design,UX Research,Product Design,Motion Design,Figma,Framer,Blender,Unity,Unreal Engine,3D Modeling,Video Editing,After Effects,Premiere,CapCut,Photography,Lighting,Sound Design,Copywriting,SEO,Content Strategy,Newsletter Writing,Storytelling,Branding,Logo Design,Presentation Design,Public Speaking,Teaching,Coaching,Sales,Negotiation,Cold Email,Customer Interview,User Research,Market Research,Growth Hacking,Community Operations,Project Management,Agile,Accounting,Finance,Valuation,Legal Research,Contract Drafting,Compliance,HR Recruiting,Operations,Customer Success,Data Visualization,Excel,Google Sheets,No-code,Low-code,Airtable,Notion,Webflow,Shopify,WordPress,Localization,English Writing,Japanese,Spanish,Voice Acting,Podcast Production,Live Streaming,Game Design,Level Design,AR Design,IoT Prototyping,Hardware Hacking'
        .split(',')
        .map((name) => make(name, skillEmoji(name), skillSubCategory(name), [name.toLowerCase()])),
    ].flat(),
  },
  {
    id: 'audience',
    title: '👥 Audience 目标用户',
    subtitle: '足够细的使用者与购买者画像',
    color: 'bg-blue-100 text-blue-950 border-blue-200',
    baseColor: '#3B82F6',
    seeds: [
      '大学生,高中生,初中生,小学生,考研党,留学生,博士生,职场新人,转行人群,求职者,实习生,教师,培训老师,医生,护士,药师,律师,会计师,咨询顾问,设计师,产品经理,程序员,数据分析师,AI 工程师,运营,市场经理,销售,HR,招聘经理,客服团队,创业者,独立开发者,自由职业者,内容创作者,摄影师,视频博主,播客主,作家,翻译,企业老板,中小企业主,门店老板,餐饮老板,健身教练,心理咨询师,家长,新手父母,儿童,老人,宠物主人,养猫人群,跨境卖家,Shopify 商家,Amazon 卖家,TikTok Shop 卖家,SaaS 公司,B2B 销售团队,初创公司,远程团队,政府机构,NGO,高校实验室,研究团队,开源维护者,游戏玩家,桌游玩家,露营爱好者,旅行者,数字游民,海外用户,英语学习者,播音主持考生,公务员考生,考证人群,理财新手,保险代理人,房产经纪人,设计工作室,法律团队,医疗机构,学校管理者,社区运营者,私域商家'
        .split(',')
        .map((name) => make(name, audienceEmoji(name), audienceSubCategory(name), [name.toLowerCase()])),
    ].flat(),
  },
  {
    id: 'pain',
    title: '💥 Pain Points 痛点',
    subtitle: '问题越具体，菜谱越容易落地',
    color: 'bg-red-100 text-red-950 border-red-200',
    baseColor: '#EF4444',
    seeds: [
      '学习效率低,不会做计划,拖延,没有方向,时间不够,注意力分散,信息过载,知识碎片化,英语差,不会写论文,论文选题困难,不会做 PPT,不会设计 Logo,不会写简历,找工作困难,面试没底,作品集薄弱,缺少项目经验,不会营销,不会获客,获客成本高,广告成本高,产品没人买,不会变现,不知道定价,客户流失,用户留存差,转化率低,不会融资,不知道验证市场,不知道做 MVP,没有技术,缺少设计能力,没有团队,团队沟通困难,招聘困难,需求总变,项目延期,预算不足,现金流紧张,不会写文案,内容没流量,账号涨粉慢,选题枯竭,不会拍视频,剪辑太慢,客户支持压力大,重复工作太多,数据看不懂,报表太乱,会议太多,邮件太多,不会自动化,工具太分散,文档没人看,知识沉淀差,跨部门协作难,远程协作低效,销售跟进混乱,CRM 不好用,线索质量差,合同审核慢,合规风险高,隐私风险,用户不信任,冷启动困难,社区不活跃,付费意愿低,竞品太多,差异化不明显,技术债高,上线太慢,缺少测试,服务器成本高,移动端体验差,国际化困难,支付接入麻烦,客服回复慢,退货率高,库存管理乱,跨境物流复杂,语言本地化差,不会做 SEO,关键词难选,不会做投放,不会做数据分析,不知道用户是谁,访谈不会问,反馈太散,优先级混乱,没有复盘,学习坚持不了,情绪焦虑,职业倦怠,副业没时间,不能露脸,没有客户案例,品牌不专业,不会建立信任'
        .split(',')
        .map((name) => make(name, painEmoji(name), painSubCategory(name), [name.toLowerCase()])),
    ].flat(),
  },
  {
    id: 'goal',
    title: '🎯 Goals 目标',
    subtitle: '用户真正想抵达的地方',
    color: 'bg-violet-100 text-violet-950 border-violet-200',
    baseColor: '#8B5CF6',
    seeds: [
      '副业赚钱,月入1000,月入10000,月入10万,做 SaaS,AI 创业,创业,留学,考研,找工作,转行,升职,减轻工作,提高效率,建立个人品牌,打造 IP,财富自由,Remote 工作,数字游民,建立社区,做课程,做 Newsletter,做 YouTube,做 TikTok,做小红书,做公众号,做开源项目,做 Chrome Extension,做 AI Agent,做 App,做模板市场,验证 MVP,找到第一批用户,获得付费用户,降低获客成本,提升留存,提升转化,出海,进入海外市场,建立 B2B 产品,做企业服务,做教育产品,做医疗产品,做法律产品,做金融工具,自动化工作流,建立知识库,沉淀方法论,发布作品集,拿到融资,进入 Product Hunt,获得媒体曝光,建立用户访谈机制,完成毕业设计,完成论文选题,做 Hackathon 项目,做校园比赛项目,建立私域,做社群,做咨询业务,做数据产品,做低代码工具,做游戏化学习,做个人 OS,做效率工具,做内容矩阵'
        .split(',')
        .map((name) => make(name, goalEmoji(name), goalSubCategory(name), [name.toLowerCase()])),
    ].flat(),
  },
  {
    id: 'constraint',
    title: '🚧 Constraints 限制',
    subtitle: '限制会逼出更聪明的方案',
    color: 'bg-amber-100 text-amber-950 border-amber-200',
    baseColor: '#F59E0B',
    seeds: [
      '没钱,预算500元,预算1000元,预算5000元,没有团队,没有技术,没有设计能力,只有周末,每天1小时,每周10小时,必须线上,不能露脸,英语不好,没有经验,没有客户,不能辞职,不能融资,不能写代码,不能做重运营,不能做线下,不能用国外服务,必须合规,必须低成本,必须一个月上线,必须一周验证,必须移动端,必须桌面端,必须支持中文,必须支持英文,不能收集隐私数据,没有品牌,没有域名,没有支付账户,没有内容基础,没有渠道,没有用户访谈,没有真实案例,没有供应链,没有设计素材,没有开发服务器,不会部署,时间不稳定,精力有限,团队兼职,需要远程协作,只能用 no-code,只能用免费工具,不能做复杂 AI,不能训练模型,不能买广告,不能依赖平台流量,不能接触敏感行业,客户预算低,销售周期长,决策链复杂,竞争激烈,获客渠道少,需求不确定,数据样本少,硬件成本高,审核周期长'
        .split(',')
        .map((name) => make(name, constraintEmoji(name), constraintSubCategory(name), [name.toLowerCase()])),
    ].flat(),
  },
  {
    id: 'scenario',
    title: '🌍 Scenarios 场景',
    subtitle: '真实语境让创意更像产品',
    color: 'bg-fuchsia-100 text-fuchsia-950 border-fuchsia-200',
    baseColor: '#D946EF',
    seeds: [
      '毕业设计,创业项目,论文选题,课程设计,Hackathon,校园比赛,公司项目,副业项目,AI Agent,Chrome Extension,SaaS 产品,移动 App,公众号,B站,小红书,TikTok,YouTube,Newsletter,播客,直播间,跨境电商,Shopify 店铺,Amazon 店铺,知识付费,线上课程,训练营,社群运营,企业内训,客户支持,销售跟进,招聘流程,员工培训,会议记录,个人知识管理,学习计划,考试备考,求职作品集,设计评审,产品需求评审,用户访谈,市场验证,Landing Page,Product Hunt 发布,App Store 发布,GitHub 开源,Reddit 增长,LinkedIn 增长,SEO 内容站,模板商店,Notion 模板,数据看板,自动报表,合同审核,法律咨询,医疗问诊前准备,健身计划,亲子教育,宠物护理,旅行规划,露营攻略,本地生活,餐饮门店,线下活动,展会获客,远程团队协作'
        .split(',')
        .map((name) => make(name, scenarioEmoji(name), scenarioSubCategory(name), [name.toLowerCase()])),
    ].flat(),
  },
  {
    id: 'technology',
    title: '⚙ Technology 技术',
    subtitle: '从模型到基础设施的实现路径',
    color: 'bg-slate-100 text-slate-950 border-slate-200',
    baseColor: '#64748B',
    seeds: [
      'LLM,OpenAI,Claude,Gemini,DeepSeek,Llama,RAG,Vector Database,Embedding,Function Calling,AI Agent,Multi Agent,LangChain,LlamaIndex,Whisper,TTS,Computer Vision,OCR,Supabase,Firebase,PostgreSQL,Redis,Prisma,Drizzle,n8n,Zapier,Make,Stripe,Lemon Squeezy,Vercel,Netlify,Cloudflare,Cloudflare Workers,Cursor,GitHub Actions,Docker,Next.js,React,React Native,Flutter,Electron,Tauri,Chrome Extension,Edge Extension,WebSocket,WebRTC,GraphQL,REST API,Tailwind CSS,Framer Motion,Three.js,React Three Fiber,Drei,GSAP,WebGPU,Unity,Unreal Engine,Blender,Figma Plugin,Notion API,Google Sheets API,Slack API,Discord Bot,Telegram Bot,Shopify API,WordPress API,Auth0,Clerk,NextAuth,Sentry,PostHog,Amplitude,Segment,Resend,SendGrid,Algolia,Meilisearch,Elasticsearch,BigQuery,Snowflake,Airbyte,Metabase,Retool,Appsmith,Expo,PWA'
        .split(',')
        .map((name) => make(name, techEmoji(name), techSubCategory(name), [name.toLowerCase()])),
    ].flat(),
  },
  {
    id: 'business',
    title: '💰 Business Model 商业模式',
    subtitle: '把好点子变成能收费的结构',
    color: 'bg-lime-100 text-lime-950 border-lime-200',
    baseColor: '#84CC16',
    seeds: [
      'Subscription,Marketplace,Freemium,Affiliate,Ads,API,Consulting,License,Commission,Enterprise,Course,Community,Donation,Open Source,Sponsorship,Usage Based,Paid Template,One-time Purchase,Transaction Fee,Lead Generation,Data Product,Certification,Training Camp,Membership,Agency,White Label,Plugin Store,App Store Sale,Hardware Bundle,Service Retainer,Premium Support,Seat Based Pricing,Team Plan,Creator Economy,Revenue Share,Micro SaaS,Paywall,Newsletter Sponsorship,Job Board,Directory Listing,Procurement Contract'
        .split(',')
        .map((name) => make(name, businessEmoji(name), businessSubCategory(name), [name.toLowerCase()])),
    ].flat(),
  },
  {
    id: 'growth',
    title: '📈 Growth 增长',
    subtitle: '找到第一批用户与可复制渠道',
    color: 'bg-pink-100 text-pink-950 border-pink-200',
    baseColor: '#EC4899',
    seeds: [
      'SEO,Content Marketing,Referral,Community,Cold Email,Reddit,TikTok,YouTube,Product Hunt,App Store,GitHub,X(Twitter),LinkedIn,Newsletter,Podcast,Webinar,Influencer Marketing,Campus Ambassador,Affiliate Program,Partnership,Co-marketing,Open Source Growth,Template SEO,Programmatic SEO,Landing Page A/B Test,Waitlist,Invite Code,Viral Loop,User Generated Content,Case Study,Customer Story,Founder-led Sales,Sales Demo,Outbound SDR,PLG,Free Tool,Calculator,Chrome Store,Slack Community,Discord Community,Facebook Group,小红书种草,B站教程,公众号文章,知乎回答,微信群裂变,线下 Meetup,Hackathon Sponsorship,Directory Submission,AppSumo,Indie Hackers,Betalist,Launch Week,Email Drip,Retargeting,PR Outreach'
        .split(',')
        .map((name) => make(name, growthEmoji(name), growthSubCategory(name), [name.toLowerCase()])),
    ].flat(),
  },
  {
    id: 'catalyst',
    title: '🧂 Catalysts 调料',
    subtitle: '让食材发生反应的产品机制',
    color: 'bg-orange-100 text-orange-950 border-orange-200',
    baseColor: '#F97316',
    seeds: [
      'Low-code,No-code,AI Agent,Automation,Subscription,Community,Marketplace,Gamification,Template,Chrome Extension,B2B,校园推广,API,Micro SaaS,Personal OS,Workflow,Dashboard,Wizard,Checklist,Challenge,Leaderboard,Prompt Pack,Data Enrichment,Recommendation Engine,Knowledge Graph,Smart Search,Personalization,Collaboration,Voice Interface,Mobile First,Offline Mode,Browser Plugin,Slack Bot,Discord Bot,Notion Template,Open Source,Creator Tool,Enterprise Workflow,Privacy First,Local First'
        .split(',')
        .map((name) => make(name, catalystEmoji(name), catalystSubCategory(name), [name.toLowerCase()])),
    ].flat(),
  },
];

const importantNames = new Set([
  'Python', 'React', 'AI Agent', 'Automation', 'SaaS 产品', 'Subscription', '大学生', '创业者', '学习效率低', '不会营销',
  '缺少技术能力', 'No-code', 'Low-code', 'Chrome Extension', 'Product Hunt', 'SEO', 'Content Marketing', 'OpenAI', 'RAG',
]);

export const allIngredients: Ingredient[] = categoryConfigs.flatMap((config) =>
  config.seeds.map((seed, index) => {
    const id = `${config.id}-${slugify(seed.name)}-${index}`;
    const popularity = clamp(45 + (index % 50) + (importantNames.has(seed.name) ? 28 : 0));
    const innovationWeight = clamp(42 + ((index * 7) % 55) + (['technology', 'catalyst', 'skill'].includes(config.id) ? 8 : 0));
    const businessWeight = clamp(38 + ((index * 11) % 58) + (['business', 'growth', 'audience', 'pain'].includes(config.id) ? 9 : 0));
    return {
      id,
      name: seed.name,
      emoji: seed.emoji,
      category: config.id,
      subCategory: seed.subCategory,
      difficulty: 1 + (index % 5),
      popularity,
      innovationWeight,
      businessWeight,
      color: config.baseColor,
      description: seed.description ?? describeIngredient(seed.name, config.id, seed.subCategory),
      relatedTags: [],
      recommendedWith: [],
      conflictsWith: [],
      icon: slugify(seed.name),
      aliases: [seed.name.toLowerCase(), seed.name.replace(/\s+/g, ''), ...(seed.aliases ?? [])],
      searchable: true,
    } satisfies Ingredient;
  }),
);

export const personalFridgeGroups: IngredientGroup[] = [
  {
    id: 'asset',
    title: '我的技能',
    subtitle: '可以立刻调用的能力',
    color: 'bg-emerald-100 text-emerald-950 border-emerald-200',
    items: ['UI设计作品集', 'English Writing', '独立开发', '个人博客'].map((name) => ingredientByName(name)).filter(Boolean) as Ingredient[],
  },
  {
    id: 'goal',
    title: '我的目标',
    subtitle: '这锅菜想端给谁',
    color: 'bg-violet-100 text-violet-950 border-violet-200',
    items: ['做 SaaS', 'AI 创业', '出海', '副业赚钱'].map((name) => ingredientByName(name)).filter(Boolean) as Ingredient[],
  },
  {
    id: 'constraint',
    title: '我的限制',
    subtitle: '现实约束也是风味来源',
    color: 'bg-amber-100 text-amber-950 border-amber-200',
    items: ['每周10小时', '预算1000元', '独立开发', '不能露脸'].map((name) => ingredientByName(name)).filter(Boolean) as Ingredient[],
  },
];

export const graphRelations: GraphRelation[] = [
  ...path(['Python', 'Automation', 'AI Agent', 'SaaS 产品', 'Subscription', '创业项目'], '经典 AI 自动化创业路径'),
  ...path(['UI设计作品集', 'Figma', 'Product Design', 'Template', 'Marketplace', 'Paid Template'], '设计资产变现路径'),
  ...path(['大学生', '学习效率低', 'AI Agent', 'Personal OS', 'Subscription', '校园推广'], '学生成长产品路径'),
  ...path(['不会营销', '创业者', 'Content Marketing', 'Automation', 'Newsletter', 'Freemium'], '创业者增长路径'),
  ...path(['缺少项目经验', '求职者', '作品集薄弱', 'Chrome Extension', 'Product Hunt', 'Freemium'], '求职作品集工具路径'),
  ...path(['没钱', 'No-code', 'Landing Page', 'Waitlist', 'Micro SaaS', 'Usage Based'], '低成本验证路径'),
  ...path(['信息过载', 'Smart Search', 'Knowledge Graph', 'RAG', 'Team Plan', 'Enterprise'], '知识管理产品路径'),
  ...path(['跨境卖家', 'Shopify API', 'Data Enrichment', 'Cold Email', 'Commission'], '跨境增长工具路径'),
  relation('预算1000元', '企业内训', 12, 'conflict', '预算限制与企业级交付不匹配'),
  relation('不能露脸', 'Live Streaming', 24, 'conflict', '匿名限制会削弱直播型增长'),
  relation('不能写代码', 'Rust', 25, 'conflict', '技能门槛与限制冲突'),
];

export const ingredientGraph: Record<string, Ingredient> = Object.fromEntries(
  allIngredients.map((ingredient) => {
    const related = graphRelations.filter((edge) => edge.from === ingredient.name || edge.to === ingredient.name);
    return [
      ingredient.id,
      {
        ...ingredient,
        relatedTags: related.map((edge) => (edge.from === ingredient.name ? edge.to : edge.from)),
        recommendedWith: related.filter((edge) => edge.type !== 'conflict').map((edge) => (edge.from === ingredient.name ? edge.to : edge.from)),
        conflictsWith: related.filter((edge) => edge.type === 'conflict').map((edge) => (edge.from === ingredient.name ? edge.to : edge.from)),
      },
    ];
  }),
);

export const ingredientGroups: IngredientGroup[] = categoryConfigs.map((config) => ({
  id: config.id,
  title: config.title,
  subtitle: config.subtitle,
  color: config.color,
  items: allIngredients.filter((ingredient) => ingredient.category === config.id),
}));

export const catalystIngredients = ingredientGroups.find((group) => group.id === 'catalyst')?.items ?? [];

export function ingredientByName(name: string) {
  return allIngredients.find((ingredient) => ingredient.name === name);
}

export function getPopularIngredients(limit = 36, category?: IngredientCategory) {
  return [...allIngredients]
    .filter((ingredient) => !category || ingredient.category === category)
    .sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0))
    .slice(0, limit);
}

export function searchIngredients(query: string, category?: IngredientCategory, limit = 80) {
  const normalized = normalize(query);
  return allIngredients
    .filter((ingredient) => !category || ingredient.category === category)
    .filter((ingredient) => {
      if (!normalized) return true;
      const haystack = [ingredient.name, ingredient.subCategory, ingredient.description, ...(ingredient.aliases ?? [])].join(' ');
      return normalize(haystack).includes(normalized);
    })
    .sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0))
    .slice(0, limit);
}

export function getRecommendedIngredients(selected: Ingredient[], limit = 18) {
  const selectedNames = new Set(selected.map((item) => item.name));
  const graphNames = new Set<string>();
  selected.forEach((item) => {
    graphRelations
      .filter((edge) => edge.type !== 'conflict' && (edge.from === item.name || edge.to === item.name))
      .forEach((edge) => graphNames.add(edge.from === item.name ? edge.to : edge.from));
  });

  return allIngredients
    .filter((ingredient) => !selectedNames.has(ingredient.name))
    .map((ingredient) => ({
      ingredient,
      score:
        (graphNames.has(ingredient.name) ? 100 : 0) +
        (ingredient.popularity ?? 0) * 0.4 +
        (ingredient.innovationWeight ?? 0) * 0.25 +
        (ingredient.businessWeight ?? 0) * 0.2,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.ingredient);
}

function path(names: string[], reason: string) {
  return names.slice(0, -1).map((name, index) => relation(name, names[index + 1], 80 - index * 6, 'path', reason));
}

function relation(from: string, to: string, weight: number, type: GraphRelation['type'], reason: string): GraphRelation {
  return { from, to, weight, type, reason };
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
    .replace(/^-|-$/g, '');
}

function normalize(value = '') {
  return value.toLowerCase().replace(/\s+/g, '');
}

function clamp(value: number) {
  return Math.max(1, Math.min(100, Math.round(value)));
}

function describeIngredient(name: string, category: IngredientCategory, subCategory: string) {
  return `${name} 是 CookIdea Ingredient Graph 中的 ${subCategory} 节点，可用于 ${category} 维度的创意组合、推荐和可行性判断。`;
}

function skillEmoji(name: string) { if (name.includes('Python')) return '🐍'; if (name.includes('React')) return '⚛️'; if (name.includes('AI')) return '✨'; if (name.includes('Design') || name.includes('Figma')) return '🎨'; if (name.includes('Sales')) return '💬'; return '🧠'; }
function skillSubCategory(name: string) { if (/React|Vue|Java|Rust|C\\+\\+|Go|Node|Python|TypeScript|JavaScript/.test(name)) return 'Programming'; if (/AI|Machine|RAG|Prompt|NLP|Vision/.test(name)) return 'AI'; if (/Design|Figma|UX|UI|Motion|Blender|Unity|Video|Photo/.test(name)) return 'Creative'; if (/Sales|SEO|Copy|Growth|Market|Community/.test(name)) return 'Growth'; return 'Professional'; }
function audienceEmoji(name: string) { if (name.includes('学生')) return '🎓'; if (name.includes('医生')) return '🩺'; if (name.includes('创业')) return '🚀'; if (name.includes('商家') || name.includes('老板')) return '🏪'; if (name.includes('开发')) return '🧑‍💻'; return '👥'; }
function audienceSubCategory(name: string) { if (/学生|考研|博士|留学/.test(name)) return 'Education'; if (/医生|护士|律师|会计/.test(name)) return 'Professional'; if (/商家|卖家|老板|公司/.test(name)) return 'Business'; if (/创作者|博主|作家/.test(name)) return 'Creator'; return 'General'; }
function painEmoji(name: string) { if (name.includes('钱') || name.includes('成本')) return '💸'; if (name.includes('时间')) return '⏳'; if (name.includes('营销') || name.includes('获客')) return '📉'; if (name.includes('技术')) return '🧩'; return '💥'; }
function painSubCategory(name: string) { if (/学习|论文|英语|考试/.test(name)) return 'Learning'; if (/营销|获客|流量|转化|留存/.test(name)) return 'Growth'; if (/技术|设计|上线|服务器/.test(name)) return 'Product'; if (/团队|沟通|招聘|会议/.test(name)) return 'Operations'; return 'Business'; }
function goalEmoji(name: string) { if (name.includes('钱') || name.includes('月入')) return '💰'; if (name.includes('AI')) return '🤖'; if (name.includes('SaaS')) return '☁️'; if (name.includes('品牌') || name.includes('IP')) return '⭐'; return '🎯'; }
function goalSubCategory(name: string) { if (/赚钱|月入|财富/.test(name)) return 'Income'; if (/SaaS|AI|产品|App|Extension/.test(name)) return 'Product'; if (/品牌|IP|社区|内容/.test(name)) return 'Brand'; return 'Career'; }
function constraintEmoji(name: string) { if (name.includes('钱') || name.includes('预算')) return '🥔'; if (name.includes('时间') || name.includes('小时')) return '⏳'; if (name.includes('不能露脸')) return '🎭'; return '🚧'; }
function constraintSubCategory(name: string) { if (/预算|钱|成本/.test(name)) return 'Budget'; if (/时间|周末|小时/.test(name)) return 'Time'; if (/不能|必须|只能/.test(name)) return 'Rule'; return 'Resource'; }
function scenarioEmoji(name: string) { if (name.includes('SaaS')) return '🍞'; if (name.includes('Extension')) return '🧩'; if (name.includes('毕业') || name.includes('论文')) return '🎓'; if (name.includes('TikTok') || name.includes('YouTube')) return '📱'; return '🌍'; }
function scenarioSubCategory(name: string) { if (/SaaS|App|Extension|Agent/.test(name)) return 'Product'; if (/B站|小红书|TikTok|YouTube|公众号/.test(name)) return 'Content'; if (/毕业|论文|课程|校园/.test(name)) return 'Education'; return 'Workspace'; }
function techEmoji(name: string) { if (name.includes('OpenAI') || name.includes('LLM')) return '✨'; if (name.includes('Stripe')) return '💳'; if (name.includes('Three')) return '🧊'; if (name.includes('Extension')) return '🧩'; return '⚙️'; }
function techSubCategory(name: string) { if (/LLM|OpenAI|Claude|RAG|Agent|Embedding/.test(name)) return 'AI'; if (/Supabase|Firebase|PostgreSQL|Redis/.test(name)) return 'Data'; if (/React|Next|Flutter|Electron|Three/.test(name)) return 'Frontend'; if (/Stripe|Vercel|Cloudflare|Docker/.test(name)) return 'Infra'; return 'Integration'; }
function businessEmoji(name: string) { if (name.includes('Subscription')) return '🧀'; if (name.includes('Marketplace')) return '🛒'; if (name.includes('Open Source')) return '🌱'; return '💰'; }
function businessSubCategory(name: string) { if (/Subscription|Usage|Seat|Team/.test(name)) return 'Recurring'; if (/Marketplace|Commission|Transaction/.test(name)) return 'Transaction'; if (/Course|Community|Training/.test(name)) return 'Education'; return 'Monetization'; }
function growthEmoji(name: string) { if (name.includes('SEO')) return '🔎'; if (name.includes('Product Hunt')) return '🚀'; if (name.includes('Community') || name.includes('Discord')) return '👥'; return '📈'; }
function growthSubCategory(name: string) { if (/SEO|Content|Newsletter|YouTube|TikTok/.test(name)) return 'Content'; if (/Cold|Sales|Outbound|Demo/.test(name)) return 'Sales'; if (/Community|Discord|Slack|微信群/.test(name)) return 'Community'; return 'Launch'; }
function catalystEmoji(name: string) { if (name.includes('Low-code')) return '🧂'; if (name.includes('Automation')) return '⚙️'; if (name.includes('Community')) return '🍄'; if (name.includes('SaaS')) return '🍞'; if (name.includes('Subscription')) return '🧀'; return '✨'; }
function catalystSubCategory(name: string) { if (/Agent|Automation|Workflow|Smart|Recommendation/.test(name)) return 'Intelligence'; if (/Subscription|Marketplace|B2B|API/.test(name)) return 'Business'; if (/Community|Gamification|Challenge/.test(name)) return 'Engagement'; return 'Product Mechanic'; }
