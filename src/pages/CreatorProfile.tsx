import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Globe, Twitter, Instagram, ArrowLeft } from 'lucide-react';
import { mockApi, type Creator, type PricePoint } from '../api/mockApi';
import PriceChart from '../components/PriceChart';
import BuySellWidget from '../components/BuySellWidget';
import ActivityTicker from '../components/ActivityTicker';
import Badge from '../components/Badge';

const CreatorProfile: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [creator, setCreator] = useState<Creator | null>(null);
    const [priceHistory, setPriceHistory] = useState<PricePoint[]>([]);
    const [currentPrice, setCurrentPrice] = useState<number>(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;
            try {
                const creatorData = await mockApi.getCreator(id);
                setCreator(creatorData || null);

                if (creatorData) {
                    const priceData = await mockApi.getPriceHistory(id);
                    setPriceHistory(priceData);

                    const price = await mockApi.getCurrentPrice(id);
                    setCurrentPrice(price);
                }
            } catch (error) {
                console.error("Failed to load creator", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();

        // Poll for price updates (simulating live socket)
        const interval = setInterval(async () => {
            if (id) {
                const price = await mockApi.getCurrentPrice(id);
                setCurrentPrice(price);
            }
        }, 3000);
        return () => clearInterval(interval);

    }, [id]);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (!creator) return <div className="min-h-screen flex items-center justify-center">Creator not found</div>;

    const percentChange = ((currentPrice - creator.initialTokenPrice) / creator.initialTokenPrice) * 100;
    const isPositive = percentChange >= 0;

    return (
        <div className="bg-neutral-bg min-h-screen pb-20">
            <ActivityTicker />

            {/* Header Band */}
            <div className="h-64 bg-gradient-to-r from-primary-start to-primary-end relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute bottom-4 left-4 sm:left-8 z-10">
                    <Link to="/market" className="text-white/80 hover:text-white flex items-center gap-2 mb-4 transition-colors">
                        <ArrowLeft size={20} /> Back to Market
                    </Link>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Main Content (Left) */}
                    <div className="flex-1 min-w-0">
                        {/* Profile Header Block */}
                        <div className="bg-white rounded-2xl shadow-soft p-6 sm:p-8 mb-8">
                            <div className="flex flex-col sm:flex-row gap-6 items-start">
                                <img
                                    src={creator.imageUrl}
                                    alt={creator.name}
                                    className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                                />
                                <div className="flex-1 pt-2">
                                    <div className="flex flex-wrap items-center gap-3 mb-2">
                                        <h1 className="text-3xl font-bold text-neutral-strong">{creator.name}</h1>
                                        <Badge label="Verified" type="neutral" className="bg-blue-100 text-blue-700" />
                                        {Math.random() > 0.5 && <Badge label="Trending" type="trending" />}
                                    </div>
                                    <p className="text-neutral-muted text-lg mb-4">@{creator.handle} • {creator.region}</p>
                                    <div className="flex gap-3">
                                        {creator.socialLinks.website && (
                                            <a href={creator.socialLinks.website} target="_blank" rel="noreferrer" className="p-2 rounded-full bg-neutral-100 text-neutral-600 hover:bg-neutral-200 transition-colors">
                                                <Globe size={18} />
                                            </a>
                                        )}
                                        {creator.socialLinks.twitter && (
                                            <a href={creator.socialLinks.twitter} target="_blank" rel="noreferrer" className="p-2 rounded-full bg-neutral-100 text-neutral-600 hover:bg-neutral-200 transition-colors">
                                                <Twitter size={18} />
                                            </a>
                                        )}
                                        {creator.socialLinks.instagram && (
                                            <a href={creator.socialLinks.instagram} target="_blank" rel="noreferrer" className="p-2 rounded-full bg-neutral-100 text-neutral-600 hover:bg-neutral-200 transition-colors">
                                                <Instagram size={18} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                                <div className="text-right hidden sm:block">
                                    <div className="text-sm text-neutral-muted mb-1">Current Price</div>
                                    <div className="text-4xl font-mono font-bold text-neutral-strong tracking-tight">
                                        ${currentPrice.toFixed(2)}
                                    </div>
                                    <div className={`text-sm font-medium mt-1 ${isPositive ? 'text-positive' : 'text-negative'}`}>
                                        {isPositive ? '+' : ''}{percentChange.toFixed(2)}% (24h)
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 border-t border-neutral-divider pt-6">
                                <h3 className="text-lg font-semibold text-neutral-strong mb-2">About</h3>
                                <p className="text-neutral-muted leading-relaxed">
                                    {creator.longBio}
                                </p>
                            </div>
                        </div>

                        {/* Chart Section */}
                        <div className="bg-white rounded-2xl shadow-soft p-6 mb-8">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-neutral-strong">Price History</h3>
                                <div className="flex bg-neutral-bg rounded-lg p-1">
                                    {['24H', '7D', '1M', 'ALL'].map(t => (
                                        <button key={t} className={`px-3 py-1 text-xs font-medium rounded-md ${t === '7D' ? 'bg-white shadow-sm text-neutral-strong' : 'text-neutral-muted hover:text-neutral-strong'}`}>
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="h-[400px] w-full">
                                <PriceChart data={priceHistory} />
                            </div>
                        </div>
                    </div>

                    {/* Sidebar (Right) */}
                    <div className="w-full lg:w-[400px] shrink-0">
                        <div className="sticky top-24 space-y-6">
                            {/* Mobile Price Display (Visible only on small screens) */}
                            <div className="sm:hidden bg-white p-4 rounded-xl shadow-sm border border-neutral-divider flex justify-between items-center">
                                <span className="text-neutral-muted">Current Price</span>
                                <div className="text-right">
                                    <div className="text-2xl font-mono font-bold">${currentPrice.toFixed(2)}</div>
                                    <div className={`text-xs ${isPositive ? 'text-positive' : 'text-negative'}`}>
                                        {isPositive ? '+' : ''}{percentChange.toFixed(2)}%
                                    </div>
                                </div>
                            </div>

                            {/* Buy/Sell Widget */}
                            <div className="bg-white rounded-2xl shadow-soft border border-neutral-divider/50 overflow-hidden">
                                <div className="p-4 bg-neutral-bg/50 border-b border-neutral-divider">
                                    <h3 className="font-semibold text-neutral-strong">Trade Token</h3>
                                </div>
                                <div className="p-6">
                                    <BuySellWidget
                                        creator={creator}
                                        currentPrice={currentPrice}
                                        onSuccess={() => {
                                            // Refresh user data or show toast
                                            console.log("Trade successful");
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Community Stats */}
                            <div className="bg-white rounded-2xl shadow-soft p-6 border border-neutral-divider/50">
                                <h4 className="font-semibold text-neutral-strong mb-4">Market Stats</h4>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-neutral-muted text-sm">Market Cap</span>
                                        <span className="font-mono font-medium">${(creator.tokenSupply * currentPrice).toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-neutral-muted text-sm">Volume (24h)</span>
                                        <span className="font-mono font-medium">$42,500</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-neutral-muted text-sm">Holders</span>
                                        <span className="font-mono font-medium">1,240</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-neutral-muted text-sm">Circulating Supply</span>
                                        <span className="font-mono font-medium">{creator.tokenSupply.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatorProfile;
