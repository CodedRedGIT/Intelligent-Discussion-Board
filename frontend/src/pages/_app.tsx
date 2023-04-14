import type { AppProps } from 'next/app'
import { SessionProvider } from './api/auth/session'
import 'tailwindcss/tailwind.css'
import '../styles/app.css'
import React from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp
