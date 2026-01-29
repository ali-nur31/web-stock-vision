export const generateMockCandles = (symbol = 'AAPL', count = 30) => {
    const candles = [];
    let price = 150 + Math.random() * 50;
    const now = new Date();

    for (let i = count; i > 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);

        const open = price;
        const close = price + (Math.random() - 0.5) * 5;
        const high = Math.max(open, close) + Math.random() * 2;
        const low = Math.min(open, close) - Math.random() * 2;
        const volume = Math.floor(Math.random() * 1000000) + 500000;

        candles.push({
            t: date.getTime() / 1000,
            o: parseFloat(open.toFixed(2)),
            h: parseFloat(high.toFixed(2)),
            l: parseFloat(low.toFixed(2)),
            c: parseFloat(close.toFixed(2)),
            v: volume
        });

        price = close;
    }
    return candles;
};

export const generateMockQuote = (symbol = 'AAPL') => {
    const price = 100 + Math.random() * 900;
    const change = (Math.random() - 0.5) * 10;
    const percentChange = (change / price) * 100;

    return {
        c: parseFloat(price.toFixed(2)),
        d: parseFloat(change.toFixed(2)),
        dp: parseFloat(percentChange.toFixed(2)),
        h: parseFloat((price + Math.random() * 5).toFixed(2)),
        l: parseFloat((price - Math.random() * 5).toFixed(2)),
        o: parseFloat((price - change).toFixed(2)),
        pc: parseFloat((price - change).toFixed(2))
    };
};
