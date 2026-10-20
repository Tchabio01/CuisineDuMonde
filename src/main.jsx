import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { FavoritesProvider } from './context/FavoritesContext';
import { ShoppingCartProvider } from './context/ShoppingCartContext';

// Enregistrement standard du Service Worker pour le mode PWA hors-ligne
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch((err) => {
      console.info('PWA offline fallback notice:', err);
    });
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FavoritesProvider>
      <ShoppingCartProvider>
        <App />
      </ShoppingCartProvider>
    </FavoritesProvider>
  </React.StrictMode>
);
