
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

export const getPosts = async () => {
    const res = await fetch(
      `${pathName}/api/posts`,
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