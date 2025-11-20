import React from 'react'
import logo from '../../assets/logo.png'
import { Link } from 'react-router'

const Logo = () => {
  return (
    <Link>

      <div className='flex items-end'>
        <img src={logo} alt="" />
        <h1 className='text-3xl font-bold -ms-2.5'>zapShift</h1>
      </div>
    </Link>

  )
}

export default Logo