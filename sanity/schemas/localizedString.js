const languages = [
  {id: 'en', title: 'English', isDefault: true},
  {id: 'ar', title: 'Arabic'},
]

export default defineField({
  name: 'localizedString',
  type: 'object',
  options: {
    // This will replace the default input component
    translate: true,
    // This API key will be bundled with your studio
    // and so should be restricted by hostname
    // See: https://www.sanity.io/docs/studio-environment-variables
    apiKey: process.env.SANITY_STUDIO_GOOGLE_TRANSLATE_API_KEY,
  },
  fieldsets: [
    {
      title: 'Translations',
      name: 'translations',
      options: {collapsible: true, collapsed: false},
    },
  ],
  fields: languages.map((lang) => ({
    name: lang.id,
    title: lang.title,
    type: 'string', // or `text`, etc
    fieldset: lang.isDefault ? null : 'translations',
  })),
})