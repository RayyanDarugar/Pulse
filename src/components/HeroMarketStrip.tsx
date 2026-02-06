import React, { useRef, useEffect } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import CreatorCard from './CreatorCard'; // Using the simplified card or a specific mini version
import type { Creator } from '../api/mockApi';

interface HeroMarketStripProps {
    creators: Creator[];
}

const HeroMarketStrip: React.FC<HeroMarketStripProps> = ({ creators }) => {
    const controls = useAnimationControls();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const startAnimation = async () => {
            await controls.start({
                x: '-50%',
                transition: {
                    duration: 30,
                    ease: 'linear',
                    repeat: Infinity,
                },
            });
        };
        startAnimation();
    }, [controls]);

    // Duplicate creators to create seamless loop
    const displayCreators = [...creators, ...creators];

    return (
        <div
            className="w-full overflow-hidden py-4 mask-fade-sides"
            onMouseEnter={() => controls.stop()}
            onMouseLeave={() => controls.start({
                x: '-50%',
                transition: { duration: 30, ease: 'linear', repeat: Infinity, from: containerRef.current ? getComputedStyle(containerRef.current).transform : 0 }
            })}
        >
            <motion.div
                ref={containerRef}
                className="flex gap-4 w-max px-4"
                animate={controls}
                initial={{ x: 0 }}
            >
                {displayCreators.map((creator, index) => (
                    <div key={`${creator.id}-${index}`} className="w-[280px] shrink-0 transform transition-transform hover:scale-105">
                        <CreatorCard creator={creator} />
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default HeroMarketStrip;
