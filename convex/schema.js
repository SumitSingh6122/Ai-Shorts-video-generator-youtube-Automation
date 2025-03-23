import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    user:defineTable({
        name:v.string(),
        email:v.string(),
        pictureUrl:v.string(),
        credits:v.number()
    }),
    videoData:defineTable({
        title:v.string(),
        topic:v.string(),
        script:v.string(),
        videoStyle:v.string(),
        caption_name:v.string(),
        caption_Style:v.string(),
        Voice:v.string(),
        image:v.optional(v.any()),
        captionJson:v.optional(v.any()),
        audioURL:v.optional(v.any()),
        uid:v.id('user'),
        createdBy:v.string(),
        status:v.optional(v.string())
    })
})
