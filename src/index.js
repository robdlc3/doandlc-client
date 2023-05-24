import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from 'react-router-dom';
import { LoadingProvider } from './context/loading.context';
import { AuthProvider } from './context/auth.context';
import { RestaurantContextProvider } from './context/restaurant.context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <LoadingProvider>
        <AuthProvider>
          <RestaurantContextProvider>
            <App />
          </RestaurantContextProvider>
        </AuthProvider>
      </LoadingProvider>
    </BrowserRouter>
  </React.StrictMode>
);


reportWebVitals();
