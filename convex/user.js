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
            const UserData={
                name: args.name,
                email: args.email,
                pictureUrl: args?.pictureUrl,
                credits: 3,
            }
             await ctx.db.insert("user", {UserData});
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
