import type { NextPage } from 'next'
import { Page } from '@/components/layout/Page'
import Login from './assets/login'
import Dashboard from './dashboard' // import the Dashboard component
import { useSessionContext } from './api/auth/session' // import the useSessionContext hook

const Root: NextPage = () => {
  const { sessionData } = useSessionContext() // get the sessionData value from the context

  return (
    <Page title={sessionData ? 'Dashboard' : 'Login'}>
      {sessionData ? <Dashboard /> : <Login />}
    </Page>
  )
}

export default Root
