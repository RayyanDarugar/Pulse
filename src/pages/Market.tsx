import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { mockApi, type Creator } from '../api/mockApi';
import CreatorCard from '../components/CreatorCard';

const Market: React.FC = () => {
    const [creators, setCreators] = useState<Creator[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

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

    const filteredCreators = creators.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.handle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="bg-gray-50 py-12 sm:py-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Creator Market</h2>
                    <p className="mt-2 text-lg leading-8 text-gray-600">
                        Discover and invest in the next generation of creative talent.
                    </p>
                </div>

                {/* Search / Filter */}
                <div className="mx-auto mt-8 max-w-xl">
                    <div className="relative rounded-md shadow-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <input
                            type="text"
                            className="block w-full rounded-md border-0 py-3 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Search creators, tags, or handles..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="mt-16 text-center">
                        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                        {filteredCreators.map((creator) => (
                            <CreatorCard key={creator.id} creator={creator} />
                        ))}
                        {filteredCreators.length === 0 && (
                            <div className="col-span-full text-center text-gray-500 py-12">
                                No creators found matching "{searchTerm}"
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Market;
