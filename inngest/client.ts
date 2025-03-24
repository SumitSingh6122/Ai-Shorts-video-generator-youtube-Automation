import { Inngest } from "inngest";

export const inngest = new Inngest({ id: "my-app" });

inngest.setEventKey(process.env.INNGEST_EVENT_KEY || '');
