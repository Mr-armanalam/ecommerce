import client from "@/lib/db";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth, { getServerSession } from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { NextResponse } from "next/server";


const adminEmails = ['armanalam78578@gmail.com'];
export const authOptions = {
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
}

const handler = NextAuth(authOptions);

export async function isAdminRequest(){
  const session = await getServerSession(authOptions);
  if (!adminEmails.includes(session?.user?.email)){
    throw {message: 'not an admin'};
  }
}

export { handler as GET, handler as POST }
