import { client } from "../../lib/createClient";
// import { Post } from "@/types";
import { groq } from "next-sanity";

export const revalidate = 30;

const getPosts = async () => {
  const res = await fetch(
    `https://www.aqraaz.com/api/posts`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const getCategories = async () => {
  const res = await fetch(
    `https://www.aqraaz.com/api/categories`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

export default async function sitemap() {
    const BaseUrlEn = "https://www.aqraaz.com/en";
    const BaseUrlAr = "https://www.aqraaz.com/ar";


    // const query = groq`
    // *[_type == "post"]`

    // const posts = await client.fetch(query);

    const posts = await getPosts();
    const categories = await getCategories();

    const postUrlsEnSlug = posts.posts.map((post:any) => ({
        url: `${BaseUrlEn}/post/${post.slug}`,
        lastModified: post?.createdAt,
    }))
    const postUrlsArSlug = posts.map((post:any) => ({
        url: `${BaseUrlAr}/post/${post.slug}`,
        lastModified: post?.createdAt,
    }))
    // const postUrlsEn = posts.map((post:any) => ({
    //     url: `${BaseUrlEn}/post/${post.slug.current}`,
    //     lastModified: post?._createdAt,
    // }))
    // const postUrlsAr = posts.map((post:any) => ({
    //     url: `${BaseUrlAr}/post/${post.slug.current}`,
    //     lastModified: post?._createdAt,
    // }))

    // const queryCategory = groq`
    // *[_type == 'category']`
    // const categories = await client.fetch(queryCategory);

    const CategoryUrlsEn = categories.map((post:any) => ({
        url: `${BaseUrlEn}/categories/${post.slug}`,
        lastModified: post?.createdAt,
    }))
    const CategoryUrlsAr = categories.map((post:any) => ({
        url: `${BaseUrlAr}/categories/${post.slug}`,
        lastModified: post?.createdAt,
    }))


    return [
        {url: BaseUrlEn, lastModified: new Date()},
        {url: BaseUrlAr, lastModified: new Date()},
        {url: `${BaseUrlEn}/categories`, lastModified: new Date()},
        {url: `${BaseUrlAr}/categories`, lastModified: new Date()},
        {url: `${BaseUrlEn}/latest`, lastModified: new Date()},
        {url: `${BaseUrlAr}/latest`, lastModified: new Date()},
        // {url: `${BaseUrlEn}/about`, lastModified: new Date()},
        // {url: `${BaseUrlAr}/about`, lastModified: new Date()},
        // {url: `${BaseUrlEn}/connect_us`, lastModified: new Date()},
        // {url: `${BaseUrlAr}/connect_us`, lastModified: new Date()},
        // {url: `${BaseUrlEn}/lastast`, lastModified: new Date()},
        // {url: `${BaseUrlAr}/lastast`, lastModified: new Date()},
        // {url: `${BaseUrlEn}/privacy_policy`, lastModified: new Date()},
        // {url: `${BaseUrlAr}/privacy_policy`, lastModified: new Date()},
        // {url: `${BaseUrlEn}/user_agreement`, lastModified: new Date()},
        // {url: `${BaseUrlAr}/user_agreement`, lastModified: new Date()},



        // ...postUrlsEn,
        ...postUrlsEnSlug,
        ...postUrlsArSlug,
        // ...postUrlsAr,
        ...CategoryUrlsEn,
        ...CategoryUrlsAr,
    ]
}