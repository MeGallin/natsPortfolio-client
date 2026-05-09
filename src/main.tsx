import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { store } from './state/store';
import { theme } from './theme/theme';
import './index.css';
import Spinner from './components/common/Spinner';
import AppRoutes from './AppRoutes';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Suspense fallback={<Spinner />}>
          <AppRoutes />
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  </Provider>,
);
