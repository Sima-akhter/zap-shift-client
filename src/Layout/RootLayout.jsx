import React from 'react'
import { Outlet } from 'react-router'
import Footer from '../Pages/Shard/Footer/Footer'
import NavBar from '../Pages/Shard/NavBar/NavBar'

const RootLayout = () => {
  return (
    <div className='max-w-7xl mx-auto'>
        <NavBar></NavBar>
        <Outlet></Outlet>
        <Footer></Footer>
    </div>
  )
}

export default RootLayout