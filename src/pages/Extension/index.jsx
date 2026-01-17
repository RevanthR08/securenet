import {
    Shield,
    Zap,
    Lock,
    Settings,
    ArrowRight,
    CheckCircle2,
    Github,
    Code2,
    Download
} from 'lucide-react';
import './Extension.css';

const Extension = () => {
    const features = [
        {
            icon: Zap,
            title: 'Real-time Interception',
            description: 'Blocks threats before the page loads'
        },
        {
            icon: Shield,
            title: 'Local Processing',
            description: 'No data sent to cloud servers'
        },
        {
            icon: Lock,
            title: 'Privacy First',
            description: 'Browsing activity remains private'
        },
        {
            icon: Settings,
            title: 'Configurable Rules',
            description: 'Detection parameters can be customized'
        }
    ];

    const manifestCode = `{
  "manifest_version": 3,
  "name": "SENTINELX Security Shield",
  "version": "1.0.0",
  "description": "AI-Free Deterministic Web Security for India",
  
  "permissions": [
    "activeTab",
    "webNavigation",
    "storage"
  ],
  
  "host_permissions": [
    "<all_urls>"
  ],
  
  "background": {
    "service_worker": "background.js"
  },
  
  "action": {
    "default_popup": "popup.html",
    "default_icon": {
      "16": "icons/icon16.png",
      "48": "icons/icon48.png",
      "128": "icons/icon128.png"
    }
  }
}`;

    const engineSteps = [
        {
            title: 'Install Python 3.8+',
            code: 'python --version',
            description: 'Ensure Python 3.8 or higher is installed'
        },
        {
            title: 'Install FastAPI and Uvicorn',
            code: 'pip install fastapi uvicorn',
            description: 'Install required dependencies for the local server'
        },
        {
            title: 'Run Local Server',
            code: 'uvicorn main:app --reload --port 8000',
            description: 'Start the FastAPI analysis engine on port 8000'
        }
    ];

    const extensionSteps = [
        {
            title: 'Create Extension Folder',
            description: 'Download and extract the extension files to a folder'
        },
        {
            title: 'Navigate to chrome://extensions',
            description: 'Open Chrome and go to the extensions page'
        },
        {
            title: 'Enable Developer Mode',
            description: 'Toggle the Developer Mode switch in the top right'
        },
        {
            title: 'Load Unpacked Extension',
            description: 'Click "Load unpacked" and select the extension folder'
        }
    ];

    return (
        <div className="extension-page">
            {/* Header */}
            <div className="extension-header">
                <h1>Browser Extension Package</h1>
                <p className="extension-subtitle">
                    Deployable browser extension with local FastAPI analysis engine - Complete source code available
                </p>
            </div>

            {/* Feature Highlights */}
            <div className="feature-highlights">
                {features.map((feature, index) => (
                    <div key={index} className="feature-highlight-card">
                        <div className="feature-highlight-icon">
                            <feature.icon size={28} />
                        </div>
                        <h3>{feature.title}</h3>
                        <p>{feature.description}</p>
                    </div>
                ))}
            </div>

            {/* Architecture Flow */}
            <div className="architecture-flow">
                <h2 className="flow-title">Extension Architecture Flow</h2>
                <div className="flow-diagram">
                    <div className="flow-item">
                        <div className="flow-box">manifest.json</div>
                        <div className="flow-label">Extension Config</div>
                    </div>
                    <div className="flow-arrow">→</div>
                    <div className="flow-item">
                        <div className="flow-box">background.js</div>
                        <div className="flow-label">Service Worker</div>
                    </div>
                    <div className="flow-arrow">→</div>
                    <div className="flow-item">
                        <div className="flow-box">FastAPI Server</div>
                        <div className="flow-label">Local Analysis</div>
                    </div>
                </div>
            </div>

            {/* Code Preview Section */}
            <div className="code-preview-section">
                <div className="code-preview-header">
                    <div className="code-preview-title">manifest.json</div>
                    <div className="code-badge">Chrome MV3</div>
                </div>
                <div className="code-block">
                    <pre style={{ margin: 0 }}>
                        {manifestCode.split('\n').map((line, index) => {
                            let formattedLine = line;

                            // Syntax highlighting
                            formattedLine = formattedLine.replace(
                                /"([^"]+)":/g,
                                '<span class="code-key">"$1"</span>:'
                            );
                            formattedLine = formattedLine.replace(
                                /: "([^"]+)"/g,
                                ': <span class="code-string">"$1"</span>'
                            );
                            formattedLine = formattedLine.replace(
                                /: (\d+)/g,
                                ': <span class="code-number">$1</span>'
                            );

                            return (
                                <div
                                    key={index}
                                    className="code-line"
                                    dangerouslySetInnerHTML={{ __html: formattedLine }}
                                />
                            );
                        })}
                    </pre>
                </div>
            </div>

            {/* Installation Guide */}
            <div className="installation-guide">
                {/* Local Analysis Engine */}
                <div className="install-section">
                    <div className="install-section-header">
                        <div className="install-section-number">1</div>
                        <h3 className="install-section-title">Local Analysis Engine</h3>
                    </div>
                    <div className="install-steps">
                        {engineSteps.map((step, index) => (
                            <div key={index} className="install-step">
                                <CheckCircle2 className="install-step-icon" />
                                <div className="install-step-content">
                                    <div className="install-step-title">{step.title}</div>
                                    {step.code && (
                                        <div className="install-step-code">{step.code}</div>
                                    )}
                                    <div className="install-step-description">{step.description}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Chrome Extension */}
                <div className="install-section">
                    <div className="install-section-header">
                        <div className="install-section-number">2</div>
                        <h3 className="install-section-title">Chrome Extension</h3>
                    </div>
                    <div className="install-steps">
                        {extensionSteps.map((step, index) => (
                            <div key={index} className="install-step">
                                <CheckCircle2 className="install-step-icon" />
                                <div className="install-step-content">
                                    <div className="install-step-title">{step.title}</div>
                                    <div className="install-step-description">{step.description}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Source Code Banner */}
           
        </div>
    );
};

export default Extension;
