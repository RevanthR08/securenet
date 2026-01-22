import { useState, useEffect } from 'react';
import {
    Shield,
    Activity,
    TrendingUp,
    Globe,
    AlertTriangle,
    CheckCircle2,
    Award,
    Users,
    Zap,
    Clock
} from 'lucide-react';
import { communityService, reportService } from '../../services/services';
import './Community.css';
import './FeedStates.css';

/* Mock data - Commented for future reference
const communityReports = [
    {
        url: 'https://paytm-verify-kyc-update.xyz/claim-reward',
        type: 'UPI Scam',
        status: 'Auto-Detected',
        verified: true,
        firstReport: true,
        time: '2:14:08 PM',
        note: 'I get this im via whatsapp,is a phishing link',
        reporter: '+85 AC'
    },
    {
        url: 'https://paytm-verify-kyc-update.xyz/claim-reward',
        type: 'UPI Scam',
        status: 'Auto-Detected',
        time: '3:57:18 AM',
        reporter: null
    },
    {
        url: 'https://paytm-verify-kyc-update.xyz/claim-reward',
        type: 'UPI Scam',
        status: 'Auto-Detected',
        time: '3:56:28 AM',
        reporter: null
    },
    {
        url: 'https://paytm-verify-kyc-update.xyz/claim-reward',
        type: 'UPI Scam',
        status: 'Auto-Detected',
        time: '3:54:34 AM',
        reporter: null
    },
    {
        url: 'https://paytm-verify-kyc-update.xyz/claim-reward',
        type: 'UPI Scam',
        status: 'Auto-Detected',
        time: '3:54:31 AM',
        reporter: null
    },
    {
        url: 'https://sbi-netbanking-secure.tk/login-verify',
        type: 'Banking Phishing',
        status: 'Auto-Detected',
        time: '3:50:46 AM',
        reporter: null
    }
];
*/


const Community = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const stats = [
        { label: 'Reports (24h)', value: '0', icon: Activity, color: 'red' },
        { label: 'Total Threats', value: reports.length.toString(), icon: Globe, color: 'purple' },
        { label: 'Top Threat Type', value: 'UPI Scam', icon: TrendingUp, color: 'orange', subtitle: true }
    ];

    // Fetch community feed on mount
    useEffect(() => {
        const fetchFeed = async () => {
            try {
                setLoading(true);

                // Fetch all user reports from the community
                const data = await reportService.getAllReports();

                console.log('🌐 Community Reports Data:', data);

                // Transform backend data to match UI format
                const transformedReports = (data.reports || data.feed || data || []).map(report => {
                    let domain = 'Unknown';
                    try {
                        const urlToParse = report.url?.includes('://') ? report.url : `http://${report.url}`;
                        domain = new URL(urlToParse).hostname;
                    } catch (e) {
                        domain = report.url || 'Unknown';
                    }

                    return {
                        url: report.url || report.scanned_url || '',
                        type: report.category || report.type || 'Scam Report',
                        status: report.status || 'Pending',
                        verified: report.status === 'Verified' || report.verified || false,
                        firstReport: report.first_report || false,
                        time: new Date(report.created_at || report.timestamp).toLocaleTimeString(),
                        note: report.note || report.description || '',
                        reporter: report.username || (report.created_by ? `User#${report.created_by.toString().slice(-4)}` : null)
                    };
                });

                console.log('✅ Transformed Reports:', transformedReports);
                setReports(transformedReports);
                setError('');
            } catch (err) {
                console.error('Feed error:', err);
                setError('Failed to load community feed');
            } finally {
                setLoading(false);
            }
        };

        fetchFeed();

        // Refresh every 15 seconds
        const interval = setInterval(fetchFeed, 15000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="community-page">
            {/* Header */}
            <div className="community-header">
                <div className="community-title">
                    <Shield size={32} />
                    <div>
                        <h1>Community Defense Network</h1>
                        <p className="subtitle">Real-time threat intelligence powered by Cyber Guardians</p>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="community-stats-grid">
                {stats.map((stat, index) => (
                    <div key={index} className={`community-stat-card ${stat.color}`}>
                        <div className="stat-icon-wrapper">
                            <stat.icon size={24} />
                        </div>
                        <div className="stat-details">
                            {stat.subtitle ? (
                                <>
                                    <div className="stat-subtitle">{stat.label}</div>
                                    <div className="stat-main-value">{stat.value}</div>
                                </>
                            ) : (
                                <>
                                    <div className="stat-big-value">{stat.value}</div>
                                    <div className="stat-description">{stat.label}</div>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="community-content-grid">
                {/* Live Feed */}
                <div className="community-feed-section">
                    <div className="section-header">
                        <Activity size={20} />
                        <h2>Live Community Reports</h2>
                    </div>

                    <div className="reports-feed">
                        {loading && (
                            <div className="feed-loading">
                                <Clock size={24} className="spinning" />
                                <p>Loading live feed...</p>
                            </div>
                        )}

                        {error && (
                            <div className="feed-error">
                                <AlertTriangle size={24} />
                                <p>{error}</p>
                            </div>
                        )}

                        {!loading && !error && reports.length === 0 && (
                            <div className="feed-empty">
                                <Shield size={40} />
                                <p>No reports yet. Be the first to report!</p>
                            </div>
                        )}

                        {!loading && !error && reports.map((report, index) => (
                            <div key={index} className="report-item">
                                <div className="report-main">
                                    <div className="report-url">
                                        <Globe size={16} />
                                        <span>{report.url}</span>
                                    </div>
                                    <div className="report-time">{report.time}</div>
                                </div>

                                <div className="report-badges">
                                    <span className="badge upi-scam">{report.type}</span>
                                    <span className="badge auto-detected">{report.status}</span>
                                    {report.verified && <span className="badge verified"><CheckCircle2 size={12} /> Verified</span>}
                                    {report.firstReport && <span className="badge first-report"><Award size={12} /> First Report</span>}
                                    {report.reporter && <span className="badge reporter">{report.reporter}</span>}
                                </div>

                                {report.note && (
                                    <div className="report-note">
                                        {report.note}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="community-sidebar-section">
                    {/* Community Impact */}
                    <div className="impact-card">
                        <div className="section-header">
                            <Users size={20} />
                            <h3>Community Impact</h3>
                        </div>

                        <div className="impact-stat green">
                            <Shield size={28} />
                            <div>
                                <div className="impact-value">1</div>
                                <div className="impact-label">Community Scams Blocked</div>
                            </div>
                        </div>

                        <div className="impact-stat orange">
                            <AlertTriangle size={28} />
                            <div>
                                <div className="impact-value">UPI Scam</div>
                                <div className="impact-label">Most Reported This Week</div>
                            </div>
                        </div>

                        <div className="impact-stat purple">
                            <TrendingUp size={28} />
                            <div>
                                <div className="impact-value">1</div>
                                <div className="impact-label">New Threats Discovered</div>
                            </div>
                        </div>
                    </div>

                    {/* How It Works */}
                    <div className="how-it-works-card">
                        <div className="section-header">
                            <Zap size={20} />
                            <h3>How It Works</h3>
                        </div>

                        <div className="steps-list">
                            <div className="step-item">
                                <div className="step-number">1</div>
                                <p>Report suspicious URLs you encounter</p>
                            </div>
                            <div className="step-item">
                                <div className="step-number">2</div>
                                <p>System validates and checks for duplicates</p>
                            </div>
                            <div className="step-item">
                                <div className="step-number">3</div>
                                <p>Earn AuraCoins for verified reports</p>
                            </div>
                            <div className="step-item">
                                <div className="step-number">4</div>
                                <p>Build reputation and climb leaderboard</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Community;
