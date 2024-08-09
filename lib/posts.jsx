import { getCategory, getPosts } from "../data/dataApi";
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
  // const res = await fetch(`${process.env.NEXTAUTH_URL}/api/categories?slug=${cat}`, {
  //   cache: "no-store",
  // });

  // if (!res.ok) {
  //   throw new Error("Failed");
  // }

  // const data = await res.json();
  const data  = await getCategory(cat, {
    include: {
      posts: {
        include: {
          views: true,
          comments: true
        }
      },
    },
  })

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

export const getPostsLib = async (sort) => {
  // const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts`, {
  //   cache: "no-store",
  // });

  // if (!res.ok) {
  //   throw new Error("Failed");
  // }

  // const data = await res.json();
  // const data = await getPosts({
  //   // page: 1,
  //   // cat: 'news',
  //   // searchQuery: 'latest updates',
  //   include: {
  //     user: true,
  //     cat: true,
  //     comments: {
  //       include: {
  //         user: true,
  //       }
  //     },
  //     views: true,
  //   },
  // });
  const data = await getPosts({
    select: {
      title: true,
      slug: true,
      desc: true,
      img: true,
      createdAt: true,
      views: true,
    }
  });
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