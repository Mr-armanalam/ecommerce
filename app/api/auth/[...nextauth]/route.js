import client from "@/lib/db";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";

const adminEmails = ['armanalam78578@gmail.com'];
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  adapter: MongoDBAdapter(client),
  callbacks: {
    session: ({session, token, user}) => {
      // console.log({session, token, user});
      if (adminEmails.includes(session?.user?.email)){
        return session;
      }else {
        return false;
      }
    }
  }
})

export { handler as GET, handler as POST }
