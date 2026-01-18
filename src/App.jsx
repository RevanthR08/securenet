import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sidebar,
  SidebarBody,
  SidebarLink
} from './components/Sidebar/Sidebar';
import MobileNav from './components/MobileNav';
import { cn } from './lib/utils';
import {
  Shield,
  Search,
  LayoutDashboard,
  AlertTriangle,
  Trophy,
  Puzzle,
  Home,
  FileWarning,
  Activity,
  Settings,
  Users,
  Microscope
} from 'lucide-react';
import Scanner from './pages/Scanner';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';
import ReportScam from './pages/ReportScam';
import Leaderboard from './pages/Leaderboard';
import Extension from './pages/Extension';
import Sandbox from './pages/Sandbox';
import LiveFeed from './pages/LiveFeed';
import RuleEngine from './pages/RuleEngine';
import TestPage from './pages/TestPage';
import Community from './pages/Community';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';

// Logo component
const Logo = ({ open }) => {
  return (
    <Link to="/" className="sidebar-logo">
      <div className="sidebar-logo-icon">
        <Shield size={18} />
      </div>
      <motion.span
        animate={{
          display: open ? 'inline-block' : 'none',
          opacity: open ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
        className="sidebar-logo-text"
      >
        SentinelX
      </motion.span>
    </Link>
  );
};

// Logo icon only
const LogoIcon = () => {
  return (
    <Link to="/" className="sidebar-logo">
      <div className="sidebar-logo-icon">
        <Shield size={18} />
      </div>
    </Link>
  );
};

function App() {
  const [open, setOpen] = useState(false);

  // Capacitor WebView stabilization on mount
  useEffect(() => {
    // Initial stabilization
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 300);
  }, []);

  const links = [
    {
      label: 'Home',
      href: '/',
      icon: <Home size={20} />
    },
    {
      label: 'URL Scanner',
      href: '/scanner',
      icon: <Search size={20} />
    },
    {
      label: 'Dashboard',
      href: '/dashboard',
      icon: <LayoutDashboard size={20} />
    },
    {
      label: 'Live Feed',
      href: '/live-feed',
      icon: <Activity size={20} />
    },
    {
      label: 'Community',
      href: '/community',
      icon: <Users size={20} />
    },
    {
      label: 'Sandbox',
      href: '/sandbox',
      icon: <Microscope size={20} />
    },
    {
      label: 'Rule Engine',
      href: '/rule-engine',
      icon: <Settings size={20} />
    },
    {
      label: 'Report Scam',
      href: '/report',
      icon: <AlertTriangle size={20} />
    },
    {
      label: 'Leaderboard',
      href: '/leaderboard',
      icon: <Trophy size={20} />
    },
    {
      label: 'Extension',
      href: '/extension',
      icon: <Puzzle size={20} />
    }
  ];

  const isAuthPage = () => {
    const path = window.location.pathname;
    return path === '/login' || path === '/register';
  };

  return (
    <Router>
      <div className="app-container">
        {!isAuthPage() && <MobileNav />}
        {!isAuthPage() && (
          <Sidebar open={open} setOpen={setOpen}>
            <SidebarBody className="sidebar-body">
              <div className="sidebar-content">
                {open ? <Logo open={open} /> : <LogoIcon />}
                <nav className="sidebar-nav">
                  {links.map((link, idx) => (
                    <SidebarLink key={idx} link={link} />
                  ))}
                </nav>
              </div>
              <div className="sidebar-footer">
                <motion.span
                  animate={{
                    display: open ? 'block' : 'none',
                    opacity: open ? 1 : 0,
                  }}
                  className="version-badge"
                >
                  v1.0.0 Beta
                </motion.span>
              </div>
            </SidebarBody>
          </Sidebar>
        )}

        <main
          className={cn('main-content', {
            'auth-main-content': isAuthPage()
          })}
          style={{
            marginLeft: isAuthPage() ? '0' : (open ? '260px' : '70px'),
          }}
        >
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/scanner" element={<Scanner />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/live-feed" element={<LiveFeed />} />
            <Route path="/community" element={<Community />} />
            <Route path="/sandbox" element={<Sandbox />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/rule-engine" element={<RuleEngine />} />
            <Route path="/report" element={<ReportScam />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/extension" element={<Extension />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
