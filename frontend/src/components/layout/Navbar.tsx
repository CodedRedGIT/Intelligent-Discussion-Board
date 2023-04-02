import React from 'react'
import NextLink from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
  return (
    <nav className='navbar'>
      <NextLink href='/dashboard'>
        <FontAwesomeIcon icon={faHouse} className='fa-solid' />
      </NextLink>
      <div className='navbarRight'>
        <button onClick={() => {}}>Sign Out</button>
      </div>
    </nav>
  )
}

export default Navbar
