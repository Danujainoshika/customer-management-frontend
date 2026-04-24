import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CustomerList from './pages/CustomerList'
import CustomerView from './pages/CustomerView'

function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CustomerList />} />
          <Route path="/customers/:id" element={<CustomerView />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
