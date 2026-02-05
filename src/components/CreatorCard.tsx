// Placeholders
import { Link } from 'react-router-dom';
import { TrendingUp } from 'lucide-react';
import type { Creator } from '../api/mockApi';

interface CreatorCardProps {
    creator: Creator;
}

const CreatorCard: React.FC<CreatorCardProps> = ({ creator }) => {
    return (
        <Link
            to={`/creator/${creator.id}`}
            className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-900/5 transition-all hover:shadow-md hover:ring-gray-900/10 hover:-translate-y-1"
        >
            <div className="aspect-[3/2] bg-gray-200 relative overflow-hidden">
                <img
                    src={creator.imageUrl}
                    alt={creator.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="absolute bottom-4 left-4 text-white opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="font-semibold">{creator.name}</span>
                    <p className="text-xs text-gray-200">@{creator.handle}</p>
                </div>
            </div>
            <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-x-4 text-xs">
                    <span className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                        {creator.tags[0]}
                    </span>
                    <span className="text-gray-500">{creator.region}</span>
                </div>
                <div className="group relative mt-4 flex-1">
                    <h3 className="text-lg font-semibold leading-6 text-gray-900 group-hover:text-indigo-600">
                        {creator.name}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">
                        {creator.shortBio}
                    </p>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-500">Token Price</span>
                        <span className="text-lg font-bold text-gray-900 flex items-center gap-1">
                            ${creator.initialTokenPrice.toFixed(2)}
                            <TrendingUp size={14} className="text-green-500" />
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default CreatorCard;
