import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Users, ShieldCheck, Zap, BarChart3, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const HowItWorks: React.FC = () => {
    return (
        <div className="bg-neutral-950 min-h-screen font-sans text-white overflow-hidden relative selection:bg-indigo-500 selection:text-white">

            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-4">
                <div className="container mx-auto max-w-5xl text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h2 className="text-indigo-400 font-mono text-sm tracking-widest uppercase mb-4 font-bold">
                            The Evolution of Media
                        </h2>
                        <h1 className="text-6xl md:text-8xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-100 to-indigo-200 leading-tight mb-8 drop-shadow-2xl">
                            Enter the <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 animate-gradient-x">
                                Belief Economy.
                            </span>
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-xl md:text-2xl text-indigo-100/70 max-w-3xl mx-auto leading-relaxed"
                    >
                        The Attention Economy is built on clicks. The Belief Economy is built on <span className="text-white font-semibold">conviction</span>.
                        Stop passively scrolling. Start owning the culture you create.
                    </motion.p>
                </div>
            </section>

            {/* The Shift: Compare & Contrast */}
            <section className="py-24 px-4 bg-white/5 border-y border-white/5 backdrop-blur-sm relative">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid md:grid-cols-2 gap-0 md:gap-16 items-stretch">

                        {/* Old Way */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="p-10 rounded-3xl bg-neutral-900/50 border border-white/5 flex flex-col justify-center relative group"
                        >
                            <div className="absolute inset-0 bg-red-500/5 group-hover:bg-red-500/10 transition-colors rounded-3xl" />
                            <h3 className="text-3xl font-bold text-gray-500 mb-6 relative z-10 flex items-center gap-3">
                                <BarChart3 className="text-red-500/50" />
                                Attention Economy
                            </h3>
                            <ul className="space-y-4 text-gray-400 relative z-10 text-lg">
                                <li className="flex items-center gap-3">
                                    <span className="w-2 h-2 rounded-full bg-red-500/50" />
                                    Optimizes for outrage & clicks
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-2 h-2 rounded-full bg-red-500/50" />
                                    Creators serve algorithms, not fans
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-2 h-2 rounded-full bg-red-500/50" />
                                    Value is centralized by platforms
                                </li>
                            </ul>
                        </motion.div>

                        {/* New Way - Pulse */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="p-10 rounded-3xl bg-neutral-900 border border-indigo-500/30 shadow-[0_0_50px_-12px_rgba(99,102,241,0.25)] flex flex-col justify-center relative overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-indigo-600/10 group-hover:bg-indigo-600/20 transition-colors rounded-3xl" />
                            <div className="absolute -right-20 -top-20 w-64 h-64 bg-indigo-500/20 blur-[80px] rounded-full" />

                            <h3 className="text-3xl font-bold text-white mb-6 relative z-10 flex items-center gap-3">
                                <Heart className="text-indigo-400 fill-indigo-400" />
                                Belief Economy
                            </h3>
                            <ul className="space-y-4 text-indigo-100 relative z-10 text-lg">
                                <li className="flex items-center gap-3">
                                    <span className="w-2 h-2 rounded-full bg-indigo-400 shadow-[0_0_10px_rgba(129,140,248,0.8)]" />
                                    Optimizes for trust & alignment
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-2 h-2 rounded-full bg-indigo-400 shadow-[0_0_10px_rgba(129,140,248,0.8)]" />
                                    Creators are funded by community
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-2 h-2 rounded-full bg-indigo-400 shadow-[0_0_10px_rgba(129,140,248,0.8)]" />
                                    Value is shared with supporters
                                </li>
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* How It Works Steps - Glassmorphism */}
            <section className="py-32 px-4 relative">
                <div className="container mx-auto max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">How It Works</h2>
                        <p className="text-gray-400 text-lg">Three steps to turn cultural influence into shared wealth.</p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

                        {/* Step 1 */}
                        <Card
                            number="01"
                            title="Discover & Connect"
                            desc="Pulse layers over your favorite apps. Find creators driving real impact—from journalists to artists—and back them directly."
                            icon={<Zap size={32} className="text-yellow-400" />}
                            delay={0.1}
                        />

                        {/* Step 2 */}
                        <Card
                            number="02"
                            title="Invest in Belief"
                            desc="Buy Creator Tokens. These aren't donations—they're assets. As the creator's influence grows, so does the value of your stake."
                            icon={<TrendingUp size={32} className="text-green-400" />}
                            delay={0.2}
                        />

                        {/* Step 3 */}
                        <Card
                            number="03"
                            title="Share the Upside"
                            desc="Stay for the long haul. As the community expands, you share in the financial success of the voices you believed in early."
                            icon={<Users size={32} className="text-pink-400" />}
                            delay={0.3}
                        />
                    </div>
                </div>
            </section>

            {/* Values / Philosophy */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/50 to-neutral-950 -z-10" />

                <div className="container mx-auto px-4 text-center max-w-3xl relative z-10">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <ShieldCheck size={64} className="mx-auto text-indigo-400 mb-8 drop-shadow-[0_0_15px_rgba(129,140,248,0.5)]" />
                    </motion.div>

                    <h2 className="text-4xl font-bold mb-8">Built on Trust, Not Hype.</h2>
                    <p className="text-indigo-200/80 mb-12 text-xl leading-relaxed">
                        We don't charge transaction fees—we hold a small equity share alongside you.
                        If the creator wins, and you win, <em>then</em> we win.
                        This is the alignment the internet has been waiting for.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <Link to="/market" className="group relative inline-flex items-center gap-3 bg-white text-indigo-950 px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                            Explore the Market
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link to="/landing" className="text-indigo-300 hover:text-white font-medium transition-colors">
                            Back to Home
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

const Card = ({ number, title, desc, icon, delay }: { number: string, title: string, desc: string, icon: React.ReactNode, delay: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
        className="relative bg-white/5 border border-white/10 backdrop-blur-xl p-8 rounded-2xl hover:bg-white/10 transition-colors group"
    >
        <div className="absolute -top-6 left-8 bg-neutral-900 border border-white/10 p-3 rounded-xl shadow-xl group-hover:scale-110 transition-transform duration-300">
            {icon}
        </div>
        <div className="mt-8">
            <h3 className="text-2xl font-bold mb-4 flex justify-between items-center text-white">
                {title}
                <span className="text-white/10 text-4xl font-black">{number}</span>
            </h3>
            <p className="text-indigo-100/60 leading-relaxed text-lg">
                {desc}
            </p>
        </div>
    </motion.div>
);

export default HowItWorks;
