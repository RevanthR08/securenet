import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Menu,
    X,
    Home,
    Search,
    LayoutDashboard,
    Activity,
    Settings,
    AlertTriangle,
    Trophy,
    Puzzle,
    Users
} from 'lucide-react';
import './MobileNav.css';

const MobileNav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const navItems = [
        { path: '/', label: 'Home', icon: Home },
        { path: '/scanner', label: 'URL Scanner', icon: Search },
        { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/live-feed', label: 'Live Feed', icon: Activity },
        { path: '/community', label: 'Community', icon: Users },
        { path: '/rule-engine', label: 'Rule Engine', icon: Settings },
        { path: '/report', label: 'Report Scam', icon: AlertTriangle },
        { path: '/leaderboard', label: 'Leaderboard', icon: Trophy },
        { path: '/extension', label: 'Extension', icon: Puzzle },
    ];

    const handleNavigation = (path) => {
        navigate(path);
        setIsOpen(false);
    };

    return (
        <>
            {/* Floating Action Button (FAB) - Bottom Center */}
            <button
                className={`mobile-menu-fab ${isOpen ? 'open' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div
                    className={`mobile-menu-overlay ${isOpen ? 'show' : ''}`}
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Mobile Menu Drawer - Bottom Sheet */}
            <div className={`mobile-menu-drawer ${isOpen ? 'open' : ''}`}>
                <div className="mobile-menu-handle"></div>

                <div className="mobile-menu-header">
                    <div className="mobile-menu-logo">
                        <div className="logo-icon">🛡️</div>
                        <div>
                            <h2>SentinelX</h2>
                            <p>AI-Free Security</p>
                        </div>
                    </div>
                </div>

                <nav className="mobile-menu-nav">
                    {navItems.map((item) => (
                        <button
                            key={item.path}
                            className="mobile-nav-item"
                            onClick={() => handleNavigation(item.path)}
                        >
                            <item.icon size={20} />
                            <span>{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="mobile-menu-footer">
                    <div className="version-info">v1.0.0 Beta</div>
                </div>
            </div>
        </>
    );
};

export default MobileNav;
