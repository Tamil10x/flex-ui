"use client";
import React from "react";

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex h-full w-full items-center justify-center rounded-2xl border border-white/[0.06] bg-zinc-950/50 p-8 text-center">
          <div>
            <p className="text-sm font-medium text-zinc-400">Unable to load 3D content</p>
            <p className="mt-1 text-xs text-zinc-600">Your browser may not support WebGL</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
