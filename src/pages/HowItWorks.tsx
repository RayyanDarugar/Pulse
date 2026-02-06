import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Users, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const HowItWorks: React.FC = () => {
    return (
        <div className="bg-neutral-bg text-neutral-strong font-sans">
            {/* Hero Section */}
            <section className="relative overflow-hidden py-24 sm:py-32">
                <div className="container mx-auto px-4 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl mb-6">
                            Invest in Culture.
                            <br />
                            <span className="text-gradient">Own the Moment.</span>
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-neutral-muted max-w-2xl mx-auto">
                            Pulse is a creator investment layer that lets audiences financially back the voices,
                            stories, and movements they believe in—turning cultural influence into shared ownership.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* The Problem & Solution */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-4">The Attention Economy is Broken.</h2>
                            <p className="text-neutral-muted leading-relaxed mb-6">
                                Today, media is built on clicks, not belief. Valuable voices—journalists, activists, and niche storytellers—are
                                often suppressed by algorithms or forced to chase viral trends just to survive.
                                Influence is centralized, volatile, and disconnected from the communities that power it.
                            </p>
                        </div>
                        <div className="bg-neutral-bg p-8 rounded-2xl border border-neutral-divider">
                            <h3 className="text-xl font-bold mb-4 text-primary">Enter the Belief Economy.</h3>
                            <p className="text-neutral-strong leading-relaxed">
                                Pulse reimagines media by introducing a <strong>community-owned funding layer</strong>.
                                Instead of passively consuming content, you become a stakeholder in culture itself.
                                We enable direct investment in creators through tokens that represent belief in their long-term growth and impact.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Steps */}
            <section className="py-24">
                <div className="container mx-auto px-4 items-center flex flex-col">
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl">
                        {/* Step 1 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="bg-white p-8 rounded-2xl shadow-soft border border-neutral-divider relative overflow-hidden group hover:border-primary/30 transition-colors"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10 font-black text-6xl">01</div>
                            <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center text-primary mb-6">
                                <Zap size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Discover & Connect</h3>
                            <p className="text-neutral-muted">
                                Pulse operates as a seamless layer on top of platforms like YouTube, Instagram, and TikTok.
                                Find creators driving real impact—from global storytellers to independent journalists.
                            </p>
                        </motion.div>

                        {/* Step 2 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-white p-8 rounded-2xl shadow-soft border border-neutral-divider relative overflow-hidden group hover:border-primary/30 transition-colors"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10 font-black text-6xl">02</div>
                            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center text-positive mb-6">
                                <TrendingUp size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Invest in Growth</h3>
                            <p className="text-neutral-muted">
                                Buy "creator tokens" that fluctuate based on market demand and community interest.
                                It’s like a stock market for culture. If a creator gains momentum, your stake grows with them.
                            </p>
                        </motion.div>

                        {/* Step 3 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="bg-white p-8 rounded-2xl shadow-soft border border-neutral-divider relative overflow-hidden group hover:border-primary/30 transition-colors"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10 font-black text-6xl">03</div>
                            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center text-primary-end mb-6">
                                <Users size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Share the Success</h3>
                            <p className="text-neutral-muted">
                                Creators retain ownership and autonomy, ensuring alignment.
                                As a supporter, you can buy, sell, or hold your position, turning your early belief into tangible value.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values / Philosophy */}
            <section className="py-20 bg-neutral-900 text-white">
                <div className="container mx-auto px-4 text-center max-w-3xl">
                    <ShieldCheck size={48} className="mx-auto text-primary mb-6" />
                    <h2 className="text-3xl font-bold mb-6">Built on Trust, Not Hype.</h2>
                    <p className="text-gray-400 mb-8 leading-relaxed">
                        Pulse introduces transparency to media economics. While controversy drives engagement elsewhere,
                        our market is designed with guardrails that prioritize long-term trust and responsible participation.
                        We don't charge transaction fees—we hold a small equity share alongside you, aligning our success with the creators we serve.
                    </p>
                    <Link to="/market" className="inline-flex items-center gap-2 bg-primary hover:bg-primary-start text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 shadow-glow">
                        Explore the Market <ArrowRight size={20} />
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default HowItWorks;
