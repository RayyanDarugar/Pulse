import { Link } from 'react-router-dom';
import { TrendingUp, Users } from 'lucide-react';
import type { Creator } from '../api/mockApi';
import Badge from './Badge';

interface CreatorCardProps {
    creator: Creator;
}

const CreatorCard: React.FC<CreatorCardProps> = ({ creator }) => {
    // Determine status badge
    // const isHot = Math.random() > 0.8;
    const isTrending = Math.random() > 0.7;

    // Mock sparkline data
    const sparklineData = [40, 35, 45, 50, 48, 55, 60, 58, 65, 70];

    return (
        <Link
            to={`/creator/${creator.id}`}
            className="group relative flex flex-col bg-white rounded-card border border-neutral-divider shadow-soft transition-all duration-200 hover:translate-y-[-6px] hover:shadow-glow hover:border-primary/30 overflow-hidden"
        >
            {/* Top area: Avatar + Info */}
            <div className="p-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <img
                            src={creator.imageUrl}
                            alt={creator.name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                            loading="lazy"
                        />
                        <div className="absolute -bottom-1 -right-1 bg-green-500 w-3 h-3 rounded-full border-2 border-white" />
                    </div>
                    <div>
                        <h3 className="text-neutral-strong font-semibold leading-tight group-hover:text-primary transition-colors">
                            {creator.name}
                        </h3>
                        <span className="text-xs text-neutral-muted font-mono">@{creator.handle}</span>
                    </div>
                </div>
                {isTrending && <Badge label="Trending" type="trending" />}
            </div>

            {/* Center: Price & Metrics */}
            <div className="px-4 pb-2">
                <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold font-mono text-neutral-strong tracking-tight">
                        ${creator.initialTokenPrice.toFixed(2)}
                    </span>
                    <span className="flex items-center text-sm font-medium text-positive">
                        +2.4% <TrendingUp size={14} className="ml-1" />
                    </span>
                </div>

                {/* Sparkline (Visual only using CSS/SVG) */}
                <div className="h-8 w-full mt-2 flex items-end gap-0.5 opacity-50">
                    {sparklineData.map((val, i) => (
                        <div
                            key={i}
                            className={`flex-1 rounded-t-sm transition-all duration-300 group-hover:bg-primary`}
                            style={{
                                height: `${val}%`,
                                backgroundColor: i === sparklineData.length - 1 ? '#10B981' : '#E6E9F2'
                            }}
                        />
                    ))}
                </div>

                <div className="flex items-center gap-4 mt-3 text-xs text-neutral-muted">
                    <span>Vol: <span className="text-neutral-strong font-mono">$24.5k</span></span>
                    <span className="flex items-center gap-1"><Users size={12} /> 1.2k</span>
                </div>
            </div>

            {/* Bottom: Action */}
            <div className="p-4 mt-auto border-t border-neutral-divider/50 bg-neutral-bg/30">
                <button className="w-full py-2 rounded-lg bg-white border border-neutral-divider text-sm font-medium text-neutral-strong group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all">
                    Trade Token
                </button>
            </div>
        </Link>
    );
};

export default CreatorCard;
