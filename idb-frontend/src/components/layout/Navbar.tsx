import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
  return (
    <nav className='navbar'>
      <Link to='/dashboard'>
        <FontAwesomeIcon icon={faHouse} className='fa-solid' />
      </Link>
      <div className='navbarRight'>
        <button
          onClick={() => {
            sessionStorage.removeItem('token-email')
          }}
        >
          Sign Out
        </button>
      </div>
    </nav>
  )
}

export default Navbar
