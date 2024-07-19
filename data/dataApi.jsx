const pathName = process.env.NEXTAUTH_URL;

export const getPost = async (slug) => {
  const res = await fetch(`${pathName}/api/posts/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

export const getPosts = async ({ page, cat, searchQuery, postsPerPage } = {}) => {
  const url = new URL(`${pathName}/api/posts`);

  if (page !== undefined) {
    url.searchParams.append("page", page);
  }
  if (cat !== undefined) {
    url.searchParams.append("cat", cat);
  }
  // if (postsPerPage !== undefined) {
  //   url.searchParams.append("postsPerPage", postsPerPage);
  // }

    const res = await fetch(
      url.toString(),
      {
        cache: "no-store",
      }
    );
  
    if (!res.ok) {
      throw new Error("Failed");
    }
  
    return res.json();
};

export const getCategory = async (cat) => {
  const res = await fetch(
    `${pathName}/api/categories?slug=${cat}`,
    {
      cache: "no-store",
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
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

export const getSearch = async (slug) => {
  const res = await fetch(`${pathName}/api/posts?search=${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};