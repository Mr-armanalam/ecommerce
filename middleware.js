import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  console.log(token);
  
  if (!token || !token.id) {
    return NextResponse.redirect(new URL('/auth/signin', req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [ 
    '/',
    '/products/:id*',
    '/categories/:id*',
    '/orders/:id*',
  ],
  // matcher: [ '/((?!auth/signin|_next|static|favicon.ico).*)', ],
};
