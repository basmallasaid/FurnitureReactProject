import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const { signup } = useContext(AuthContext);

  const navigate = useNavigate();

  const { t, i18n } = useTranslation();

  const isArabic = i18n.language === 'ar';

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await signup(email, password);

      Swal.fire({
        icon: 'success',
        title: t('register_success'),
        text: `${fullName} ${t('welcome_create_account')}`,
        confirmButtonColor: '#000'
      });

      navigate('/');
    } catch (error) {
      let msg = t('register_failed');

      if (error.code === 'auth/email-already-in-use') {
        msg = t('email_already_registered');
      }

      Swal.fire({
        icon: 'error',
        title: t('register_failed'),
        text: msg
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6f5f3] py-12 px-4">
      <div
        className={`max-w-4xl w-full flex bg-white shadow-2xl rounded-sm overflow-hidden ${
          isArabic ? 'flex-row-reverse' : ''
        }`}
      >
        <div
          className="hidden md:block md:w-1/2 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('register.jpg')"
          }}
        ></div>

        <div className="w-full md:w-1/2 p-8 md:p-16">
          <h2 className="text-3xl font-serif font-medium uppercase mb-10 text-center">
            {t('register')}
          </h2>

          <form onSubmit={handleRegister} className="space-y-6">
            <input
              required
              type="text"
              placeholder={t('full_name')}
              onChange={(e) => setFullName(e.target.value)}
              dir={isArabic ? 'rtl' : 'ltr'}
              className="w-full border-b border-gray-300 py-3 outline-none focus:border-black transition-all"
            />

            <input
              required
              type="email"
              placeholder={t('email')}
              onChange={(e) => setEmail(e.target.value)}
              dir={isArabic ? 'rtl' : 'ltr'}
              className="w-full border-b border-gray-300 py-3 outline-none focus:border-black transition-all"
            />

            <input
              required
              type="password"
              placeholder={t('password')}
              onChange={(e) => setPassword(e.target.value)}
              dir={isArabic ? 'rtl' : 'ltr'}
              className="w-full border-b border-gray-300 py-3 outline-none focus:border-black transition-all"
            />

            <button className="w-full bg-black text-white py-4 text-xs font-bold uppercase tracking-[2px] hover:bg-gray-800 mt-4">
              {t('create_account')}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-400">
            {t('already_have_account')}{' '}

            <Link
              to="/login"
              className="text-black font-bold ml-1"
            >
              {t('login')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}