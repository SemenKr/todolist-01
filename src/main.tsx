import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App'
import { ThemeProvider } from '@/components/theme-provider' // добавляем
import React from 'react'

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider
            defaultTheme="system"
            storageKey="vite-ui-theme"
            attribute="class"
        >
            <App />
        </ThemeProvider>
    </React.StrictMode>
)
