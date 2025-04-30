import { Outlet, createRootRoute } from '@tanstack/react-router'

import Header from '../components/Header'
import { ThemeProvider } from '../components/ThemeProvider'

export const Route = createRootRoute({
  component: () => (
    <ThemeProvider>
      <Header />
      <div className=" pt-16">
        <Outlet />
      </div>
    </ThemeProvider>
  ),
})
