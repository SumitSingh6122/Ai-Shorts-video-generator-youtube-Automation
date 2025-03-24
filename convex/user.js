import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const CreateNewUser = mutation({
    args: {
        name: v.string(),
        email: v.string(),
        pictureUrl: v.string(),
    },
    handler: async (ctx, args) => {


        const userr = await ctx.db.query("user").filter((q) => q.eq(q.field("email"), args.email)).collect();
        if (!userr[0]?.email) {

            await ctx.db.insert("user", {
                name: args.name,
                email: args.email,
                pictureUrl: args?.pictureUrl,
                credits: 3,
            });
            return {
                _id: userId,
                name: args.name,
                email: args.email,
                pictureUrl: args.pictureUrl,
                credits: 3
            };
        }
        return userr[0];

    },
});
