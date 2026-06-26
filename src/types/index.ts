export type IngredientCategory =
  | 'asset'
  | 'skill'
  | 'audience'
  | 'pain'
  | 'goal'
  | 'constraint'
  | 'scenario'
  | 'technology'
  | 'business'
  | 'growth'
  | 'catalyst';

export type HeatLevel = 'low' | 'medium' | 'high' | 'hell';

export type CookingStage = 'idle' | 'identify' | 'gap' | 'seasoning' | 'compose' | 'done';

export type Ingredient = {
  id: string;
  name: string;
  emoji: string;
  category: IngredientCategory;
  subCategory?: string;
  difficulty?: number;
  popularity?: number;
  innovationWeight?: number;
  businessWeight?: number;
  color?: string;
  description?: string;
  relatedTags?: string[];
  recommendedWith?: string[];
  conflictsWith?: string[];
  icon?: string;
  aliases?: string[];
  searchable?: boolean;
};

export type IngredientGroup = {
  id: IngredientCategory;
  title: string;
  subtitle: string;
  color: string;
  items: Ingredient[];
};

export type HeatOption = {
  id: HeatLevel;
  label: string;
  heat: string;
  description: string;
  detail: string;
  intensity: number;
};

export type Recipe = {
  id: string;
  title: string;
  emoji: string;
  tagline: string;
  heatLevel: HeatLevel;
  innovationScore: number;
  feasibilityScore: number;
  riskScore: number;
  maturityScore: number;
  targetUser: string;
  painPoint: string;
  productForm: string;
  coreFeatures: string[];
  mvpPath: string[];
  tools: string[];
  businessModel: string;
  risks: string[];
  nextActions: string[];
  usedIngredients: Ingredient[];
  why: string;
  recommendedAdditions: Ingredient[];
};

export type CookingLogItem = {
  id: string;
  label: string;
  detail: string;
  stage: CookingStage;
};

export type MaturityScore = {
  total: number;
  complementarity: number;
  marketClarity: number;
  technicalFeasibility: number;
  commercialPotential: number;
  differentiation: number;
};

export type SavedRecipe = Recipe & {
  savedAt: string;
  savedHeat: HeatLevel;
};

export type ToastMessage = {
  id: string;
  message: string;
  tone?: 'success' | 'warning' | 'info';
};

export type GenerationResult = {
  recipes: Recipe[];
  recommendedCatalysts: Ingredient[];
  logs: CookingLogItem[];
  maturity: MaturityScore;
};

export type GraphRelationType = 'related' | 'recommended' | 'conflict' | 'path';

export type GraphRelation = {
  from: string;
  to: string;
  weight: number;
  type: GraphRelationType;
  reason: string;
};

export type SearchMode = 'all' | 'recent' | 'popular' | 'favorite' | 'recommended';
