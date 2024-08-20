import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import {
  RouterProvider,
  Router,
  RootRoute,
  Route,
} from '@tanstack/react-router';
import { Provider } from 'react-redux'; // Import the Redux Provider
import { store } from './state/store'; // Import the Redux store
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
  beforeLoad: () => {
    // Redirect or return a 403/404 component if the user is not authenticated
    if (!isAuthenticated()) {
      return { redirect: '/' };
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
  ]),
});

// Render the application with the Redux Provider and RouterProvider
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <Suspense fallback={<Spinner />}>
        <RouterProvider router={router} />
      </Suspense>
    </Provider>
  </StrictMode>,
);
