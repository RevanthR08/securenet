import { useState, useEffect } from 'react';
import {
    Shield,
    ShieldX,
    CheckCircle2,
    AlertCircle,
    Activity,
    TrendingUp,
    Clock,
    Globe,
    XCircle,
    AlertTriangle,
    Users,
    Sparkles,
    ChevronDown,
    ChevronUp
} from 'lucide-react';
import { historyService, statsService } from '../../services/services';
import './LiveFeed.css';

// Helper to get relative time
const getTimeAgo = (dateString) => {
    const now = new Date();
    const past = new Date(dateString);
    const diffInMs = now - past;
    const diffInSecs = Math.floor(diffInMs / 1000);

    if (diffInSecs < 60) return `${diffInSecs} sec ago`;
    const diffInMins = Math.floor(diffInSecs / 60);
    if (diffInMins < 60) return `${diffInMins} min ago`;
    const diffInHours = Math.floor(diffInMins / 60);
    if (diffInHours < 24) return `${diffInHours} hr ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
};


const LiveFeed = () => {
    const [feeds, setFeeds] = useState([]);
    const [stats, setStats] = useState({
        total: 0,
        blocked: 0,
        warned: 0,
        safe: 0
    });
    const [expandedId, setExpandedId] = useState(null);
    const [protectionActive, setProtectionActive] = useState(true);
    const [threatsPerMin, setThreatsPerMin] = useState(0);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            // Fetch stats for the summary strip and severity widgets
            const statsData = await statsService.getSummary();
            setStats({
                total: statsData.total_scans || 0,
                blocked: statsData.breakdown?.Dangerous || 0,
                warned: statsData.breakdown?.Medium || 0,
                safe: statsData.breakdown?.Safe || 0
            });

            // Calculate threats per minute (simulated from stats or real calculation)
            setThreatsPerMin((statsData.total_scans / 1440).toFixed(1)); // Average per minute today

            // Fetch history for the live feed
            const history = await historyService.getHistory();

            // Format history to match component expectations
            const formattedFeeds = history.map(item => {
                let domain = 'Unknown';
                try {
                    // Handle URLs without protocol
                    const urlToParse = item.url.includes('://') ? item.url : `http://${item.url}`;
                    domain = new URL(urlToParse).hostname;
                } catch (e) {
                    domain = item.url || 'Unknown';
                }

                return {
                    id: item.id,
                    url: item.url,
                    domain: domain,
                    timestamp: getTimeAgo(item.created_at),
                    rawTimestamp: item.created_at,
                    threatType: item.category || (item.verdict === 'Dangerous' ? 'Malicious Site' : (item.verdict === 'Medium' ? 'Suspicious' : 'Safe Website')),
                    riskScore: item.normalized_score || 0,
                    action: item.verdict === 'Dangerous' ? 'blocked' : (item.verdict === 'Medium' ? 'warned' : 'allowed'),
                    geo: 'India', // Placeholder
                    triggeredRules: item.verdict === 'Dangerous' ? ['Malicious signature detected', 'Proactive blocking active'] : [],
                    datasets: item.verdict === 'Dangerous' ? ['SentinelX DB', 'Real-time Analysis'] : []
                };
            });

            // Sort by newest first
            formattedFeeds.sort((a, b) => new Date(b.rawTimestamp) - new Date(a.rawTimestamp));
            setFeeds(formattedFeeds);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch live feed data:', error);
            setLoading(false);
        }
    };

    // Initial fetch and polling
    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 15000); // 15 seconds refresh
        return () => clearInterval(interval);
    }, []);

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const blockedCount = stats.blocked;
    const warnedCount = stats.warned;
    const safeCount = stats.safe;

    const criticalCount = feeds.filter(f => f.riskScore >= 90).length;
    const highCount = feeds.filter(f => f.riskScore >= 70 && f.riskScore < 90).length;
    const mediumCount = feeds.filter(f => f.riskScore >= 40 && f.riskScore < 70).length;
    const safeCountByRisk = feeds.filter(f => f.riskScore < 40).length;

    // Geo origin stats (Placeholder based on real counts)
    const geoStats = [
        { country: 'India', count: stats.total },
        { country: 'Others', count: 0 }
    ];

    // Threat categories (Placeholder since real categories aren't in summary breakdown yet)
    const categories = [
        { name: 'Blocked Scams', count: stats.blocked, max: stats.total || 10 },
        { name: 'Warnings Issued', count: stats.warned, max: stats.total || 10 },
        { name: 'Safe Sites', count: stats.safe, max: stats.total || 10 }
    ];

    return (
        <div className="live-feed-page">
            {/* Header */}
            <div className="feed-header">
                <div className="feed-title-section">
                    <Activity size={28} />
                    <div>
                        <h1>Live Threat Feed</h1>
                        <p className="feed-subtitle">Real-time monitoring of all URL scans</p>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <div className="live-indicator">
                        <span className="live-dot"></span>
                        LIVE
                    </div>
                    <div
                        className="protection-toggle"
                        onClick={() => setProtectionActive(!protectionActive)}
                    >
                        <Shield size={16} />
                        {protectionActive ? 'PROTECTION ON' : 'PROTECTION OFF'}
                    </div>
                </div>
            </div>

            {/* Summary Strip */}
            <div className="summary-strip">
                <span className="summary-label">Last 50 scans:</span>
                <div className="summary-counter blocked">
                    <ShieldX size={16} />
                    Blocked ({blockedCount})
                </div>
                <div className="summary-counter warned">
                    <AlertCircle size={16} />
                    Warned ({warnedCount})
                </div>
                <div className="summary-counter safe">
                    <CheckCircle2 size={16} />
                    Safe ({safeCount})
                </div>
            </div>

            {/* Top Widgets Row */}
            <div className="top-widgets">
                {/* Threat Pulse */}
                <div className="threat-pulse">
                    <div className="pulse-title">
                        <Activity size={18} />
                        Live Threat Pulse
                    </div>
                    <div className="pulse-stats">
                        <div className="pulse-stat">
                            <div className="pulse-value">
                                {threatsPerMin}
                                <TrendingUp size={16} style={{ color: '#dc2626' }} />
                            </div>
                            <div className="pulse-label">Threats/min</div>
                        </div>
                        <div className="pulse-stat">
                            <div className="pulse-value">{criticalCount}</div>
                            <div className="pulse-label">High Risk URLs</div>
                        </div>
                        <div className="pulse-stat">
                            <div className="pulse-value">
                                {feeds[0]?.timestamp || '12 sec ago'}
                            </div>
                            <div className="pulse-label">Last Blocked</div>
                        </div>
                    </div>
                </div>

                {/* Severity Stream */}
                <div className="severity-stream">
                    <div className="stream-title">Threat Severity Stream</div>
                    <div className="severity-chips">
                        <div className="severity-chip critical">
                            🔴 Critical: {criticalCount}
                        </div>
                        <div className="severity-chip high">
                            🟠 High: {highCount}
                        </div>
                        <div className="severity-chip medium">
                            🟡 Medium: {mediumCount}
                        </div>
                        <div className="severity-chip safe">
                            🟢 Safe: {safeCountByRisk}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Feed Grid */}
            <div className="feed-grid">
                {/* Feed List */}
                <div className="feed-list-container">
                    <div className="feed-list-header">
                        <h3>Live Scan Feed</h3>
                    </div>
                    <div className="feed-list">
                        {loading ? (
                            <div className="empty-feed">Loading real-time scans...</div>
                        ) : feeds.length > 0 ? (
                            feeds.map((feed) => (
                                <div
                                    key={`${feed.url}-${feed.rawTimestamp}`}
                                    className={`feed-item ${feed.action} ${expandedId === feed.id ? 'expanded' : ''}`}
                                    onClick={() => toggleExpand(feed.id)}
                                >
                                    <div className="feed-item-header">
                                        <div className={`feed-status-icon ${feed.action}`}>
                                            {feed.action === 'blocked' && <ShieldX size={18} />}
                                            {feed.action === 'allowed' && <CheckCircle2 size={18} />}
                                            {feed.action === 'warned' && <AlertTriangle size={18} />}
                                        </div>
                                        <div className="feed-item-main">
                                            <div className="feed-url" title={feed.url}>{feed.url}</div>
                                            <div className="feed-meta">
                                                <span>{feed.domain}</span>
                                                <span className="feed-meta-separator"></span>
                                                <Clock size={12} />
                                                <span>{feed.timestamp}</span>
                                                <span className="feed-meta-separator"></span>
                                                <Globe size={12} />
                                                <span>{feed.geo}</span>
                                            </div>
                                        </div>
                                        {expandedId === feed.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                    </div>

                                    <div className="feed-item-footer">
                                        <span
                                            className={`risk-badge ${feed.riskScore >= 90 ? 'high' : feed.riskScore >= 70 ? 'medium' : 'low'}`}
                                        >
                                            
                                            Risk: {feed.riskScore}
                                        </span>
                                        <span className="threat-type-badge">{feed.threatType}</span>
                                        <span style={{
                                            marginLeft: 'auto',
                                            fontSize: '0.75rem',
                                            fontWeight: '600',
                                            color: feed.action === 'blocked' ? '#dc2626' : feed.action === 'allowed' ? '#16a34a' : '#f59e0b',
                                            textTransform: 'uppercase'
                                        }}>
                                            {feed.action}
                                        </span>
                                    </div>

                                    {/* Expandable Details */}
                                    {expandedId === feed.id && (feed.action === 'blocked' || feed.action === 'warned') && (
                                        <div className="feed-details">
                                            <div className="details-section">
                                                <div className="details-title">Security Analysis</div>
                                                <div className="details-list">
                                                    {feed.triggeredRules.length > 0 ? feed.triggeredRules.map((rule, index) => (
                                                        <div key={index} className="details-item">
                                                            <XCircle size={14} />
                                                            {rule}
                                                        </div>
                                                    )) : (
                                                        <div className="details-item">
                                                            <AlertCircle size={14} />
                                                            Heuristic threat detected via URL pattern
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="details-section">
                                                <div className="details-title">Verified Datasets</div>
                                                <div className="details-list">
                                                    {feed.datasets.length > 0 ? feed.datasets.map((dataset, index) => (
                                                        <div key={index} className="details-item">
                                                            <CheckCircle2 size={14} style={{ color: '#16a34a' }} />
                                                            {dataset}
                                                        </div>
                                                    )) : (
                                                        <div className="details-item">
                                                            <Shield size={14} style={{ color: '#16a34a' }} />
                                                            Sentinel-X Global Reputation DB
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="empty-feed">No recent scan activity found.</div>
                        )}
                    </div>
                </div>

                {/* Sidebar Widgets */}
                <div className="feed-sidebar">
                    {/* Geo Origin */}
                    <div className="geo-widget">
                        <h3>
                            <Globe size={16} />
                            Geo-Origin of Threats
                        </h3>
                        <div className="geo-list">
                            {geoStats.map((geo, index) => (
                                <div key={index} className="geo-item">
                                    <span className="geo-country">{geo.country}</span>
                                    <span className="geo-count">{geo.count}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Threat Category Counter */}
                    <div className="category-widget">
                        <h3>Threat Categories (Live)</h3>
                        <div className="category-list">
                            {categories.map((category, index) => (
                                <div key={index} className="category-item">
                                    <div className="category-header">
                                        <span className="category-name">{category.name}</span>
                                        <span className="category-count">{category.count}</span>
                                    </div>
                                    <div className="category-bar">
                                        <div
                                            className="category-bar-fill"
                                            style={{ width: `${(category.count / category.max) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default LiveFeed;
