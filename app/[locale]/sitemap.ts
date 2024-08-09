import { getCategories, getPosts } from "../../data/dataApi";

export const revalidate = 30;

export default async function sitemap() {
    const BaseUrlEn = "https://www.aqraaz.com/en";
    const BaseUrlAr = "https://www.aqraaz.com/ar";

    const posts = await getPosts({
    select: {
        createdAt: true,
        slug: true,
    },
    });
    const categories = await getCategories({
    select: {
        slug: true,
        createdAt: true,
    },
    });        

    const postUrlsEnSlug = posts.posts.map((post:any) => ({
        url: `${BaseUrlEn}/post/${post.slug}`,
        lastModified: post?.createdAt,
    }))
    const postUrlsArSlug = posts.posts.map((post:any) => ({
        url: `${BaseUrlAr}/post/${post.slug}`,
        lastModified: post?.createdAt,
    }))

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