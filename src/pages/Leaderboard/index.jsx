import { Trophy, Shield, Coins, Medal, Award } from 'lucide-react';
import './Leaderboard.css';

const Leaderboard = () => {
    const topThree = [
        {
            rank: 1,
            username: 'Arjun_Sec',
            title: 'Gold Guardian',
            auraCoins: 1320,
            reports: 42,
            verified: 38,
            repScore: 95,
            theme: 'gold'
        },
        {
            rank: 2,
            username: 'Kavya_Def',
            title: 'Silver Guardian',
            auraCoins: 1100,
            reports: 37,
            verified: 33,
            repScore: 89,
            theme: 'silver'
        },
        {
            rank: 3,
            username: 'Rohit_Cyber',
            title: 'Bronze Guardian',
            auraCoins: 870,
            reports: 29,
            verified: 26,
            repScore: 90,
            theme: 'bronze'
        }
    ];

    const allRankings = [
        { rank: 1, username: 'Arjun_Sec', title: 'Gold Guardian', reports: 42, verified: 38, repScore: 95, auraCoins: 1320 },
        { rank: 2, username: 'Kavya_Def', title: 'Silver Guardian', reports: 37, verified: 33, repScore: 89, auraCoins: 1100 },
        { rank: 3, username: 'Rohit_Cyber', title: 'Bronze Guardian', reports: 29, verified: 26, repScore: 90, auraCoins: 870 },
        { rank: 4, username: 'Priya_Watch', title: 'Bronze Guardian', reports: 25, verified: 22, repScore: 88, auraCoins: 750 },
        { rank: 5, username: 'Vikram_Alert', title: 'Bronze Guardian', reports: 18, verified: 16, repScore: 88, auraCoins: 540 },
        { rank: 6, username: 'Sneha_Guard', title: 'Rookie Guardian', reports: 12, verified: 10, repScore: 83, auraCoins: 360 },
        { rank: 7, username: 'Amit_Shield', title: 'Rookie Guardian', reports: 10, verified: 9, repScore: 90, auraCoins: 300 },
        { rank: 8, username: 'Neha_Secure', title: 'Rookie Guardian', reports: 8, verified: 7, repScore: 87, auraCoins: 240 },
        { rank: 9, username: 'Ravi_Protect', title: 'Rookie Guardian', reports: 6, verified: 5, repScore: 83, auraCoins: 180 },
        { rank: 10, username: 'Guardian_e06', title: 'Rookie Guardian', reports: 1, verified: 1, repScore: 100, auraCoins: 85 }
    ];

    const getMedalIcon = (rank) => {
        if (rank === 1) return '🥇';
        if (rank === 2) return '🥈';
        if (rank === 3) return '🥉';
        return `#${rank}`;
    };

    const getTierBadgeClass = (title) => {
        if (title.includes('Gold')) return 'tier-gold';
        if (title.includes('Silver')) return 'tier-silver';
        if (title.includes('Bronze')) return 'tier-bronze';
        return 'tier-rookie';
    };

    return (
        <div className="leaderboard-page">
            {/* Page Header */}
            <div className="leaderboard-header">
                <div className="header-content">
                    <Trophy size={32} className="header-icon" />
                    <div>
                        <h1>Cyber Guardians of India</h1>
                        <p>Top community defenders protecting citizens from online scams</p>
                    </div>
                </div>
            </div>

            {/* Top 3 Podium */}
            <div className="podium-section">
                <h2 className="section-title">Hall of Guardians</h2>

                <div className="podium-grid">
                    {topThree.map((guardian) => (
                        <div key={guardian.rank} className={`podium-card ${guardian.theme}`}>
                            <div className="podium-rank">
                                <span className="medal-icon">{getMedalIcon(guardian.rank)}</span>
                                <span className="rank-number">#{guardian.rank}</span>
                            </div>

                            <div className="guardian-avatar">
                                <Shield size={48} />
                            </div>

                            <div className="guardian-info">
                                <h3 className="guardian-name">{guardian.username}</h3>
                                <span className={`guardian-title ${getTierBadgeClass(guardian.title)}`}>
                                    {guardian.title}
                                </span>
                            </div>

                            <div className="guardian-stats">
                                <div className="stat-row">
                                    <Coins size={20} />
                                    <div className="stat-value">{guardian.auraCoins}</div>
                                    <div className="stat-label">AuraCoins</div>
                                </div>
                                <div className="stat-row">
                                    <Award size={20} />
                                    <div className="stat-value">{guardian.reports}</div>
                                    <div className="stat-label">Reports</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Full Rankings Table */}
            <div className="rankings-section">
                <h2 className="section-title">Full Rankings</h2>

                <div className="rankings-table">
                    <div className="table-header">
                        <div className="th rank-col">Rank</div>
                        <div className="th user-col">Guardian</div>
                        <div className="th reports-col">Reports</div>
                        <div className="th verified-col">Verified</div>
                        <div className="th score-col">Rep Score</div>
                        <div className="th coins-col">AuraCoins</div>
                    </div>

                    <div className="table-body">
                        {allRankings.map((guardian, index) => (
                            <div
                                key={guardian.rank}
                                className={`rank-row ${index < 3 ? 'top-three' : ''}`}
                            >
                                <div className="td rank-col">
                                    <span className="rank-badge">{getMedalIcon(guardian.rank)}</span>
                                </div>
                                <div className="td user-col">
                                    <div className="user-info">
                                        <Shield size={20} className="user-shield" />
                                        <div>
                                            <div className="user-name">{guardian.username}</div>
                                            <span className={`user-title ${getTierBadgeClass(guardian.title)}`}>
                                                {guardian.title}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="td reports-col">{guardian.reports}</div>
                                <div className="td verified-col">{guardian.verified}</div>
                                <div className="td score-col">
                                    <div className="score-bar">
                                        <div
                                            className="score-fill"
                                            style={{ width: `${guardian.repScore}%` }}
                                        />
                                        <span className="score-text">{guardian.repScore}</span>
                                    </div>
                                </div>
                                <div className="td coins-col">
                                    <span className="coins-value">
                                        <Coins size={16} />
                                        {guardian.auraCoins}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Guardian Tiers Legend */}
            <div className="tiers-legend">
                <h3>Guardian Tiers</h3>
                <div className="tier-badges">
                    <span className="tier-badge tier-gold">🥇 Gold Guardian (1000+ coins)</span>
                    <span className="tier-badge tier-silver">🥈 Silver Guardian (500-999 coins)</span>
                    <span className="tier-badge tier-bronze">🥉 Bronze Guardian (200-499 coins)</span>
                    <span className="tier-badge tier-rookie">🛡️ Rookie Guardian (0-199 coins)</span>
                </div>
            </div>
        </div>
    );
};

export default Leaderboard;
