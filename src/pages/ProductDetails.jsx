import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../api/productsApi';
import { CartContext } from '../context/CartContext';
import { FavContext } from '../context/FavContext';
import { useTranslation } from 'react-i18next';
import { CircularProgress } from '@mui/material';


import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

export default function ProductDetails() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const { cartList, addCart } = useContext(CartContext);
  const { fav, addFav } = useContext(FavContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState('');
  const [selectedColor, setSelectedColor] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
        setActiveImg(data.variants[0].img);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <CircularProgress color="inherit" />
    </div>
  );

  if (!product) return <div className="text-center py-20 uppercase tracking-widest text-gray-400">Product not found</div>;

  const isCart = cartList.some(item => item.id === product.id);
  const isFav = fav.some(item => item.id === product.id);

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* 1. Breadcrumbs */}
      <div className="bg-[#f6f5f3] py-4 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-widest font-bold text-gray-400">
          <a href="/" className="hover:text-black">{t('home')}</a>
          <NavigateNextIcon sx={{ fontSize: 14 }} />
          <a href="/products" className="hover:text-black">{product.category}</a>
          <NavigateNextIcon sx={{ fontSize: 14 }} />
          <span className="text-black truncate">
            {i18n.language === 'ar' ? product.name_ar : product.name_en}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20">
          
          {/* 2. Left Side: Product Images */}
          <div className="lg:col-span-7 space-y-4">
            <div className="aspect-[4/5] bg-[#f9f9f9] flex items-center justify-center overflow-hidden">
              <img 
                src={activeImg} 
                alt="Product" 
                className="w-4/5 h-auto object-contain mix-blend-multiply transition-transform duration-700 hover:scale-110" 
              />
            </div>
            {/* Thumbnails (Variants) */}
            <div className="flex gap-4">
              {product.variants.map((v, i) => (
                <div 
                  key={i}
                  onClick={() => { setActiveImg(v.img); setSelectedColor(i); }}
                  className={`w-20 h-24 bg-[#f9f9f9] p-2 cursor-pointer border transition-all
                    ${selectedColor === i ? 'border-black' : 'border-transparent hover:border-gray-300'}`}
                >
                  <img src={v.img} alt="variant" className="w-full h-full object-contain mix-blend-multiply" />
                </div>
              ))}
            </div>
          </div>

          {/* 3. Right Side: Product Info */}
          <div className="lg:col-span-5 flex flex-col pt-4">
            <div className="mb-8 border-b border-gray-100 pb-8">
              <span className="text-[11px] font-black tracking-[3px] text-[#a67c52] uppercase mb-4 block">
                {product.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-serif font-medium mb-4 leading-tight">
                {i18n.language === 'ar' ? product.name_ar : product.name_en}
              </h1>
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-[#222]">${product.currentPrice.toFixed(2)}</span>
                {product.oldPrice && (
                  <span className="text-gray-400 line-through text-lg">${product.oldPrice.toFixed(2)}</span>
                )}
              </div>
            </div>

            {/* Colors Selection */}
            <div className="mb-8">
              <h3 className="text-[11px] font-bold tracking-widest uppercase mb-4">Select Color</h3>
              <div className="flex gap-3">
                {product.variants.map((v, i) => (
                  <button 
                    key={i}
                    onClick={() => { setActiveImg(v.img); setSelectedColor(i); }}
                    style={{ backgroundColor: v.color }}
                    className={`w-8 h-8 rounded-full border-2 transition-all transform hover:scale-110
                      ${selectedColor === i ? 'border-black scale-110' : 'border-white ring-1 ring-gray-100'}`}
                  />
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="mb-8 text-sm">
              <span className="text-gray-500 uppercase tracking-widest text-[10px] font-bold">Availability: </span>
              <span className={product.availability === 'In Stock' ? 'text-green-600 font-bold' : 'text-red-500 font-bold'}>
                {product.availability === 'In Stock' ? t('in_stock') : t('out_of_stock')}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button 
                onClick={() => addCart(product)}
                className={`flex-1 flex items-center justify-center gap-3 py-4 text-xs font-bold uppercase tracking-[2px] transition-all duration-300
                  ${isCart ? 'bg-[#f6f5f3] text-black border border-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}
              >
                <ShoppingBagIcon sx={{ fontSize: 18 }} />
                {isCart ? t('remove_from_cart') : t('add_to_cart')}
              </button>

              <button 
                onClick={() => addFav(product)}
                className="w-full sm:w-16 h-14 border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                {isFav ? <FavoriteIcon className="text-red-600" /> : <FavoriteBorderIcon />}
              </button>
            </div>

            {/* Extra Benefits */}
            <div className="grid grid-cols-1 gap-4 pt-6 border-t border-gray-100">
               <div className="flex items-center gap-4 text-gray-500">
                  <LocalShippingIcon sx={{ fontSize: 20 }} />
                  <span className="text-xs font-medium uppercase tracking-wider">Free Shipping on orders over $2000</span>
               </div>
               <div className="flex items-center gap-4 text-gray-500">
                  <VerifiedUserIcon sx={{ fontSize: 20 }} />
                  <span className="text-xs font-medium uppercase tracking-wider">2 Year Furniture Warranty</span>
               </div>
            </div>

            {/* Description Tab (Minimalist) */}
            <div className="mt-10">
               <h3 className="text-sm font-bold uppercase tracking-widest mb-4 border-b border-black w-fit pb-1">{t('description')}</h3>
               <p className="text-gray-500 text-sm leading-relaxed font-light">
                 Elevate your modern living space with this premium {product.category.toLowerCase()}. 
                 Crafted with precision using {product.material.toLowerCase()} materials, 
                 it offers both durability and timeless style. Perfect for your {product.room.toLowerCase()}.
               </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}