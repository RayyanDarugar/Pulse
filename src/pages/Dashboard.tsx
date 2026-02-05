import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { mockApi, type Creator } from '../api/mockApi';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Download, Wallet, TrendingUp, Users } from 'lucide-react';

const Dashboard: React.FC = () => {
    const { user } = useAuth();
    const [portfolioData, setPortfolioData] = useState<{ name: string; value: number; creator: Creator }[]>([]);
    const [totalValue, setTotalValue] = useState(0);

    useEffect(() => {
        const loadPortfolio = async () => {
            if (!user?.portfolio) return;

            let total = 0;
            const data = [];

            for (const [creatorId, qty] of Object.entries(user.portfolio)) {
                const creator = await mockApi.getCreator(creatorId);
                const price = await mockApi.getCurrentPrice(creatorId);
                if (creator) {
                    const value = qty * price;
                    total += value;
                    data.push({ name: creator.name, value, creator });
                }
            }
            setTotalValue(total);
            setPortfolioData(data);
        };
        loadPortfolio();
    }, [user]);

    const downloadCSV = () => {
        const headers = ["Creator", "Quantity", "Value"];
        const rows = portfolioData.map(d => [d.name, user?.portfolio[d.creator.id], d.value.toFixed(2)]);
        const csvContent = "data:text/csv;charset=utf-8,"
            + headers.join(",") + "\n"
            + rows.map(e => e.join(",")).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "pulse_transactions.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const COLORS = ['#4f46e5', '#ec4899', '#f59e0b', '#10b981', '#6366f1'];

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-8">Dashboard</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Stats Cards */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm ring-1 ring-gray-900/5">
                        <div className="flex items-center gap-4">
                            <div className="bg-indigo-50 p-3 rounded-lg text-indigo-600">
                                <Wallet size={24} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Total Portfolio Value</p>
                                <p className="text-2xl font-bold text-gray-900">${totalValue.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm ring-1 ring-gray-900/5">
                        <div className="flex items-center gap-4">
                            <div className="bg-green-50 p-3 rounded-lg text-green-600">
                                <TrendingUp size={24} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Available Balance</p>
                                <p className="text-2xl font-bold text-gray-900">${user?.balance.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm ring-1 ring-gray-900/5">
                        <div className="flex items-center gap-4">
                            <div className="bg-pink-50 p-3 rounded-lg text-pink-600">
                                <Users size={24} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Creators Supported</p>
                                <p className="text-2xl font-bold text-gray-900">{portfolioData.length}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Portfolio List */}
                    <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-900/5 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold text-gray-900">Your Holdings</h2>
                            <button onClick={downloadCSV} className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                                <Download size={16} /> Export CSV
                            </button>
                        </div>
                        {portfolioData.length > 0 ? (
                            <div className="space-y-4">
                                {portfolioData.map((item) => (
                                    <div key={item.creator.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <img src={item.creator.imageUrl} alt={item.name} className="w-10 h-10 rounded-full object-cover" />
                                            <div>
                                                <p className="font-semibold text-gray-900">{item.name}</p>
                                                <p className="text-xs text-gray-500">@{item.creator.handle}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-medium text-gray-900">${item.value.toFixed(2)}</p>
                                            <p className="text-xs text-gray-500">{user?.portfolio[item.creator.id]} TKN</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 text-gray-500">
                                You don't own any tokens yet. Start investing!
                            </div>
                        )}
                    </div>

                    {/* Distribution Chart */}
                    <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-900/5 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-6">Allocation</h2>
                        <div className="h-64 flex items-center justify-center">
                            {portfolioData.length > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={portfolioData}
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {portfolioData.map((_entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip formatter={(value: number | undefined) => value ? `$${value.toFixed(2)}` : ''} />
                                    </PieChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="text-gray-400 text-sm">No data to display</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
