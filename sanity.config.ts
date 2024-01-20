import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './sanity/schemas'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash';
// import { pexelsImageAsset } from 'sanity-plugin-asset-source-pexels';



const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

export default defineConfig({
  basePath: "/en/studio" || "/ar/studio",
  name: 'Aqraaz_studio',
  title: 'aqraaz studio',

  projectId,
  dataset,

  plugins: [deskTool(), 
    visionTool(), 
    unsplashImageAsset(),
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
