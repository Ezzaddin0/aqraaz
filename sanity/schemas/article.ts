import { title } from "process";
import { defineField, defineType } from "sanity";


export default defineType({
    name: "article",
    title: "Article",
    type: "document",
    fields: [
        {
            title: "Title English",
            name: "titleEn",
            type: "string"
        },
        {
            title: "Title Arabic",
            name: "titleAr",
            type: "string"
        },
        {
            title: "Description English",
            name: "descriptionEn",
            type: "string"
        },
        {
            title: "Description Arabic",
            name: "descriptionAr",
            type: "string"
        }
    ],
    preview: {
        select: {
            title: "titleEn"
        }
    }
})