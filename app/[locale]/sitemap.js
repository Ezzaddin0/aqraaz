import { fetchCategories, fetchPosts, getCategories, getPosts } from "@/data/dataApi";
import { client } from "@/lib/createClient";
import { groq } from "next-sanity";

export const revalidate = 30;

export default async function sitemap() {
    const BaseUrlEn = "https://www.aqraaz.com/en";
    const BaseUrlAr = "https://www.aqraaz.com/ar";

    // const posts = await getPosts({
    //     select: {
    //       slug: true,
    //       createdAt: true,
    //     }
    // });
    const query = groq`
    *[_type == 'post' && status == "active"]{
        slug,
        _createdAt,
    } | order(_createdAt desc)`

    const posts = await client.fetch(query);
    // const posts = await fetchPosts('', ["slug", "createdAt"])
    
    // const categories = await getCategories();        
    // const categories = await getCategories({
    // select: {
    //     slug: true,
    //     createdAt: true,
    // },
    // }); 
    // const categories = await fetchCategories('', ["slug", "createdAt"])
    const queryCategory = groq`
    *[_type == 'category' && status == "active"]{
        slug,
        _createdAt,
    } | order(_createdAt desc)`

    const categories = await client.fetch(queryCategory);

    const postUrlsEnSlug = posts.map((post) => ({
        url: `${BaseUrlEn}/post/${post.slug.current}`,
        lastModified: post?._createdAt,
    }))
    const postUrlsArSlug = posts.map((post) => ({
        url: `${BaseUrlAr}/post/${post.slug.current}`,
        lastModified: post?._createdAt,
    }))

    const CategoryUrlsEn = categories.map((post) => ({
        url: `${BaseUrlEn}/categories/${post.slug.current}`,
        lastModified: post?._createdAt,
    }))
    const CategoryUrlsAr = categories.map((post) => ({
        url: `${BaseUrlAr}/categories/${post.slug.current}`,
        lastModified: post?._createdAt,
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