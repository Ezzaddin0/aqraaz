import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './sanity/schemas'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash';
// import { pexelsImageAsset } from 'sanity-plugin-asset-source-pexels';
import {I18nFields} from 'sanity-plugin-i18n-fields'
import {openaiImageAsset} from 'sanity-plugin-asset-source-openai'
import { pexelsImageAsset } from 'sanity-plugin-asset-source-pexels';
// import {googleTranslate} from 'sanity-plugin-google-translate'


const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

export default defineConfig({
  basePath: "/en/studio" || "/ar/studio",
  name: 'Aqraaz_studio',
  title: 'aqraaz studio',

  projectId,
  dataset,

  plugins: [deskTool(), 
    visionTool(), 
    unsplashImageAsset(),
    I18nFields({
      ui: {
        type: 'slider',
        position: 'bottom',
        selected: 'border',
      },
      locales: [
        {code: 'en', label: 'En', title: 'English', default: true},
        {code: 'ar', label: 'Ar', title: 'Arabic'},
      ]
    }),
    openaiImageAsset({
      API_KEY:"sk-proj-ScEZudqprBPms9sjwgdXT3BlbkFJgr2ZgeEyc1jvwPJHDNE3"
    }),
    // table(),
    pexelsImageAsset({
      API_KEY: 'YXOqdfbq87Bt2Y0KqdDIw6PzMwt67op3JxtJyjl1yj1cfZGbBurbScj8',
    }),
    // googleTranslate(),
    // pexelsImageAsset({
    //   API_KEY: 'NsaORkLPknUYRkhAjONASqhT7IzTmcmTb5b601tJn9CsAbUahwJpbdwp',
    // }),
    // languageFilter({
    //   supportedLanguages: [
    //     {id: 'en', title: 'English'},
    //     {id: 'ar', title: 'Arabic'},
    //   ],
    //   defaultLanguages: ['en'],
    //   documentTypes: ['page'],
    //   filterField: (enclosingType, member, selectedLanguageIds) =>
    //   !enclosingType.name.startsWith('locale') || selectedLanguageIds.includes(member.name),
    // }),
    // documentInternationalization({
    //   // Required configuration
    //   supportedLanguages: [
    //     {id: 'en', title: 'English'},
    //     {id: 'ar', title: 'Arabic'}
    //   ],
    //   schemaTypes: ['post'],
    // }),
    // internationalizedArray({
    //   languages: [
    //     {id: 'en', title: 'English'},
    //     {id: 'ar', title: 'Arabic'}
    //   ],
    //   defaultLanguages: ['en'],
    //   fieldTypes: ['string'],
    // })
  ],

  schema: {
    types: schemaTypes,
  },
})
