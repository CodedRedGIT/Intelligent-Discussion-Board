import type { AppProps } from 'next/app'
import { SessionProvider } from './api/auth/session'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp
