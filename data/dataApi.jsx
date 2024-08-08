const pathName = process.env.NEXTAUTH_URL;

const cache = "no-store"

export const getPost = async (slug) => {
  const res = await fetch(`${pathName}/api/posts/${slug}`, {
    cache: cache,
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

export const getPosts = async ({ select, include, ...params } = {}) => {
  const url = new URL(`${pathName}/api/posts`);

  // إضافة المعلمات الأخرى إلى الاستعلام
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      url.searchParams.append(key, value);
    }
  });

  // تحويل كائن select أو include إلى JSON وإضافته كمعلمة إلى الاستعلام
  if (select) {
    url.searchParams.append("select", JSON.stringify(select));
  }
  if (include) {
    url.searchParams.append("include", JSON.stringify(include));
  }

  const res = await fetch(url.toString(), {
    cache: 'no-cache',
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
};

export const getCategory = async (cat) => {
  const res = await fetch(
    `${pathName}/api/categories?slug=${cat}`,
    {
      cache: cache,
    }
  );

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

export const getCategories = async () => {
  const res = await fetch(
    `${pathName}/api/categories`,
    {
      cache: cache,
    }
  );

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

export const getSearch = async (slug) => {
  const res = await fetch(`${pathName}/api/posts?search=${slug}`, {
    cache: cache,
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};