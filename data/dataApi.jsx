const pathName = "http://localhost:3000";
const cache = "no-store"

export const fetchPost = async (slug) => {  
  // جلب البيانات من الـ API
  const res = await fetch(`http://localhost:3000/api/posts/${slug}`, {
    cache: 'no-store', // لضمان أن البيانات لا يتم تخزينها مؤقتًا وتحديثها دائمًا
  });

  // تحويل الرد إلى JSON
  const data = await res.json();  
  return data;
}

export const fetchPosts = async (locale = 'en', fields = [], categories = [], limit = null, page = 1) => {
  // إعداد معلمات البحث
  const queryParams = new URLSearchParams({
    locale,
    fields: fields.join(','), // تمرير الحقول كمصفوفة مفصولة بفاصلة
    categories: categories.join(','), // تمرير الفئات كمصفوفة مفصولة بفاصلة
    limit: String(limit), // تمرير الحد الأقصى لعدد البيانات
    page: String(page), // تمرير الصفحة التي تريد البحث عنها
  });

  // جلب البيانات من الـ API
  const res = await fetch(`http://localhost:3000/api/posts?${queryParams.toString()}`, {
    cache: 'no-store', // لضمان أن البيانات لا يتم تخزينها مؤقتًا وتحديثها دائمًا
  });

  // تحويل الرد إلى JSON
  const data = await res.json();
  return data.documents;
}

export const getCategory = async (cat, options = {}) => {
  const { include, select } = options;

  const query = new URLSearchParams();
  query.set("slug", cat);

  if (include && !select) {
    query.set("include", JSON.stringify(include));
  } else if (select && !include) {
    query.set("select", JSON.stringify(select));
  }

  const res = await fetch(
    `${pathName}/api/categories?${query.toString()}`,
    {
      cache: cache,
    }
  );  

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

export const fetchCategories = async  (locale = 'en', fields = [], categories = []) => {
  // إعداد معلمات البحث
  const queryParams = new URLSearchParams({
    locale,
    fields: fields.join(','), // تمرير الحقول كمصفوفة مفصولة بفاصلة
    categories: categories.join(','), // تمرير الفئات كمصفوفة مفصولة بفاصلة
  });  

  // جلب البيانات من الـ API
  const res = await fetch(`http://localhost:3000/api/categories?${queryParams.toString()}`, {
    cache: 'no-store', // لضمان أن البيانات لا يتم تخزينها مؤقتًا وتحديثها دائمًا
  });

  // تحويل الرد إلى JSON
  const data = await res.json();
  return data.documents;
}

export const fetchComments = async (slug = '') => {  
  const res = await fetch(`http://localhost:3000/api/comments?postSlug=${slug}`, {
    cache: 'no-store',
  });

  const data = await res.json();
  return data.documents;
}

export const fetchUsers = async () => {
  const res = await fetch(`http://localhost:3000/api/users`, {
    cache: 'no-store',
  });

  const data = await res.json();
  return data.documents;
}

export const fetchSearch = async (locale = 'en', fields = [], limit = null, page = 1, q = '') => {
  // إعداد معلمات البحث
  const queryParams = new URLSearchParams({
    locale,
    fields: fields.join(','), // تمرير الحقول كمصفوفة مفصولة بفاصلة
    limit: limit ? String(limit) : '', // تمرير الحد الأقصى لعدد البيانات إذا تم تقديمه
    page: String(page), // تمرير الصفحة التي تريد البحث عنها
    q: q, // تمرير مصطلح البحث
  });  

  // جلب البيانات من الـ API
  const res = await fetch(`http://localhost:3000/api/posts?${queryParams.toString()}`, {
    cache: 'no-store', // لضمان أن البيانات لا يتم تخزينها مؤقتًا وتحديثها دائمًا
  });

  // تحويل الرد إلى JSON
  const data = await res.json();
  return data.documents;
}