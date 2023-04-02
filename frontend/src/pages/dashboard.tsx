import React from 'react'
import { NextPage } from 'next'
import { Page } from '@/components/layout/Page'
import useRetrieveClassesByMember from './api/useRetrieveClasses'
import { useSessionContext } from './api/auth/session' // import the useSessionContext hook

const Dashboard: NextPage = () => {
  const { sessionData } = useSessionContext() // use the useSessionContext hook to get the sessionData value

  if (!sessionData) return <p>Error</p>

  const { loading, classes, error } = useRetrieveClassesByMember(
    sessionData?.token ?? '',
  )

  return (
    <Page title={'Dashboard'}>
      <div>
        {!sessionData ? (
          <p>You must be signed in to view this page!</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {classes.map(c => (
              <div key={c.id}>{c.class_section}</div>
            ))}
          </div>
        )}
      </div>
    </Page>
  )
}

export default Dashboard
