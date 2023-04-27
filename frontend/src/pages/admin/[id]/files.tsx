import { useState } from 'react'
import { Card } from '@/components/layout/Card'
import { Page } from '@/components/layout/Page'
import { NextPage } from 'next'
import React from 'react'
import { useSaveFileForClass } from '@/pages/api/useSaveClassFile'
import { useRouter } from 'next/router'

const Files: NextPage = () => {
  const { query } = useRouter()
  const classId = query.id as string

  const [file, setFile] = useState<File>()
  const { isLoading, error, success, saveFileForClass } = useSaveFileForClass()

  const onChange = (event: React.FormEvent) => {
    const files = (event.target as HTMLInputElement).files

    if (files && files.length > 0) {
      setFile(files[0])
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!file) return

    try {
      await saveFileForClass(classId, file)
      setFile(undefined)
    } catch (error: any) {
      console.error(error.message)
    }
  }

  return (
    <Page title='Files'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Upload Files</h1>
      </div>
      <div>
        <Card>
          <form className='homeForm' onSubmit={handleSubmit}>
            <div className='home__container'>
              <h3 style={{ marginBottom: 3 }}>File Upload</h3>
              <input required type='file' name='file' onChange={onChange} />
              <button type='submit' className='homeBtn'>
                {isLoading ? 'Uploading...' : 'Upload'}
              </button>
            </div>
          </form>
        </Card>
        <br />
        <Card>
          <div className='home__container'>
            <h3 style={{ marginBottom: 3 }}>Files:</h3>
            {success && <p>File uploaded successfully</p>}
            {error && <p>{error}</p>}
          </div>
        </Card>
      </div>
    </Page>
  )
}

export default Files
