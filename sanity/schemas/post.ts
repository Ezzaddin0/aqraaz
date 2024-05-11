import { defineField, defineType } from "sanity";
import {ConditionalProperty, NumberOptions, StringOptions} from 'sanity'

export default defineType({
  name: "post",
  title: "Post",
  type: "document",
  options: {
    // show language filter for this document type, regardless of how documentTypes for the plugin is configured
    languageFilter: true,
  },
  fields: [
    // defineField({
    //   type: 'i18n.string',
    //   // ...
    //   options: {
    //     ui?: {
    //       type?: 'slider',
    //       position?: 'top',
    //       selected?: 'background'
    //     },
    //     locales?: [
    //         {
    //           code: 'en', // the code of the locale. MUST be the same as the one used in the global configuration.
    //           // readOnly?: true,
    //           // hidden?: ConditionalProperty,
    //           options?: StringOptions | { rows?:number } | NumberOptions,
    //           // visibleFor?: string[], // same as global configuration
    //           // editableFor?: string[], // same as global configuration
    //         },
    //         // other locales
    //       ]
    //   }
    // }),
    {
      title: "Title",
      name: "title",
      // type: "object",
      type: "i18n.string",
      // fields: [
      //   {
      //     title: "English",
      //     name: "en",
      //     type: "string"
      //   },
      //   {
      //     title: "Arabic",
      //     name: "ar",
      //     type: "string"
      //   }
      // ]
    },
    {
      title: "Description",
      name: "description",
      // type: "object",
      type: "i18n.text"
      // fields: [
      //   {
      //     title: "English",
      //     name: "en",
      //     type: "text"
      //   },
      //   {
      //     title: "Arabic",
      //     name: "ar",
      //     type: "text"
      //   }
      // ]
    },
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title.en",
        maxLength: 96,
      },
    }),
    // {
    //   // Include the table as a field
    //   // Giving it a semantic title
    //   name: 'sizeChart',
    //   title: 'Size Chart',
    //   type: 'table',
    // },
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: { type: "author" },
    }),
    defineField({
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
    }),
    {
      title: 'Keywords',
      name: 'keywords',
      type: 'array',
      of: [
        {
          type: "object",
          fields: [
            {
              title: "Words",
              name: "words",
              type: "array",
              of: [{type: 'string'}],
              options: {
                layout: 'tags'
              }
            },
            // {
            //   title: "Arabic",
            //   name: "ar",
            //   type: "array",
            //   of: [{type: 'string'}],
            //   options: {
            //     layout: 'tags'
            //   }
            // }
          ]
        }
      ]
    },
    {
      title: "Body",
      name: "body",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              title: "body",
              name: "body",
              type: "blockContent"
            },
            // {
            //   title: "Arabic",
            //   name: "ar",
            //   type: "blockContent"
            // }
          ]
        }
      ]
    }    
  ],

  preview: {
    select: {
      title: "title.en",
      author: "author.name",
      media: "mainImage",
    },
    prepare(selection) {
      const { author } = selection;
      return { ...selection, subtitle: author && `by ${author}` };
    },
  },
});