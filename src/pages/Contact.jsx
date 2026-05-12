import React from 'react';
import { useTranslation } from 'react-i18next';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function Contact() {
  const { t } = useTranslation();

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#f6f5f3] py-20 text-center">
        <h1 className="text-4xl font-serif uppercase tracking-widest">
          {t('contact_us')}
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-12 gap-20">

        <div className="md:col-span-4 space-y-12">
          <div>
            <h3 className="text-lg font-bold uppercase tracking-widest mb-6">
              {t('visit_us')}
            </h3>
            <div className="flex gap-4 items-start text-gray-600">
              <LocationOnIcon />
              <p className="text-sm leading-loose">
                123 Modern Street, Design District,<br />
                New York, NY 10001
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold uppercase tracking-widest mb-6">
              {t('lets_talk')}
            </h3>

            <div className="flex gap-4 items-center text-gray-600 mb-4">
              <LocalPhoneIcon />
              <p className="text-sm">+1 (234) 567-890</p>
            </div>

            <div className="flex gap-4 items-center text-gray-600">
              <EmailIcon />
              <p className="text-sm">hello@vinfur.com</p>
            </div>
          </div>
        </div>

        <div className="md:col-span-8">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-8">

            <input
              type="text"
              placeholder={t('your_name')}
              className="w-full border-b border-gray-200 py-4 focus:border-black outline-none transition-all placeholder:text-gray-300"
            />

            <input
              type="email"
              placeholder={t('your_email')}
              className="w-full border-b border-gray-200 py-4 focus:border-black outline-none transition-all placeholder:text-gray-300"
            />

            <div className="md:col-span-2">
              <input
                type="text"
                placeholder={t('subject')}
                className="w-full border-b border-gray-200 py-4 focus:border-black outline-none transition-all placeholder:text-gray-300"
              />
            </div>

            <div className="md:col-span-2">
              <textarea
                placeholder={t('how_can_we_help')}
                rows="4"
                className="w-full border-b border-gray-200 py-4 focus:border-black outline-none transition-all placeholder:text-gray-300 resize-none"
              />
            </div>

            <button className="md:col-span-2 bg-black text-white py-5 text-xs font-bold uppercase tracking-[3px] hover:bg-gray-800 transition-all">
              {t('send_message')}
            </button>

          </form>
        </div>

      </div>
    </div>
  );
}