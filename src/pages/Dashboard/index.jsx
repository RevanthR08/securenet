import { useState, useEffect } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
    PieChart, Pie, Cell
} from 'recharts';
import SafeChart from '../../components/SafeChart';
import {
    Shield,
    Search,
    ShieldCheck,
    ShieldX,
    AlertTriangle,
    TrendingUp,
    Clock,
    Users,
    Zap,
    BarChart3,
    Activity,
    Globe,
    CheckCircle2,
    XCircle,
    AlertCircle
} from 'lucide-react';
import { statsService, profileService } from '../../services/services';
import { authService } from '../../services/auth';
import './Dashboard.css';

/* Mock data - Commented for future reference
const timelineData = [
    { date: 'Jan 11', blocked: 12, warned: 5, allowed: 18 },
    { date: 'Jan 12', blocked: 28, warned: 8, allowed: 22 },
    { date: 'Jan 13', blocked: 18, warned: 12, allowed: 25 },
    { date: 'Jan 14', blocked: 15, warned: 6, allowed: 20 },
    { date: 'Jan 15', blocked: 22, warned: 9, allowed: 28 },
    { date: 'Jan 16', blocked: 14, warned: 4, allowed: 24 },
    { date: 'Jan 17', blocked: 18, warned: 7, allowed: 20 },
];

const fraudCategories = [
    { name: 'UPI Scam', value: 35, color: '#ef4444' },
    { name: 'Banking Phishing', value: 28, color: '#f97316' },
    { name: 'Govt Scheme Fraud', value: 18, color: '#8b5cf6' },
    { name: 'Investment Scam', value: 12, color: '#06b6d4' },
    { name: 'Job Offer Scam', value: 7, color: '#22c55e' },
];

const recentActivity = [
    { url: 'paytm-verify-kyc-secure.xyz', type: 'UPI Phishing', status: 'blocked' },
    { url: 'google.com', type: 'Safe Website', status: 'allowed' },
    { url: 'sbi-netbanking-login.com', type: 'Banking Phishing', status: 'blocked' },
    { url: 'amazon.in', type: 'Safe Website', status: 'allowed' },
    { url: 'job-offer-2024.online', type: 'Job Scam', status: 'warned' },
    { url: 'govt-scheme-apply.xyz', type: 'Govt Scheme Fraud', status: 'blocked' },
];

const quickTestUrls = [
    { label: 'google.com', safe: true },
    { label: 'amazon.in', safe: true },
    { label: 'my-online-shopping-store.com', safe: false },
    { label: 'paytm-verify-kyc-upd...', safe: false },
    { label: 'sbi-netbanking-secur...', safe: false },
    { label: 'gpay-cashback-100-ru...', safe: false },
];
*/

// Live data placeholders (will be populated from backend)
const timelineData = [];
const fraudCategories = [];
const recentActivity = [];
const quickTestUrls = [
    { label: 'google.com', safe: true },
    { label: 'amazon.in', safe: true },
    { label: 'my-online-shopping-store.com', safe: false },
    { label: 'paytm-verify-kyc-upd...', safe: false },
    { label: 'sbi-netbanking-secur...', safe: false },
    { label: 'gpay-cashback-100-ru...', safe: false },
];



const Dashboard = () => {
    const [urlInput, setUrlInput] = useState('');
    const [stats, setStats] = useState({
        totalScans: 0,
        blocked: 0,
        warned: 0,
        safe: 0
    });
    const [fraudCategories, setFraudCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch real-time stats from backend
    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);
                const data = await statsService.getSummary();

                console.log('📊 Dashboard Stats:', data);

                // Update stats from backend
                setStats({
                    totalScans: data.total_scans || 0,
                    blocked: data.breakdown?.Dangerous || 0,
                    warned: data.breakdown?.Medium || 0,
                    safe: data.breakdown?.Safe || 0
                });

                // Set fraud categories for pie chart
                if (data.chart_data && data.chart_data.length > 0) {
                    setFraudCategories(data.chart_data.map(item => ({
                        name: item.name,
                        value: item.value,
                        color: item.color
                    })));
                }
            } catch (error) {
                console.error('Dashboard stats error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();

        // Refresh every 30 seconds
        const interval = setInterval(fetchStats, 30000);
        return () => clearInterval(interval);
    }, []);

    // Force WebView to reflow on mount (Capacitor-specific fix)
    useEffect(() => {
        window.dispatchEvent(new Event('resize'));
    }, []);

    const statsCards = [
        { label: 'Total Scans', value: stats.totalScans, icon: Search, color: 'blue', change: '+12%' },
        { label: 'Threats Blocked', value: stats.blocked, icon: ShieldX, color: 'red', change: '+5%' },
        { label: 'Warnings Issued', value: stats.warned, icon: AlertTriangle, color: 'orange', change: '+2' },
        { label: 'Safe URLs', value: stats.safe, icon: ShieldCheck, color: 'green', change: '+8%' },
    ];

    return (
        <div className="dashboard-page">
            {/* Header */}
            <div className="dashboard-header">
                <div className="dashboard-title">
                    <Shield size={28} />
                    <div>
                        <h1>SentinelX</h1>
                        <span className="subtitle">AI-Free Deterministic Web Security System for India</span>
                    </div>
                </div>
                <div className="status-badge">
                    <span className="dot"></span>
                    PROTECTION ACTIVE
                </div>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid">
                {statsCards.map((stat, index) => (
                    <div key={index} className="stat-card">
                        <div className={`stat-icon ${stat.color}`}>
                            <stat.icon size={24} />
                        </div>
                        <div className="stat-content">
                            <div className="stat-label">{stat.label}</div>
                            <div className="stat-value">{stat.value}</div>
                            <span className={`stat-change positive`}>
                                <TrendingUp size={12} />
                                {stat.change}
                            </span>
                        </div>
                    </div>
                ))}
            </div>




            {/* Main Dashboard Grid */}
            <div className="dashboard-grid">
                {/* Left Column */}
                <div className="dashboard-main">
                    {/* Threat Timeline */}
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">
                                <Activity size={18} />
                                Threat Timeline
                            </h3>
                            <select style={{ padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb', fontSize: '0.75rem' }}>
                                <option>This Week</option>
                                <option>This Month</option>
                            </select>
                        </div>
                        <div className="chart-container">
                            <SafeChart height={280}>
                                <LineChart data={timelineData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#9ca3af" />
                                    <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
                                    <Tooltip
                                        contentStyle={{
                                            background: '#fff',
                                            border: '1px solid #e5e7eb',
                                            borderRadius: '0.5rem',
                                            fontSize: '0.875rem'
                                        }}
                                    />
                                    <Line type="monotone" dataKey="blocked" stroke="#ef4444" strokeWidth={2} dot={{ fill: '#ef4444', r: 4 }} />
                                    <Line type="monotone" dataKey="warned" stroke="#f59e0b" strokeWidth={2} dot={{ fill: '#f59e0b', r: 4 }} />
                                    <Line type="monotone" dataKey="allowed" stroke="#22c55e" strokeWidth={2} dot={{ fill: '#22c55e', r: 4 }} />
                                </LineChart>
                            </SafeChart>
                        </div>
                        <div className="chart-legend">
                            <span className="legend-item"><span className="legend-dot" style={{ background: '#ef4444' }}></span> Blocked</span>
                            <span className="legend-item"><span className="legend-dot" style={{ background: '#f59e0b' }}></span> Warned</span>
                            <span className="legend-item"><span className="legend-dot" style={{ background: '#22c55e' }}></span> Allowed</span>
                        </div>
                    </div>

                    {/* Fraud Category Distribution */}
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">
                                <AlertTriangle size={18} />
                                Fraud Category Distribution
                            </h3>
                        </div>
                        <div className="donut-container">
                        </div>
                        <div className="chart-container">
                            <SafeChart height={300}>
                                {fraudCategories.length > 0 ? (
                                    <PieChart>
                                        <Pie
                                            data={fraudCategories}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={100}
                                            paddingAngle={2}
                                            dataKey="value"
                                        >
                                            {fraudCategories.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{
                                                background: '#fff',
                                                border: '1px solid #e5e7eb',
                                                borderRadius: '0.5rem',
                                                fontSize: '0.875rem'
                                            }}
                                        />
                                    </PieChart>
                                ) : (
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#9ca3af' }}>
                                        {loading ? 'Loading data...' : 'No fraud data available'}
                                    </div>
                                )}
                            </SafeChart>
                        </div>

                        {/* Fraud Category Legend */}
                        {fraudCategories.length > 0 && (
                            <div className="fraud-legend">
                                {fraudCategories.map((category, index) => (
                                    <div key={index} className="legend-item">
                                        <div className="legend-color" style={{ background: category.color }}></div>
                                        <div className="legend-info">
                                            <div className="legend-name">{category.name}</div>
                                            <div className="legend-value">{category.value} scans</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column */}
                <div className="dashboard-sidebar">
                    {/* Risk Exposure */}
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">
                                <Shield size={18} />
                                Risk Exposure
                            </h3>
                        </div>
                        <div className="risk-gauge">
                            <div className="gauge-chart">
                                <SafeChart height={180}>
                                    <PieChart>
                                        <Pie
                                            data={[{ value: 45 }, { value: 55 }]}
                                            cx="50%"
                                            cy="50%"
                                            startAngle={180}
                                            endAngle={0}
                                            innerRadius={60}
                                            outerRadius={80}
                                            dataKey="value"
                                        >
                                            <Cell fill="#f59e0b" />
                                            <Cell fill="#e5e7eb" />
                                        </Pie>
                                    </PieChart>
                                </SafeChart>
                                <div className="gauge-value">
                                    <div className="gauge-number">45</div>
                                    <div className="gauge-label">Risk Score</div>
                                </div>
                            </div>
                            <span className="risk-level moderate">MODERATE</span>
                        </div>
                        <div className="risk-stats">
                            <div className="risk-stat">
                                <div className="risk-stat-value" style={{ color: '#ef4444' }}>18</div>
                                <div className="risk-stat-label">Blocked</div>
                            </div>
                            <div className="risk-stat">
                                <div className="risk-stat-value" style={{ color: '#f59e0b' }}>1</div>
                                <div className="risk-stat-label">Warned</div>
                            </div>
                            <div className="risk-stat">
                                <div className="risk-stat-value" style={{ color: '#22c55e' }}>20</div>
                                <div className="risk-stat-label">Safe</div>
                            </div>
                        </div>
                    </div>

                    {/* Community Impact */}
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">
                                <Users size={18} />
                                Community Impact
                            </h3>
                        </div>
                        <div className="community-cards">
                            <div className="community-card">
                                <div className="community-icon">
                                    <Shield size={20} />
                                </div>
                                <div className="community-content">
                                    <div className="community-value">1</div>
                                    <div className="community-label">Community Scams Blocked</div>
                                </div>
                            </div>
                            <div className="community-card alert">
                                <div className="community-icon">
                                    <AlertTriangle size={20} />
                                </div>
                                <div className="community-content">
                                    <div className="community-value">UPI Scam</div>
                                    <div className="community-label">Most Reported This Week</div>
                                </div>
                            </div>
                            <div className="community-card discovery">
                                <div className="community-icon">
                                    <Zap size={20} />
                                </div>
                                <div className="community-content">
                                    <div className="community-value">1</div>
                                    <div className="community-label">New Threats Discovered</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">
                                <Clock size={18} />
                                Recent Activity
                            </h3>
                        </div>
                        <div className="activity-feed">
                            {recentActivity.map((activity, index) => (
                                <div key={index} className="activity-item">
                                    <div className={`activity-icon ${activity.status}`}>
                                        {activity.status === 'blocked' && <XCircle size={18} />}
                                        {activity.status === 'allowed' && <CheckCircle2 size={18} />}
                                        {activity.status === 'warned' && <AlertCircle size={18} />}
                                    </div>
                                    <div className="activity-content">
                                        <div className="activity-url">{activity.url}</div>
                                        <div className="activity-type">{activity.type}</div>
                                    </div>
                                    <span className={`activity-badge ${activity.status}`}>
                                        {activity.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
