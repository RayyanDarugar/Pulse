import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, MoreHorizontal, Link as LinkIcon, ArrowUpRight, Heart } from 'lucide-react';

const TikTokProfile: React.FC = () => {
    return (
        <div className="bg-black min-h-screen w-full flex justify-center font-sans">
            <div className="w-1/3 bg-white min-h-screen h-full relative shadow-2xl overflow-y-auto pb-10 text-black">
                {/* Top Navigation */}
                <div className="sticky top-0 z-30 bg-white border-b border-gray-100 flex items-center justify-between px-4 h-14">
                    <Link to="/demo/feed" className="p-2 -ml-2">
                        <ChevronLeft size={24} />
                    </Link>
                    <div className="font-bold text-lg">Logan</div>
                    <div className="p-2 -mr-2">
                        <MoreHorizontal size={24} />
                    </div>
                </div>

                {/* Profile Header */}
                <div className="flex flex-col items-center pt-6 pb-2">
                    <div className="w-24 h-24 rounded-full p-[2px] border-2 border-gray-200 mb-3 overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                            alt="Profile"
                            className="w-full h-full object-cover rounded-full"
                        />
                    </div>
                    <h1 className="text-lg font-bold">@curlyfriboi</h1>

                    {/* Stats */}
                    <div className="flex items-center gap-8 mt-4 mb-4 text-center">
                        <div>
                            <div className="font-bold text-lg">1,549</div>
                            <div className="text-xs text-gray-500">Following</div>
                        </div>
                        <div>
                            <div className="font-bold text-lg">3,766</div>
                            <div className="text-xs text-gray-500">Followers</div>
                        </div>
                        <div>
                            <div className="font-bold text-lg">475.3K</div>
                            <div className="text-xs text-gray-500">Likes</div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 w-full px-12 mb-4">
                        <button className="flex-1 bg-red-500 text-white font-semibold py-2.5 rounded-md text-sm">
                            Follow
                        </button>
                        <button className="flex-1 bg-gray-100 text-black font-semibold py-2.5 rounded-md text-sm border border-gray-200">
                            Message
                        </button>
                        <button className="w-10 bg-gray-100 flex items-center justify-center rounded-md border border-gray-200">
                            <ChevronLeft size={16} className="transform rotate-180" />
                        </button>
                    </div>

                    {/* Bio */}
                    <div className="px-6 text-center text-sm space-y-1 mb-4">
                        <p>I am spiderman 🕷️🕸️</p>
                        <p>Csm is peak</p>
                        <p>God forbid a white boy catch a vibe</p>
                    </div>

                    {/* Link to Pulse - The Main Interaction */}
                    <div className="px-6 text-sm font-semibold flex items-center justify-center w-full mb-6">
                        <Link to="/creator/9" className="flex items-center gap-1 text-black hover:opacity-70 bg-gray-100 px-4 py-2 rounded-full w-full justify-center transition-colors">
                            <LinkIcon size={14} className="text-gray-500" />
                            <span className="truncate">pulse.to/creator/logan</span>
                            <ArrowUpRight size={14} className="text-gray-400 ml-1" />
                        </Link>
                    </div>
                </div>

                {/* Video Grid Tabs */}
                <div className="flex border-b border-gray-200">
                    <div className="flex-1 flex justify-center py-3 border-b-2 border-black cursor-pointer">
                        <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 6H42V42H6V6Z" stroke="#000" strokeWidth="4" /><path d="M21 6V42" stroke="#000" strokeWidth="4" /><path d="M6 21H42" stroke="#000" strokeWidth="4" /></svg>
                    </div>
                    <div className="flex-1 flex justify-center py-3 border-b-2 border-transparent text-gray-400 cursor-pointer">
                        <Heart size={20} />
                    </div>
                    <div className="flex-1 flex justify-center py-3 border-b-2 border-transparent text-gray-400 cursor-pointer">
                        <div className="w-5 h-5 border-2 border-gray-400 rounded-sm flex items-center justify-center">
                            <div className="w-3 h-[2px] bg-gray-400"></div>
                        </div>
                    </div>
                </div>

                {/* Thumbnails Grid */}
                <div className="grid grid-cols-3 gap-[1px] bg-white">
                    {[...Array(9)].map((_, i) => (
                        <div key={i} className="aspect-[3/4] bg-gray-200 relative">
                            {i === 0 && (
                                <Link to="/demo/feed" className="absolute top-1 left-1 bg-transparent border border-white text-white text-[10px] px-1 rounded uppercase font-bold">
                                    Pinned
                                </Link>
                            )}
                            <div className="absolute bottom-1 left-1 flex items-center gap-1 text-white text-xs font-bold drop-shadow-md">
                                <svg width="12" height="12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 12L36 24L15 36V12Z" fill="#fff" stroke="#fff" strokeWidth="4" strokeLinejoin="round" /></svg>
                                {800 + i * 45}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TikTokProfile;
