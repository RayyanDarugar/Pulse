import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { mockApi, type Creator } from '../api/mockApi';
import PriceChart from '../components/PriceChart';
import BuySellWidget from '../components/BuySellWidget';
import { Twitter, Instagram, Globe, Youtube, Music, Monitor, Gamepad2, PenTool } from 'lucide-react';

const SocialIcon = ({ type }: { type: string }) => {
    switch (type.toLowerCase()) {
        case 'twitter': return <Twitter size={18} />;
        case 'instagram': return <Instagram size={18} />;
        case 'youtube': return <Youtube size={18} />;
        case 'twitch': return <Gamepad2 size={18} />; // Approximation
        case 'spotify': return <Music size={18} />;
        case 'medium': return <PenTool size={18} />;
        default: return <Globe size={18} />;
    }
};

const CreatorProfile: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [creator, setCreator] = useState<Creator | null>(null);
    const [currentPrice, setCurrentPrice] = useState<number>(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCreator = async () => {
            if (!id) return;
            try {
                const data = await mockApi.getCreator(id);
                if (data) {
                    setCreator(data);
                    const price = await mockApi.getCurrentPrice(data.id);
                    setCurrentPrice(price);
                }
            } catch (error) {
                console.error("Failed to load creator", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCreator();
    }, [id]);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (!creator) return <div className="min-h-screen flex items-center justify-center">Creator not found</div>;

    return (
        <div className="bg-gray-50 min-h-screen pb-12">
            {/* Header/Banner */}
            <div className="relative h-64 bg-indigo-900 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 to-purple-800 opacity-90" />
                <img src={creator.imageUrl} className="w-full h-full object-cover mix-blend-overlay opacity-30 blur-sm" alt="Banner" />
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative -mt-32">

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Info */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm p-6 ring-1 ring-gray-900/5">
                            <div className="relative -mt-16 mb-6">
                                <img src={creator.imageUrl} alt={creator.name} className="h-32 w-32 rounded-2xl border-4 border-white shadow-md object-cover" />
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900">{creator.name}</h1>
                            <p className="text-gray-500 font-medium">@{creator.handle}</p>

                            <div className="mt-4 flex flex-wrap gap-2">
                                {creator.tags.map(tag => (
                                    <span key={tag} className="inline-flex items-center rounded-full bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <p className="mt-6 text-gray-600 text-sm leading-relaxed">
                                {creator.longBio}
                            </p>

                            <div className="mt-8 pt-6 border-t border-gray-100">
                                <h3 className="text-sm font-semibold text-gray-900 mb-4">Connect</h3>
                                <div className="flex gap-4">
                                    {Object.entries(creator.socialLinks).map(([platform, url]) => (
                                        url && (
                                            <a key={platform} href={url} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-indigo-600 transition-colors">
                                                <SocialIcon type={platform} />
                                            </a>
                                        )
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm p-6 ring-1 ring-gray-900/5">
                            <h3 className="font-semibold text-gray-900 mb-4">Community Stats</h3>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs text-gray-500 uppercase">Token Supply</p>
                                    <p className="font-mono font-medium">{creator.tokenSupply.toLocaleString()} TKN</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase">Market Cap</p>
                                    <p className="font-mono font-medium">${(creator.tokenSupply * currentPrice).toLocaleString()}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase">Holders</p>
                                    <p className="font-mono font-medium">1,248</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Middle Column: Chart & Activity */}
                    <div className="lg:col-span-2 space-y-6 lg:pt-16">
                        <div className="bg-white rounded-2xl shadow-sm p-6 ring-1 ring-gray-900/5">
                            <div className="flex justify-between items-baseline mb-6">
                                <h2 className="text-lg font-semibold text-gray-900">Price History</h2>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-bold text-gray-900">${currentPrice.toFixed(2)}</span>
                                    <span className="text-sm font-medium text-green-600">+2.4%</span>
                                </div>
                            </div>
                            <PriceChart creatorId={creator.id} />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Buy/Sell Widget */}
                            <div className="md:col-span-2">
                                <BuySellWidget creator={creator} currentPrice={currentPrice} />
                            </div>
                        </div>

                        {/* Recent Activity Mock */}
                        <div className="bg-white rounded-2xl shadow-sm p-6 ring-1 ring-gray-900/5">
                            <h3 className="font-semibold text-gray-900 mb-4">Recent Community Activity</h3>
                            <div className="space-y-4">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="flex items-center gap-4 text-sm">
                                        <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                                            <Monitor size={14} className="text-gray-500" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-gray-900"><span className="font-medium">AnonUser{900 + i}</span> bought <span className="font-medium text-indigo-600">{10 * i} TKN</span></p>
                                            <p className="text-xs text-gray-500">{i * 15} minutes ago</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatorProfile;
