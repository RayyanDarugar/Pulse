import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Share2, Music2 } from 'lucide-react';

const TikTokFeed: React.FC = () => {
    return (
        <div className="bg-black text-white h-screen w-full overflow-y-scroll snap-y snap-mandatory relative text-sm sm:text-base font-sans antialiased">
            {/* Mock Video Container 1 */}
            <div className="h-screen w-full snap-start relative bg-neutral-900 flex items-center justify-center">
                {/* Background Placeholder */}
                <div className="absolute inset-0 bg-gradient-to-b from-neutral-800 to-black opacity-50 z-0"></div>
                <div className="z-0 text-neutral-500 font-bold text-2xl animate-pulse">
                    Mock Video Playing...
                </div>

                {/* Overlay UI */}
                <div className="absolute bottom-4 left-4 right-16 z-20 pb-4 pl-2">
                    <Link to="/demo/profile" className="font-bold text-lg mb-2 block hover:underline cursor-pointer">
                        @logan
                    </Link>
                    <p className="mb-2 leading-tight drop-shadow-md">
                        He was genuinely being 100% deadass bro omg 💀 <span className="font-bold">#fyp</span>
                    </p>
                    <div className="flex items-center gap-2 text-xs opacity-90 mt-2">
                        <Music2 size={14} className="animate-spin-slow" />
                        <span className="scrolling-text">Original Sound - Logan</span>
                    </div>
                </div>

                {/* Right Action Sidebar */}
                <div className="absolute bottom-20 right-2 z-20 flex flex-col gap-6 items-center">
                    <Link to="/demo/profile" className="relative group cursor-pointer">
                        <div className="w-12 h-12 rounded-full bg-white p-[1px] overflow-hidden border-2 border-white shadow-md transition-transform transform group-hover:scale-110">
                            <img
                                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                                alt="Avatar"
                                className="w-full h-full object-cover rounded-full"
                            />
                        </div>
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold shadow-sm">
                            +
                        </div>
                    </Link>

                    <div className="flex flex-col items-center gap-1">
                        <div className="bg-neutral-800/60 p-3 rounded-full hover:bg-neutral-700/60 transition-colors cursor-pointer">
                            <Heart size={28} fill="white" className="text-red-500" />
                        </div>
                        <span className="text-xs font-semibold drop-shadow-md">104.6K</span>
                    </div>

                    <div className="flex flex-col items-center gap-1">
                        <div className="bg-neutral-800/60 p-3 rounded-full hover:bg-neutral-700/60 transition-colors cursor-pointer">
                            <MessageCircle size={28} fill="white" className="text-white" />
                        </div>
                        <span className="text-xs font-semibold drop-shadow-md">432</span>
                    </div>

                    <div className="flex flex-col items-center gap-1">
                        <div className="bg-neutral-800/60 p-3 rounded-full hover:bg-neutral-700/60 transition-colors cursor-pointer">
                            <Share2 size={28} fill="white" className="text-white" />
                        </div>
                        <span className="text-xs font-semibold drop-shadow-md">24.7K</span>
                    </div>
                    <div className="animate-spin-slow w-10 h-10 bg-neutral-900 rounded-full border-4 border-neutral-700 flex items-center justify-center mt-4">
                        <img
                            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                            className="w-6 h-6 rounded-full"
                        />
                    </div>
                </div>
            </div>

            {/* Mock Video Container 2 (For Scrolling Effect) */}
            <div className="h-screen w-full snap-start relative bg-neutral-800 flex items-center justify-center">
                <div className="z-0 text-neutral-600 font-bold text-xl">
                    More content below...
                </div>
            </div>
        </div>
    );
};

export default TikTokFeed;
