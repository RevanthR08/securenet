import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { ArrowDotsButton } from '../../components/ui/ArrowDotsButton';
import { authService } from '../../services/auth';
import {
    Shield,
    ChevronLeft,
    AtSign,
    Github,
    Apple
} from 'lucide-react';
import './Login.css';
import './AlertStyles.css';

// Google Icon SVG
const GoogleIcon = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        {...props}
    >
        <g>
            <path d="M12.479,14.265v-3.279h11.049c0.108,0.571,0.164,1.247,0.164,1.979c0,2.46-0.672,5.502-2.84,7.669C18.744,22.829,16.051,24,12.483,24C5.869,24,0.308,18.613,0.308,12S5.869,0,12.483,0c3.659,0,6.265,1.436,8.223,3.307L18.392,5.62c-1.404-1.317-3.307-2.341-5.913-2.341C7.65,3.279,3.873,7.171,3.873,12s3.777,8.721,8.606,8.721c3.132,0,4.916-1.258,6.059-2.401c0.927-0.927,1.537-2.251,1.777-4.059L12.479,14.265z" />
        </g>
    </svg>
);

// Animated Background Paths
const FloatingPaths = ({ position }) => {
    const paths = Array.from({ length: 36 }, (_, i) => ({
        id: i,
        d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position} -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${152 - i * 5 * position} ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${684 - i * 5 * position} ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
        width: 0.5 + i * 0.03,
    }));

    return (
        <div className="floating-paths">
            <svg
                className="paths-svg"
                viewBox="0 0 696 316"
                fill="none"
            >
                <title>Background Paths</title>
                {paths.map((path) => (
                    <motion.path
                        key={path.id}
                        d={path.d}
                        stroke="currentColor"
                        strokeWidth={path.width}
                        strokeOpacity={0.1 + path.id * 0.03}
                        initial={{ pathLength: 0.3, opacity: 0.6 }}
                        animate={{
                            pathLength: 1,
                            opacity: [0.3, 0.6, 0.3],
                            pathOffset: [0, 1, 0],
                        }}
                        transition={{
                            duration: 20 + Math.random() * 10,
                            repeat: Infinity,
                            ease: 'linear',
                        }}
                    />
                ))}
            </svg>
        </div>
    );
};

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await authService.login(email, password);
            // Redirect to dashboard on success
            navigate('/dashboard');
        } catch (err) {
            setError(err.message || 'Login failed. Please check your credentials.');
            console.error('Login error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="auth-page">
            {/* Left Side - Animated Background with Quote */}
            <div className="auth-sidebar">
                <div className="auth-sidebar-overlay" />

                <div className="auth-sidebar-content">
                    <div className="auth-logo">
                        <Shield size={24} />
                        <p className="auth-logo-text">SentinelX</p>
                    </div>

                    <div className="auth-quote">
                        <blockquote>
                            <p className="quote-text">
                                "SentinelX has helped me protect my family from cyber frauds and scams. It's a must-have security tool for every Indian."
                            </p>
                            <footer className="quote-author">~ Cyber Guardian</footer>
                        </blockquote>
                    </div>
                </div>

                {/* Animated Paths */}
                <div className="auth-background">
                    <FloatingPaths position={1} />
                    <FloatingPaths position={-1} />
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="auth-content">
                {/* Background Decoration */}
                <div className="auth-decoration">
                    <div className="decoration-circle decoration-1" />
                    <div className="decoration-circle decoration-2" />
                    <div className="decoration-circle decoration-3" />
                </div>

                <Button variant="ghost" className="auth-back-btn" asChild>
                    <Link to="/">
                        <ChevronLeft size={16} />
                        Home
                    </Link>
                </Button>

                <div className="auth-form-container">
                    <div className="auth-logo-mobile">
                        <Shield size={24} />
                        <p className="auth-logo-text">SentinelX</p>
                    </div>

                    <div className="auth-header">
                        <h1>Sign In to SentinelX</h1>
                        <p>Login or create your account to get started</p>
                    </div>

                    <div className="auth-social-buttons">
                        <Button type="button" size="lg" className="social-btn google-btn">
                            <GoogleIcon className="btn-icon" />
                            Continue with Google
                        </Button>
                        <Button type="button" size="lg" className="social-btn apple-btn">
                            <Apple size={16} className="btn-icon" />
                            Continue with Apple
                        </Button>
                        <Button type="button" size="lg" className="social-btn github-btn">
                            <Github size={16} className="btn-icon" />
                            Continue with GitHub
                        </Button>
                    </div>

                    <div className="auth-separator">
                        <div className="separator-line" />
                        <span>OR</span>
                        <div className="separator-line" />
                    </div>

                    <form onSubmit={handleSubmit} className="auth-form">
                        {error && (
                            <div className="error-alert">
                                <AlertTriangle size={16} />
                                {error}
                            </div>
                        )}

                        <p className="form-hint">
                            Enter your email address to sign in or create an account
                        </p>

                        <div className="input-wrapper">
                            <Input
                                type="email"
                                placeholder="your.email@example.com"
                                className="input-with-icon"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <div className="input-icon">
                                <AtSign size={16} />
                            </div>
                        </div>

                        <div className="input-wrapper">
                            <Input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <ArrowDotsButton type="submit" className="submit-btn" disabled={loading}>
                            {loading ? 'Signing in...' : 'Continue With Email'}
                        </ArrowDotsButton>
                    </form>

                    <p className="auth-footer-text">
                        Don't have an account?{' '}
                        <Link to="/register" className="auth-link">
                            Sign up
                        </Link>
                    </p>

                    <p className="auth-terms">
                        By continuing, you agree to our{' '}
                        <a href="#" className="terms-link">
                            Terms of Service
                        </a>{' '}
                        and{' '}
                        <a href="#" className="terms-link">
                            Privacy Policy
                        </a>
                        .
                    </p>
                </div>
            </div>
        </main>
    );
};

export default Login;
