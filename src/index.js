import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Buffer } from 'buffer';
import process from 'process';
import { TonConnectUIProvider } from '@tonconnect/ui-react';  // Import TonConnectUIProvider
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';  // Import QueryClientProvider

// Polyfill Buffer and process for the browser
window.Buffer = Buffer;
window.process = process;

// Initialize QueryClient for react-query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

// TonConnect manifest URL
const manifestUrl = 'https://github.com/Ivan-Dosev/Game/blob/main/public/manifest.json';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Wrap App in TonConnectUIProvider and QueryClientProvider */}
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </TonConnectUIProvider>
  </React.StrictMode>
);

// Performance measuring
reportWebVitals();