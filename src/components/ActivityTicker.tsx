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
                        className="flex items-center gap-3 bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-soft border border-neutral-divider pointer-events-auto w-64"
                    >
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 shrink-0">
                            <img src={item.avatar} alt="User" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col min-w-0">
                            <span className="text-sm font-medium text-neutral-strong truncate">{item.message}</span>
                            <span className="text-xs text-neutral-muted">Just now</span>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default ActivityTicker;
