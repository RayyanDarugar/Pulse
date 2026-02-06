import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, Rocket, User as UserIcon, LogOut, Wallet } from 'lucide-react';

const Header: React.FC = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-neutral-divider bg-neutral-card/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-2">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
                            <Rocket size={20} className="fill-current" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-neutral-strong">Pulse</span>
                    </Link>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link to="/market" className="text-sm font-medium text-neutral-muted hover:text-indigo-600 transition-colors">
                        Market
                    </Link>
                    <Link to="/how-it-works" className="text-sm font-medium text-neutral-muted hover:text-indigo-600 transition-colors">
                        How It Works
                    </Link>
                    {isAuthenticated && (
                        <Link to="/dashboard" className="text-sm font-medium text-neutral-muted hover:text-indigo-600 transition-colors">
                            Dashboard
                        </Link>
                    )}
                </nav>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center gap-4">
                    {isAuthenticated ? (
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-neutral-bg rounded-full border border-neutral-divider">
                                <Wallet size={14} className="text-neutral-muted" />
                                <span className="text-sm font-medium text-neutral-strong">${user?.balance.toFixed(2)}</span>
                            </div>

                            <div className="relative group">
                                <button className="flex items-center gap-2 text-sm font-medium text-neutral-strong hover:text-white">
                                    <div className="h-8 w-8 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                                        <UserIcon size={16} />
                                    </div>
                                </button>
                                {/* Simple Dropdown */}
                                <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-neutral-card py-1 shadow-lg ring-1 ring-white/10 focus:outline-none hidden group-hover:block px-2 border border-neutral-divider">
                                    <Link to="/settings" className="block px-4 py-2 text-sm text-neutral-strong hover:bg-neutral-bg rounded-md">Settings</Link>
                                    <button onClick={handleLogout} className="flex w-full items-center px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-md">
                                        <LogOut size={14} className="mr-2" /> Sign out
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link to="/auth" className="text-sm font-medium text-neutral-muted hover:text-neutral-strong">
                                Log in
                            </Link>
                            <Link to="/auth" className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all">
                                Get Started
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile menu button */}
                <div className="flex md:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-neutral-strong"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <span className="sr-only">Open main menu</span>
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-neutral-divider bg-neutral-card">
                    <div className="space-y-1 px-4 py-6">
                        <Link to="/market" className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-neutral-strong hover:bg-neutral-bg" onClick={() => setIsMenuOpen(false)}>Market</Link>
                        <Link to="/how-it-works" className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-neutral-strong hover:bg-neutral-bg" onClick={() => setIsMenuOpen(false)}>How It Works</Link>
                        {isAuthenticated && (
                            <>
                                <Link to="/dashboard" className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-neutral-strong hover:bg-neutral-bg" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
                                <Link to="/settings" className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-neutral-strong hover:bg-neutral-bg" onClick={() => setIsMenuOpen(false)}>Settings</Link>
                            </>
                        )}
                        <div className="mt-4 pt-4 border-t border-neutral-divider">
                            {isAuthenticated ? (
                                <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="block w-full text-left rounded-lg px-3 py-2 text-base font-semibold leading-7 text-red-400 hover:bg-red-500/10">
                                    Sign out
                                </button>
                            ) : (
                                <Link to="/auth" className="block w-full text-center rounded-lg bg-indigo-600 px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-indigo-500" onClick={() => setIsMenuOpen(false)}>
                                    Log in
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
