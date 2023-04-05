import { type FC, type PropsWithChildren } from 'react'
import Navbar from './Navbar'
import React from 'react'

export const Layout: FC<PropsWithChildren> = ({ children }) => (
  <div className='flex h-screen w-screen overflow-hidden'>
    <Navbar />
    <div
      className='w-full overflow-auto bg-gray-100 p-10 pt-20'
      style={{ marginTop: '64px' }}
    >
      {children}
    </div>
  </div>
)
