import RSS from 'rss';

import { client } from "../../../../lib/createClient";
import { groq } from "next-sanity";
import { fetchPosts } from '@/data/dataApi';

export async function GET() {

    const query = groq`
    *[_type == 'post']{
        title,
        slug,
        description,
        _createdAt,
    } | order(_createdAt desc)`

    const posts = await client.fetch(query);

    // const posts = await getPosts({page: 1});
    // const posts = await getPosts({
    //     select: {
    //       title: true,
    //       slug: true,
    //       desc: true,
    //       createdAt: true,
    //     }
    // });
    // const posts = await fetchPosts('', ['title', 'slug', 'desc', 'createdAt']);

    const feed = new RSS({
        title: "aqraaz",
        description: "Discover boundless insights across diverse domains on the Aqraaz blog. Delve into a wealth of specialized content covering technology, business strategies, lifestyle trends, health advice, and more. Our curated collection of articles and resources caters to every interest and expertise level, ensuring a rewarding reading experience for all. Explore the Aqraaz blog today for expert perspectives, valuable tips, and in-depth analyses across a myriad of categories",
        id: `https://www.aqraaz.com/en/`,
        link: `https://www.aqraaz.com/en/`,
        site_url:  `https://www.aqraaz.com/en/`,
        feed_url: `https://www.aqraaz.com/en/rss.xml`,
        image_url: `https://www.aqraaz.com/favicon.ico`,
        pubDate: new Date(),
        copyright: `All right reserved ${new Date().getFullYear()}`
    })

    posts.forEach(post => {
        feed.item({
            title: post.title.en,
            description: post.description.en,
            guid: `https://www.aqraaz.com/en/post/${post.slug.current}`,
            url: `https://www.aqraaz.com/en/post/${post.slug.current}`,
            date: new Date(post._createdAt),
            
        })
        
    });
    posts.forEach(post => {
        feed.item({
            title: post.title.ar,
            description: post.description.ar,
            guid: `https://www.aqraaz.com/ar/post/${post.slug}`,
            url: `https://www.aqraaz.com/ar/post/${post.slug}`,
            date: new Date(post._createdAt)
        })
        
    });

    
    return new Response(feed.xml(), {
        headers: {
            'Content-Type': 'application/atom+xml; charset=utf-8'
        }
    })
}