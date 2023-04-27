import React, { useState } from 'react'
import { NextPage } from 'next'
import { Card } from '@/components/layout/Card'
import { Page } from '@/components/layout/Page'
import { useSessionContext } from '../api/auth/session'
import useRetrieveFilesByClass from '../api/useRetrieveFilesByClass'

interface File {
  id: string
  name: string
  size: number
  type: string
  created_at: string
}

interface ClassWithFiles {
  id: string
  class_section: string
  files: File[]
}

const ClassFiles: NextPage = () => {
  const { sessionData } = useSessionContext()

  const [loadingClassId, setLoadingClassId] = useState('')
  const [selectedClass, setSelectedClass] = useState<ClassWithFiles>()

  const { classesWithFiles, error } = useRetrieveFilesByClass(
    sessionData?.user_id ?? '',
  )

  const handleClassClick = async (classId: string) => {
    setLoadingClassId(classId)
    setSelectedClass(undefined)

    const selectedClass = classesWithFiles.find(c => c.id === classId)

    if (selectedClass) {
      setSelectedClass(selectedClass)
    }

    setLoadingClassId('')
  }

  return (
    <Page title={'Class Files'}>
      <div>
        <div>
          <span className='inline-block w-4' />
          <Card className='bg-white p-6 rounded-lg shadow-md max-w-xl'>
            <h1 className='text-2xl font-bold mb-4'>Classes:</h1>
            {error ? (
              <p className='text-red-500'>Error: {error}</p>
            ) : classesWithFiles.length === 0 ? (
              <p className='text-lg leading-relaxed text-gray-700'>
                You do not have access to any classes!
              </p>
            ) : (
              <div className='grid grid-cols-1 gap-4'>
                {Array.isArray(classesWithFiles) &&
                  classesWithFiles.map(c => (
                    <div
                      key={c.id}
                      className={`bg-gray-100 p-4 rounded-lg shadow-md flex justify-between items-center cursor-pointer hover:bg-gray-200 ${
                        c.id === selectedClass?.id && 'bg-gray-200'
                      }`}
                      onClick={() => handleClassClick(c.id)}
                    >
                      <div>
                        <h2 className='text-xl font-bold mb-2'>
                          {c.class_section}
                        </h2>
                      </div>
                      {loadingClassId === c.id ? (
                        <span className='text-gray-500'>Loading...</span>
                      ) : (
                        <span className='text-gray-500'>
                          {c.files.length} files
                        </span>
                      )}
                    </div>
                  ))}
              </div>
            )}
          </Card>
        </div>
        {selectedClass && (
          <div>
            <span className='inline-block w-4' />
            <Card className='bg-white p-6 rounded-lg shadow-md max-w-xl'>
              <h1 className='text-2xl font-bold mb-4'>
                Files for {selectedClass.class_section}:
              </h1>
              {selectedClass.files.length === 0 ? (
                <p className='text-lg leading-relaxed text-gray-700'>
                  There are no files uploaded for this class.
                </p>
              ) : (
                <div className='grid grid-cols-1 gap-4'>
                  {selectedClass.files.map(f => (
                    <div key={f.id}>
                      <div className='bg-gray-100 p-4 rounded-lg shadow-md flex justify-between items-center hover:bg-gray-200'>
                        <div className='text-lg font-medium'>
                          <span className='text-gray-700'>
                            {f.name} ({f.size} bytes)
                          </span>
                        </div>
                        <div className='text-right text-gray-500 text-sm'>
                          <span>{new Date(f.created_at).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
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

export default ClassFiles
