import type { HeatLevel } from '../types';

export const heatRecipeTone: Record<
  HeatLevel,
  {
    adjective: string;
    fallbackTitle: string;
    mvpStyle: string;
    riskNote: string;
    innovationBoost: number;
    feasibilityBoost: number;
    riskBoost: number;
  }
> = {
  low: {
    adjective: '稳妥',
    fallbackTitle: 'AI 学习计划助手',
    mvpStyle: '先用表单和模板跑通单一场景，避免一开始做复杂系统。',
    riskNote: '风险偏低，但要避免做成普通工具清单。',
    innovationBoost: 2,
    feasibilityBoost: 12,
    riskBoost: 10,
  },
  medium: {
    adjective: '均衡',
    fallbackTitle: 'AI 创意行动工作台',
    mvpStyle: '用 AI 生成、人工校准和轻量自动化组成闭环。',
    riskNote: '需要控制功能边界，先证明用户愿意反复使用。',
    innovationBoost: 10,
    feasibilityBoost: 6,
    riskBoost: 20,
  },
  high: {
    adjective: '大胆',
    fallbackTitle: '跨领域 AI 增长菜谱',
    mvpStyle: '做一个强记忆点的垂直切口，用真实案例证明效果。',
    riskNote: '创新度更高，冷启动时需要更清晰的用户故事。',
    innovationBoost: 20,
    feasibilityBoost: -2,
    riskBoost: 34,
  },
  hell: {
    adjective: '反直觉',
    fallbackTitle: '面向大学生的 AI 个人成长操作系统',
    mvpStyle: '先做一次 7 天封闭实验，用强概念吸引早期用户共创。',
    riskNote: '概念张力很强，但必须用极小 MVP 快速验证。',
    innovationBoost: 32,
    feasibilityBoost: -10,
    riskBoost: 48,
  },
};
