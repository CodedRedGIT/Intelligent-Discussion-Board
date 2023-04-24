import { Card } from '@/components/layout/Card'
import { Page } from '@/components/layout/Page'
import { NextPage } from 'next'
import React, { useState } from 'react'

const Files: NextPage = () => {
  const [file, setFile] = useState<File>()

  const onChange = (event: React.FormEvent) => {
    const files = (event.target as HTMLInputElement).files

    if (files && files.length > 0) {
      setFile(files[0])
    }
    console.log(file)
  }

  return (
    <Page title='Files'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Upload Files</h1>
      </div>
      <div>
        <Card>
          <form className='homeForm'>
            <div className='home__container'>
              <h3 style={{ marginBottom: 3 }}>File Upload</h3>
              <input
                required
                type='file'
                name='file'
                onChange={e => onChange(e)}
              />
              <button className='homeBtn'>Upload</button>
            </div>
          </form>
        </Card>
        <br />
        <Card>
          <div className='home__container'>
            <h3 style={{ marginBottom: 3 }}>Files:</h3>
            No files uploaded...
            {/* map the files onto a list here */}
          </div>
        </Card>
      </div>
    </Page>
  )
}
export default Files
