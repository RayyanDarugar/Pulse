import creatorsData from '../../mock/creators.json';
import userData from '../../mock/users.json';

// Types
export interface Creator {
    id: string;
    name: string;
    handle: string;
    shortBio: string;
    longBio: string;
    imageUrl: string;
    initialTokenPrice: number;
    tokenSupply: number;
    socialLinks: Record<string, string | undefined>;
    tags: string[];
    region: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    balance: number;
    portfolio: Record<string, number>; // creatorId -> quantity
}

export interface PricePoint {
    timestamp: string;
    price: number;
}

// In-memory state
let creators = [...creatorsData];
let user: User = { ...userData, portfolio: userData.portfolio || {} };
// Store current prices in memory. Start with initial prices.
const currentPrices: Record<string, number> = {};
creators.forEach(c => {
    currentPrices[c.id] = c.initialTokenPrice;
});

const PLATFORM_FEE_PERCENT = 0.01; // 1% fee

// Helper for simulated delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
    getCreators: async (): Promise<Creator[]> => {
        await delay(500);
        // Return creators with current mock prices attached (optional, or fetch price separately)
        return creators;
    },

    getCreator: async (id: string): Promise<Creator | undefined> => {
        await delay(300);
        return creators.find(c => c.id === id);
    },

    getCurrentPrice: async (creatorId: string): Promise<number> => {
        // Return the dynamic in-memory price
        return currentPrices[creatorId] || 0;
    },

    getPriceHistory: async (creatorId: string): Promise<PricePoint[]> => {
        await delay(300);
        // Generate mock history based on current price
        const history: PricePoint[] = [];
        const current = currentPrices[creatorId] || 1;
        const now = new Date();

        // Generate 7 days of hourly data points
        for (let i = 168; i >= 0; i--) {
            const time = new Date(now.getTime() - i * 60 * 60 * 1000);
            // Random walk
            // This is a naive generator just for the graph shape, converging to 'current' roughly
            // To make it look real, let's just jitter the current price backwards
            const price = current * (1 + (Math.random() * 0.2 - 0.1));

            history.push({
                timestamp: time.toISOString(),
                price: Number(price.toFixed(2))
            });
        }
        // Force the last point to be the current price
        history[history.length - 1].price = current;

        return history;
    },

    getUser: async (): Promise<User> => {
        await delay(300);
        return user;
    },

    // TODO: Replace with real API call
    // POST /api/token/buy { creatorId, quantity }
    // Web3: await contract.methods.buy(creatorId, qty).send({ from: wallet, value: cost })
    buyToken: async (creatorId: string, quantity: number): Promise<{ success: boolean; newBalance: number; newPortfolio: Record<string, number>; message?: string }> => {
        await delay(800);

        const price = currentPrices[creatorId];
        if (!price) return { success: false, newBalance: user.balance, newPortfolio: user.portfolio, message: 'Token not found' };

        const cost = price * quantity * (1 + PLATFORM_FEE_PERCENT); // Include fee

        if (user.balance < cost) {
            return { success: false, newBalance: user.balance, newPortfolio: user.portfolio, message: 'Insufficient funds' };
        }

        // Execute Trade (Mock)
        user.balance -= cost;
        user.portfolio = user.portfolio || {};
        user.portfolio[creatorId] = (user.portfolio[creatorId] || 0) + quantity;

        // Simulate Price Impact (Simple bonding curve-ish logic: buying increases price slightly)
        // e.g. 0.01% price increase per token bought
        const priceImpact = 1 + (0.0001 * quantity);
        currentPrices[creatorId] = Number((currentPrices[creatorId] * priceImpact).toFixed(2));

        return { success: true, newBalance: user.balance, newPortfolio: user.portfolio };
    },

    // TODO: Replace with real API call
    // POST /api/token/sell { creatorId, quantity }
    sellToken: async (creatorId: string, quantity: number): Promise<{ success: boolean; newBalance: number; newPortfolio: Record<string, number>; message?: string }> => {
        await delay(800);

        const currentQty = user.portfolio[creatorId] || 0;
        if (currentQty < quantity) {
            return { success: false, newBalance: user.balance, newPortfolio: user.portfolio, message: 'Insufficient tokens' };
        }

        const price = currentPrices[creatorId];
        // Sell price might be slightly lower due to spread/fees
        const revenue = price * quantity * (1 - PLATFORM_FEE_PERCENT);

        // Execute Trade (Mock)
        user.balance += revenue;
        user.portfolio[creatorId] -= quantity;
        if (user.portfolio[creatorId] <= 0) {
            delete user.portfolio[creatorId];
        }

        // Simulate Price Impact (Selling decreases price)
        const priceImpact = 1 - (0.0001 * quantity);
        currentPrices[creatorId] = Number((currentPrices[creatorId] * priceImpact).toFixed(2));

        return { success: true, newBalance: user.balance, newPortfolio: user.portfolio };
    }
};
