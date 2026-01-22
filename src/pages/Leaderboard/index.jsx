import { useState, useEffect } from 'react';
import { Trophy, Shield, Coins, Medal, Award } from 'lucide-react';
import { leaderboardService } from '../../services/services';
import './Leaderboard.css';

const Leaderboard = () => {
    const [allRankings, setAllRankings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch leaderboard data
    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                setLoading(true);
                const data = await leaderboardService.getLeaderboard();

                console.log('🏆 Leaderboard Data:', data);

                // Transform backend data to match UI format
                const transformedData = (data.leaderboard || data.users || data || []).map((user, index) => {
                    const auraCoins = user.aura_points || user.auraCoins || user.coins || 0;

                    // Determine title based on coins
                    let title = 'Rookie Guardian';
                    if (auraCoins >= 1000) title = 'Gold Guardian';
                    else if (auraCoins >= 500) title = 'Silver Guardian';
                    else if (auraCoins >= 200) title = 'Bronze Guardian';

                    return {
                        rank: index + 1,
                        username: user.username || user.name || `User#${user.id || index}`,
                        title: title,
                        reports: user.total_reports || user.reports || 0,
                        verified: user.verified_reports || user.verified || 0,
                        repScore: user.reputation_score || user.repScore || calculateRepScore(user),
                        auraCoins: auraCoins,
                        theme: index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : null
                    };
                });

                setAllRankings(transformedData);
                setError('');
            } catch (err) {
                console.error('Leaderboard fetch error:', err);
                setError('Failed to load leaderboard');
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderboard();
    }, []);

    // Calculate reputation score if not provided
    const calculateRepScore = (user) => {
        const total = user.total_reports || user.reports || 0;
        const verified = user.verified_reports || user.verified || 0;
        if (total === 0) return 0;
        return Math.round((verified / total) * 100);
    };

    // Get top 3 for podium
    const topThree = allRankings.slice(0, 3);

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

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
                        <Trophy size={48} style={{ opacity: 0.5 }} />
                        <p style={{ marginTop: '1rem' }}>Loading leaderboard...</p>
                    </div>
                ) : error ? (
                    <div style={{ textAlign: 'center', padding: '3rem', color: '#ef4444' }}>
                        <p>{error}</p>
                    </div>
                ) : topThree.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
                        <Trophy size={48} style={{ opacity: 0.5 }} />
                        <p style={{ marginTop: '1rem' }}>No guardians yet. Be the first!</p>
                    </div>
                ) : (
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
                )}
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
                        {loading ? (
                            <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
                                <p>Loading rankings...</p>
                            </div>
                        ) : error ? (
                            <div style={{ textAlign: 'center', padding: '2rem', color: '#ef4444' }}>
                                <p>{error}</p>
                            </div>
                        ) : allRankings.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
                                <p>No rankings available</p>
                            </div>
                        ) : (
                            allRankings.map((guardian, index) => (
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
                            ))
                        )}
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
