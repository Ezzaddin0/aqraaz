import { Locale } from '@/i18n.config'
import { client } from '@/lib/createClient'
import { getDictionary } from '@/lib/dictionary'
import { groq } from 'next-sanity'
import React from 'react'

interface Props {
  lang: Locale,
  title: any,
  description: any,
}

const query = groq`
*[_type == 'article']{
  ...,
} | order(_createdAt desc)`

const CardText = async ({lang, title, description}:Props) => {
  const { page } = await getDictionary(lang)
  const article = await client.fetch(query);

  return (
    <div className="p-4 mb-3 bg-body-tertiary rounded">
        <p className="h4 fst-italic">{title}</p>
        <p className="mb-0">{description}</p>
    </div>
  )
}

export default CardText