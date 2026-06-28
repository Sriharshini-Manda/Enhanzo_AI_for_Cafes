import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaLinkedin, FaGithub } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Layout = ({ children }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
        setIsMobileMenuOpen(false);
    };

    return (
        <div className="bg-neutral-950 text-neutral-100 font-sans min-h-screen flex flex-col">
            {/* Header */}
            <header className="fixed top-0 left-0 w-full z-50 bg-neutral-900/60 backdrop-blur-md border-b border-neutral-800">
                <nav className="container mx-auto flex items-center justify-between px-6 py-4">
                    {/* Logo */}
                    <Link to="/" className="logo text-2xl font-bold tracking-wide flex-shrink-0 text-white">
                        Enhanzo
                    </Link>

                    {/* Desktop Nav */}
                    <ul className="hidden md:flex flex-1 justify-center gap-8 text-lg">
                        <li><Link to="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
                        {user && (
                            <>
                                <li><Link to="/data-collections" className="hover:text-blue-400 transition-colors">Data Collections</Link></li>
                                <li><Link to="/analysis" className="hover:text-blue-400 transition-colors">Analysis</Link></li>
                                <li><Link to="/profile" className="hover:text-blue-400 transition-colors">View Profile</Link></li>
                            </>
                        )}
                        {!user && (
                            <li><a href="#" className="text-gray-500 cursor-not-allowed" title="Login to access">Features</a></li>
                        )}
                    </ul>

                    {/* Login / Logout Button */}
                    <div className="hidden md:flex flex-shrink-0 items-center gap-4">
                        {user ? (
                            <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2 rounded-lg transition-colors">
                                Logout
                            </button>
                        ) : (
                            <Link to="/login" className="bg-gray-700 hover:bg-green-600 text-white font-semibold px-5 py-2 rounded-lg transition-colors">
                                Login
                            </Link>
                        )}
                    </div>

                    {/* Mobile Nav Controls */}
                    <div className="md:hidden flex items-center gap-4 ml-auto">
                        {!user && (
                            <Link to="/login" className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg transition text-sm">
                                Login
                            </Link>
                        )}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-2xl focus:outline-none text-white"
                        >
                            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
                        </button>
                    </div>
                </nav>

                {/* Mobile Dropdown */}
                {isMobileMenuOpen && (
                    <div className="md:hidden bg-neutral-900 border-t border-neutral-800 absolute w-full left-0">
                        <ul className="flex flex-col gap-4 px-6 py-6 text-lg">
                            <li><Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block hover:text-blue-400 transition">Home</Link></li>
                            {user ? (
                                <>
                                    <li><Link to="/data-collections" onClick={() => setIsMobileMenuOpen(false)} className="block hover:text-blue-400 transition">Data Collections</Link></li>
                                    <li><Link to="/analysis" onClick={() => setIsMobileMenuOpen(false)} className="block hover:text-blue-400 transition">Analysis</Link></li>
                                    <li><Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="block hover:text-blue-400 transition">View Profile</Link></li>
                                    <li><button onClick={handleLogout} className="block text-red-500 hover:text-red-400 transition w-full text-left">Logout</button></li>
                                </>
                            ) : (
                                <li><Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="block text-green-400 hover:text-green-300 transition">Login / Sign Up</Link></li>
                            )}
                        </ul>
                    </div>
                )}
            </header>

            {/* Main Content */}
            <main className="pt-20 flex-grow">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-neutral-900 text-gray-300 py-10 mt-12 border-t border-neutral-800">
                <div className="container mx-auto px-6 text-center md:text-left">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Quick Links */}
                        <div>
                            <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
                            <ul className="space-y-2">
                                <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                                <li><Link to="/data-collections" className="hover:text-white transition-colors">Data Collections</Link></li>
                                <li><Link to="/analysis" className="hover:text-white transition-colors">Analysis</Link></li>
                                <li><Link to="/profile" className="hover:text-white transition-colors">View Profile</Link></li>
                            </ul>
                        </div>

                        {/* Contact Us */}
                        <div>
                            <h3 className="text-xl font-semibold text-white mb-4">Contact Us</h3>
                            <p>Email: enhanzo.bysriharshini@gmail.com</p>
                        </div>

                        {/* Social Media */}
                        <div>
                            <h3 className="text-xl font-semibold text-white mb-4">Follow Us</h3>
                            <div className="flex space-x-4 justify-center md:justify-start text-2xl">
                                <a href="https://www.linkedin.com/in/sriharshini-manda/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><FaLinkedin /></a>
                                <a href="https://github.com/Sriharshini-Manda" target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><FaGithub /></a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm text-gray-500">
                    &copy; 2025 Enhanzo. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default Layout;
