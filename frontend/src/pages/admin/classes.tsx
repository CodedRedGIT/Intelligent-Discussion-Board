import React, { useState } from 'react'
import { NextPage } from 'next'
import Router from 'next/router'
import { Button } from '@/components/ui/Button'
import { useCreateClass } from '../api/useCreateClass'
import { Card } from '@/components/layout/Card'
import { Page } from '@/components/layout/Page'
import { useSessionContext } from '../api/auth/session'
import useRetrieveClassesByMember from '../api/useRetrieveClasses'
import { useSaveFileForClass } from '../api/useSaveClassFile'

const ClassAdmin: NextPage = () => {
  const { sessionData } = useSessionContext()

  const [section, setSection] = useState('')
  const [file, setFile] = useState<File>()

  const { loading, classes, error } = useRetrieveClassesByMember(
    sessionData?.user_id ?? '',
  )

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

  const {
    isLoading: isUploading,
    error: uploadError,
    success: uploadSuccess,
    saveFileForClass,
  } = useSaveFileForClass()

  const handleUploadFile = async (classId: string, file: File) => {
    try {
      await saveFileForClass(classId, file)
    } catch (error: any) {
      console.error(error.message)
    }
  }

  const handleSelectFile = (event: React.FormEvent) => {
    const files = (event.target as HTMLInputElement).files

    if (files && files.length > 0) {
      setFile(files[0])
    }
  }

  return (
    <Page title={'Dashboard'}>
      <div>
        <div>
          <span className='inline-block w-4' />
          <Card className='bg-white p-6 rounded-lg shadow-md max-w-xl'>
            <h1 className='text-2xl font-bold mb-4'>Create a class:</h1>
            <div className='flex'>
              <input
                type='text'
                className='border border-gray-400 p-2 mr-2 w-full'
                placeholder='Class section...'
                onChange={e => setSection(e.target.value)}
              />
              <button
                className='bg-green-500 text-gray-50 px-4 py-2 rounded hover:bg-green-600 transition-all duration-200'
                onClick={handleCreateClass}
                disabled={isCreating}
              >
                {isCreating ? 'Creating...' : 'Create'}
              </button>
            </div>
            {createError && (
              <p className='text-red-500'>Error creating class!</p>
            )}
            {success && (
              <p className='text-green-500'>Class created successfully!</p>
            )}
          </Card>
        </div>
      </div>
      <div>
        <span className='inline-block w-4' />
        <Card className='max-w-xl'>
          <div>
            <label htmlFor='file-input' className='text-lg font-semibold'>
              Select a file to upload:
            </label>
            <div className='flex mt-2'>
              <input
                id='file-input'
                type='file'
                className='hidden'
                onChange={handleSelectFile}
              />
              <Button
                onClick={() => document.getElementById('file-input')?.click()}
              >
                Choose File
              </Button>
              {file && (
                <div className='ml-4'>
                  <p className='font-semibold'>{file.name}</p>
                  <p className='text-gray-600'>{file.size} bytes</p>
                </div>
              )}
            </div>
          </div>
        </Card>
        {error ? (
          <p>Error: {error}</p>
        ) : loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <span className='inline-block w-4' />
            <Card className='bg-white p-6 rounded-lg shadow-md max-w-xl'>
              <h1 className='text-2xl font-bold mb-4'>Classes you own:</h1>
              {classes.length === 0 ? (
                <p className='text-lg leading-relaxed text-gray-700'>
                  You do not own any classes!
                </p>
              ) : (
                <div className='grid grid-cols-1 gap-4'>
                  {classes.map(c => (
                    <div key={c.id}>
                      <div className='bg-gray-100 p-4 rounded-lg shadow-md flex justify-between items-center'>
                        <div>
                          <h2 className='text-xl font-bold mb-2'>
                            {c.class_section}
                          </h2>
                        </div>
                        <Button
                          onClick={() => file && handleUploadFile(c.id, file)}
                          className='bg-green-500'
                          disabled={isUploading}
                        >
                          {isUploading ? 'Uploading...' : 'Upload'}
                        </Button>
                      </div>
                      {uploadSuccess && (
                        <p className='text-green-500'>
                          File uploaded successfully
                        </p>
                      )}
                      {uploadError && (
                        <p className='text-red-500'>{uploadError}</p>
                      )}
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

export default ClassAdmin
