import { useState } from 'react';
import {
    Settings,
    Shield,
    ShieldCheck,
    ShieldX,
    Cpu,
    Plus,
    Edit,
    Trash2,
    Search,
    Database,
    ScanSearch,
    FileText,
    CheckCircle2,
    TrendingUp
} from 'lucide-react';
import './RuleEngine.css';

const RuleEngine = () => {
    const [activeTab, setActiveTab] = useState('rules');
    const [rules, setRules] = useState([
        {
            id: 1,
            name: 'EXCESSIVE_URL_LENGTH',
            description: 'Detects URLs longer than 120 characters - Common phishing indicator',
            score: '+20 pts',
            enabled: true
        },
        {
            id: 2,
            name: 'DEEP_SUBDOMAIN_CHAIN',
            description: 'Flags domains with more than 3 subdomain levels',
            score: '+25 pts',
            enabled: true
        },
        {
            id: 3,
            name: 'HIGH_RISK_TLD',
            description: 'Detects suspicious TLDs (e.g. .xyz, .tk, .top)',
            score: '+30 pts',
            enabled: true
        },
        {
            id: 4,
            name: 'IP_BASED_DOMAIN',
            description: 'Blocks URLs using raw IP addresses instead of domain names',
            score: '+40 pts',
            enabled: true
        },
        {
            id: 5,
            name: 'HOMOGRAPH_ATTACK',
            description: 'Detects lookalike domains impersonating trusted brands',
            score: '+35 pts',
            enabled: true
        },
        {
            id: 6,
            name: 'UPI_FRAUD_KEYWORDS',
            description: 'Detects UPI / payment scam keywords in URLs',
            score: '+45 pts',
            enabled: true
        },
        {
            id: 7,
            name: 'GOVT_SCHEME_KEYWORDS',
            description: 'Detects fake government scheme references',
            score: '+40 pts',
            enabled: true
        },
        {
            id: 8,
            name: 'MALICIOUS_FILE_EXTENSION',
            description: 'Detects executable or script file links',
            score: '+50 pts',
            enabled: true
        },
        {
            id: 9,
            name: 'LINK_LENGTH_EXCEEDED',
            description: 'Secondary length-based rule for extremely long URLs',
            score: '+15 pts',
            enabled: true
        }
    ]);

    const [blacklist, setBlacklist] = useState([
        'paytm-verify-kyc-upd.xyz',
        'sbi-netbanking-login.com',
        'google-verify-account.tk',
        'my-online-shopping-store.com',
        'govt-scheme-subsidy.xyz',
        'job-offer-2024.online',
        'upi-cashback-reward.top',
        'amazon-prize-winner.xyz'
    ]);

    const toggleRule = (ruleId) => {
        setRules(rules.map(rule =>
            rule.id === ruleId ? { ...rule, enabled: !rule.enabled } : rule
        ));
    };

    const activeRulesCount = rules.filter(r => r.enabled).length;

    return (
        <div className="rule-engine-page">
            {/* Header */}
            <div className="rule-engine-header">
                <h1>Rule Engine Control Panel</h1>
                <p className="rule-engine-subtitle">
                    Configure detection rules and manage threat blacklists - Core decision-making system
                </p>
            </div>

            {/* Status Cards */}
            <div className="status-cards">
                <div className="status-card">
                    <div className="status-card-icon blue">
                        <Settings size={24} />
                    </div>
                    <div className="status-card-content">
                        <div className="status-card-value">{rules.length}</div>
                        <div className="status-card-label">Total Rules</div>
                    </div>
                </div>

                <div className="status-card">
                    <div className="status-card-icon green">
                        <ShieldCheck size={24} />
                    </div>
                    <div className="status-card-content">
                        <div className="status-card-value">{activeRulesCount}</div>
                        <div className="status-card-label">Active Rules</div>
                    </div>
                </div>

                <div className="status-card">
                    <div className="status-card-icon red">
                        <ShieldX size={24} />
                    </div>
                    <div className="status-card-content">
                        <div className="status-card-value">{blacklist.length}</div>
                        <div className="status-card-label">Blacklisted</div>
                    </div>
                </div>

                <div className="status-card">
                    <div className="status-card-icon purple">
                        <Cpu size={24} />
                    </div>
                    <div className="status-card-content">
                        <div className="status-card-value">100%</div>
                        <div className="status-card-label">Local Processing</div>
                    </div>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="tab-navigation">
                <button
                    className={`tab-btn ${activeTab === 'rules' ? 'active' : ''}`}
                    onClick={() => setActiveTab('rules')}
                >
                    Detection Rules
                </button>
                <button
                    className={`tab-btn ${activeTab === 'blacklist' ? 'active' : ''}`}
                    onClick={() => setActiveTab('blacklist')}
                >
                    Blacklist
                </button>
            </div>

            {/* Detection Rules View */}
            {activeTab === 'rules' && (
                <>
                    <div className="rules-section">
                        <div className="rules-header">
                            <h2>Detection Rules</h2>
                            <button className="add-rule-btn">
                                <Plus size={18} />
                                Add Rule
                            </button>
                        </div>

                        <div className="rules-list">
                            {rules.map((rule) => (
                                <div key={rule.id} className="rule-card">
                                    <div className="rule-info">
                                        <div className="rule-name">{rule.name}</div>
                                        <div className="rule-description">{rule.description}</div>
                                    </div>
                                    <div className="rule-score">
                                        <TrendingUp size={14} />
                                        {rule.score}
                                    </div>
                                    <div className="rule-actions">
                                        <div
                                            className={`toggle-switch ${rule.enabled ? 'active' : ''}`}
                                            onClick={() => toggleRule(rule.id)}
                                        >
                                            <div className="toggle-slider"></div>
                                        </div>
                                        <button className="rule-action-btn">
                                            <Edit size={16} />
                                        </button>
                                        <button className="rule-action-btn delete">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Detection Architecture */}
                    <div className="detection-architecture">
                        <h2 className="architecture-title">Detection Engine Architecture</h2>
                        <div className="architecture-grid">
                            {/* Layer 1 */}
                            <div className="architecture-layer">
                                <div className="layer-header">
                                    <div className="layer-icon blue">
                                        <Database size={20} />
                                    </div>
                                    <div className="layer-title">Layer 1: Domain Reputation</div>
                                </div>
                                <div className="layer-description">
                                    Uses known malicious domain datasets
                                </div>
                                <div className="layer-examples">
                                    <div className="layer-example">
                                        <CheckCircle2 size={14} />
                                        PhishTank
                                    </div>
                                    <div className="layer-example">
                                        <CheckCircle2 size={14} />
                                        OpenPhish
                                    </div>
                                    <div className="layer-example">
                                        <CheckCircle2 size={14} />
                                        Malware domain lists
                                    </div>
                                </div>
                            </div>

                            {/* Layer 2 */}
                            <div className="architecture-layer">
                                <div className="layer-header">
                                    <div className="layer-icon yellow">
                                        <ScanSearch size={20} />
                                    </div>
                                    <div className="layer-title">Layer 2: URL Forensics</div>
                                </div>
                                <div className="layer-description">
                                    Structural analysis of URLs
                                </div>
                                <div className="layer-examples">
                                    <div className="layer-example">
                                        <CheckCircle2 size={14} />
                                        URL length analysis
                                    </div>
                                    <div className="layer-example">
                                        <CheckCircle2 size={14} />
                                        TLD checks
                                    </div>
                                    <div className="layer-example">
                                        <CheckCircle2 size={14} />
                                        Homograph detection
                                    </div>
                                    <div className="layer-example">
                                        <CheckCircle2 size={14} />
                                        Pattern-based heuristics
                                    </div>
                                </div>
                            </div>

                            {/* Layer 3 */}
                            <div className="architecture-layer">
                                <div className="layer-header">
                                    <div className="layer-icon purple">
                                        <FileText size={20} />
                                    </div>
                                    <div className="layer-title">Layer 3: Content Signatures</div>
                                </div>
                                <div className="layer-description">
                                    Keyword-based detection (Indian-specific fraud)
                                </div>
                                <div className="layer-examples">
                                    <div className="layer-example">
                                        <CheckCircle2 size={14} />
                                        Banking keywords
                                    </div>
                                    <div className="layer-example">
                                        <CheckCircle2 size={14} />
                                        UPI scam patterns
                                    </div>
                                    <div className="layer-example">
                                        <CheckCircle2 size={14} />
                                        Government schemes
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Blacklist View */}
            {activeTab === 'blacklist' && (
                <div className="blacklist-container">
                    <div className="blacklist-header">
                        <h2>Blacklisted Domains</h2>
                        <input
                            type="text"
                            className="blacklist-search"
                            placeholder="Search blacklist..."
                        />
                    </div>
                    <div className="blacklist-list">
                        {blacklist.map((domain, index) => (
                            <div key={index} className="blacklist-item">
                                <span className="blacklist-domain">{domain}</span>
                                <button className="blacklist-remove-btn">Remove</button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default RuleEngine;
