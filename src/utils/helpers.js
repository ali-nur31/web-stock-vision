export const formatCurrency = (value) => {
    if (value === undefined || value === null) return 'N/A';
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(value);
};

export const formatPercentage = (value) => {
    if (value === undefined || value === null) return 'N/A';
    return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`;
};

export const resolveSymbolName = (symbol) => {
    const names = {
        AAPL: 'Apple Inc.',
        TSLA: 'Tesla, Inc.',
        MSFT: 'Microsoft Corp.',
        AMZN: 'Amazon.com',
        GOOGL: 'Alphabet Inc.',
        NVDA: 'Nvidia Corp.',
        META: 'Meta Platforms',
        NFLX: 'Netflix Inc.',
    };
    return names[symbol] || symbol;
};
