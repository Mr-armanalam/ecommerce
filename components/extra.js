import client from "@/lib/db";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth, { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { ObjectId } from "mongodb";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    }),
  ],
  adapter: MongoDBAdapter(client),

  pages: { signIn: "auth/signin" },
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    session: async ({ session, token, user }) => {
      console.log(token ,'token');

      session.user.id = user.id;
      await client.connect();
      const db = client.db();

      const usersCollection = db.collection("users");
      const dbUser = await usersCollection.findOne({
        _id: new ObjectId(user.id),
      });

      if (dbUser && dbUser.email === session.user.email) {
        return session;
      } else {
        return false;
      }
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
