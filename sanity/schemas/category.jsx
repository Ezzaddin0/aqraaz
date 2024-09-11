import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'i18n.string',
    }),
    // defineField({
    //   name: 'titleAr',
    //   title: 'Title Arabic',
    //   type: 'string',
    // }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    }),
    {
      title: 'Keywords',
      name: 'keywords',
      type: 'object',
      fields: [
        {
          title: "English",
          name: "en",
          type: "array",
          of: [{type: 'string'}],
          options: {
            layout: 'tags'
          }
        },
        {
          title: "Arabic",
          name: "ar",
          type: "array",
          of: [{type: 'string'}],
          options: {
            layout: 'tags'
          }
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
    }),
    defineField({
      name: "posts",
      title: "Posts",
      type: "array",
      of: [{ type: "reference", to: { type: "post" } }],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'i18n.text',
    }),
    // defineField({
    //   name: 'descriptionAr',
    //   title: 'Description Arabic',
    //   type: 'text',
    // }),
  ],

  preview: {
    select: {
      title: "title.en",
      description: "description.en",
      // media: "mainImage",
    },
    prepare(selection) {
      const { description } = selection;
      return { ...selection, subtitle: description };
    },
  },
})
