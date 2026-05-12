import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingBagIcon from '@mui/icons-material/ShoppingCart';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export default function Cart() {
    const { cartList, addCart } = useContext(CartContext);
    const { t, i18n } = useTranslation();

    const subtotal = cartList.reduce((acc, item) => acc + item.currentPrice, 0);
    const handleCheckout = async () => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/create-checkout-session`, {
            cart: cartList,
        });

        if (response.data.url) {
            window.location.href = response.data.url; 
        }
    } catch (error) {
        console.error("Stripe Checkout Error:", error);
        alert(t('error_connecting_stripe'));
    }
};

    return (
        <div className="min-h-screen bg-white pb-24 text-[#222]">


            <div className="bg-[#f6f5f3] py-16 text-center mb-12 border-b border-[#eee]">
                <div className="max-w-7xl mx-auto px-4">
                    <h1 className="text-3xl md:text-5xl font-serif font-medium tracking-wide mb-8">
                        {t('shopping_cart')}
                    </h1>

                    {/* Breadcrumbs */}
                    <div className="flex justify-center items-center gap-2 text-xs uppercase tracking-widest font-semibold text-gray-400">
                        <Link to="/" className="hover:text-black transition-colors">
                            {t('home')}
                        </Link>
                        <NavigateNextIcon sx={{ fontSize: 14 }} />
                        <span className="text-black">{t('shopping_cart')}</span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8">
                {cartList.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-24 h-24 bg-[#f6f5f3] rounded-full flex items-center justify-center mb-6">
                            <ShoppingBagIcon className="text-gray-400" sx={{ fontSize: 40 }} />
                        </div>
                        <h2 className="text-2xl font-serif mb-6">{t('cart_empty')}</h2>
                        <Link
                            to="/products"
                            className="bg-[#222] hover:bg-black text-white px-10 py-4 text-sm font-semibold tracking-widest uppercase transition-colors duration-300"
                        >
                            {t('return_shop')}
                        </Link>
                    </div>
                ) : (

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                        <div className="lg:col-span-8">
                            <div className="hidden md:flex justify-between border-b border-[#eee] pb-4 mb-6 text-[11px] font-bold tracking-widest text-gray-400">
                                <span className="w-3/5">PRODUCT</span>
                                <span className="w-1/5 text-center">PRICE</span>
                                <span className="w-1/12"></span>
                            </div>

                            {cartList.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center justify-between border-b border-gray-100 py-6 last:border-0"
                                >
                                    <div className="flex items-center gap-6 w-3/5">
                                        <Link
                                            to={`/product/${item.id}`}
                                            className="w-35 h-30 flex items-center justify-center overflow-hidden shrink-0"
                                        >
                                            <img
                                                src={item.variants[0].img}
                                                alt="product"
                                                className="w-full h-auto object-contain mix-blend-multiply transition-transform duration-500 hover:scale-105"
                                            />
                                        </Link>
                                        <div>
                                            <Link to={`/product/${item.id}`} className="hover:text-[#a67c52] transition-colors">
                                                <h3 className="text-base font-semibold md:text-lg mb-1 leading-snug">
                                                    {i18n.language === 'ar' ? item.name_ar : item.name_en}
                                                </h3>
                                            </Link>
                                            <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                                                {item.category}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="w-1/5 text-center font-bold text-base md:text-lg">
                                        ${item.currentPrice.toFixed(2)}
                                    </div>
                                    <button
                                        onClick={() => addCart(item)}
                                        className="text-gray-300 hover:text-red-600 p-2 rounded-full hover:bg-red-50 transition-all duration-300"
                                    >
                                        <DeleteIcon sx={{ fontSize: 22 }} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="lg:col-span-4 lg:sticky lg:top-24">
                            <div className="border border-gray-100 p-8 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                                <h2 className="text-xl md:text-2xl font-serif mb-6 pb-2 border-b border-[#f6f5f3]">
                                    {t('order_summary')}
                                </h2>

                                <div className="space-y-4 text-sm">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-500">{t('subtotal')}</span>
                                        <span className="font-bold text-base">${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-500">{t('shipping')}</span>
                                        <span className="font-semibold text-green-600 text-xs">{t('free_shipping')}</span>
                                    </div>
                                    <hr className="border-[#f6f5f3] my-4" />
                                    <div className="flex justify-between items-center py-2">
                                        <span className="text-lg font-bold">{t('total')}</span>
                                        <span className="text-2xl font-bold text-[#a67c52]">
                                            ${subtotal.toFixed(2)}
                                        </span>
                                    </div>
                                    <button
                                        onClick={handleCheckout}
                                        className="w-full bg-black text-white py-4 mt-4 text-xs font-bold uppercase tracking-[2px]"
                                    >
                                        {t('checkout')}
                                    </button>
                                    <div className="text-center pt-6 space-y-3">
                                        <span className="text-[10px] text-gray-400 uppercase tracking-widest block">
                                            Secure Checkout Guaranteed
                                        </span>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
}