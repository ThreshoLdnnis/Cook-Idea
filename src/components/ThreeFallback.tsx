import { Component, type ErrorInfo, type ReactNode } from 'react';

type ThreeErrorBoundaryProps = {
  children: ReactNode;
  fallback: ReactNode;
};

type ThreeErrorBoundaryState = {
  hasError: boolean;
};

export class ThreeErrorBoundary extends Component<ThreeErrorBoundaryProps, ThreeErrorBoundaryState> {
  state: ThreeErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('CookIdea 3D workspace failed to initialize:', error, info);
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

export function ThreeFallback() {
  return (
    <div className="relative z-30 grid h-full w-full place-items-center bg-[radial-gradient(circle_at_50%_34%,rgba(249,115,22,0.16),transparent_30%),linear-gradient(180deg,#fff8ec,#ffe7c7)] p-6">
      <div className="max-w-sm rounded-[2rem] border border-orange-100 bg-white/82 p-5 text-center shadow-sticker backdrop-blur">
        <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-full bg-orange-100 text-2xl">⚠️</div>
        <p className="text-lg font-black text-ink">3D 工作台没有成功启动</p>
        <p className="mt-2 text-sm font-semibold leading-6 text-stone-600">
          当前浏览器的 WebGL 环境可能不可用。先继续使用食材图谱和菜谱生成，稍后我会继续优化兼容性。
        </p>
      </div>
    </div>
  );
}

export function hasWebGLSupport() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
  } catch {
    return false;
  }
}
