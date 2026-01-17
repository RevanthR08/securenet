import { useState } from 'react';
import {
    Search,
    Shield,
    ShieldCheck,
    ShieldX,
    AlertTriangle,
    CheckCircle2,
    XCircle,
    Link2,
    FileSearch,
    Fingerprint,
    Globe,
    Lock,
    Eye,
    FileCode,
    AlertOctagon,
    Loader2
} from 'lucide-react';
import './Scanner.css';

// Mock data for demonstration
const mockResults = {
    safe: {
        verdict: 'safe',
        url: 'https://www.google.com',
        riskScore: 5,
        phases: [
            {
                name: 'Local Sanity Check',
                subtitle: 'Pattern & Signature Analysis',
                time: '< 2ms',
                checks: [
                    { status: 'pass', title: 'No malicious patterns', description: 'URL structure is clean' },
                    { status: 'pass', title: 'No homograph attack', description: 'No deceptive characters detected' },
                    { status: 'pass', title: 'No typosquatting', description: 'Domain name is legitimate' }
                ]
            },
            {
                name: 'Network Intelligence',
                subtitle: 'Domain & SSL Verification',
                time: '< 50ms',
                checks: [
                    { status: 'pass', title: 'Not in blacklist', description: 'Domain not found in threat database' },
                    { status: 'pass', title: 'Valid SSL certificate', description: 'Certificate age: 2 years, trusted CA' }
                ]
            },
            {
                name: 'Browser Context',
                subtitle: 'Visual & DOM Analysis',
                time: '< 5ms',
                checks: [
                    { status: 'pass', title: 'Favicon verified', description: 'Icon matches known legitimate site' },
                    { status: 'pass', title: 'DOM structure safe', description: 'No hidden forms or suspicious elements' }
                ]
            }
        ],
        chain: []
    },
    danger: {
        verdict: 'danger',
        url: 'https://amaz0n-secure-login.xyz/verify',
        riskScore: 95,
        phases: [
            {
                name: 'Local Sanity Check',
                subtitle: 'Pattern & Signature Analysis',
                time: '< 2ms',
                checks: [
                    { status: 'fail', title: 'Suspicious pattern detected', description: 'URL contains deceptive keywords' },
                    { status: 'fail', title: 'Homograph attack detected', description: '"0" used instead of "o" in domain' },
                    { status: 'fail', title: 'Typosquatting detected', description: 'Similar to amazon.com (distance: 2)' }
                ]
            },
            {
                name: 'Network Intelligence',
                subtitle: 'Domain & SSL Verification',
                time: '< 50ms',
                checks: [
                    { status: 'fail', title: 'Domain in blacklist', description: 'Found in community threat database' },
                    { status: 'warning', title: 'New SSL certificate', description: 'Certificate age: 3 days (suspicious)' }
                ]
            },
            {
                name: 'Browser Context',
                subtitle: 'Visual & DOM Analysis',
                time: '< 5ms',
                checks: [
                    { status: 'fail', title: 'Favicon mismatch', description: 'Using Amazon favicon on unrelated domain' },
                    { status: 'fail', title: 'Suspicious DOM', description: 'Hidden credential capture form detected' }
                ]
            }
        ],
        chain: [
            { icon: 'pattern', title: 'Pattern Analysis', description: 'Detected "login" and "verify" in suspicious domain' },
            { icon: 'homograph', title: 'Homograph Detection', description: 'Character substitution: amaz0n → amazon' },
            { icon: 'blacklist', title: 'Blacklist Match', description: 'Domain reported by 47 users in community' },
            { icon: 'verdict', title: 'Final Verdict', description: 'BLOCKED - High confidence phishing attempt' }
        ]
    }
};

const sampleUrls = [
    { label: 'google.com', url: 'https://www.google.com', safe: true },
    { label: 'amazon.in', url: 'https://www.amazon.in', safe: true },
    { label: 'my-online-shopping-store.com', url: 'https://my-online-shopping-store.com', safe: false },
    { label: 'paytm-verify-kyc-upd...', url: 'https://paytm-verify-kyc-update.xyz', safe: false },
    { label: 'sbi-netbanking-secur...', url: 'https://sbi-netbanking-secure-login.com', safe: false }
];

const Scanner = () => {
    const [url, setUrl] = useState('');
    const [isScanning, setIsScanning] = useState(false);
    const [scanPhase, setScanPhase] = useState('');
    const [result, setResult] = useState(null);

    const handleScan = async () => {
        if (!url.trim()) return;

        setIsScanning(true);
        setResult(null);

        // Simulate three-phase scanning
        const phases = [
            'Phase 1: Local Sanity Check...',
            'Phase 2: Network Intelligence...',
            'Phase 3: Browser Context Analysis...'
        ];

        for (const phase of phases) {
            setScanPhase(phase);
            await new Promise(resolve => setTimeout(resolve, 800));
        }

        // Determine result based on URL
        const isSafe = url.includes('google.com') || url.includes('amazon.in') ||
            url.includes('facebook.com') || url.includes('github.com');

        setResult(isSafe ? mockResults.safe : mockResults.danger);
        setIsScanning(false);
        setScanPhase('');
    };

    const handleSampleUrl = (sampleUrl) => {
        setUrl(sampleUrl);
        setResult(null);
    };

    const getCheckIcon = (status) => {
        switch (status) {
            case 'pass':
                return <CheckCircle2 size={14} />;
            case 'fail':
                return <XCircle size={14} />;
            case 'warning':
                return <AlertTriangle size={14} />;
            default:
                return null;
        }
    };

    const getChainIcon = (icon) => {
        switch (icon) {
            case 'pattern':
                return <FileSearch size={20} />;
            case 'homograph':
                return <Eye size={20} />;
            case 'blacklist':
                return <AlertOctagon size={20} />;
            case 'verdict':
                return <ShieldX size={20} />;
            default:
                return <AlertTriangle size={20} />;
        }
    };

    return (
        <div className="scanner-page">
            <div className="scanner-header">
                <h1>URL Scanner</h1>
                <p>Analyze any URL for potential threats using our three-layer detection engine</p>
            </div>

            {/* URL Input Section */}
            <div className="scanner-input-section">
                <div className="url-input-container">
                    <div className="url-input-wrapper">
                        <Link2 className="input-icon" size={20} />
                        <input
                            type="text"
                            className="url-input"
                            placeholder="Enter URL to analyze (e.g., https://suspicious-site.xyz/verify-upi)"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleScan()}
                        />
                    </div>
                    <button
                        className={`scan-button ${isScanning ? 'scanning' : ''}`}
                        onClick={handleScan}
                        disabled={isScanning || !url.trim()}
                    >
                        {isScanning ? (
                            <>
                                <Loader2 size={20} className="spinning" />
                                Scanning...
                            </>
                        ) : (
                            <>
                                <Search size={20} />
                                Scan URL
                            </>
                        )}
                    </button>
                </div>

                <div className="sample-urls">
                    <span>Quick Test:</span>
                    {sampleUrls.map((sample, index) => (
                        <button
                            key={index}
                            className={`sample-url-btn ${sample.safe ? 'safe' : 'danger'}`}
                            onClick={() => handleSampleUrl(sample.url)}
                        >
                            {sample.safe ? '✓' : '⚠'} {sample.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Scanning Animation */}
            {isScanning && (
                <div className="scanning-overlay">
                    <div className="scanning-spinner"></div>
                    <div className="scanning-text">Analyzing URL...</div>
                    <div className="scanning-phase">{scanPhase}</div>
                </div>
            )}

            {/* Results */}
            {result && !isScanning && (
                <div className="scanner-results">
                    {/* Verdict Card */}
                    <div className={`verdict-card ${result.verdict}`}>
                        <div className="verdict-icon">
                            {result.verdict === 'safe' ? (
                                <ShieldCheck size={40} />
                            ) : (
                                <ShieldX size={40} />
                            )}
                        </div>
                        <h2 className="verdict-title">
                            {result.verdict === 'safe' ? 'URL is Safe' : 'Threat Detected - Blocked'}
                        </h2>
                        <p className="verdict-url">{url}</p>
                    </div>

                    {/* Phase Analysis */}
                    <div className="phase-analysis">
                        {result.phases.map((phase, index) => (
                            <div key={index} className="phase-card">
                                <div className="phase-header">
                                    <div className="phase-number">{index + 1}</div>
                                    <div className="phase-info">
                                        <h3>{phase.name}</h3>
                                        <span>{phase.time}</span>
                                    </div>
                                </div>
                                <div className="phase-checks">
                                    {phase.checks.map((check, checkIndex) => (
                                        <div key={checkIndex} className="phase-check">
                                            <div className={`check-icon ${check.status}`}>
                                                {getCheckIcon(check.status)}
                                            </div>
                                            <div className="check-content">
                                                <strong>{check.title}</strong>
                                                <span>{check.description}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Threat Reasoning Chain (only for dangerous URLs) */}
                    {result.verdict === 'danger' && result.chain.length > 0 && (
                        <div className="threat-chain">
                            <h3>
                                <AlertTriangle size={20} />
                                Threat Reasoning Chain
                            </h3>
                            <div className="chain-steps">
                                {result.chain.map((step, index) => (
                                    <div key={index} className="chain-step">
                                        <div className="step-icon detected">
                                            {getChainIcon(step.icon)}
                                        </div>
                                        <div className="step-content">
                                            <h4>{step.title}</h4>
                                            <p>{step.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Scanner;
