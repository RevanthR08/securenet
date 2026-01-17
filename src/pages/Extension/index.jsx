import { Puzzle } from 'lucide-react';

const Extension = () => {
    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="page-title">Browser Extension</h1>
                <p className="page-subtitle">Install SentinelX extension for real-time protection</p>
            </div>
            <div className="card" style={{ textAlign: 'center', padding: '4rem' }}>
                <Puzzle size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
                <h3>Extension Package</h3>
                <p className="text-muted">Browser extension popup UI preview</p>
            </div>
        </div>
    );
};

export default Extension;
