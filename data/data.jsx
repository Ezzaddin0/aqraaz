import { groq } from 'next-sanity'
import { client } from '../lib/createClient'

export const revalidate = 30;

export async function fetchMostPopular() {
    const queryMost = groq`
      *[title.en match 'most popular']{
        posts[]->{
          ...,
          categories[]->,
          author->,
          
        }
      } | order(_createdAt asc)`;
  
    const mostPopular = await client.fetch(queryMost);
    return mostPopular;
}

export async function fetchAllPosts() {
    const queryMost = groq`
    *[_type == 'post']{
      ...,
      author->,
        categories[]->,
    } | order(_createdAt desc)`;
  
    const mostPopular = await client.fetch(queryMost);
    return mostPopular;
}

export async function fetchCategories() {
    const queryMost = groq`
    *[_type == 'category']{
        ...,
      } | order(_createdAt asc)`;
  
    const mostPopular = await client.fetch(queryMost);
    return mostPopular;
}

export async function fetchPost() {
    const queryMost = groq`*[_type == 'post' && slug.current == 'cristiano-ronaldo'][0]{
      ...,
      body,
      author->,
      categories[]->{
        ...,
        posts[]->{
          ...,
          categories[]->,
        },
      }
    }`;
  
    const mostPopular = await client.fetch(queryMost);
    return mostPopular;
}

export async function fetchAllCategories() {
    const queryMost = groq`
    *[_type == 'category']{
      ...,
      posts[]->{
      ...,
      author->,
      categories[]->,
      },
    } | order(_createdAt asc)`;
  
    const mostPopular = await client.fetch(queryMost);
    return mostPopular;
}

export async function fetchArticle() {
    const query = groq`
    *[_type == 'article']{
      ...,
    } | order(_createdAt desc)`;
  
    const Article = await client.fetch(query);
    return Article;
}