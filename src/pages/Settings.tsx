import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Shield, Wallet } from 'lucide-react';

const Settings: React.FC = () => {
    const { user } = useAuth();

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-8">Settings</h1>

                <div className="space-y-6">
                    {/* Profile Section */}
                    <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
                        <div className="px-4 py-6 sm:p-8">
                            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="col-span-full">
                                    <label className="block text-sm font-medium leading-6 text-gray-900">Profile Photo</label>
                                    <div className="mt-2 flex items-center gap-x-3">
                                        <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                                            {user?.name ? (
                                                <span className="text-xl font-bold text-gray-500">{user.name[0]}</span>
                                            ) : <User className="h-6 w-6 text-gray-400" />}
                                        </div>
                                        <button type="button" className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                            Change
                                        </button>
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                        Full name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="first-name"
                                            id="first-name"
                                            defaultValue={user?.name}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-4">
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                        Email address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            defaultValue={user?.email}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Wallet Section */}
                    <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
                        <div className="px-4 py-6 sm:p-8">
                            <h2 className="text-base font-semibold leading-7 text-gray-900 flex items-center gap-2">
                                <Wallet size={18} /> Web3 Connection
                            </h2>
                            <p className="mt-1 text-sm leading-6 text-gray-500">
                                Connect your crypto wallet to enable real transactions (Placeholder).
                            </p>

                            <div className="mt-6">
                                <button type="button" className="flex items-center gap-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
                                    Connect MetaMask
                                </button>
                                <p className="mt-2 text-xs text-gray-400">env: VITE_WEB3_PROVIDER_URL not set</p>
                            </div>
                        </div>
                    </div>

                    {/* Security Section */}
                    <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
                        <div className="px-4 py-6 sm:p-8">
                            <h2 className="text-base font-semibold leading-7 text-gray-900 flex items-center gap-2">
                                <Shield size={18} /> Compliance & Safety
                            </h2>
                            <p className="mt-1 text-sm leading-6 text-gray-500">
                                Verify your identity to increase transaction limits.
                            </p>

                            <dl className="mt-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                                <div className="py-6 sm:flex sm:gap-x-4">
                                    <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none">KYC Status</dt>
                                    <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                                        <div className="text-gray-900">Unverified</div>
                                        <button type="button" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                            Start Verification
                                        </button>
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
