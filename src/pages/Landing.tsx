import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, Globe, Shield } from 'lucide-react';
import { useMemo } from 'react';
import { mockCreators } from '../api/mockApi';
import HeroMarketStrip from '../components/HeroMarketStrip';
import ActivityTicker from '../components/ActivityTicker';
import CreatorCard from '../components/CreatorCard';

const Landing = () => {
    // Get top creators for the strip and grid
    const trendingCreators = useMemo(() => mockCreators.slice(0, 6), []);
    const marketStripCreators = useMemo(() => mockCreators.slice(0, 5), []);

    return (
        <div className="relative min-h-screen pb-20">
            {/* Live Activity Ticker */}
            <ActivityTicker />

            {/* Hero Section */}
            <section className="relative pt-18 pb-16 overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-neutral-100 to-transparent -z-10" />
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        {/* Left Column: Copy */}
                        <div className="lg:col-span-5 flex flex-col items-start text-left">
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-strong leading-[1.1]">
                                Back creators before the world <span className="text-gradient">catches on.</span>
                            </h1>
                            <p className="mt-6 text-lg text-neutral-muted max-w-lg">
                                Buy creator tokens to unlock access, share upside, and measure the impact of your community.
                            </p>
                            <div className="mt-8 flex flex-wrap gap-4">
                                <Link
                                    to="/market"
                                    className="px-8 py-4 rounded-full bg-primary text-white font-semibold hover:bg-primary-start transition-all shadow-glow hover:shadow-lg flex items-center gap-2"
                                >
                                    Explore Markets <ArrowRight size={20} />
                                </Link>
                                <button className="px-8 py-4 rounded-full border border-neutral-divider text-neutral-muted font-medium hover:text-neutral-strong hover:bg-white transition-all">
                                    How it works
                                </button>
                            </div>
                            <p className="mt-4 text-sm text-neutral-muted flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-positive animate-pulse" /> No funds required for demo
                            </p>
                        </div>

                        {/* Right Column: Market Strip */}
                        <div className="lg:col-span-7 w-full relative">
                            <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-neutral-bg to-transparent z-10" />
                            <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-neutral-bg to-transparent z-10" />
                            <HeroMarketStrip creators={marketStripCreators} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Trending Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h2 className="text-3xl font-bold text-neutral-strong">Trending Creators</h2>
                            <p className="mt-2 text-neutral-muted">Movers and shakers in the last 24 hours.</p>
                        </div>
                        <Link to="/market" className="text-primary font-medium hover:underline">
                            View all markets
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {trendingCreators.map((creator) => (
                            <CreatorCard key={creator.id} creator={creator} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Strip */}
            <section className="py-20 border-t border-neutral-divider bg-neutral-bg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="p-6">
                            <div className="w-12 h-12 mx-auto bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
                                <Globe size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-neutral-strong">Support Global Talent</h3>
                            <p className="mt-2 text-sm text-neutral-muted">Access creators from every corner of the world early in their journey.</p>
                        </div>
                        <div className="p-6">
                            <div className="w-12 h-12 mx-auto bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
                                <BarChart3 size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-neutral-strong">Live Market Data</h3>
                            <p className="mt-2 text-sm text-neutral-muted">Real-time price simulations and volume tracking for every token.</p>
                        </div>
                        <div className="p-6">
                            <div className="w-12 h-12 mx-auto bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
                                <Shield size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-neutral-strong">Secure & Transparent</h3>
                            <p className="mt-2 text-sm text-neutral-muted">Built on simulated blockchain logic for transparency and trust.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Social Proof Footer */}
            <section className="py-12 bg-white border-t border-neutral-divider">
                <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-6">
                    <div>
                        <span className="text-2xl font-bold font-mono text-neutral-strong block">$2.4M</span>
                        <span className="text-sm text-neutral-muted">Total Volume Traded</span>
                    </div>
                    <div className="hidden md:block w-px h-12 bg-neutral-divider" />
                    <div>
                        <span className="text-2xl font-bold font-mono text-neutral-strong block">850+</span>
                        <span className="text-sm text-neutral-muted">Creators Funded</span>
                    </div>
                    <div className="hidden md:block w-px h-12 bg-neutral-divider" />
                    <div>
                        <span className="text-2xl font-bold font-mono text-neutral-strong block">12k+</span>
                        <span className="text-sm text-neutral-muted">Active Traders</span>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Landing;
