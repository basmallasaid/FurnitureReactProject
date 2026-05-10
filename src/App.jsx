import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import { ProductProvider } from './context/ProductContext.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'

function App() {
  return ( 
   <BrowserRouter> 
        <ProductProvider>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
          <Footer/>
        </ProductProvider>
    </BrowserRouter>
  )
}

export default App