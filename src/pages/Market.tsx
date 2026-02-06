import React, { useEffect, useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { mockApi, type Creator } from '../api/mockApi';
import CreatorCard from '../components/CreatorCard';

const Market: React.FC = () => {
    const [creators, setCreators] = useState<Creator[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState<string>('All');
    const [sortBy, setSortBy] = useState<'trending' | 'volume' | 'new'>('trending');

    // Categories
    const categories = ['All', 'Music', 'Gaming', 'Art', 'Tech', 'Vlogs'];

    useEffect(() => {
        const fetchCreators = async () => {
            try {
                const data = await mockApi.getCreators();
                setCreators(data);
            } catch (error) {
                console.error("Failed to fetch creators", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCreators();
    }, []);

    const filteredCreators = useMemo(() => {
        return creators
            .filter(c => {
                const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    c.handle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    c.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));

                const matchesCategory = activeCategory === 'All' || c.tags.some(t => t.toLowerCase() === activeCategory.toLowerCase());

                return matchesSearch && matchesCategory;
            })
            .sort((a, b) => {
                if (sortBy === 'volume') return b.tokenSupply - a.tokenSupply; // Mock metric
                if (sortBy === 'new') return b.initialTokenPrice - a.initialTokenPrice; // Mock metric
                return 0; // Default (Trending) is random/original order
            });
    }, [creators, searchTerm, activeCategory, sortBy]);

    return (
        <div className="bg-neutral-bg min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-neutral-strong">Marketplace</h1>
                    <p className="mt-2 text-lg text-neutral-muted">Discover the next breakout creators.</p>
                </div>

                {/* Controls Bar */}
                <div className="sticky top-20 z-30 bg-neutral-card/80 backdrop-blur-md rounded-2xl shadow-soft p-4 mb-8 border border-neutral-divider">
                    <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
                        {/* Search */}
                        <div className="relative w-full md:w-96">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <Search className="h-5 w-5 text-neutral-muted" />
                            </div>
                            <input
                                type="text"
                                className="block w-full rounded-xl border-neutral-divider bg-neutral-bg py-2.5 pl-10 text-neutral-strong placeholder:text-neutral-muted focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                placeholder="Search creators, tags..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* Filters & Sort */}
                        <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                            <div className="flex bg-neutral-bg rounded-lg p-1 border border-neutral-divider shrink-0">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${activeCategory === cat
                                            ? 'bg-neutral-strong text-neutral-bg shadow-sm'
                                            : 'text-neutral-muted hover:text-neutral-strong'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>

                            <div className="h-8 w-px bg-neutral-divider hidden md:block" />

                            <select
                                title="Sort creators"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as any)}
                                className="bg-transparent text-sm font-medium text-neutral-strong border-none focus:ring-0 cursor-pointer"
                            >
                                <option value="trending">Trending</option>
                                <option value="volume">Top Volume</option>
                                <option value="new">Newest</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="bg-neutral-card rounded-card h-[380px] animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredCreators.map((creator) => (
                            <CreatorCard key={creator.id} creator={creator} />
                        ))}
                        {filteredCreators.length === 0 && (
                            <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
                                <div className="p-4 rounded-full bg-neutral-200/50 mb-4">
                                    <Search size={32} className="text-neutral-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-neutral-strong">No results found</h3>
                                <p className="text-neutral-muted mt-1">Try adjusting your search or filters</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Market;
