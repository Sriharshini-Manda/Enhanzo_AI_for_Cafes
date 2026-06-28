import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const Profile = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [businessData, setBusinessData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchBusinessData = async () => {
            if (activeTab === 'business') {
                setLoading(true);
                try {
                    const response = await api.get('/business-details');
                    if (response.data && response.data.length > 0) {
                        // For now, just taking the last submitted entry.
                        // In real app, filter by User ID.
                        setBusinessData(response.data[response.data.length - 1]);
                    } else {
                        setBusinessData(null); // No data found
                    }
                } catch (error) {
                    console.error('Error fetching business details:', error);
                    setBusinessData(null); // Ensure businessData is null on error
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchBusinessData();
    }, [activeTab]);

    return (
        <div className="bg-neutral-950 min-h-screen pb-20">
            {/* Hero */}
            <section className="relative flex items-center justify-center min-h-[40vh] text-center">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-green-500 to-red-500 opacity-80"></div>
                <div className="relative z-10 max-w-3xl px-6 pt-20">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-md">My Dashboard</h1>
                    <p className="text-lg text-gray-100 font-medium">
                        Welcome to your profile dashboard. Manage your details and preferences here.
                    </p>
                </div>
            </section>

            <section className="container mx-auto px-6 py-12 flex flex-col md:flex-row gap-8">
                {/* Sidebar */}
                <aside className="w-full md:w-64 bg-neutral-900 border border-neutral-800 rounded-xl shadow-lg p-6 space-y-6 h-fit">
                    <div className="flex flex-col items-center">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                            {businessData ? businessData.owner_name.charAt(0).toUpperCase() : 'O'}
                        </div>
                        <h2 className="mt-4 text-xl font-semibold text-white">{businessData ? businessData.owner_name : 'Owner Name'}</h2>
                        <p className="text-sm text-gray-400">{businessData?.email || 'owner@email.com'}</p>
                    </div>

                    <nav className="space-y-2">
                        <button
                            onClick={() => setActiveTab('profile')}
                            className={`w-full text-left px-4 py-3 rounded-lg transition ${activeTab === 'profile' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-neutral-800'}`}
                        >
                            Profile Overview
                        </button>
                        <button
                            onClick={() => setActiveTab('business')}
                            className={`w-full text-left px-4 py-3 rounded-lg transition ${activeTab === 'business' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-neutral-800'}`}
                        >
                            Business Details
                        </button>
                        <button
                            onClick={() => setActiveTab('chats')}
                            className={`w-full text-left px-4 py-3 rounded-lg transition ${activeTab === 'chats' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-neutral-800'}`}
                        >
                            Recent Chats
                        </button>
                        <Link to="/login" className="block px-4 py-3 rounded-lg text-red-500 hover:bg-red-900/20 hover:text-red-400 transition">
                            Logout
                        </Link>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 bg-neutral-900 border border-neutral-800 rounded-xl shadow-lg p-8 text-gray-300 min-h-[500px]">
                    {/* Tab Content: Profile */}
                    {activeTab === 'profile' && (
                        <div className="animate-fade-in">
                            <h2 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-2">Profile Overview</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Mock Data */}
                                {[
                                    { label: 'Owner Name', value: 'John Doe' },
                                    { label: 'Phone', value: '+91-9876543210' },
                                    { label: 'Email', value: 'owner@email.com' },
                                    { label: 'City', value: 'Mumbai' },
                                ].map((item, idx) => (
                                    <div key={idx} className="bg-neutral-800 rounded-lg p-6 hover:bg-neutral-750 transition">
                                        <p className="text-sm text-gray-400">{item.label}</p>
                                        <p className="text-lg text-white font-medium">{item.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Tab Content: Business */}
                    {activeTab === 'business' && (
                        <div className="animate-fade-in">
                            <h2 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-2">
                                Business Details
                                {loading && <span className="text-sm font-normal text-gray-400 ml-4">(Loading...)</span>}
                            </h2>

                            {!loading && !businessData && <p>No business details found. Please submit data in Data Collections.</p>}

                            {businessData && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {[
                                        { label: 'Business Name', value: businessData.cafe_name },
                                        { label: 'Address', value: businessData.address },
                                        { label: 'Ownership', value: businessData.ownership },
                                        { label: 'Sales/Month', value: `₹ ${businessData.sales}` },
                                        { label: 'Profits/Month', value: `₹ ${businessData.profits}` },
                                        { label: 'Service Types', value: Array.isArray(businessData.service_types) ? businessData.service_types.join(', ') : 'N/A' },
                                    ].map((item, idx) => (
                                        <div key={idx} className="bg-neutral-800 rounded-lg p-6">
                                            <p className="text-sm text-gray-400">{item.label}</p>
                                            <p className="text-lg text-white font-medium">{item.value}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Tab Content: Chats */}
                    {activeTab === 'chats' && (
                        <div className="animate-fade-in">
                            <h2 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-2">Recent Chats</h2>
                            <div className="space-y-4">
                                <div className="bg-neutral-800 rounded-lg p-4 border-l-4 border-blue-500">
                                    <p className="text-sm text-gray-400 mb-1">You:</p>
                                    <p className="text-white mb-3">What business should I start with ₹5 lakhs?</p>
                                    <p className="text-sm text-gray-400 mb-1">AI Recommendation:</p>
                                    <p className="text-green-400">Consider opening a cloud kitchen, as demand is rising in urban areas.</p>
                                </div>
                                <div className="bg-neutral-800 rounded-lg p-4 border-l-4 border-blue-500">
                                    <p className="text-sm text-gray-400 mb-1">You:</p>
                                    <p className="text-white mb-3">Is retail better than online store?</p>
                                    <p className="text-sm text-gray-400 mb-1">AI Recommendation:</p>
                                    <p className="text-green-400">An online store may scale better in Mumbai due to high digital adoption.</p>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </section>
        </div>
    );
};

export default Profile;
