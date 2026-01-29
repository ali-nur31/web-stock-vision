import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { StockProvider } from './context/StockContext';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <ThemeProvider>
      <StockProvider>
        <Layout>
          <Dashboard />
        </Layout>
      </StockProvider>
    </ThemeProvider>
  );
}

export default App;
