import { Link } from 'react-router-dom';
import { Shield, Search, Users, Award, ArrowRight, CheckCircle } from 'lucide-react';
import { Boxes } from '../../components/ui/BackgroundBoxes';
import './Landing.css';

const Landing = () => {
    const features = [
        {
            icon: Shield,
            title: 'Three-Layer Detection',
            description: 'Local sanity check, network intelligence, and browser context analysis'
        },
        {
            icon: Search,
            title: 'Real-Time Scanning',
            description: 'Analyze any URL in milliseconds with our deterministic engine'
        },
        {
            icon: Users,
            title: 'Community Defense',
            description: 'Crowdsourced threat reporting strengthens protection for everyone'
        },
        {
            icon: Award,
            title: 'Earn AuraCoins',
            description: 'Get rewarded for verified scam reports (Coming Soon)'
        }
    ];

    return (
        <div className="landing-page">
            {/* Hero Section */}
            <section className="hero-section">
                {/* Animated Background */}
                <div className="hero-background">
                    <Boxes />
                    <div className="hero-overlay"></div>
                </div>

                <div className="hero-content">
                    <div className="hero-badge">
                        <Shield size={16} />
                        AI-Free Deterministic Security
                    </div>
                    <h1 className="hero-title">
                        Protecting Every <span className="highlight">Click</span> Before It Becomes a <span className="highlight-danger">Crime</span>
                    </h1>
                    <p className="hero-description">
                        SentinelX is India's first local-first cyber fraud firewall. Stop phishing attacks,
                        fake UPI links, and malicious URLs before they load — all without cloud dependency.
                    </p>
                    <div className="hero-actions">
                        <Link to="/scanner" className="btn btn-primary btn-lg">
                            <Search size={20} />
                            Try URL Scanner
                            <ArrowRight size={20} />
                        </Link>
                        <Link to="/dashboard" className="btn btn-secondary btn-lg">
                            View Dashboard
                        </Link>
                    </div>
                    <div className="hero-stats">
                        <div className="hero-stat">
                            <span className="stat-number">₹1,200+ Cr</span>
                            <span className="stat-label">Lost to cyber fraud annually</span>
                        </div>
                        <div className="hero-stat">
                            <span className="stat-number">65%</span>
                            <span className="stat-label">Victims are first-time users</span>
                        </div>
                        <div className="hero-stat">
                            <span className="stat-number">&lt; 5ms</span>
                            <span className="stat-label">Detection time</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <h2 className="section-title">How SentinelX Protects You</h2>
                <div className="features-grid">
                    {features.map((feature, index) => (
                        <div key={index} className="feature-card">
                            <div className="feature-icon">
                                <feature.icon size={24} />
                            </div>
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Detection Phases */}
            <section className="phases-section">
                <h2 className="section-title">Three-Layer Detection Engine</h2>
                <div className="phases-grid">
                    <div className="phase-item">
                        <div className="phase-badge">Phase 1</div>
                        <h3>Local Sanity Check</h3>
                        <p>Regex patterns, homograph detection, typosquatting analysis</p>
                        <span className="phase-time">Executes in &lt; 5ms</span>
                    </div>
                    <div className="phase-arrow">→</div>
                    <div className="phase-item">
                        <div className="phase-badge">Phase 2</div>
                        <h3>Network Intelligence</h3>
                        <p>Domain blacklist verification, SSL certificate forensics</p>
                        <span className="phase-time">Executes in &lt; 50ms</span>
                    </div>
                    <div className="phase-arrow">→</div>
                    <div className="phase-item">
                        <div className="phase-badge">Phase 3</div>
                        <h3>Browser Context</h3>
                        <p>Favicon hash matching, DOM structure analysis</p>
                        <span className="phase-time">Extension mode</span>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="cta-card">
                    <h2>Ready to Protect Yourself?</h2>
                    <p>Start scanning URLs now — it's free, fast, and completely local.</p>
                    <Link to="/scanner" className="btn btn-primary btn-lg">
                        <Search size={20} />
                        Scan Your First URL
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Landing;
