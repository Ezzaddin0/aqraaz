export const navigation = [
  { title: {
    en: 'Pages',
    ar: 'الصفحات'
  },
    pages: [
      { name: {
        en: 'categories',
        ar: 'الاقسام'
      }, href: '/categories', current: false },
      { name: {
        en: 'latest',
        ar: 'اخر المنشورات'
      }, href: '/latest', current: false },
      { name: {
        en: 'about',
        ar: 'من نحن',
      }, href: '/about', current: false },
      // { name: 'about', href: '/about', current: false },
    ]
  },
  { title: {
    en: 'Categories',
    ar: 'الاقسام'
  },
    pages: [
      { name: {
        en: 'countries',
        ar: 'بلدان'
      }, href: '/categories/countries', current: false },
      { name: {
        en: 'sports',
        ar: 'رياضة'
      }, href: '/categories/sports', current: false },
      { name: {
        en: 'history',
        ar: 'تاريخ',
      }, href: '/categories/history', current: false },
      { name: {
        en: 'technology',
        ar: 'تكنولوجيا',
      }, href: '/categories/technology', current: false },
      { name: {
        en: 'celebrities',
        ar: 'مشاهير',
      }, href: '/categories/celebrities', current: false },
    ]
  },
  { title: {
    en: 'info',
    ar: 'حول'
  },
    pages: [
      { name: {
        en: 'about',
        ar: 'حول'
      }, href: '/about', current: false },
      { name: {
        en: 'privacy policy',
        ar: 'سياسة الخصوصية'
      }, href: '/privacy_policy', current: false },
      { name: {
        en: 'Connect with us',
        ar: 'اتصل بنا',
      }, href: '/connect_us', current: false },
      { name: {
        en: 'User Agreement',
        ar: 'اتفاقية المستخدم',
      }, href: '/user_agreement', current: false },
    ]
  },
  // { name: 'Calendar', href: '#', current: false },
]