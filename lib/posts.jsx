import { sortPostsByDate } from "../helper/sorted";

export const sortByTitleAsc = (posts) => {
  return posts.sort((a, b) => a.title.en.localeCompare(b.title.en));
};

export const sortByTitleDesc = (posts) => {
  return posts.sort((a, b) => b.title.en.localeCompare(a.title.en));
};

export const sortByMostViewed = (posts) => {
  return posts.sort((a, b) => b.views.length - a.views.length);
};

export const getData = async (cat, sort) => {
  const res = await fetch(`https://aqraaz.com/api/categories?slug=${cat}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  const data = await res.json();

  let sortedPosts = [];
  if (sort === "a-to-z") {
    sortedPosts = sortByTitleAsc([...data[0].posts]);
  } else if (sort === "z-to-a") {
    sortedPosts = sortByTitleDesc([...data[0].posts]);
  } else if (sort === "most-viewed") {
    sortedPosts = sortByMostViewed([...data[0].posts]);
  } else {
    sortedPosts = sortPostsByDate(data[0].posts);
  }

  return sortedPosts;
};

export const getPosts = async (sort) => {
  const res = await fetch(`https://aqraaz.com/api/posts`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  const data = await res.json();

  let sortedPosts = [];
  if (sort === "a-to-z") {
    sortedPosts = sortByTitleAsc([...data.posts]);
  } else if (sort === "z-to-a") {
    sortedPosts = sortByTitleDesc([...data.posts]);
  } else if (sort === "most-viewed") {
    sortedPosts = sortByMostViewed([...data.posts]);
  } else {
    sortedPosts = sortPostsByDate(data.posts);
  }

  return sortedPosts;
};