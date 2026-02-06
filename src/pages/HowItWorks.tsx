import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Users, ShieldCheck, Zap, BarChart3, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const HowItWorks: React.FC = () => {
    return (
        <div className="bg-neutral-bg text-neutral-strong font-sans">

            {/* Hero Section */}
            <section className="relative overflow-hidden py-24 sm:py-32 bg-white">
                <div className="container mx-auto px-4 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-primary font-mono text-sm tracking-widest uppercase mb-4 font-bold">
                            The Evolution of Media
                        </h2>
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-neutral-900">
                            Enter the <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                                Belief Economy.
                            </span>
                        </h1>
                        <p className="mt-6 text-lg md:text-xl text-neutral-muted max-w-3xl mx-auto leading-relaxed">
                            The Attention Economy is built on clicks. The Belief Economy is built on conviction.
                            Stop passively scrolling. Start owning the culture you create.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* The Shift: Compare & Contrast (Enhanced Feature) */}
            <section className="py-20 bg-gray-50 border-y border-gray-200">
                <div className="container mx-auto max-w-6xl px-4">
                    <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-stretch">

                        {/* Old Way - Attention Economy */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="p-8 md:p-10 rounded-3xl bg-white border border-gray-200 shadow-sm flex flex-col justify-center relative group overflow-hidden"
                        >
                            {/* De-emphasized styling */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gray-200" />

                            <h3 className="text-2xl font-bold text-gray-500 mb-6 flex items-center gap-3">
                                <BarChart3 className="text-gray-400" />
                                Attention Economy
                            </h3>
                            <ul className="space-y-4 text-gray-500">
                                <li className="flex items-center gap-3">
                                    <span className="w-2 h-2 rounded-full bg-red-400/50" />
                                    Optimizes for outrage & clicks
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-2 h-2 rounded-full bg-red-400/50" />
                                    Creators serve algorithms, not fans
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-2 h-2 rounded-full bg-red-400/50" />
                                    Value is centralized by platforms
                                </li>
                            </ul>
                        </motion.div>

                        {/* New Way - Pulse (Belief Economy) */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="p-8 md:p-10 rounded-3xl bg-white border-2 border-indigo-100 shadow-xl shadow-indigo-100/50 flex flex-col justify-center relative overflow-hidden transform md:-translate-y-4"
                        >
                            {/* Premium styling */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500" />
                            <div className="absolute -right-20 -top-20 w-64 h-64 bg-indigo-50/50 rounded-full blur-3xl pointer-events-none" />

                            <h3 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <Heart className="text-indigo-600 fill-indigo-100" />
                                Belief Economy
                            </h3>
                            <ul className="space-y-5 text-gray-700 font-medium">
                                <li className="flex items-center gap-3">
                                    <span className="w-2 h-2 rounded-full bg-indigo-600 shadow-sm" />
                                    Optimizes for trust & alignment
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-2 h-2 rounded-full bg-indigo-600 shadow-sm" />
                                    Creators are funded by community
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-2 h-2 rounded-full bg-indigo-600 shadow-sm" />
                                    Value is shared with supporters
                                </li>
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* How It Works Steps (Restored Light Theme) */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-900">How It Works</h2>
                        <p className="text-neutral-muted text-lg max-w-2xl mx-auto">Three steps to turn cultural influence into shared wealth.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {/* Step 1 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="bg-white p-8 rounded-2xl shadow-soft border border-neutral-divider relative overflow-hidden group hover:border-indigo-200 transition-colors"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10 font-black text-6xl text-gray-300">01</div>
                            <div className="w-14 h-14 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-6 shadow-sm">
                                <Zap size={28} />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-900">Discover & Connect</h3>
                            <p className="text-neutral-muted leading-relaxed">
                                Pulse layers over your favorite apps. Find creators driving real impact—from journalists to artists—and back them directly.
                            </p>
                        </motion.div>

                        {/* Step 2 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-white p-8 rounded-2xl shadow-soft border border-neutral-divider relative overflow-hidden group hover:border-green-200 transition-colors"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10 font-black text-6xl text-gray-300">02</div>
                            <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center text-green-600 mb-6 shadow-sm">
                                <TrendingUp size={28} />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-900">Invest in Belief</h3>
                            <p className="text-neutral-muted leading-relaxed">
                                Buy "creator tokens" that fluctuate based on demand. If a creator gains momentum, your stake grows with them.
                            </p>
                        </motion.div>

                        {/* Step 3 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="bg-white p-8 rounded-2xl shadow-soft border border-neutral-divider relative overflow-hidden group hover:border-purple-200 transition-colors"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10 font-black text-6xl text-gray-300">03</div>
                            <div className="w-14 h-14 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 mb-6 shadow-sm">
                                <Users size={28} />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-900">Share the Upside</h3>
                            <p className="text-neutral-muted leading-relaxed">
                                Stay for the long haul. As the community expands, you share in the financial success of the voices you believed in early.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values / Philosophy */}
            <section className="py-24 bg-neutral-900 text-white">
                <div className="container mx-auto px-4 text-center max-w-3xl">
                    <ShieldCheck size={56} className="mx-auto text-indigo-400 mb-6" />
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Built on Trust, Not Hype.</h2>
                    <p className="text-gray-400 mb-10 leading-relaxed text-lg">
                        Pulse introduces transparency to media economics. We don't charge transaction fees—we hold a small equity share alongside you.
                        If the creator wins, and you win, <em>then</em> we win.
                    </p>
                    <Link to="/market" className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 shadow-lg shadow-indigo-900/50">
                        Explore the Market <ArrowRight size={20} />
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default HowItWorks;
