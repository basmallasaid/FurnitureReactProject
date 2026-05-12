import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../context/AuthContext';
import Swal from 'sweetalert2';

import GoogleIcon from '@mui/icons-material/Google';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function Login() {
    const { googleSignIn, login } = useContext(AuthContext);

    const navigate = useNavigate();

    const { t, i18n } = useTranslation();

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);

    const handleGoogleLogin = async () => {
        try {
            await googleSignIn();

            Swal.fire({
                icon: 'success',
                title: t('login_success'),
                timer: 1500,
                showConfirmButton: false
            });

            navigate('/');
        } catch (error) {
            console.error("Google Auth Error:", error.message);

            Swal.fire({
                icon: 'error',
                title: 'Google Login Failed'
            });
        }
    };

    const handleEmailLogin = async (e) => {
        e.preventDefault();

        try {
            await login(email, password);

            Swal.fire({
                icon: 'success',
                title: t('login_success'),
                timer: 1500,
                showConfirmButton: false
            });

            navigate('/');
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: t('login_failed'),
                text: t('wrong_details'),
                confirmButtonColor: '#000'
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f6f5f3] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl w-full flex bg-white shadow-2xl rounded-sm overflow-hidden">

                <div
                    className="hidden md:block md:w-1/2 bg-cover bg-center"
                    style={{ backgroundImage: "url('/sofaa1.jpg')" }}
                >
                    <div className="w-full h-full bg-black/10"></div>
                </div>

                <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-serif font-medium uppercase tracking-widest">
                            {t('login')}
                        </h2>

                        <p className="text-gray-400 mt-2 text-sm">
                            {t('welcome_back')}
                        </p>
                    </div>

                    <form onSubmit={handleEmailLogin} className="space-y-6">
                        <div className="relative">
                            <input
                                required
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={t('email')}
                                className="w-full border-b border-gray-300 py-3 px-1 outline-none focus:border-black transition-all placeholder:text-gray-300 text-sm"
                            />
                        </div>

                        <div className="relative">
                            <input
                                required
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder={t('password')}
                                dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
                                className="w-full border-b border-gray-300 py-3 px-1 outline-none focus:border-black transition-all placeholder:text-gray-300 text-sm"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className={`absolute top-3 text-gray-400 hover:text-black ${
                                    i18n.language === 'ar' ? 'left-2' : 'right-2'
                                }`}
                            >
                                {showPassword ? (
                                    <VisibilityOffIcon sx={{ fontSize: 20 }} />
                                ) : (
                                    <VisibilityIcon sx={{ fontSize: 20 }} />
                                )}
                            </button>
                        </div>

                        <div className={i18n.language === 'ar' ? 'text-left' : 'text-right'}>
                            <Link
                                to="#"
                                className="text-xs text-gray-400 hover:text-black transition-colors"
                            >
                                {t('forgot_password')}
                            </Link>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-black text-white py-4 text-xs font-bold uppercase tracking-[2px] hover:bg-gray-800 transition-all"
                        >
                            {t('login')}
                        </button>

                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-gray-100"></span>
                            </div>

                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white px-2 text-gray-400">
                                    Or
                                </span>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            className="w-full border border-gray-200 py-3 flex items-center justify-center gap-3 text-sm hover:bg-gray-50 transition-all"
                        >
                            <GoogleIcon
                                sx={{
                                    color: '#DB4437',
                                    fontSize: 18
                                }}
                            />

                            <span className="font-medium text-gray-600">
                                {t('login_with_google')}
                            </span>
                        </button>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-400">
                        {t('no_account')}{' '}

                        <Link
                            to="/register"
                            className="text-black font-bold border-b border-black pb-1 ml-1 hover:text-gray-600 transition-colors"
                        >
                            {t('register')}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}