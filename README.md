# Pulse — Creator Investment Marketplace (Prototype)

Pulse is a platform where fans can invest in their favorite creators, buying tokens that represent "shares" in their community impact and future success.

> [!WARNING]
> **PROTOTYPE / DEMO ONLY**
> This application is a UI prototype for demonstration purposes. **No real funds are handled.**
> All monetary values, transactions, and tokens are simulated in-memory and reset on refresh.
> Real implementation requires strict adherence to financial regulations (KYC/AML), smart contract audits, and securities law compliance.

## Project Overview

This prototype demonstrates a full user flow for a creator token marketplace:
- **Landing Page**: Value proposition and feature highlights.
- **Market**: Browse and search for creators.
- **Creator Profile**: View bio, token price history (simulated chart), and buy/sell tokens.
- **Dashboard**: Track your portfolio performance and holdings.
- **Auth**: Mock authentication for "Supporter" and "Creator" roles.
- **Settings**: Profile and wallet connection placeholder.

## Tech Stack

- **Frontend**: React (Vite) + TypeScript
- **Styling**: TailwindCSS
- **Routing**: React Router v6
- **Charts**: Recharts
- **Icons**: Lucide React
- **State**: React Context API + Local Storage (Mock Persistence)

## Quick Start

1.  **Install dependencies**
    ```bash
    npm install
    ```

2.  **Start development server**
    ```bash
    npm run dev
    ```

3.  **Build for production**
    ```bash
    npm run build
    npm run preview
    ```

## Architecture & Integration

The project is designed to be easily connected to a real backend.

### Mock API (`src/api/mockApi.ts`)
Currently, all data is served from local JSON (`mock/`). Async delays are added to simulate network latency.
To integrate a real backend:
1.  Replace `mockApi.ts` methods with `fetch()` calls to your REST/GraphQL API.
2.  Set `VITE_API_BASE_URL` in `.env`.

### Web3 Integration
The `BuySellWidget` and `Settings` pages contain placeholders for Web3 integration.
- Look for `// TODO: Replace with real API` comments.
- Integrate libraries like `ethers.js` or `wagmi` to connect real wallets (MetaMask).

## Ethics & Safeguards

If building this as a real product, the following safeguards are mandatory:

1.  **KYC/AML**: Verify the identity of all creators and investors to prevent money laundering.
2.  **Compliance**: Consult legal counsel regarding securities laws (SEC in US). Creator tokens may be classified as securities.
3.  **Moderation**: Strict content and community guidelines to prevent abuse.
4.  **Dispute Resolution**: Mechanisms for addressing fraud or creator abandonment.
5.  **Smart Contract Audits**: Ensure all on-chain code is audited by reputable firms.

---
*Created by Antigravity*
