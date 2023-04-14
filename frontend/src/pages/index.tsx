import type { NextPage } from 'next'
import Login from './assets/login'
import Dashboard from './dashboard' // import the Dashboard component
import { useSessionContext } from './api/auth/session' // import the useSessionContext hook
import React from 'react'
import { Page } from '../components/layout/Page'

const Root: NextPage = () => {
  const { sessionData } = useSessionContext() // get the sessionData value from the context

  return (
    <Page title={sessionData ? 'Dashboard' : 'Login'}>
      {sessionData ? <Dashboard /> : <Login />}
    </Page>
  )
}

export default Root
