import React from 'react'
import { NextPage } from 'next'
import { Page } from '@/components/layout/Page'
import useRetrieveClassesByMember from './api/useRetrieveClasses'
import { useSessionContext } from './api/auth/session'
import { Card } from '@/components/layout/Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRight,
  faInfoCircle,
  faMugHot,
} from '@fortawesome/free-solid-svg-icons'

const Dashboard: NextPage = () => {
  const { sessionData } = useSessionContext()

  const { loading, classes, error } = useRetrieveClassesByMember(
    sessionData?.user_id ?? '',
  )

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
              <h1 className='text-2xl font-bold mb-4'>Your classes:</h1>
              {classes.length === 0 ? (
                <p className='text-lg leading-relaxed text-gray-700'>
                  You are not in any classes!
                </p>
              ) : (
                <div className='grid grid-cols-1 gap-4'>
                  {classes.map(c => (
                    <div
                      key={c.id}
                      className='bg-gray-100 p-4 rounded-lg shadow-md flex justify-between items-center'
                    >
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
                  ))}
                </div>
              )}
            </Card>
          </div>
        )}
        <div>
          <span className='inline-block w-4' />
          <Card className='bg-white p-6 rounded-lg shadow-md max-w-xl'>
            <h1 className='text-2xl font-bold mb-4'>Join a class below:</h1>
            <p>Will implement this later</p>
          </Card>
        </div>
      </div>
    </Page>
  )
}

export default Dashboard
