import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { useSessionContext } from '../../pages/api/auth/session'
import router from 'next/router'

const Navbar = () => {
  const { sessionData, clearSessionData } = useSessionContext()

  const handleSignOut = () => {
    clearSessionData()
  }

  const homeButton = () => {
    if (sessionData) {
      router.push('/dashboard')
    } else {
      router.push('/')
    }
  }

  return (
    <nav className='bg-amber-500 fixed top-0 left-0 border-b-2 border-gray-400 z-40 flex w-full justify-between h-32'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-start justify-between w-full'>
        <div className='mt-10 fixed left-50'>
          <FontAwesomeIcon
            icon={faHouse}
            className='fa-solid text-white text-4xl cursor-pointer'
            onClick={homeButton}
          />
        </div>

        <div
          className='text-white font-bold text-center justify-center flex-grow mt-6'
          style={{ fontSize: 'clamp(2rem, 3vw, 5rem)' }}
        >
          Intelligent Discussion Board
        </div>

        <div className='fixed right-0 mr-4 mt-10'>
          {sessionData ? (
            <button
              onClick={handleSignOut}
              className='bg-green-500 px-4 py-2 text-white rounded-lg !important'
            >
              Sign Out
            </button>
          ) : (
            <div className='w-full max-w-md'>
              <div className='flex justify-center items-center h-screen'></div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
