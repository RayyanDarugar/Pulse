import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ActivityItem {
    id: string;
    avatar: string;
    message: string;
    amount?: string;
    timestamp: number;
}

const ActivityTicker: React.FC = () => {
    const [activities, setActivities] = useState<ActivityItem[]>([
        { id: '1', avatar: '', message: 'Alex bought $500 of @jess', amount: '$500', timestamp: Date.now() },
    ]);

    // Mock live feed effect
    useEffect(() => {
        const interval = setInterval(() => {
            const newActivity = {
                id: Date.now().toString(),
                avatar: `https://i.pravatar.cc/150?u=${Date.now()}`,
                message: `User${Math.floor(Math.random() * 1000)} bought $${Math.floor(Math.random() * 1000)}`,
                amount: `$${Math.floor(Math.random() * 1000)}`,
                timestamp: Date.now(),
            };
            setActivities((prev) => [newActivity, ...prev].slice(0, 5));
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2 pointer-events-none">
            <AnimatePresence>
                {activities.map((item) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="flex items-center gap-3 bg-neutral-card/90 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-neutral-divider w-64 transform transition-all hover:scale-105 hover:bg-neutral-card"
                    >
                        <img
                            src={item.avatar}
                            alt=""
                            className="w-8 h-8 rounded-full border border-neutral-divider"
                        />
                        <div>
                            <p className="text-xs font-medium text-neutral-strong">
                                <span className="text-neutral-muted">User</span> bought <span className="text-positive font-bold">{item.amount}</span> of <span className="text-primary">@creator</span>
                            </p>
                            <p className="text-[10px] text-neutral-muted mt-0.5">Just now</p>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default ActivityTicker;

