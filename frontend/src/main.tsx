import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthProvider from './contexts/Auth/AuthProvider.tsx';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { ToastContainer } from 'react-toastify';
import './index.css';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
    <ToastContainer />
  </>
);
