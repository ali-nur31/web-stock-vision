# StockVision: Terminal Pro

**Institutional-grade market visualization powered by Finnhub.**

StockVision is a high-performance terminal that brings the power of Wall Street to your browser. Built with a "Dark Terminal" aesthetic (`#050505`), it utilizes the **Finnhub API** to provide market data. It includes a robust **Mock Data Engine** that ensures the dashboard is always alive with beautiful, randomized data, even without an API key.

## Key Features

- **Finnhub Integration**: Authentic real-time quotes and historical data.
- **Robust Mock Data Engine**: Automatically falls back to realistic randomized data if the API limit is reached or no key is provided. You will never see a blank screen.
- **Deep Historical Analysis**: Interactive charts visualizing daily trends.
- **Real-Time Watchlist**: A live sidebar tracking your portfolio favorites with instant Green/Red trend indicators.
- **Smart Search Engine**: Fast symbol search with autocomplete.
- **Terminal Aesthetics**: A distraction-free, high-contrast interface designed for long trading sessions.

## Technical Stack

- **Core**: React 18, Vite
- **Styling**: Tailwind CSS (Custom `#050505` Theme)
- **Charts**: Recharts (Fixed-layout, responsive)
- **Data**: Finnhub API + Custom Mock Engine
- **State**: React Context API
- **Deployment**: GitHub Pages

## Setup Instructions

### 1. Clone & Install
```bash
git clone https://github.com/ali-nur31/web-stock-vision.git
cd web-stock-vision
npm install
```

### 2. Configure API Key
StockVision works best with a [Finnhub API Key](https://finnhub.io/).
Create a `.env` file in the root directory:
```env
VITE_FINNHUB_KEY=your_api_key_here
```
> **Note**: If you don't provide a key, the app will automatically switch to **Mock Mode**, generating beautiful random data for demonstration.

### 3. Run
```bash
npm run dev
```

## Deployment

Deploy to GitHub Pages:
```bash
npm run deploy
```

## License
MIT
