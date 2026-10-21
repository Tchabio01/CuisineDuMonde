import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { FavoritesProvider } from './context/FavoritesContext';
import { ShoppingCartProvider } from './context/ShoppingCartContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FavoritesProvider>
      <ShoppingCartProvider>
        <App />
      </ShoppingCartProvider>
    </FavoritesProvider>
  </React.StrictMode>
);
