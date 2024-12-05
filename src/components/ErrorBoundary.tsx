import React from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black text-green-500 flex items-center justify-center p-4">
          <div className="max-w-lg w-full border-2 border-green-500 p-8">
            <h1 className="text-2xl font-press-start-2p mb-4">SYSTEM ERROR</h1>
            <p className="font-mono mb-4">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-green-500 text-black px-4 py-2 font-press-start-2p text-sm hover:bg-green-400"
            >
              RELOAD SYSTEM
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
} 