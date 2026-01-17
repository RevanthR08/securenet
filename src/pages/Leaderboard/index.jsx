import { Trophy } from 'lucide-react';

const Leaderboard = () => {
    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="page-title">Cyber Guardians of India</h1>
                <p className="page-subtitle">Top contributors protecting the community</p>
            </div>
            <div className="card" style={{ textAlign: 'center', padding: '4rem' }}>
                <Trophy size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
                <h3>Coming Soon</h3>
                <p className="text-muted">Leaderboard with top scam reporters</p>
                <span className="badge badge-warning" style={{ marginTop: '1rem' }}>Login Coming Soon</span>
            </div>
        </div>
    );
};

export default Leaderboard;
