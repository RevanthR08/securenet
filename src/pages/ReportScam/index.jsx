import { AlertTriangle } from 'lucide-react';

const ReportScam = () => {
    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="page-title">Report a Scam</h1>
                <p className="page-subtitle">Help protect the community by reporting malicious URLs</p>
            </div>
            <div className="card" style={{ textAlign: 'center', padding: '4rem' }}>
                <AlertTriangle size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
                <h3>Coming Soon</h3>
                <p className="text-muted">Report scam URLs and earn AuraCoins</p>
                <span className="badge badge-info" style={{ marginTop: '1rem' }}>AuraCoins Coming Soon</span>
            </div>
        </div>
    );
};

export default ReportScam;
