import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Contact from '../pages/Contact'
import Volunteers from '../pages/Volunteers'
import About from '../pages/About'

const MainRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/volunteers' element={<Volunteers />} />
        <Route path='/about' element={<About />} />
    </Routes>
  )
}

export default MainRoutes