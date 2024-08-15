import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  RouterProvider,
  Router,
  RootRoute,
  Route,
} from '@tanstack/react-router';
import App from './App';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Portfolio from './pages/Portfolio';
import './index.css';

// Create the root route
const rootRoute = new RootRoute({
  component: App,
});

// Define the individual routes
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

// Create the router instance
const router = new Router({
  routeTree: rootRoute.addChildren([
    homeRoute,
    aboutRoute,
    contactRoute,
    portfolioRoute,
  ]),
});

// Render the application with the RouterProvider
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
