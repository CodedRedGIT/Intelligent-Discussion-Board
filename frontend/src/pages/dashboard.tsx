import React, { useState } from 'react'
import { NextPage } from 'next'
import useRetrieveClassesByMember from './api/useRetrieveClasses'
import { useSessionContext } from './api/auth/session'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRight,
  faCog,
  faInfoCircle,
  faMugHot,
} from '@fortawesome/free-solid-svg-icons'
import { useCreateClass } from './api/useCreateClass'
import Link from 'next/link'
import { Page } from '../components/layout/Page'
import { Card } from '../components/layout/Card'
import Router from 'next/router'
import { Button } from '@/components/ui/Button'
import useRetrieveMemberType from './api/useMemberType'

const Dashboard: NextPage = () => {
  const { sessionData } = useSessionContext()
  const [section, setSection] = useState('')

  const { loading, classes, error } = useRetrieveClassesByMember(
    sessionData?.user_id ?? '',
  )

  const { memberType } = useRetrieveMemberType(sessionData?.user_id)

  const {
    isLoading: isCreating,
    error: createError,
    success,
    createClass,
  } = useCreateClass()

  const handleCreateClass = () => {
    createClass(section, sessionData?.user_id)
    Router.reload()
  }

  const classAdminButton = () => {
    Router.push('/admin/classes')
  }

  return (
    <Page title={'Dashboard'}>
      <div>
        <div className='flex flex-col md:flex-row gap-6'>
          <Card className='bg-white p-6 rounded-lg shadow-md w-96 h-64 flex flex-col justify-center'>
            <FontAwesomeIcon
              icon={faMugHot}
              className='text-orange-500 text-4xl mb-4 self-center'
            />
            <h1 className='text-2xl font-bold mb-2 text-center'>
              Welcome, {sessionData?.email}!
            </h1>
            <p className='text-lg leading-relaxed text-gray-700 text-center'>
              Thank you for using our app. We hope you enjoy your experience!
            </p>
          </Card>
          <Card className='bg-white p-6 rounded-lg shadow-md md:w-1/2 flex flex-col justify-center'>
            <FontAwesomeIcon
              icon={faInfoCircle}
              className='text-blue-500 text-4xl mb-4 self-center'
            />
            <h1 className='text-2xl font-bold mb-2 text-center'>
              About Our App
            </h1>
            <p className='text-lg leading-relaxed text-gray-700 text-center'>
              Our purpose is to provide an AI-powered discussion board that can
              answer all student queries. This includes trivial questions as
              well as more complex ones. The IDB chatbot will be trained for a
              particular course and use NLP toolkits to provide human-like
              interactions with students, thereby removing the burden of
              answering questions from instructors.
            </p>
          </Card>
        </div>

        {error ? (
          <p>Error: {error}</p>
        ) : loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <span className='inline-block w-4' />
            <Card className='bg-white p-6 rounded-lg shadow-md max-w-xl'>
              <div className='flex justify-between'>
                <h1 className='text-2xl font-bold mb-4'>Your classes:</h1>
                {memberType !== 'STUDENT' && (
                  <div className=''>
                    <Button onClick={classAdminButton} className='bg-white'>
                      <FontAwesomeIcon icon={faCog} className='text-white' />
                    </Button>
                  </div>
                )}
              </div>
              {classes.length === 0 ? (
                <p className='text-lg leading-relaxed text-gray-700'>
                  You are not in any classes!
                </p>
              ) : (
                <div className='grid grid-cols-1 gap-4'>
                  {classes.map(c => (
                    <Link href={`/threads/${c.id}`} key={c.id} passHref>
                      <div className='bg-gray-100 p-4 rounded-lg shadow-md flex justify-between items-center hover:bg-gray-200'>
                        <div>
                          <h2 className='text-xl font-bold mb-2'>
                            {c.class_section}
                          </h2>
                        </div>
                        <FontAwesomeIcon
                          icon={faArrowRight}
                          className='text-orange-500 text-2xl'
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </Card>
          </div>
        )}
      </div>
    </Page>
  )
}

export default Dashboard
