import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const CreateNewUser = mutation({
    args: {
        name: v.string(),
        email: v.string(),
        pictureUrl: v.string(),
    },
    handler: async (ctx, args) => {


        const userr = await ctx.db.query("user").filter((q) => q.eq(q.field("email"), args.email)).collect();
        if (!userr[0]?.email) {

            const userId=await ctx.db.insert("user", {
                name: args.name,
                email: args.email,
                pictureUrl: args?.pictureUrl,
                credits: 3,
                isActive:true,
                role:'user',
                
            });
            return {
                _id: userId,
                name: args.name,
                email: args.email,
                pictureUrl: args.pictureUrl,
                credits: 3,
                isActive:true,
                role:'user',
            };
        }
        return userr[0];

    },
});



export const updateCredits = mutation({
  args: {
    userId: v.string(),
    credits: v.number()
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.userId, {
      credits: args.credits
    });
  }
});
export const listAll = query(async ({ db }) => {
  return await db.query("user").collect();
});

