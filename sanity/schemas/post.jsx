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
    {
      title: "Title",
      name: "title",
      type: "i18n.string",
    },
    {
      title: "Description",
      name: "description",
      type: "i18n.text"
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
          ]
        }
      ]
    },
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Active", value: "active" },
          { title: "Inactive", value: "inactive" }
        ],
        layout: "radio"
      },
      initialValue: "active"
    })
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