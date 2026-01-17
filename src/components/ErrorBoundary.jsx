import React from 'react';

/**
 * ErrorBoundary - Prevents white screen crashes in Capacitor
 * Catches any React rendering errors and shows a fallback UI
 */
export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('🔴 React Error Boundary caught:', error, errorInfo);

        // Log to help debug in Chrome DevTools Remote
        console.error('Error stack:', error.stack);
        console.error('Component stack:', errorInfo.componentStack);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    padding: '2rem',
                    textAlign: 'center',
                    background: '#fff',
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <div style={{ fontSize: '48px', marginBottom: '1rem' }}>⚠️</div>
                    <h2 style={{ color: '#ef4444', marginBottom: '0.5rem' }}>Something went wrong</h2>
                    <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
                        The app encountered an error and couldn't render this page.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        style={{
                            padding: '0.75rem 1.5rem',
                            background: '#3b82f6',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '0.5rem',
                            fontSize: '1rem',
                            cursor: 'pointer'
                        }}
                    >
                        Reload App
                    </button>
                    {this.state.error && (
                        <details style={{ marginTop: '2rem', textAlign: 'left', maxWidth: '600px' }}>
                            <summary style={{ cursor: 'pointer', color: '#6b7280' }}>
                                Technical Details
                            </summary>
                            <pre style={{
                                marginTop: '1rem',
                                padding: '1rem',
                                background: '#f3f4f6',
                                borderRadius: '0.5rem',
                                fontSize: '0.75rem',
                                overflow: 'auto'
                            }}>
                                {this.state.error.toString()}
                            </pre>
                        </details>
                    )}
                </div>
            );
        }

        return this.props.children;
    }
}
