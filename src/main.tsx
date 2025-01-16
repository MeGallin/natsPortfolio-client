import { lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import {
  RouterProvider,
  Router,
  RootRoute,
  Route,
} from '@tanstack/react-router';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { store } from './state/store';
import { theme } from './theme/theme'; // Import your global theme
import App from './App';
import './index.css';
import { isAuthenticated } from './auth';
import Spinner from './components/common/Spinner';

// Lazy load the route components
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Admin = lazy(() => import('./pages/Admin'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const ForgotPassword = lazy(() => import('./pages/admin/ForgotPassword'));

// Create the root route
const rootRoute = new RootRoute({
  component: App,
});

// Define the individual routes with lazy-loaded components
const routes = [
  new Route({
    getParentRoute: () => rootRoute,
    path: '/',
    component: Home,
  }),
  new Route({
    getParentRoute: () => rootRoute,
    path: 'about',
    component: About,
  }),
  new Route({
    getParentRoute: () => rootRoute,
    path: 'contact',
    component: Contact,
  }),
  new Route({
    getParentRoute: () => rootRoute,
    path: 'portfolio',
    component: Portfolio,
  }),
  new Route({
    getParentRoute: () => rootRoute,
    path: 'admin',
    component: Admin,
  }),
  new Route({
    getParentRoute: () => rootRoute,
    path: 'forgot-password',
    component: ForgotPassword,
  }),
  // Protected Dashboard Route
  new Route({
    getParentRoute: () => rootRoute,
    path: 'dashboard',
    component: Dashboard,
    beforeLoad: () => {
      const authenticated = isAuthenticated();
      if (!authenticated) {
        return { redirect: '/admin' };
      }
    },
  }),
];

// Create the router instance
const router = new Router({
  routeTree: rootRoute.addChildren(routes),
});

// Render the application
createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Suspense fallback={<Spinner />}>
          <RouterProvider router={router}></RouterProvider>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  </Provider>,
);
