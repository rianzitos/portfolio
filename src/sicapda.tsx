import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/archivo/wdth.css'
import '@fontsource/ibm-plex-mono/400.css'
import '@fontsource/ibm-plex-mono/500.css'
import './styles/index.css'
import { Providers } from './components/layout/Providers'
import { SicapdaPage } from './pages/SicapdaPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <SicapdaPage />
    </Providers>
  </StrictMode>,
)
