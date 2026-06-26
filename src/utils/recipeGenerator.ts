import { catalystIngredients } from '../data/mockIngredients';
import { heatRecipeTone } from '../data/mockRecipes';
import type { GenerationResult, HeatLevel, Ingredient, MaturityScore, Recipe } from '../types';
import { hasIngredientName, ingredientNames, uniqueIngredients } from './ingredientHelpers';

const pick = (items: Ingredient[], names: string[]) => items.filter((item) => names.includes(item.name));

const score = (base: number, delta: number) => Math.max(8, Math.min(98, base + delta));

export function recommendCatalysts(ingredients: Ingredient[], heatLevel: HeatLevel) {
  const names = ingredients.map((ingredient) => ingredient.name);
  let wanted = ['AI Agent', 'Automation'];

  if (names.includes('缺少技术能力') || names.includes('预算有限')) wanted = ['Low-code', 'No-code', 'Template'];
  if (names.includes('不会营销') || names.includes('创业者')) wanted = ['Automation', 'Community', 'Subscription'];
  if (names.includes('信息过载')) wanted = ['Chrome Extension', 'AI Agent', 'Template'];
  if (names.includes('大学生') || names.includes('学生群体')) wanted = ['Gamification', 'Community', '校园推广'];
  if (heatLevel === 'hell') wanted = [...wanted, 'Marketplace', 'B2B'];

  return uniqueIngredients(pick(catalystIngredients, wanted)).slice(0, heatLevel === 'hell' ? 3 : 2);
}

export function calculateMaturity(ingredients: Ingredient[], heatLevel: HeatLevel): MaturityScore {
  const heat = heatRecipeTone[heatLevel];
  const hasAudience = ingredients.some((item) => item.category === 'audience');
  const hasPain = ingredients.some((item) => item.category === 'pain');
  const hasAsset = ingredients.some((item) => item.category === 'asset');
  const hasScenario = ingredients.some((item) => item.category === 'scenario');
  const countBonus = Math.min(16, ingredients.length * 3);

  const complementarity = score(52, countBonus + (hasAsset && hasPain ? 14 : 0));
  const marketClarity = score(48, (hasAudience ? 18 : 0) + (hasPain ? 14 : 0) + (hasScenario ? 6 : 0));
  const technicalFeasibility = score(54, heat.feasibilityBoost + (hasAsset ? 12 : 0));
  const commercialPotential = score(46, (hasPain ? 13 : 0) + (hasAudience ? 9 : 0) + (ingredients.length > 4 ? 8 : 0));
  const differentiation = score(44, heat.innovationBoost + (hasScenario ? 8 : 0) + (ingredients.length > 5 ? 8 : 0));
  const total = Math.round((complementarity + marketClarity + technicalFeasibility + commercialPotential + differentiation) / 5);

  return { total, complementarity, marketClarity, technicalFeasibility, commercialPotential, differentiation };
}

export function generateCookingLogs(ingredients: Ingredient[], recommendedCatalysts: Ingredient[], recipesCount: number) {
  const audience = ingredients.find((item) => item.category === 'audience')?.name ?? '早期用户';
  const pain = ingredients.find((item) => item.category === 'pain')?.name ?? '需求还不够明确';
  const asset = ingredients.find((item) => item.category === 'asset')?.name ?? '可复用能力';

  return [
    { id: 'log-1', stage: 'identify' as const, label: '已识别', detail: `核心优势 = ${asset}` },
    { id: 'log-2', stage: 'gap' as const, label: '已发现', detail: `目标用户 = ${audience}，痛点 = ${pain}` },
    {
      id: 'log-3',
      stage: 'seasoning' as const,
      label: '已补充',
      detail: recommendedCatalysts.map((item) => item.name).join('、') || '轻量自动化',
    },
    { id: 'log-4', stage: 'compose' as const, label: '已建议', detail: '7 天 MVP + 可复制商业路径' },
    { id: 'log-5', stage: 'done' as const, label: '已生成', detail: `${recipesCount} 个菜谱方案` },
  ];
}

function makeRecipe(params: {
  id: string;
  emoji: string;
  title: string;
  tagline: string;
  heatLevel: HeatLevel;
  ingredients: Ingredient[];
  targetUser: string;
  painPoint: string;
  productForm: string;
  features: string[];
  mvp: string[];
  tools: string[];
  business: string;
  recommendedAdditions: Ingredient[];
  baseInnovation: number;
  baseFeasibility: number;
}) {
  const tone = heatRecipeTone[params.heatLevel];
  const maturity = calculateMaturity(params.ingredients, params.heatLevel).total;
  const riskScore = score(18, tone.riskBoost + (params.ingredients.length < 3 ? 12 : 0));

  return {
    id: `${params.id}-${Date.now()}`,
    title: params.title,
    emoji: params.emoji,
    tagline: params.tagline,
    heatLevel: params.heatLevel,
    innovationScore: score(params.baseInnovation, tone.innovationBoost),
    feasibilityScore: score(params.baseFeasibility, tone.feasibilityBoost),
    riskScore,
    maturityScore: maturity,
    targetUser: params.targetUser,
    painPoint: params.painPoint,
    productForm: params.productForm,
    coreFeatures: params.features,
    mvpPath: params.mvp,
    tools: params.tools,
    businessModel: params.business,
    risks: [tone.riskNote, '如果定位太宽，第一批用户很难理解这道菜为什么适合自己。'],
    nextActions: ['写出 1 个具体用户故事', '做 5 次访谈', '用 1 周完成最小可演示版本'],
    usedIngredients: params.ingredients,
    why: `${ingredientNames(params.ingredients)} 之间形成了“能力 + 人群 + 痛点”的闭环，适合用 ${tone.adjective} 路线先做可验证实验。`,
    recommendedAdditions: params.recommendedAdditions,
  } satisfies Recipe;
}

export function generateCookIdea(ingredients: Ingredient[], heatLevel: HeatLevel): GenerationResult {
  const recommendedCatalysts = recommendCatalysts(ingredients, heatLevel);
  const fullIngredients = uniqueIngredients([...ingredients, ...recommendedCatalysts]);
  const additions = uniqueIngredients([
    ...pick(catalystIngredients, ['B2B', 'Chrome Extension', 'Community', 'Template', '校园推广', 'Marketplace']),
  ]).filter((item) => !fullIngredients.some((current) => current.id === item.id));
  const tone = heatRecipeTone[heatLevel];
  const targetUser = fullIngredients.find((item) => item.category === 'audience')?.name ?? '早期尝鲜用户';
  const painPoint = fullIngredients.find((item) => item.category === 'pain')?.name ?? '想法难以落地';
  const recipes: Recipe[] = [];

  if (hasIngredientName(fullIngredients, ['大学生', '学生群体', '学习效率低', '英语能力', '教育背景'])) {
    recipes.push(
      makeRecipe({
        id: 'learning',
        emoji: heatLevel === 'hell' ? '🧠' : '🍜',
        title: heatLevel === 'hell' ? '面向大学生的 AI 个人成长操作系统' : 'AI 学习计划助手',
        tagline: '把模糊学习目标拆成每天能完成的行动菜单。',
        heatLevel,
        ingredients: fullIngredients,
        targetUser,
        painPoint: hasIngredientName(fullIngredients, ['找工作困难']) ? '求职准备混乱、成果不可见' : '学习效率低、复盘断断续续',
        productForm: heatLevel === 'hell' ? '个人成长 OS + 学习挑战社区' : '学习计划生成器 + 复盘工作台',
        features: ['目标拆解', '每日任务菜单', 'AI 复盘', '成果作品集'],
        mvp: ['选择一个学习场景', '生成 7 天计划', '收集完成率', '输出一页成果报告'],
        tools: ['React', 'Notion', 'Tally', 'Automation'],
        business: heatLevel === 'low' ? '模板包 + 轻订阅' : '订阅制 + 学习陪跑社区',
        recommendedAdditions: additions.slice(0, 5),
        baseInnovation: 58,
        baseFeasibility: 78,
      }),
    );
  }

  if (hasIngredientName(fullIngredients, ['不会营销', '创业者', '市场营销', '内容创作', '中小企业主'])) {
    recipes.push(
      makeRecipe({
        id: 'growth',
        emoji: '🌮',
        title: heatLevel === 'hell' ? '自动化获客飞轮厨房' : '个人营销灵感菜单',
        tagline: '把定位、选题、发布和复盘做成可重复的获客流程。',
        heatLevel,
        ingredients: fullIngredients,
        targetUser,
        painPoint: '不会稳定获客，也不知道内容是否有效',
        productForm: 'AI 增长助手 + 内容实验看板',
        features: ['定位问诊', '选题生成', '渠道动作清单', '实验复盘'],
        mvp: ['选一个垂直人群', '生成 20 条内容', '发布 5 条', '记录线索反馈'],
        tools: ['Airtable', 'Zapier', 'Canva', 'Vite'],
        business: '模板市场抽成 + 小团队订阅',
        recommendedAdditions: additions.slice(1, 6),
        baseInnovation: 64,
        baseFeasibility: 72,
      }),
    );
  }

  if (hasIngredientName(fullIngredients, ['缺少技术能力', '预算有限', 'Low-code', 'No-code', '独立开发'])) {
    recipes.push(
      makeRecipe({
        id: 'nocode',
        emoji: '🧱',
        title: heatLevel === 'hell' ? '无代码创业实验反应堆' : '低成本 MVP 配方师',
        tagline: '为预算有限的创作者生成可执行的 no-code 落地路线。',
        heatLevel,
        ingredients: fullIngredients,
        targetUser,
        painPoint: '有想法但缺技术、缺预算、缺第一版路径',
        productForm: 'MVP 路线生成器 + 工具栈推荐器',
        features: ['需求压缩', '工具匹配', '成本估算', '发布清单'],
        mvp: ['输入想法', '推荐 no-code 组合', '生成 landing page', '招募 5 个试用用户'],
        tools: ['Framer', 'Airtable', 'Make', 'Stripe'],
        business: '方案包 + 工具佣金 + 进阶咨询',
        recommendedAdditions: additions.slice(0, 5),
        baseInnovation: 60,
        baseFeasibility: 84,
      }),
    );
  }

  while (recipes.length < 3) {
    recipes.push(
      makeRecipe({
        id: `general-${recipes.length}`,
        emoji: recipes.length === 0 ? '🍛' : recipes.length === 1 ? '🥗' : '🍲',
        title:
          heatLevel === 'hell' && recipes.length === 0
            ? tone.fallbackTitle
            : recipes.length === 1
              ? '创意验证菜谱工作台'
              : 'AI 研究选题料理机',
        tagline: recipes.length === 1 ? '把灵感做成一周内可验证的项目。' : '从兴趣、限制和场景中生成更清晰的研究方向。',
        heatLevel,
        ingredients: fullIngredients,
        targetUser,
        painPoint,
        productForm: recipes.length === 1 ? '一页式 idea lab' : '研究问题生成器 + 文献路线图',
        features: ['问题重写', '目标用户定义', 'MVP 路线', '风险清单'],
        mvp: ['写出假设', '做一页演示', '找 5 人反馈', tone.mvpStyle],
        tools: ['TypeScript', 'Supabase', 'Framer Motion', 'Google Sheets'],
        business: heatLevel === 'low' ? '一次性方案包' : '订阅制 + 共创社群',
        recommendedAdditions: additions.slice(0, 5),
        baseInnovation: 62,
        baseFeasibility: 74,
      }),
    );
  }

  const finalRecipes = recipes.slice(0, 3);
  return {
    recipes: finalRecipes,
    recommendedCatalysts,
    logs: generateCookingLogs(fullIngredients, recommendedCatalysts, finalRecipes.length),
    maturity: calculateMaturity(fullIngredients, heatLevel),
  };
}
