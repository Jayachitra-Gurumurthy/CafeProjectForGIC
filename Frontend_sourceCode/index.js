import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import {
  Link,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router'
import Header from './components/header'
import Dashboard from './components/dashboard'
import Employees from './components/employees';
import Cafes from './components/cafes';

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Header/>
      <Outlet />
    </>
  ),
})

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => <Dashboard/> 
})

const cafeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/cafes',
  component:  () => <Cafes/>
})

const employeeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/employees',
  component: () => <Employees/>
})

const routeTree = rootRoute.addChildren([dashboardRoute, cafeRoute,employeeRoute])

const router = createRouter({ routeTree, defaultPreload: 'intent' })


const rootElement = document.getElementById('root')
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
     

      <RouterProvider router={router} />
   
    </StrictMode>,
  )
}



