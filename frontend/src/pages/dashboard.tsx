import React from 'react'
import { NextPage } from 'next'
import { Page } from '@/components/layout/Page'
import useRetrieveClassesByMember from './api/useRetrieveClasses'
import { useSessionContext } from './api/auth/session'

const Dashboard: NextPage = () => {
  const { sessionData } = useSessionContext()

  const { loading, classes, error } = useRetrieveClassesByMember(
    sessionData?.user_id ?? '',
  )

  return (
    <Page title={'Dashboard'}>
      <div>
        {error ? (
          <p>Error: {error}</p>
        ) : loading ? (
          <p>Loading...</p>
        ) : classes.length === 0 ? (
          <p>You are not in any classes!</p>
        ) : (
          <div>
            {classes.map(c => (
              <>
                <div key={c.id}>{c.class_section}</div>
                <p>awd</p>
              </>
            ))}
          </div>
        )}
      </div>
    </Page>
  )
}

export default Dashboard
