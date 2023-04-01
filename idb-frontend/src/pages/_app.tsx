import { type AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import 'tailwindcss/tailwind.css'
import '../styles/app.css'

const NextApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => {
  return (
    <SessionProvider session={session}>
      <div className='h-screen w-screen overflow-hidden'>
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  )
}

export default NextApp
