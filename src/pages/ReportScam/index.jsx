import { useState, useEffect } from 'react';
import {
    AlertTriangle,
    Shield,
    TrendingUp,
    Coins,
    Link as LinkIcon,
    Mail,
    MessageSquare,
    ChevronDown,
    ChevronUp,
    CheckCircle,
    Clock,
    Zap
} from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { ArrowDotsButton } from '../../components/ui/ArrowDotsButton';
import { reportService, profileService, communityService } from '../../services/services';
import { authService } from '../../services/auth';
import './ReportScam.css';
import './InputOverride.css';
import '../Login/AlertStyles.css';
import './SuccessAlert.css';

const ReportScam = () => {
    const [reportType, setReportType] = useState('url');
    const [reportValue, setReportValue] = useState('');
    const [category, setCategory] = useState('');
    const [expandedRow, setExpandedRow] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    /* Mock data - Commented for future reference
    const userStats = {
        scamsReported: 12,
        threatsConfirmed: 9,
        highRiskScams: 4,
        auraCoins: 180
    };

    const myReports = [
        {
            id: 1,
            type: 'URL',
            value: 'https://paytm-verify-kyc.xyz/claim-reward',
            category: 'UPI Scam',
            threatLevel: 'High',
            riskScore: 82,
            status: 'Verified',
            coins: 50,
            date: '2 hours ago',
            details: {
                triggers: ['UPI keyword detected', 'New domain (<5 days)', 'High-risk TLD'],
                matchedDatasets: ['PhishTank', 'URLHaus'],
                coinBreakdown: '+50 (High-risk report)'
            }
        },
        {
            id: 2,
            type: 'Email',
            value: 'noreply@sbi-alert.com',
            category: 'Banking Phishing',
            threatLevel: 'Medium',
            riskScore: 55,
            status: 'Verified',
            coins: 25,
            date: '1 day ago',
            details: {
                triggers: ['Suspicious sender domain', 'Urgency keywords', 'Link to fake login'],
                matchedDatasets: ['PhishTank'],
                coinBreakdown: '+25 (Medium-risk report)'
            }
        },
        {
            id: 3,
            type: 'URL',
            value: 'https://jobs-google-india.site',
            category: 'Fake Job',
            threatLevel: 'Low',
            riskScore: 28,
            status: 'Pending',
            coins: 0,
            date: '3 days ago',
            details: {
                triggers: ['Brand impersonation', 'Suspicious TLD'],
                matchedDatasets: [],
                coinBreakdown: 'Pending verification'
            }
        }
    ];

    const coinsHistory = [
        { amount: 50, reason: 'High-risk UPI scam', date: '2 hours ago' },
        { amount: 25, reason: 'Medium phishing email', date: '1 day ago' },
        { amount: 10, reason: 'Low-risk suspicious link', date: '5 days ago' }
    ];
    */

    // Live data - using backend
    const [userStats, setUserStats] = useState({
        scamsReported: 0,
        threatsConfirmed: 0,
        highRiskScams: 0,
        auraCoins: 0
    });
    const [profileLoading, setProfileLoading] = useState(true);
    const [myReports, setMyReports] = useState([]);
    const [reportsLoading, setReportsLoading] = useState(true);

    const coinsHistory = []; // Will be loaded from API when endpoint is ready

    // Fetch user profile on mount
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setProfileLoading(true);
                const user = authService.getCurrentUser();

                if (user && user.id) {
                    const profile = await profileService.getProfile(user.id);

                    console.log('👤 User Profile:', profile);

                    setUserStats({
                        scamsReported: profile.total_reports || 0,
                        threatsConfirmed: profile.verified_reports || 0,
                        highRiskScams: Math.floor((profile.verified_reports || 0) * 0.6), // Estimate
                        auraCoins: profile.aura_points || 0
                    });
                }
            } catch (error) {
                console.error('Profile fetch error:', error);
            } finally {
                setProfileLoading(false);
            }
        };

        fetchProfile();
    }, []);

    // Fetch user's reports from community feed
    useEffect(() => {
        const fetchMyReports = async () => {
            try {
                setReportsLoading(true);
                const user = authService.getCurrentUser();

                if (user && user.id) {
                    // Get community feed
                    const feedData = await communityService.getLiveFeed();

                    console.log('📋 Community Feed:', feedData);
                    console.log('📋 First scan object:', feedData[0]);
                    console.log('📋 User ID to match:', user.id);

                    // Filter for current user's reports
                    const userReports = (feedData.reports || feedData || []).filter(
                        report => {
                            console.log('Checking report:', report.id, 'created_by:', report.created_by);
                            return report.created_by === user.id;
                        }
                    );

                    console.log('📋 My Reports:', userReports);

                    setMyReports(userReports);
                }
            } catch (error) {
                console.error('Reports fetch error:', error);
            } finally {
                setReportsLoading(false);
            }
        };

        fetchMyReports();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            // Call backend API to report scam
            const response = await reportService.reportScam(reportValue);

            // DEBUG: Log exact backend response
            console.log('🔍 Report Backend Response:', response);
            console.log('Full response object:', JSON.stringify(response, null, 2));

            // Show success message with Aura points earned
            const coinsEarned = response.aura_points || response.coins_earned || response.aura_coins || 0;
            console.log('Coins earned:', coinsEarned);

            setSuccess(
                `✅ Thank you! Scam reported successfully. ${coinsEarned > 0 ? `You earned +${coinsEarned} AuraCoins!` : ''}`
            );

            // Reset form
            setReportValue('');
            setCategory('');

            // Auto-hide success after 5 seconds
            setTimeout(() => setSuccess(''), 5000);

            // Refresh user profile to update stats
            const user = authService.getCurrentUser();
            if (user && user.id) {
                const updatedProfile = await profileService.getProfile(user.id);
                setUserStats({
                    scamsReported: updatedProfile.total_reports || 0,
                    threatsConfirmed: updatedProfile.verified_reports || 0,
                    highRiskScams: Math.floor((updatedProfile.verified_reports || 0) * 0.6),
                    auraCoins: updatedProfile.aura_points || 0
                });

                // Refresh reports list
                const feedData = await communityService.getLiveFeed();
                const userReports = (feedData.reports || feedData || []).filter(
                    report => report.created_by === user.id
                );
                setMyReports(userReports);
            }
        } catch (err) {
            console.error('Report error:', err);
            setError(err.message || 'Failed to submit report. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const getThreatColor = (level) => {
        switch (level) {
            case 'High': return 'threat-high';
            case 'Medium': return 'threat-medium';
            case 'Low': return 'threat-low';
            default: return '';
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Verified':
                return <span className="status-badge verified"><CheckCircle size={14} /> Verified</span>;
            case 'Pending':
                return <span className="status-badge pending"><Clock size={14} /> Pending</span>;
            case 'Analyzing':
                return <span className="status-badge analyzing"><Zap size={14} /> Analyzing</span>;
            default:
                return <span className="status-badge">{status}</span>;
        }
    };

    return (
        <div className="report-scam-page">
            {/* Header */}
            <div className="page-header">
                <div className="header-content">
                    <AlertTriangle size={28} className="header-icon" />
                    <div>
                        <h1>Report a Scam</h1>
                        <p>Help protect the community by reporting fraudulent URLs, emails, or messages</p>
                    </div>
                </div>
            </div>

            {/* Report Submission Form */}
            <div className="report-section">
                <h2 className="section-title">Submit a Report</h2>

                <form onSubmit={handleSubmit} className="report-form">
                    {error && (
                        <div className="error-alert">
                            <AlertTriangle size={16} />
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="success-alert">
                            <CheckCircle size={16} />
                            {success}
                        </div>
                    )}

                    <div className="form-group">
                        <label>Report Type</label>
                        <div className="type-selector">
                            <button
                                type="button"
                                className={`type-btn ${reportType === 'url' ? 'active' : ''}`}
                                onClick={() => setReportType('url')}
                            >
                                <LinkIcon size={18} />
                                URL
                            </button>
                            <button
                                type="button"
                                className={`type-btn ${reportType === 'email' ? 'active' : ''}`}
                                onClick={() => setReportType('email')}
                            >
                                <Mail size={18} />
                                Email
                            </button>
                            <button
                                type="button"
                                className={`type-btn ${reportType === 'sms' ? 'active' : ''}`}
                                onClick={() => setReportType('sms')}
                            >
                                <MessageSquare size={18} />
                                SMS
                            </button>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="reportValue">
                            {reportType === 'url' ? 'Suspicious URL' : reportType === 'email' ? 'Email Content' : 'Message Content'}
                        </label>
                        <Input
                            id="reportValue"
                            type="text"
                            placeholder={reportType === 'url' ? 'https://suspicious-link.com' : reportType === 'email' ? 'Paste email content or sender address' : 'Paste message content'}
                            value={reportValue}
                            onChange={(e) => setReportValue(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="category">Category (Optional)</label>
                        <select
                            id="category"
                            className="category-select"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="">Select a category</option>
                            <option value="upi">UPI Scam</option>
                            <option value="banking">Banking Phishing</option>
                            <option value="fake-job">Fake Job</option>
                            <option value="govt">Govt Scheme Fraud</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <ArrowDotsButton type="submit" disabled={loading}>
                        {loading ? 'Submitting Report...' : 'Report Scam'}
                    </ArrowDotsButton>
                </form>
            </div>

            {/* User Impact Summary */}
            <div className="impact-section">
                <h2 className="section-title">Your Community Impact</h2>

                <div className="impact-grid">
                    <div className="impact-card">
                        <Shield size={24} className="impact-icon" />
                        <div className="impact-value">{userStats.scamsReported}</div>
                        <div className="impact-label">Scams Reported</div>
                    </div>
                    <div className="impact-card">
                        <CheckCircle size={24} className="impact-icon" />
                        <div className="impact-value">{userStats.threatsConfirmed}</div>
                        <div className="impact-label">Confirmed Threats</div>
                    </div>
                    <div className="impact-card">
                        <AlertTriangle size={24} className="impact-icon" />
                        <div className="impact-value">{userStats.highRiskScams}</div>
                        <div className="impact-label">High-Risk Scams</div>
                    </div>
                    <div className="impact-card coins">
                        <Coins size={24} className="impact-icon" />
                        <div className="impact-value">{userStats.auraCoins}</div>
                        <div className="impact-label">AuraCoins Earned</div>
                    </div>
                </div>
            </div>

            {/* My Reported Scams */}
            <div className="reports-section">
                <h2 className="section-title">My Reports</h2>

                <div className="reports-table">
                    <div className="table-header">
                        <div className="th type">Type</div>
                        <div className="th value">Value</div>
                        <div className="th category">Category</div>
                        <div className="th threat">Threat Level</div>
                        <div className="th score">Risk Score</div>
                        <div className="th status">Status</div>
                        <div className="th coins">Coins</div>
                        <div className="th expand"></div>
                    </div>

                    {myReports.map((report) => (
                        <div key={report.id} className="table-row-container">
                            <div
                                className="table-row"
                                onClick={() => setExpandedRow(expandedRow === report.id ? null : report.id)}
                            >
                                <div className="td type">{report.type}</div>
                                <div className="td value">{report.value}</div>
                                <div className="td category">{report.category}</div>
                                <div className="td threat">
                                    <span className={`threat-badge ${getThreatColor(report.threatLevel)}`}>
                                        {report.threatLevel}
                                    </span>
                                </div>
                                <div className="td score">{report.riskScore}</div>
                                <div className="td status">{getStatusBadge(report.status)}</div>
                                <div className="td coins">
                                    {report.coins > 0 ? `+${report.coins}` : '-'}
                                </div>
                                <div className="td expand">
                                    {expandedRow === report.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                </div>
                            </div>

                            {/* Expanded Detail View */}
                            {expandedRow === report.id && (
                                <div className="detail-view">
                                    <h3>Detection Details</h3>

                                    <div className="detail-section">
                                        <h4>Triggered Rules:</h4>
                                        <ul className="triggers-list">
                                            {(report.details?.triggers || []).length > 0 ? (
                                                report.details.triggers.map((trigger, i) => (
                                                    <li key={i}>✔ {trigger}</li>
                                                ))
                                            ) : (
                                                <li>✔ Report submitted for analysis</li>
                                            )}
                                        </ul>
                                    </div>

                                    {(report.details?.matchedDatasets || []).length > 0 && (
                                        <div className="detail-section">
                                            <h4>Matched Datasets:</h4>
                                            <div className="datasets">
                                                {report.details.matchedDatasets.map((dataset, i) => (
                                                    <span key={i} className="dataset-badge">{dataset}</span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="detail-section">
                                        <h4>Final Risk Score:</h4>
                                        <div className="risk-score-bar">
                                            <div
                                                className={`risk-fill ${getThreatColor(report.threatLevel)}`}
                                                style={{ width: `${report.riskScore}%` }}
                                            />
                                            <span className="risk-number">{report.riskScore}/100</span>
                                        </div>
                                    </div>

                                    <div className="detail-section">
                                        <h4>Coin Reward:</h4>
                                        <p className="coin-breakdown">{report.details?.coinBreakdown || 'Pending verification'}</p>
                                    </div>

                                    <div className="detail-footer">
                                        <span className="report-date">Reported {report.date}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* AuraCoins Wallet */}
            <div className="coins-section">
                <h2 className="section-title">
                    <Coins size={24} />
                    AuraCoins Wallet
                </h2>

                <div className="coins-balance">
                    <div className="balance-amount">{userStats.auraCoins}</div>
                    <div className="balance-label">Total Balance</div>
                </div>

                <h3 className="history-title">Recent Earnings</h3>
                <div className="coins-history">
                    {coinsHistory.map((entry, i) => (
                        <div key={i} className="history-item">
                            <div className="history-amount">+{entry.amount}</div>
                            <div className="history-details">
                                <div className="history-reason">{entry.reason}</div>
                                <div className="history-date">{entry.date}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ReportScam;
