import React from 'react';

interface BadgeProps {
    label: string;
    type?: 'hot' | 'new' | 'trending' | 'neutral';
    className?: string;
}

const Badge: React.FC<BadgeProps> = ({ label, type = 'neutral', className = '' }) => {
    const styles = {
        hot: 'bg-red-100 text-red-700',
        new: 'bg-blue-100 text-blue-700',
        trending: 'bg-purple-100 text-purple-700',
        neutral: 'bg-neutral-100 text-neutral-600',
    };

    return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium uppercase tracking-wide ${styles[type]} ${className}`}>
            {label}
        </span>
    );
};

export default Badge;
