import { title } from "process";
import { defineField, defineType } from "sanity";


export default defineType({
    name: "article",
    title: "Article",
    type: "document",
    fields: [
        {
            title: "Title",
            name: "title",
            type: "i18n.string"
        },
        // {
        //     title: "Title Arabic",
        //     name: "titleAr",
        //     type: "string"
        // },
        {
            title: "Description",
            name: "description",
            type: "i18n.text"
        },
        // {
        //     title: "Description Arabic",
        //     name: "descriptionAr",
        //     type: "string"
        // }
    ],
    preview: {
        select: {
            title: "title.en"
        }
    }
})