import React from 'react';
import { useTranslation } from 'react-i18next';

export default function About() {
  const { t, i18n } = useTranslation();

  const isArabic = i18n.language === 'ar';

  return (
    <div className="bg-white" dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="bg-[#f6f5f3] py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-serif mb-4">
          {t('about')}
        </h1>

        <p className="text-gray-400 uppercase tracking-[4px] text-xs">
          {t('about_subtitle')}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-serif leading-tight">
            {t('about_title')}
          </h2>

          <p className="text-gray-600 leading-relaxed">
            {t('about_description')}
          </p>

          <div className="grid grid-cols-2 gap-8 pt-6">
            <div>
              <h4 className="text-2xl font-bold">
                25+
              </h4>

              <p className="text-gray-400 text-xs uppercase tracking-widest">
                {t('years_experience')}
              </p>
            </div>

            <div>
              <h4 className="text-2xl font-bold">
                12
              </h4>

              <p className="text-gray-400 text-xs uppercase tracking-widest">
                {t('global_stores')}
              </p>
            </div>
          </div>
        </div>

        <div className="relative group overflow-hidden">
          <img
            src="about.jpg"
            alt="furniture"
            className="w-full h-125 object-cover transition-transform duration-1000 group-hover:scale-105"
          />
        </div>
      </div>

      <div className="bg-[#f6f5f3] py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 text-center">
          {[
            {
              title: t('quality_materials'),
              desc: t('quality_materials_desc')
            },
            {
              title: t('sustainable_wood'),
              desc: t('sustainable_wood_desc')
            },
            {
              title: t('modern_design'),
              desc: t('modern_design_desc')
            }
          ].map((value) => (
            <div key={value.title} className="space-y-4">
              <h3 className="text-xl font-serif">
                {value.title}
              </h3>

              <p className="text-gray-500 text-sm">
                {value.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}