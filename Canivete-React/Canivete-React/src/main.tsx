import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Theme } from '@radix-ui/themes'
import "@radix-ui/themes/styles.css";
import { RouterProvider } from 'react-router-dom'
// router.jsx does not currently provide TypeScript declarations.
// @ts-expect-error The JavaScript module is valid at runtime.
import { router } from './router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Theme appearance='dark'>
        <RouterProvider router={router}/>
      </Theme>
  </StrictMode>,
)
