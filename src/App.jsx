import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home.jsx'
import Products from './pages/Products.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import Favorites from './pages/Favorites.jsx' 
import Cart from './pages/Cart.jsx'
import Success from './pages/Success.jsx'
import Login from './pages/Login.jsx'     
import Register from './pages/Register.jsx' 


import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'


import { ProductProvider } from './context/ProductContext.jsx'
import { FavProvider } from './context/FavContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
 import { AuthProvider } from './context/AuthContext.jsx' 
import About from './pages/About.jsx'
import Blogs from './pages/Blogs.jsx'
import Contact from './pages/Contact.jsx'

function App() {
  return ( 
   <BrowserRouter> 
      <AuthProvider> 
        <CartProvider>
          <FavProvider>
            <ProductProvider>
              
              <Navbar/>

              <Routes>
                <Route path="/" element={<Home />} />
                <Route path='/about' element={<About/>}/>
                <Route path='/blogs' element={<Blogs/>}/>
                <Route path='/contact' element={<Contact/>}/>
                <Route path='/products' element={<Products/>}/>
                <Route path='/product/:id' element={<ProductDetails/>}/>
                <Route path='/favorites' element={<Favorites/>}/> 
                <Route path='/cart' element={<Cart/>}/>

                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>

                <Route path="/success" element={<Success />} />
                <Route path="/cancel" element={<div className="py-20 text-center uppercase tracking-widest">Payment Cancelled</div>} />
                <Route path="*" element={<div className="py-20 text-center uppercase tracking-widest">Page Not Found</div>} />
              </Routes>

              <Footer/> 

            </ProductProvider>
          </FavProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App