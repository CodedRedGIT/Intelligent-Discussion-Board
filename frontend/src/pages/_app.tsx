import type { AppProps } from 'next/app'
import { SessionProvider } from './api/auth/session'
import 'tailwindcss/tailwind.css'
import '../styles/app.css'
import React, { useEffect, useState } from 'react'
import useInactivityTimer from './api/auth/useInactivityTimer'

function MyApp({ Component, pageProps }: AppProps) {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [refreshTokenValue, setRefreshTokenValue] = useState<string | null>(
    null,
  )

  useEffect(() => {
    const storedAccessToken = localStorage.getItem('access_token')
    const storedRefreshToken = localStorage.getItem('refresh_token')

    if (storedAccessToken && storedRefreshToken) {
      setAccessToken(storedAccessToken)
      setRefreshTokenValue(storedRefreshToken)
    } else {
      // Redirect to login or handle missing tokens appropriately
    }
  }, [])

  useInactivityTimer(refreshTokenValue, setAccessToken)

  return (
    <SessionProvider>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp
