import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Hub from './Hub.tsx'
import { Theme } from '@radix-ui/themes'
import "@radix-ui/themes/styles.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Theme appearance='dark'>
      <Hub />
    </Theme>
  </StrictMode>,
)
