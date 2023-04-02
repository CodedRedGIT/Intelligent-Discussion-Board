import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { useSessionContext } from '../../pages/api/auth/session'
import { LinkButton } from '../ui/LinkButton'
import Login from '@/pages/assets/login'

const Navbar = () => {
  const { sessionData, clearSessionData } = useSessionContext()

  const handleSignOut = () => {
    clearSessionData()
  }

  console.log('sessionData in Navbar:', sessionData)

  return (
    <nav className='navbar bg-orange-500 px-4 py-2 flex justify-between items-center'>
      <LinkButton href='/dashboard'>
        <FontAwesomeIcon
          icon={faHouse}
          className='fa-solid text-white text-xl'
        />
      </LinkButton>
      <div className='navbarRight'>
        {sessionData ? (
          <button
            onClick={handleSignOut}
            className='bg-green-500 px-4 py-2 text-white rounded-lg !important'
          >
            Sign Out
          </button>
        ) : (
          <div className='w-full max-w-md'>
            <div className='flex justify-center items-center h-screen'>
              <Login />
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
