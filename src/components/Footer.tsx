import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-neutral-card border-t border-neutral-divider">
            <div className="mx-auto max-w-7xl overflow-hidden px-6 py-12 lg:px-8">
                <div className="flex justify-center mb-8">
                    <Link to="/" className="flex items-center gap-2 text-neutral-strong">
                        <Rocket size={20} className="text-indigo-600 fill-current" />
                        <span className="font-bold text-lg">Pulse</span>
                    </Link>
                </div>
                <nav className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12" aria-label="Footer">
                    <div className="pb-6">
                        <Link to="/how-it-works" className="text-sm leading-6 text-neutral-muted hover:text-indigo-400">
                            How It Works
                        </Link>
                    </div>
                    <div className="pb-6">
                        <Link to="/market" className="text-sm leading-6 text-neutral-muted hover:text-indigo-400">
                            Market
                        </Link>
                    </div>
                    <div className="pb-6">
                        <a href="#" className="text-sm leading-6 text-neutral-muted hover:text-indigo-400">
                            Ecosystem
                        </a>
                    </div>
                    <div className="pb-6">
                        <a href="#" className="text-sm leading-6 text-neutral-muted hover:text-indigo-400">
                            Terms
                        </a>
                    </div>
                    <div className="pb-6">
                        <a href="#" className="text-sm leading-6 text-neutral-muted hover:text-indigo-400">
                            Privacy
                        </a>
                    </div>
                </nav>
                <p className="mt-10 text-center text-xs leading-5 text-neutral-muted">
                    &copy; {new Date().getFullYear()} Pulse. Prototype / Demo Only. Not financial advice.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
