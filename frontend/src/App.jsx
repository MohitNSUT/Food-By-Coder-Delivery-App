import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import {Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import AppDownload from './components/AppDownload/AppDownload'
import LoginPopUp from './components/LoginPopUp/LoginPopUp'


function App() {
  
  const[showLogin,setShowLogin] = useState(false); 

  return (
    <>
    {showLogin ? <LoginPopUp setShowLogin={setShowLogin} /> : <></>}
    <Navbar setShowLogin={setShowLogin}></Navbar>
    <div className='app'>
       <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/order' element={<PlaceOrder/>} />
       </Routes>
    </div>
    <AppDownload/>
    <Footer/>
    </> 
  )
}

export default App




