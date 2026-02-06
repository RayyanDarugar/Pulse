import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { mockApi, type Creator } from '../api/mockApi';
import { Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import clsx from 'clsx';

interface BuySellWidgetProps {
    creator: Creator;
    currentPrice: number;
    onSuccess?: () => void;
}

const BuySellWidget: React.FC<BuySellWidgetProps> = ({ creator, currentPrice, onSuccess }) => {
    const { user, login, isAuthenticated, refreshUser } = useAuth();
    const [mode, setMode] = useState<'buy' | 'sell'>('buy');
    const [quantity, setQuantity] = useState<string>('1');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const parsedQty = parseInt(quantity, 10) || 0;
    const totalCost = parsedQty * currentPrice;
    // 1% fee
    const fee = totalCost * 0.01;
    const total = mode === 'buy' ? totalCost + fee : totalCost - fee;

    const handleTransaction = async () => {
        if (!isAuthenticated) {
            // Trigger mock login for demo purposes if not logged in
            if (confirm("You need to be logged in. Login as supporter?")) {
                await login('supporter');
            } else {
                return;
            }
        }

        if (parsedQty <= 0) return;

        setIsLoading(true);
        setMessage(null);

        try {
            // TODO: Replace with real API
            // const response = await fetch('/api/token/' + mode, ...);
            // OR
            // await web3Contract.methods.buy()...

            let result;
            if (mode === 'buy') {
                result = await mockApi.buyToken(creator.id, parsedQty);
            } else {
                result = await mockApi.sellToken(creator.id, parsedQty);
            }

            if (result.success) {
                setMessage({ type: 'success', text: `Successfully ${mode === 'buy' ? 'bought' : 'sold'} ${parsedQty} tokens!` });
                await refreshUser();
                if (onSuccess) onSuccess();
            } else {
                setMessage({ type: 'error', text: result.message || 'Transaction failed' });
            }
        } catch (error) {
            console.error("Transaction error", error);
            setMessage({ type: 'error', text: 'Transaction failed due to an error' });
        } finally {
            setIsLoading(false);
        }
    };

    const userPortfolioQty = user?.portfolio?.[creator.id] || 0;
    const canSell = mode === 'sell' && userPortfolioQty >= parsedQty;
    const canBuy = mode === 'buy' && (user?.balance || 0) >= total;

    return (
        <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-900/5 p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Trade {creator.name} Token</h3>
                <div className="flex bg-gray-100 rounded-lg p-1">
                    <button
                        onClick={() => setMode('buy')}
                        className={clsx(
                            "px-4 py-1.5 text-sm font-medium rounded-md transition-all",
                            mode === 'buy' ? "bg-white shadow text-indigo-600" : "text-gray-500 hover:text-gray-700"
                        )}
                    >
                        Buy
                    </button>
                    <button
                        onClick={() => setMode('sell')}
                        className={clsx(
                            "px-4 py-1.5 text-sm font-medium rounded-md transition-all",
                            mode === 'sell' ? "bg-white shadow text-indigo-600" : "text-gray-500 hover:text-gray-700"
                        )}
                    >
                        Sell
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                <div>
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <input
                            type="number"
                            name="quantity"
                            id="quantity"
                            min="1"
                            className="block w-full rounded-md border-0 py-3 pl-4 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                            <span className="text-gray-500 sm:text-sm">TKN</span>
                        </div>
                    </div>
                    {mode === 'sell' && (
                        <p className="mt-1 text-xs text-gray-500 text-right">Available: {userPortfolioQty} TKN</p>
                    )}
                </div>

                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between text-sm text-gray-500">
                        <span>Price per token</span>
                        <span>${currentPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                        <span>Fee (1%)</span>
                        <span>${fee.toFixed(2)}</span>
                    </div>
                    <div className="pt-2 border-t border-gray-200 flex justify-between font-semibold text-gray-900">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                </div>

                {isAuthenticated && mode === 'buy' && (
                    <div className="text-xs text-right text-gray-500">
                        Wallet Balance: ${user?.balance.toFixed(2)}
                    </div>
                )}

                {message && (
                    <div className={clsx("rounded-md p-3 flex items-start gap-2 text-sm", message.type === 'success' ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700")}>
                        {message.type === 'success' ? <CheckCircle2 size={16} className="mt-0.5" /> : <AlertCircle size={16} className="mt-0.5" />}
                        {message.text}
                    </div>
                )}

                <button
                    onClick={handleTransaction}
                    disabled={isLoading || (isAuthenticated && mode === 'sell' && !canSell) || (isAuthenticated && mode === 'buy' && !canBuy)}
                    className={clsx(
                        "w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors",
                        mode === 'buy' ? "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500" : "bg-pink-600 hover:bg-pink-700 focus:ring-pink-500",
                        (isLoading || (isAuthenticated && mode === 'sell' && !canSell) || (isAuthenticated && mode === 'buy' && !canBuy)) && "opacity-50 cursor-not-allowed"
                    )}
                >
                    {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : (mode === 'buy' ? (isAuthenticated && !canBuy ? 'Insufficient Funds' : 'Buy Tokens') : (isAuthenticated && !canSell ? 'Insufficient Tokens' : 'Sell Tokens'))}
                </button>

                <p className="text-xs text-center text-gray-400 mt-2">
                    This is a mock transaction. No real funds are moved.
                </p>
            </div>
        </div>
    );
};

export default BuySellWidget;
