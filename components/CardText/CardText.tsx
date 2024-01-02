import { Locale } from '@/i18n.config'
import { client } from '@/lib/createClient'
import { getDictionary } from '@/lib/dictionary'
import { groq } from 'next-sanity'
import React from 'react'

interface Props {
  lang: Locale
}

const query = groq`
*[_type == 'article']{
  ...,
} | order(_createdAt desc)`

const CardText = async ({lang}:Props) => {
  const { page } = await getDictionary(lang)
  const article = await client.fetch(query);

  return (
    <div className="p-4 mb-3 bg-body-tertiary rounded">
        <p className="h4 fst-italic">{lang === "en" ? article[0]?.titleEn : article[0]?.titleAr}</p>
        <p className="mb-0">{lang === "en" ? article[0]?.descriptionEn : article[0]?.descriptionAr}</p>
    </div>
  )
}

export default CardText