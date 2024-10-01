import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import { Routes,Route } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Coins from './Pages/Home/Conis/Coins'
import Footer from './Components/Footer/Footer'

const App = () => {
  return (
    <div className='app'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/coin/:coinId' element={<Coins/>}/>
        </Routes>
        <Footer/>
    </div>
  )
}

export default App
