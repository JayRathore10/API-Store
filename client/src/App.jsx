import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ToastContainer from './components/Toast'
import Home from './pages/Home'
import Explore from './pages/Explore'
import PublishApi from './pages/PublishApi'
import APIdetail from './pages/APIdetail'
import Pricing from './pages/Pricing'
import Categories from './pages/Categories'
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'

const App = () => {
  return (
    <div>
      {/* Global toast notifications — renders via portal to document.body */}
      <ToastContainer />

      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/publish" element={<PublishApi />} />
        <Route path="/api/:id" element={<APIdetail />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App