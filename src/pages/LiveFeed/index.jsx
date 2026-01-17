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
import './LiveFeed.css';

//Mock live feed data
const mockFeedData = [
    {
        id: 1,
        url: 'paytm-verify-kyc-upd.xyz/claim-reward',
        domain: 'paytm-verify-kyc-upd.xyz',
        timestamp: '12 sec ago',
        threatType: 'UPI Scam',
        riskScore: 95,
        action: 'blocked',
        geo: 'Russia',
        triggeredRules: ['Domain age < 7 days', 'Keyword: KYC/Reward', 'IP reputation: malicious'],
        datasets: ['PhishTank', 'URLHaus']
    },
    {
        id: 2,
        url: 'google.com',
        domain: 'google.com',
        timestamp: '45 sec ago',
        threatType: 'Safe Website',
        riskScore: 2,
        action: 'allowed',
        geo: 'USA',
        triggeredRules: [],
        datasets: []
    },
    {
        id: 3,
        url: 'sbi-netbanking-login.com/verify-account',
        domain: 'sbi-netbanking-login.com',
        timestamp: '1 min ago',
        threatType: 'Banking Phishing',
        riskScore: 88,
        action: 'blocked',
        geo: 'India',
        triggeredRules: ['Typosquatting detected', 'Fake login page', 'SSL age: 2 days'],
        datasets: ['OpenPhish', 'Community Reports']
    },
    {
        id: 4,
        url: 'amazon.in',
        domain: 'amazon.in',
        timestamp: '2 min ago',
        threatType: 'Safe Website',
        riskScore: 5,
        action: 'allowed',
        geo: 'India',
        triggeredRules: [],
        datasets: []
    },
    {
        id: 5,
        url: 'job-offer-2024.online/apply-now',
        domain: 'job-offer-2024.online',
        timestamp: '3 min ago',
        threatType: 'Job Scam',
        riskScore: 72,
        action: 'warned',
        geo: 'Unknown',
        triggeredRules: ['Suspicious keywords', 'New domain registration'],
        datasets: ['ScamAdviser']
    },
    {
        id: 6,
        url: 'govt-scheme-subsidy.xyz/apply',
        domain: 'govt-scheme-subsidy.xyz',
        timestamp: '4 min ago',
        threatType: 'Govt Scheme Fraud',
        riskScore: 91,
        action: 'blocked',
        geo: 'India',
        triggeredRules: ['Impersonation detected', 'No valid SSL', 'Blacklisted IP'],
        datasets: ['PhishTank', 'URLHaus']
    }
];

const LiveFeed = () => {
    const [feeds, setFeeds] = useState(mockFeedData);
    const [expandedId, setExpandedId] = useState(null);
    const [protectionActive, setProtectionActive] = useState(true);
    const [threatsPerMin, setThreatsPerMin] = useState(2.4);

    // Simulate live updates
    useEffect(() => {
        const interval = setInterval(() => {
            setThreatsPerMin((prev) => (Math.random() * 3 + 1).toFixed(1));
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const blockedCount = feeds.filter(f => f.action === 'blocked').length;
    const warnedCount = feeds.filter(f => f.action === 'warned').length;
    const safeCount = feeds.filter(f => f.action === 'allowed').length;

    const criticalCount = feeds.filter(f => f.riskScore >= 90).length;
    const highCount = feeds.filter(f => f.riskScore >= 70 && f.riskScore < 90).length;
    const mediumCount = feeds.filter(f => f.riskScore >= 40 && f.riskScore < 70).length;
    const safeCountByRisk = feeds.filter(f => f.riskScore < 40).length;

    // Geo origin stats
    const geoStats = [
        { country: 'India', count: 6 },
        { country: 'Russia', count: 3 },
        { country: 'USA', count: 2 },
        { country: 'Unknown', count: 4 }
    ];

    // Threat categories
    const categories = [
        { name: 'UPI Scam', count: 6, max: 10 },
        { name: 'Banking Phish', count: 3, max: 10 },
        { name: 'Job Scam', count: 2, max: 10 },
        { name: 'Govt Fraud', count: 2, max: 10 }
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
                        {feeds.map((feed) => (
                            <div
                                key={feed.id}
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
                                        <div className="feed-url">{feed.url}</div>
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
                                {expandedId === feed.id && feed.action === 'blocked' && (
                                    <div className="feed-details">
                                        <div className="details-section">
                                            <div className="details-title">Triggered Rules</div>
                                            <div className="details-list">
                                                {feed.triggeredRules.map((rule, index) => (
                                                    <div key={index} className="details-item">
                                                        <XCircle size={14} />
                                                        {rule}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="details-section">
                                            <div className="details-title">Matched Datasets</div>
                                            <div className="details-list">
                                                {feed.datasets.map((dataset, index) => (
                                                    <div key={index} className="details-item">
                                                        <CheckCircle2 size={14} style={{ color: '#16a34a' }} />
                                                        {dataset}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
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

            {/* Action Intelligence Strip */}
            <div className="action-strip">
                <div className="action-strip-title">
                    <Sparkles size={18} />
                    Action Intelligence
                </div>
                <div className="action-items">
                    <div className="action-item">
                        <div className="action-icon warning">
                            <AlertTriangle size={16} />
                        </div>
                        <div className="action-text">
                            <strong>Spike detected</strong> in UPI scams (+42% in last hour)
                        </div>
                    </div>
                    <div className="action-item">
                        <div className="action-icon shield">
                            <Shield size={16} />
                        </div>
                        <div className="action-text">
                            <strong>Rule Engine</strong> auto-tightened detection parameters
                        </div>
                    </div>
                    <div className="action-item">
                        <div className="action-icon users">
                            <Users size={16} />
                        </div>
                        <div className="action-text">
                            <strong>12 users</strong> protected in last 10 minutes
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LiveFeed;
