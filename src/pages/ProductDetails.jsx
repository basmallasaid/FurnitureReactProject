import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';
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
  const isArabic = i18n.language === 'ar';
  
  const { products, loading: productsLoading } = useContext(ProductContext);
  const { cartList, addCart } = useContext(CartContext);
  const { fav, addFav } = useContext(FavContext);

  const [product, setProduct] = useState(null);
  const [activeImg, setActiveImg] = useState(null);
  const [selectedColor, setSelectedColor] = useState(0);

  useEffect(() => {
    if (products.length > 0) {
      const foundProduct = products.find(p => String(p.id) === String(id));
      if (foundProduct) {
        setProduct(foundProduct);
        setActiveImg(foundProduct.variants?.[0]?.img || null);
      }
    }
  }, [id, products]);

  if (productsLoading) return (
    <div className="flex justify-center items-center min-h-screen">
      <CircularProgress color="inherit" />
    </div>
  );

  if (!product) return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <h2 className="text-2xl font-serif text-gray-400 uppercase tracking-widest">Product not found</h2>
      <Link to="/products" className="text-black border-b border-black pb-1 font-bold uppercase text-xs tracking-widest">
        {t('back_to_shopping')}
      </Link>
    </div>
  );

  const isCart = cartList.some(item => String(item.id) === String(product.id));
  const isFav = fav.some(item => String(item.id) === String(product.id));

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="bg-[#f6f5f3] py-4 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-widest font-bold text-gray-400">
          <Link to="/" className="hover:text-black transition-colors">{t('home')}</Link>
          <NavigateNextIcon sx={{ fontSize: 14 }} />
          <Link to="/products" className="hover:text-black transition-colors">{product.category}</Link>
          <NavigateNextIcon sx={{ fontSize: 14 }} />
          <span className="text-black truncate">
            {isArabic ? product.name_ar : product.name_en}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="aspect-[4/5] bg-[#f9f9f9] flex items-center justify-center overflow-hidden rounded-sm">
              {activeImg && (
                <img 
                  src={activeImg} 
                  alt="Product" 
                  className="w-4/5 h-auto object-contain mix-blend-multiply transition-transform duration-1000 hover:scale-110" 
                />
              )}
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {product.variants?.map((v, i) => (
                <div 
                  key={i}
                  onClick={() => { setActiveImg(v.img); setSelectedColor(i); }}
                  className={`w-20 h-24 bg-[#f9f9f9] p-2 cursor-pointer border shrink-0 transition-all duration-300
                    ${selectedColor === i ? 'border-black' : 'border-transparent hover:border-gray-300'}`}
                >
                  {v.img && <img src={v.img} alt="variant" className="w-full h-full object-contain mix-blend-multiply" />}
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col pt-4">
            <div className={`mb-8 border-b border-gray-100 pb-8 ${isArabic ? 'text-right' : 'text-left'}`}>
              <span className="text-[11px] font-black tracking-[3px] text-[#a67c52] uppercase mb-4 block">
                {product.category}
              </span>
              <h1 className="text-3xl md:text-5xl font-serif font-medium mb-6 leading-tight text-gray-900">
                {isArabic ? product.name_ar : product.name_en}
              </h1>
              <div className={`flex items-center gap-4 ${isArabic ? 'flex-row-reverse justify-end' : ''}`}>
                <span className="text-3xl font-bold text-[#222]">${product.currentPrice?.toFixed(2)}</span>
                {product.oldPrice && (
                  <span className="text-gray-400 line-through text-xl font-light">${product.oldPrice.toFixed(2)}</span>
                )}
              </div>
            </div>

            <div className={`mb-8 ${isArabic ? 'text-right' : 'text-left'}`}>
              <h3 className="text-[11px] font-bold tracking-widest uppercase mb-5 text-gray-400">Select Color</h3>
              <div className={`flex gap-4 ${isArabic ? 'justify-end' : 'justify-start'}`}>
                {product.variants?.map((v, i) => (
                  <button 
                    key={i}
                    onClick={() => { setActiveImg(v.img); setSelectedColor(i); }}
                    style={{ backgroundColor: v.color }}
                    className={`w-9 h-9 rounded-full border-2 transition-all duration-300 transform hover:scale-110
                      ${selectedColor === i ? 'border-black scale-110 ring-4 ring-gray-50' : 'border-white shadow-sm'}`}
                  />
                ))}
              </div>
            </div>

            <div className={`mb-10 text-sm flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
              <span className="text-gray-400 uppercase tracking-widest text-[10px] font-bold">Status: </span>
              <span className={`uppercase tracking-widest text-[10px] font-black ${product.availability === 'In Stock' ? 'text-green-600' : 'text-red-500'}`}>
                {product.availability === 'In Stock' ? t('in_stock') : t('out_of_stock')}
              </span>
            </div>

            <div className={`flex flex-col sm:flex-row gap-4 mb-12 ${isArabic ? 'sm:flex-row-reverse' : ''}`}>
              <button 
                onClick={() => addCart(product)}
                className={`flex-[3] flex items-center justify-center gap-3 py-5 text-xs font-bold uppercase tracking-[2px] transition-all duration-500
                  ${isCart ? 'bg-[#f6f5f3] text-black border border-gray-200' : 'bg-black text-white hover:bg-[#222]'}`}
              >
                <ShoppingBagIcon sx={{ fontSize: 18 }} />
                {isCart ? t('remove_from_cart') : t('add_to_cart')}
              </button>

              <button 
                onClick={() => addFav(product)}
                className="flex-1 h-[60px] border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-all duration-300"
              >
                {isFav ? <FavoriteIcon className="text-red-600 animate-pulse" /> : <FavoriteBorderIcon className="text-gray-400" />}
              </button>
            </div>

            <div className="grid grid-cols-1 gap-5 pt-8 border-t border-gray-100">
               <div className={`flex items-center gap-4 text-gray-500 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <LocalShippingIcon sx={{ fontSize: 18 }} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Free Express Shipping on orders over $2000</span>
               </div>
               <div className={`flex items-center gap-4 text-gray-500 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <VerifiedUserIcon sx={{ fontSize: 18 }} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Global 2 Year Furniture Warranty</span>
               </div>
            </div>

            <div className="mt-12">
               <h3 className={`text-xs font-bold uppercase tracking-widest mb-6 border-b border-black w-fit pb-1 ${isArabic ? 'ml-auto' : ''}`}>{t('description')}</h3>
               <p className={`text-gray-500 text-sm leading-loose font-light lg:max-w-md ${isArabic ? 'text-right' : 'text-left'}`}>
                 Transform your home with the {isArabic ? product.name_ar : product.name_en}. 
                 This piece is part of our {product.style} collection, designed specifically for the {product.room}. 
                 Made with high-quality {product.material}, ensuring it remains a staple in your space for years to come.
               </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}