import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Rocket } from 'lucide-react';

const Auth: React.FC = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (role: 'creator' | 'supporter') => {
        setIsLoading(true);
        // Simulate network delay for UX
        setTimeout(async () => {
            await login(role);
            navigate('/dashboard');
            setIsLoading(false);
        }, 1000);
    };

    return (
        <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-50">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="mx-auto h-12 w-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
                    <Rocket size={24} />
                </div>
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign in to Pulse
                </h2>
                <p className="mt-2 text-center text-sm text-gray-500">
                    Choose your role to enter the prototype
                </p>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="space-y-6">
                    <button
                        onClick={() => handleLogin('supporter')}
                        disabled={isLoading}
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-wait"
                    >
                        {isLoading ? 'Connecting...' : 'Continue as Supporter (Investor)'}
                    </button>

                    <button
                        onClick={() => handleLogin('creator')}
                        disabled={isLoading}
                        className="flex w-full justify-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-indigo-600 shadow-sm border border-gray-200 hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-wait"
                    >
                        {isLoading ? 'Connecting...' : 'Continue as Creator (Demo)'}
                    </button>
                </div>

                <div className="mt-8 text-center text-xs text-gray-400">
                    <p>Prototype Mode: No password required.</p>
                </div>
            </div>
        </div>
    );
};

export default Auth;
