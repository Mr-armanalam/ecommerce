import { mongooseConnect } from "@/lib/mongoose";
import { AdminUser } from "@/model/adminUser.model";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin", 
  },
  callbacks: {
    async signIn({ user }) { 
      await mongooseConnect();
      const existingUser = await AdminUser.findOne({ email: user.email }); 
      console.log(existingUser);
      
      if (!existingUser) { 
        const newuser = await AdminUser.create({ 
          name: user.name, 
          email: user.email,
          image: user.image,
          role: 'admin',  
          totalRevenue: 0,
        }); 
        user.id = newuser._id.toString();
      } else {
        user.id = existingUser._id.toString();
        user.totalRevenue = existingUser.totalRevenue.toString();
      }
      return true; 
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
        token.name = user?.name;
        token.totalRevenue = user?.totalRevenue;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id ;
        session.user.email = token.email;
        session.user.role = token.role;
        session.user.name = token?.name;
        session.user.totalRevenue= token?.totalRevenue;
      }
      return session;
    },
    async redirect({ baseUrl }) {
      return baseUrl;
    },
  },
}


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };