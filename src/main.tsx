import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import {
  RouterProvider,
  Router,
  RootRoute,
  Route,
} from '@tanstack/react-router';
import { Provider } from 'react-redux';
import { store } from './state/store';
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
const homeRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const aboutRoute = new Route({
  getParentRoute: () => rootRoute,
  path: 'about',
  component: About,
});

const contactRoute = new Route({
  getParentRoute: () => rootRoute,
  path: 'contact',
  component: Contact,
});

const portfolioRoute = new Route({
  getParentRoute: () => rootRoute,
  path: 'portfolio',
  component: Portfolio,
});

const adminRoute = new Route({
  getParentRoute: () => rootRoute,
  path: 'admin',
  component: Admin,
});

const forgotPasswordRoute = new Route({
  getParentRoute: () => rootRoute,
  path: 'forgot-password',
  component: ForgotPassword,
});

// Protected Dashboard Route
const dashboardRoute = new Route({
  getParentRoute: () => rootRoute,
  path: 'dashboard',
  component: Dashboard,
  beforeLoad: () => {
    const authenticated = isAuthenticated();
    if (!authenticated) {
      return { redirect: '/admin' };
    }
  },
});

// Create the router instance
const router = new Router({
  routeTree: rootRoute.addChildren([
    homeRoute,
    aboutRoute,
    contactRoute,
    portfolioRoute,
    adminRoute,
    forgotPasswordRoute,
    dashboardRoute,
  ]),
});

// Render the application with the Redux Provider and RouterProvider
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={<Spinner />}>
          <RouterProvider router={router} />
        </Suspense>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
