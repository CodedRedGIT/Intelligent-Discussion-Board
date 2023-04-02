import { type AppProps } from 'next/app'
import 'tailwindcss/tailwind.css'
import '../styles/app.css'

const NextApp = ({ Component, pageProps }: AppProps) => {
  return (
    <div className='h-screen w-screen overflow-hidden'>
      <Component {...pageProps} />
    </div>
  )
}

export default NextApp
