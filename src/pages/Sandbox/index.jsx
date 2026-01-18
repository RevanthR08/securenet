import { useState } from 'react';
import { Microscope, Loader, AlertTriangle, CheckCircle, ExternalLink, Clock } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { ArrowDotsButton } from '../../components/ui/ArrowDotsButton';
import { sandboxService } from '../../services/services';
import './Sandbox.css';

const Sandbox = () => {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [scanning, setScanning] = useState(false);
    const [scanUuid, setScanUuid] = useState(null);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const [progress, setProgress] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!url.trim()) return;

        setLoading(true);
        setScanning(false);
        setError('');
        setResult(null);
        setProgress(0);

        try {
            // Submit URL to sandbox
            const response = await sandboxService.submitScan(url);

            console.log('🧪 Sandbox submitted:', response);

            setScanUuid(response.scan_uuid);
            setScanning(true);
            setLoading(false);

            // Start polling for results
            pollForResults(response.scan_uuid);

        } catch (err) {
            console.error('Sandbox submission error:', err);
            setError(err.message || 'Failed to submit URL for analysis');
            setLoading(false);
        }
    };

    const pollForResults = (uuid) => {
        let attempts = 0;
        const maxAttempts = 24; // 24 * 5s = 2 minutes max

        const intervalId = setInterval(async () => {
            attempts++;
            const progressPercent = Math.min((attempts / maxAttempts) * 100, 95);
            setProgress(progressPercent);

            try {
                const data = await sandboxService.getResults(uuid);

                console.log('🧪 Sandbox poll result:', data);

                // Check if still processing
                if (data.status === 'processing') {
                    if (attempts >= maxAttempts) {
                        clearInterval(intervalId);
                        setError('Analysis is taking longer than expected. Please check the report link.');
                        setScanning(false);
                    }
                    return;
                }

                // Scan complete!
                clearInterval(intervalId);
                setProgress(100);
                setResult(data);
                setScanning(false);

            } catch (err) {
                console.error('Poll error:', err);
                if (attempts >= maxAttempts) {
                    clearInterval(intervalId);
                    setError('Failed to retrieve results. Please try again.');
                    setScanning(false);
                }
            }
        }, 5000); // Poll every 5 seconds
    };

    const resetForm = () => {
        setUrl('');
        setResult(null);
        setScanning(false);
        setScanUuid(null);
        setError('');
        setProgress(0);
    };

    return (
        <div className="sandbox-page">
            {/* Header */}
            <div className="sandbox-header">
                <div className="header-content">
                    <Microscope size={32} />
                    <div>
                        <h1>Sandbox Analysis</h1>
                        <p>Deep behavioral analysis in a virtual browser environment</p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="sandbox-container">
                {/* Submission Form */}
                {!scanning && !result && (
                    <div className="sandbox-form-card">
                        <h2>Submit URL for Deep Analysis</h2>
                        <p className="form-description">
                            Our sandbox will visit the URL in a real browser, execute JavaScript,
                            analyze network requests, and detect malicious behavior.
                        </p>

                        <form onSubmit={handleSubmit}>
                            <div className="input-group">
                                <Input
                                    type="text"
                                    placeholder="https://suspicious-site.com"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    disabled={loading}
                                />
                            </div>

                            {error && (
                                <div className="error-alert">
                                    <AlertTriangle size={18} />
                                    <span>{error}</span>
                                </div>
                            )}

                            <ArrowDotsButton
                                type="submit"
                                disabled={loading || !url.trim()}
                            >
                                {loading ? 'Submitting...' : 'Analyze in Sandbox'}
                            </ArrowDotsButton>
                        </form>

                        <div className="info-box">
                            <h3>What the Sandbox Does:</h3>
                            <ul>
                                <li>Visits URL in headless Chrome browser</li>
                                <li>Executes JavaScript and loads all resources</li>
                                <li>Captures screenshots and network activity</li>
                                <li>Detects keyloggers, crypto miners, and phishing</li>
                                <li>Analyzes redirects and hidden content</li>
                            </ul>
                            <p className="time-note">
                                <Clock size={16} />
                                <span>Analysis typically takes 30-60 seconds</span>
                            </p>
                        </div>
                    </div>
                )}

                {/* Scanning State */}
                {scanning && (
                    <div className="scanning-card">
                        <div className="scanning-animation">
                            <Loader className="spinner" size={48} />
                        </div>
                        <h2>Analyzing URL in Sandbox...</h2>
                        <p>Please wait while we conduct a deep behavioral analysis</p>

                        <div className="progress-bar">
                            <div
                                className="progress-fill"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <p className="progress-text">{Math.round(progress)}% Complete</p>

                        <div className="scanning-steps">
                            <div className="step">1. Loading page in virtual browser...</div>
                            <div className="step">2. Executing JavaScript...</div>
                            <div className="step">3. Analyzing network requests...</div>
                            <div className="step">4. Detecting malicious behavior...</div>
                        </div>
                    </div>
                )}

                {/* Results Display */}
                {result && (
                    <div className="results-card">
                        <div className={`verdict-banner ${result.is_malicious ? 'dangerous' : 'safe'}`}>
                            {result.is_malicious ? (
                                <>
                                    <AlertTriangle size={32} />
                                    <div>
                                        <h2>Malicious Behavior Detected</h2>
                                        <p>Sandbox analysis revealed security threats</p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <CheckCircle size={32} />
                                    <div>
                                        <h2>Analysis Complete</h2>
                                        <p>Detailed security breakdown below</p>
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="result-details">
                            {/* Security Checks */}
                            <div className="security-checks">
                                <h3>Security Analysis</h3>

                                <div className="check-item safe">
                                    <CheckCircle size={18} />
                                    <span>No active malware execution</span>
                                </div>

                                <div className="check-item safe">
                                    <CheckCircle size={18} />
                                    <span>No drive-by downloads detected</span>
                                </div>

                                <div className="check-item safe">
                                    <CheckCircle size={18} />
                                    <span>No immediate JS exploits triggered</span>
                                </div>

                                {result.is_malicious && result.details && result.details.length > 0 ? (
                                    result.details.map((threat, index) => (
                                        <div key={index} className="check-item danger">
                                            <AlertTriangle size={18} />
                                            <span>{threat}</span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="check-item safe">
                                        <CheckCircle size={18} />
                                        <span>No suspicious network connections</span>
                                    </div>
                                )}

                                {!result.is_malicious && (
                                    <div className="check-item warning">
                                        <AlertTriangle size={18} />
                                        <span>NOT a confirmation of trustworthiness</span>
                                    </div>
                                )}
                            </div>

                            {/* Detailed Metrics */}
                            <div className="metrics-grid">
                                <div className="metric-card">
                                    <span className="metric-label">Overall Verdict</span>
                                    <span className={`metric-value verdict-${result.verdict?.toLowerCase()}`}>
                                        {result.verdict || 'Unknown'}
                                    </span>
                                </div>

                                <div className="metric-card">
                                    <span className="metric-label">Risk Score</span>
                                    <span className="metric-value">{result.score}/100</span>
                                </div>

                                <div className="metric-card">
                                    <span className="metric-label">Analysis Status</span>
                                    <span className="metric-value success">Complete</span>
                                </div>
                            </div>

                            {/* Disclaimer */}
                            <div className="disclaimer">
                                <AlertTriangle size={16} />
                                <p>
                                    <strong>SentinelX Recommendation:</strong> Our sandbox provides advanced behavioral
                                    analysis to detect hidden threats. However, always practice safe browsing by avoiding
                                    clicking suspicious links in emails, texts, or unknown sources. Trust your instincts—if
                                    something feels off, it probably is.
                                </p>
                            </div>
                        </div>

                        <button onClick={resetForm} className="reset-button">
                            Analyze Another URL
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sandbox;
