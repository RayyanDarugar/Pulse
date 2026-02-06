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
        <div className="bg-neutral-card rounded-2xl shadow-sm ring-1 ring-neutral-divider p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-neutral-strong">Trade {creator.name} Token</h3>
                <div className="flex bg-neutral-bg rounded-lg p-1 border border-neutral-divider">
                    <button
                        onClick={() => setMode('buy')}
                        className={clsx(
                            "px-4 py-1.5 text-sm font-medium rounded-md transition-all",
                            mode === 'buy' ? "bg-neutral-strong shadow text-neutral-bg" : "text-neutral-muted hover:text-neutral-strong"
                        )}
                    >
                        Buy
                    </button>
                    <button
                        onClick={() => setMode('sell')}
                        className={clsx(
                            "px-4 py-1.5 text-sm font-medium rounded-md transition-all",
                            mode === 'sell' ? "bg-neutral-strong shadow text-neutral-bg" : "text-neutral-muted hover:text-neutral-strong"
                        )}
                    >
                        Sell
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                <div>
                    <label htmlFor="quantity" className="block text-sm font-medium text-neutral-strong">Quantity</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <input
                            type="number"
                            name="quantity"
                            id="quantity"
                            min="1"
                            className="block w-full rounded-md border-neutral-divider bg-neutral-bg py-3 pl-4 pr-12 text-neutral-strong ring-1 ring-inset ring-neutral-divider placeholder:text-neutral-muted focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                            <span className="text-neutral-muted sm:text-sm">TKN</span>
                        </div>
                    </div>
                    {mode === 'sell' && (
                        <p className="mt-1 text-xs text-neutral-muted text-right">Available: {userPortfolioQty} TKN</p>
                    )}
                </div>

                <div className="bg-neutral-bg rounded-lg p-4 space-y-2 border border-neutral-divider">
                    <div className="flex justify-between text-sm text-neutral-muted">
                        <span>Price per token</span>
                        <span>${currentPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-neutral-muted">
                        <span>Fee (1%)</span>
                        <span>${fee.toFixed(2)}</span>
                    </div>
                    <div className="pt-2 border-t border-neutral-divider flex justify-between font-semibold text-neutral-strong">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                </div>

                {isAuthenticated && mode === 'buy' && (
                    <div className="text-xs text-right text-neutral-muted">
                        Wallet Balance: ${user?.balance.toFixed(2)}
                    </div>
                )}

                {message && (
                    <div className={clsx("rounded-md p-3 flex items-start gap-2 text-sm", message.type === 'success' ? "bg-green-900/30 text-green-400 border border-green-900/50" : "bg-red-900/30 text-red-400 border border-red-900/50")}>
                        {message.type === 'success' ? <CheckCircle2 size={16} className="mt-0.5" /> : <AlertCircle size={16} className="mt-0.5" />}
                        {message.text}
                    </div>
                )}

                <button
                    onClick={handleTransaction}
                    disabled={isLoading || (isAuthenticated && mode === 'sell' && !canSell) || (isAuthenticated && mode === 'buy' && !canBuy)}
                    className={clsx(
                        "w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors",
                        mode === 'buy' ? "bg-primary hover:bg-primary-start focus:ring-primary" : "bg-pink-600 hover:bg-pink-700 focus:ring-pink-500",
                        (isLoading || (isAuthenticated && mode === 'sell' && !canSell) || (isAuthenticated && mode === 'buy' && !canBuy)) && "opacity-50 cursor-not-allowed"
                    )}
                >
                    {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : (mode === 'buy' ? (isAuthenticated && !canBuy ? 'Insufficient Funds' : 'Buy Tokens') : (isAuthenticated && !canSell ? 'Insufficient Tokens' : 'Sell Tokens'))}
                </button>

                <p className="text-xs text-center text-neutral-muted mt-2">
                    This is a mock transaction. No real funds are moved.
                </p>
            </div>
        </div>
    );
};

export default BuySellWidget;
