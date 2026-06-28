import React, { useState, useRef, useEffect } from 'react';
import { FaFileAlt, FaThumbsUp, FaClock } from 'react-icons/fa';

const Analysis = () => {
    const [messages, setMessages] = useState([
        { id: 1, text: 'Chatbot is online. How can I help you?', sender: 'bot' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async () => {
        if (!inputValue.trim()) return;

        const userText = inputValue;
        const newList = [...messages, { id: Date.now(), text: userText, sender: 'user' }];
        setMessages(newList);
        setInputValue('');

        try {
            const response = await api.post('/chat', { message: userText });
            const botReply = response.data.reply;

            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                text: botReply,
                sender: 'bot'
            }]);
        } catch (error) {
            console.error('Chat Error:', error);
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                text: 'Sorry, I am having trouble connecting to the server.',
                sender: 'bot'
            }]);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSendMessage();
    };

    return (
        <div className="bg-neutral-950 min-h-screen pb-20">
            {/* Hero */}
            <section className="relative flex items-center justify-center min-h-[40vh] text-center">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-green-500 to-red-500 opacity-80"></div>
                <div className="relative z-10 max-w-2xl px-6 pt-20">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-md">Data Analysis</h1>
                    <p className="text-lg text-gray-100 font-medium drop-shadow-sm">
                        Visualizing customer feedback and key performance indicators.
                    </p>
                </div>
            </section>

            {/* Metrics */}
            <section className="container mx-auto px-6 py-12">
                <h2 className="text-3xl font-bold text-center mb-12 text-white">Key Metrics at a Glance</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8 hover:bg-neutral-800 transition">
                        <div className="text-blue-500 text-5xl mb-4 flex justify-center"><FaFileAlt /></div>
                        <h3 className="text-4xl font-bold text-white">100</h3>
                        <p className="text-neutral-400 mt-2">Total Submissions</p>
                    </div>
                    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8 hover:bg-neutral-800 transition">
                        <div className="text-green-500 text-5xl mb-4 flex justify-center"><FaThumbsUp /></div>
                        <h3 className="text-4xl font-bold text-white">83%</h3>
                        <p className="text-neutral-400 mt-2">Positive Feedback Rate</p>
                    </div>
                    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8 hover:bg-neutral-800 transition">
                        <div className="text-purple-500 text-5xl mb-4 flex justify-center"><FaClock /></div>
                        <h3 className="text-4xl font-bold text-white">1 min</h3>
                        <p className="text-neutral-400 mt-2">Average Response Time</p>
                    </div>
                </div>
            </section>

            {/* Chart Placeholder */}
            <section className="container mx-auto px-6 py-12">
                <h2 className="text-3xl font-bold text-center mb-12 text-white">Submissions Over Time</h2>
                <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8 shadow-lg max-w-4xl mx-auto">
                    <div className="flex items-end h-64 space-x-2 md:space-x-4">
                        <div className="flex-1 h-[60%] bg-blue-600 rounded-t-lg hover:bg-blue-500 transition" title="Monday"></div>
                        <div className="flex-1 h-[80%] bg-blue-600 rounded-t-lg hover:bg-blue-500 transition" title="Tuesday"></div>
                        <div className="flex-1 h-[50%] bg-blue-600 rounded-t-lg hover:bg-blue-500 transition" title="Wednesday"></div>
                        <div className="flex-1 h-[75%] bg-blue-600 rounded-t-lg hover:bg-blue-500 transition" title="Thursday"></div>
                        <div className="flex-1 h-[90%] bg-blue-600 rounded-t-lg hover:bg-blue-500 transition" title="Friday"></div>
                        <div className="flex-1 h-[40%] bg-blue-600 rounded-t-lg hover:bg-blue-500 transition" title="Saturday"></div>
                        <div className="flex-1 h-[30%] bg-blue-600 rounded-t-lg hover:bg-blue-500 transition" title="Sunday"></div>
                    </div>
                    <div className="flex justify-around mt-4 text-neutral-400 text-xs md:text-sm">
                        <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                    </div>
                </div>
            </section>

            {/* Chatbot */}
            <section className="container mx-auto px-6 py-12">
                <h2 className="text-3xl font-bold text-center mb-12 text-white">Need Assistance? Chat with Us!</h2>
                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 md:p-8 max-w-3xl mx-auto shadow-xl">
                    <div className="h-64 overflow-y-auto mb-4 p-4 bg-neutral-950 rounded-xl flex flex-col gap-3 scrollbar-thin scrollbar-thumb-neutral-700">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`px-4 py-2 rounded-2xl max-w-[80%] break-words text-sm ${msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-neutral-800 text-neutral-200'}`}>
                                    {msg.sender === 'bot' && msg.id === 1 && <span className="w-2 h-2 bg-green-500 rounded-full inline-block mr-2 animate-pulse"></span>}
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        <div ref={chatEndRef} />
                    </div>

                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Type your message..."
                            className="flex-1 px-4 py-3 rounded-2xl bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-neutral-500"
                        />
                        <button
                            onClick={handleSendMessage}
                            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-2xl text-white font-semibold transition shadow-md hover:shadow-lg"
                        >
                            Send
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Analysis;
