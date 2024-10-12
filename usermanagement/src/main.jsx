import { StrictMode } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import StoreUser from './components/Store/StoreUser.jsx';  
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
 // Make sure this is imported first

// Create the root of your application
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StoreUser>
      <App />
    </StoreUser>
  </StrictMode>
);
