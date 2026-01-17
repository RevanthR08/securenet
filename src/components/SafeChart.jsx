import { useState, useEffect } from 'react';
import { ResponsiveContainer } from 'recharts';

/**
 * SafeChart - Production-safe wrapper for Recharts in Capacitor WebView
 * 
 * Fixes the common -1×-1 dimension crash by:
 * 1. Providing explicit pixel height
 * 2. Delaying render until layout is ready (250ms for WebView)
 * 3. Forcing container dimensions
 */
const SafeChart = ({ children, height = 280 }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Wait longer for Capacitor WebView layout to stabilize
        // requestAnimationFrame is TOO FAST for WebView - it still gets width(1) height(3)
        const timer = setTimeout(() => {
            setMounted(true);
        }, 250); // Increased delay specifically for mobile WebView

        return () => clearTimeout(timer);
    }, []);

    // Don't render chart until layout is ready
    if (!mounted) {
        return (
            <div style={{ height, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Loading chart...</span>
            </div>
        );
    }

    return (
        <div style={{ height, width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
                {children}
            </ResponsiveContainer>
        </div>
    );
};

export default SafeChart;
