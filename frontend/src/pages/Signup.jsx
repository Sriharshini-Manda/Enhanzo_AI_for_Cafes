import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await signup(email, password, fullName);
            alert('Signup successful! Please check your email to verify your account.');
            navigate('/login');
        } catch (err) {
            setError('Failed to create account: ' + err.message);
        }
    };

    return (
        <div className="bg-neutral-950 min-h-screen flex items-center justify-center p-6">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-neutral-900 to-purple-900/20 pointer-events-none"></div>

            <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl p-8 relative z-10">
                <h2 className="text-3xl font-bold text-center text-white mb-2">Create Account</h2>
                <p className="text-gray-400 text-center mb-8">Join us to upgrade your business</p>

                {error && <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded mb-4 text-center">{error}</div>}

                <form className="space-y-6" onSubmit={handleSignup}>
                    <div>
                        <label className="block text-sm font-medium text-neutral-300 mb-2">Full Name</label>
                        <input type="text" required
                            value={fullName} onChange={(e) => setFullName(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-neutral-800 text-white border border-neutral-700 focus:ring-2 focus:ring-green-500 focus:outline-none transition"
                            placeholder="John Doe" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-neutral-300 mb-2">Email</label>
                        <input type="email" required
                            value={email} onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-neutral-800 text-white border border-neutral-700 focus:ring-2 focus:ring-green-500 focus:outline-none transition"
                            placeholder="you@example.com" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-neutral-300 mb-2">Password</label>
                        <div className="relative">
                            <input type={showPassword ? "text" : "password"} required
                                value={password} onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg bg-neutral-800 text-white border border-neutral-700 focus:ring-2 focus:ring-green-500 focus:outline-none pr-10 transition"
                                placeholder="••••••••" />
                            <button type="button" onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-3.5 text-gray-400 hover:text-white">
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    <button type="submit"
                        className="w-full py-3 px-6 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold transition shadow-lg transform active:scale-95 transition">
                        Sign Up
                    </button>
                </form>

                <p className="text-sm text-neutral-400 mt-8 text-center">
                    Already have an account? <Link to="/login" className="text-green-400 hover:text-green-300 hover:underline font-medium">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
