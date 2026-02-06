import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { mockApi, type User, type Creator } from '../api/mockApi';
import { Wallet, TrendingUp, PieChart, ArrowUpRight, Plus } from 'lucide-react';
import CreatorCard from '../components/CreatorCard';

const Dashboard: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [holdings, setHoldings] = useState<{ creator: Creator, quantity: number, value: number }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await mockApi.getUser();
                setUser(userData);

                const creators = await mockApi.getCreators();
                const portfolioItems = [];

                if (userData.portfolio) {
                    for (const [creatorId, qty] of Object.entries(userData.portfolio)) {
                        const creator = creators.find(c => c.id === creatorId);
                        if (creator) {
                            const price = await mockApi.getCurrentPrice(creatorId);
                            portfolioItems.push({
                                creator,
                                quantity: qty,
                                value: qty * price
                            });
                        }
                    }
                }
                setHoldings(portfolioItems);

            } catch (error) {
                console.error("Failed to load dashboard", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (!user) return <div className="min-h-screen flex items-center justify-center">User not found</div>;

    const totalPortfolioValue = holdings.reduce((sum, item) => sum + item.value, 0);

    return (
        <div className="bg-neutral-bg min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-neutral-strong">Dashboard</h1>
                    <p className="text-neutral-muted">Welcome back, {user.name}</p>
                </div>

                {/* Summary Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {/* Portfolio Value */}
                    <div className="bg-white p-6 rounded-2xl shadow-soft border border-neutral-divider relative overflow-hidden group">
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 text-neutral-muted mb-2">
                                <TrendingUp size={18} />
                                <span className="text-sm font-medium">Portfolio Value</span>
                            </div>
                            <div className="text-3xl font-mono font-bold text-neutral-strong">
                                ${totalPortfolioValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </div>
                            <div className="flex items-center gap-1 text-sm text-positive mt-2 font-medium">
                                <ArrowUpRight size={16} /> +$1,240.50 (Today)
                            </div>
                        </div>
                        <div className="absolute right-0 bottom-0 opacity-5 transform translate-x-4 translate-y-4 group-hover:scale-110 transition-transform">
                            <TrendingUp size={120} />
                        </div>
                    </div>

                    {/* Available Balance */}
                    <div className="bg-white p-6 rounded-2xl shadow-soft border border-neutral-divider relative overflow-hidden group">
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 text-neutral-muted mb-2">
                                <Wallet size={18} />
                                <span className="text-sm font-medium">Available Balance</span>
                            </div>
                            <div className="text-3xl font-mono font-bold text-neutral-strong">
                                ${user.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </div>
                            <button className="mt-4 flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-end transition-colors">
                                <Plus size={16} /> Top Up
                            </button>
                        </div>
                        <div className="absolute right-0 bottom-0 opacity-5 transform translate-x-4 translate-y-4 group-hover:scale-110 transition-transform">
                            <Wallet size={120} />
                        </div>
                    </div>

                    {/* Creators Supported */}
                    <div className="bg-white p-6 rounded-2xl shadow-soft border border-neutral-divider relative overflow-hidden group">
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 text-neutral-muted mb-2">
                                <PieChart size={18} />
                                <span className="text-sm font-medium">Creators Supported</span>
                            </div>
                            <div className="text-3xl font-mono font-bold text-neutral-strong">
                                {holdings.length}
                            </div>
                            <p className="text-sm text-neutral-muted mt-2">
                                Across {['Music', 'Tech'].join(', ')}
                            </p>
                        </div>
                        <div className="absolute right-0 bottom-0 opacity-5 transform translate-x-4 translate-y-4 group-hover:scale-110 transition-transform">
                            <PieChart size={120} />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Holdings Grid */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-neutral-strong">Your Holdings</h2>
                            <Link to="/market" className="text-primary font-medium hover:underline text-sm">
                                Find more creators
                            </Link>
                        </div>

                        {holdings.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {holdings.map((item) => (
                                    <div key={item.creator.id} className="relative">
                                        <CreatorCard creator={item.creator} />
                                        <div className="absolute top-2 right-2 bg-neutral-strong text-white text-xs font-mono py-1 px-2 rounded-lg shadow-md z-10">
                                            Run: {item.quantity} TKN
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-2xl border border-dashed border-neutral-divider p-12 text-center">
                                <div className="w-16 h-16 bg-neutral-bg rounded-full flex items-center justify-center mx-auto mb-4 text-neutral-400">
                                    <TrendingUp size={32} />
                                </div>
                                <h3 className="text-lg font-semibold text-neutral-strong">No holdings yet</h3>
                                <p className="text-neutral-muted mt-1 mb-6">Start backing creators to build your portfolio.</p>
                                <Link to="/market" className="px-6 py-2 bg-primary text-white rounded-full font-medium shadow-glow hover:bg-primary-start transition-all">
                                    Explore Markets
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Allocation Chart (Simplified) */}
                    <div>
                        <h2 className="text-xl font-bold text-neutral-strong mb-6">Allocation</h2>
                        <div className="bg-white p-6 rounded-2xl shadow-soft border border-neutral-divider">
                            {holdings.length > 0 ? (
                                <div className="space-y-6">
                                    {/* Visual Donut representation */}
                                    <div className="relative w-48 h-48 mx-auto rounded-full bg-neutral-bg border-8 border-white shadow-inner flex items-center justify-center">
                                        <span className="text-sm font-bold text-neutral-muted">Portfolio</span>
                                        {holdings.map((item, index) => (
                                            <div
                                                key={item.creator.id}
                                                className="absolute inset-0 rounded-full border-8"
                                                style={{
                                                    borderColor: index % 2 === 0 ? '#5E2DFF' : '#A56BFF',
                                                    clipPath: `polygon(50% 50%, 100% 0, 100% 50%)`, // Very rough approximation
                                                    transform: `rotate(${index * (360 / holdings.length)}deg)`
                                                }}
                                            />
                                        ))}
                                    </div>

                                    <div className="space-y-3">
                                        {holdings.map((item, index) => (
                                            <div key={item.creator.id} className="flex items-center justify-between text-sm">
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-3 h-3 rounded-full ${index % 2 === 0 ? 'bg-primary-start' : 'bg-primary-end'}`} />
                                                    <span className="text-neutral-strong font-medium">{item.creator.name}</span>
                                                </div>
                                                <span className="text-neutral-muted">{((item.value / totalPortfolioValue) * 100).toFixed(1)}%</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-10 text-neutral-muted text-sm">
                                    Not enough data
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
