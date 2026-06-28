import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); // Though mock, collecting it.
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(email, password);
            navigate('/profile');
        } catch (err) {
            setError('Failed to login: ' + err.message);
        }
    };

    return (
        <div className="bg-neutral-950 min-h-screen flex items-center justify-center p-6">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-neutral-900 to-blue-900/20 pointer-events-none"></div>

            <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl p-8 relative z-10">
                <h2 className="text-3xl font-bold text-center text-white mb-2">Welcome Back</h2>
                <p className="text-gray-400 text-center mb-8">Access your account to continue</p>

                {error && <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded mb-4 text-center">{error}</div>}

                <form className="space-y-6" onSubmit={handleLogin}>
                    <div>
                        <label className="block text-sm font-medium text-neutral-300 mb-2">Email</label>
                        <input type="email" required
                            value={email} onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-neutral-800 text-white border border-neutral-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                            placeholder="you@example.com" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-neutral-300 mb-2">Password</label>
                        <div className="relative">
                            <input type={showPassword ? "text" : "password"} required
                                value={password} onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg bg-neutral-800 text-white border border-neutral-700 focus:ring-2 focus:ring-blue-500 focus:outline-none pr-10 transition"
                                placeholder="••••••••" />
                            <button type="button" onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-3.5 text-gray-400 hover:text-white">
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    <div className="text-right">
                        <Link to="#" className="text-sm text-blue-400 hover:text-blue-300 hover:underline">Forgot password?</Link>
                    </div>

                    <button type="submit"
                        className="w-full py-3 px-6 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transitionshadow-lg transform active:scale-95 transition">
                        Login
                    </button>
                </form>

                <p className="text-sm text-neutral-400 mt-8 text-center">
                    Don't have an account? <Link to="/signup" className="text-blue-400 hover:text-blue-300 hover:underline font-medium">Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
