import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sidebar,
  SidebarBody,
  SidebarLink
} from './components/Sidebar/Sidebar';
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
  Settings
} from 'lucide-react';
import Scanner from './pages/Scanner';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';
import ReportScam from './pages/ReportScam';
import Leaderboard from './pages/Leaderboard';
import Extension from './pages/Extension';
import LiveFeed from './pages/LiveFeed';
import RuleEngine from './pages/RuleEngine';
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

  return (
    <Router>
      <div className="app-container">
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

        <main
          className="main-content"
          style={{
            marginLeft: open ? '260px' : '70px',
          }}
        >
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/scanner" element={<Scanner />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/live-feed" element={<LiveFeed />} />
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
