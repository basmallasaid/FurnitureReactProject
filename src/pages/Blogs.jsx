import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Blogs() {
  const { t, i18n } = useTranslation();

  const isArabic = i18n.language === 'ar';

  const blogPosts = [
    {
      id: 1,
      title: t('blog_title_1'),
      date: "Oct 12, 2023",
      img: "register.jpg"
    },
    {
      id: 2,
      title: t('blog_title_2'),
      date: "Sep 28, 2023",
      img: "rev1.jpg"
    },
    {
      id: 3,
      title: t('blog_title_3'),
      date: "Aug 15, 2023",
      img: "rev2.jpg"
    },
  ];

  return (
    <div
      className="min-h-screen bg-white py-20 px-6"
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <h1 className="text-4xl font-serif mb-4">
            {t('journal')}
          </h1>

          <p className="text-gray-400 uppercase tracking-widest text-xs">
            {t('blog_subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {blogPosts.map((post) => (
            <div key={post.id} className="group cursor-pointer">
              <div className="overflow-hidden mb-6 aspect-[4/3] bg-gray-100">
                <img
                  src={post.img}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[2px]">
                {post.date}
              </span>

              <h3 className="text-xl font-medium mt-3 group-hover:text-[#a67c52] transition-colors">
                {post.title}
              </h3>

              <p className="text-gray-500 text-sm mt-4 line-clamp-2">
                {t('blog_desc')}
              </p>

              <div className="mt-6 inline-block border-b border-black pb-1 text-xs font-bold uppercase tracking-widest hover:text-[#a67c52] transition-colors">
                {t('read_more')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}