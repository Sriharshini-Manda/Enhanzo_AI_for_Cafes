import React from 'react';
import { Link } from 'react-router-dom';
import { FaRobot, FaChartPie, FaFile } from 'react-icons/fa';

const Home = () => {
    return (
        <>
            <section className="relative flex items-center justify-center min-h-screen text-center pt-20">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-green-500 to-red-500 opacity-90"></div>
                <div className="relative z-10 max-w-3xl px-6">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight drop-shadow-md">
                        Elevate Your Cafe's Experience
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-gray-100 mb-8 font-light drop-shadow-sm">
                        Transform your business with a seamless digital menu, integrated ordering, and real-time customer insights.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link to="/data-collections"
                            className="px-8 py-3 rounded-full text-white bg-blue-600 hover:bg-blue-700 font-semibold transition-all transform hover:scale-105 shadow-lg">
                            Explore Our Solutions
                        </Link>
                        <Link to="/analysis"
                            className="px-8 py-3 rounded-full text-white bg-neutral-800 hover:bg-neutral-700 font-semibold transition-all transform hover:scale-105 shadow-lg border border-neutral-700">
                            Learn More
                        </Link>
                    </div>
                </div>
            </section>

            <section className="container mx-auto px-6 py-20 flex flex-col-reverse md:flex-row items-center gap-12">
                <div className="text-left max-w-full md:max-w-xl text-center md:text-left">
                    <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">Seek professional assistance from the AI expert</h3>
                    <p className="text-neutral-400 text-base md:text-lg leading-relaxed">
                        Goodbye accounts and confusing bills! Our platform helps you easily understand your business trends more than
                        ever, as per your queries and doubts. Update yourself with AI and upgrade your Cafe to new heights with these
                        specialized and customized suggestions and high-quality analysis to manage all your services and resources without
                        any hassle or confusion.
                    </p>
                </div>
                <div className="text-6xl md:text-8xl text-blue-500 mb-6 md:mb-0 transform transition hover:scale-110 duration-300">
                    <FaRobot />
                </div>
            </section>

            <section className="container mx-auto px-6 py-20 flex flex-col-reverse md:flex-row-reverse items-center gap-12 bg-neutral-900/50 rounded-3xl my-8">
                <div className="text-6xl md:text-8xl text-green-500 mb-6 md:mb-0 transform transition hover:scale-110 duration-300">
                    <FaChartPie />
                </div>
                <div className="text-left max-w-full md:max-w-xl text-center md:text-left">
                    <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">Uncover Customer Insights</h3>
                    <p className="text-neutral-400 text-base md:text-lg leading-relaxed">
                        Track which menu items are most popular, understand peak ordering times, and optimize your resources. Apply these
                        insights to significantly decrease your expenses, and increase your sales and profits. Use data to optimize your
                        menu and service.
                    </p>
                </div>
            </section>

            <section className="container mx-auto px-6 py-20 flex flex-col-reverse md:flex-row items-center gap-12">
                <div className="text-left max-w-full md:max-w-xl text-center md:text-left">
                    <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">Get Customized and Detailed Reports</h3>
                    <p className="text-neutral-400 text-base md:text-lg leading-relaxed">
                        Get personalized, professional reports created tailored to your business needs, leading to better business
                        decisions and efficiency. A report that helps you understand and grow your business.
                    </p>
                </div>
                <div className="text-6xl md:text-8xl text-purple-500 mb-6 md:mb-0 transform transition hover:scale-110 duration-300">
                    <FaFile />
                </div>
            </section>
        </>
    );
};

export default Home;
