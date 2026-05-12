import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import { ProductProvider } from './context/ProductContext.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Products from './pages/Products.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import Favorites from './pages/Favorites.jsx' 
import { FavProvider } from './context/FavContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import Cart from './pages/Cart.jsx'
import Success from './pages/Success.jsx'

function App() {
  return ( 
   <BrowserRouter> 
      <CartProvider>
        <FavProvider>
          <ProductProvider>
            
            <Navbar/>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path='/products' element={<Products/>}/>
              <Route path='/product/:id' element={<ProductDetails/>}/>
              <Route path='/favorites' element={<Favorites/>}/> 
              <Route path='/cart' element={<Cart/>}/>
              <Route path="/success" element={<Success />} />
              <Route path="/cancel" element={<div>Payment Cancelled</div>} />
            </Routes>

            <Footer/> 

          </ProductProvider>
        </FavProvider>
      </CartProvider>
    </BrowserRouter>
  )
}

export default App