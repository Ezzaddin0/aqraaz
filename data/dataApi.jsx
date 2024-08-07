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

// export const getPosts = async ({ select, include, ...params } = {}) => {
//   const url = new URL(`${pathName}/api/posts`);

//   // إضافة المعلمات الأخرى إلى الاستعلام
//   Object.entries(params).forEach(([key, value]) => {
//     if (value !== undefined) {
//       url.searchParams.append(key, value);
//     }
//   });

//   // تحويل كائن select أو include إلى JSON وإضافته كمعلمة إلى الاستعلام
//   if (select) {
//     url.searchParams.append("select", JSON.stringify(select));
//   }
//   if (include) {
//     url.searchParams.append("include", JSON.stringify(include));
//   }

//   const res = await fetch(url.toString(), {
//     cache: 'no-cache',
//   });

//   if (!res.ok) {
//     throw new Error("Failed to fetch posts");
//   }

//   return res.json();
// };

export const getPosts = async ({ page, cat, searchQuery, include, select } = {}) => {
  const url = new URL(`${pathName}/api/posts`);

  if (page !== undefined) {
    url.searchParams.append("page", page);
  }
  if (cat !== undefined) {
    url.searchParams.append("cat", cat);
  }
  if (searchQuery !== undefined) {
    url.searchParams.append("search", searchQuery);
  }
  if (include) {
    url.searchParams.append("include", JSON.stringify(include));
  }
  if (select) {
    url.searchParams.append("select", JSON.stringify(select));
  }

  const res = await fetch(
    url.toString(),
    {
      cache: cache,
    }
  );

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

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

// get Categories old
// export const getCategories = async () => {
//   const res = await fetch(
//     `${pathName}/api/categories`,
//     {
//       cache: cache,
//     }
//   );

//   if (!res.ok) {
//     throw new Error("Failed");
//   }

//   return res.json();
// };
export const getCategories = async (options = {}) => {
  const { include, select } = options;

  const query = new URLSearchParams();

  if (include) {
    query.set("include", JSON.stringify(include));
  }

  if (select) {
    query.set("select", JSON.stringify(select));
  }

  const url = `${pathName}/api/categories?${query.toString()}`;
  const res = await fetch(url, {
    cache: cache,
  });

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