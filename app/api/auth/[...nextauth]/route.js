import { mongooseConnect } from "@/lib/mongoose";
import { AdminUser } from "@/model/adminUser.model";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth", 
  },
  callbacks: {
    async signIn({ user }) { 
      await mongooseConnect();
      const existingUser = await AdminUser.findOne({ email: user.email }); 
      if (!existingUser) { 
        const newuser = await AdminUser.create({ 
          name: user.name, 
          email: user.email,
          image: user.image,
          role: 'admin',  
        }); 
        user.id = newuser._id.toString();
      } else {
        user.id = existingUser._id.toString();
      }
      return true; 
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
        token.name = user?.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id ;
        session.user.email = token.email;
        session.user.role = token.role;
        session.user.name = token?.name;
      }
      return session;
    },
    async redirect({ baseUrl }) {
      return baseUrl;
    },
  },
});

export { handler as GET, handler as POST };