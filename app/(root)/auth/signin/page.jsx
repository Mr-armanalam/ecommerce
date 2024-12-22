'use client'
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";


 export default function CustomAuth () {
  const router = useRouter();
  const { data: session } = useSession();
  
    if (session?.user) {
      return router.push('/');
    }
      return (
      <div className="bg-blue-900 w-full h-[10rem] rounded-md flex items-center">
        <div className="text-center w-full">
          <button
            onClick={() => signIn("google",{callbackUrl: '/'})}
            className="bg-white p-2 px-4 rounded-lg"
          >
            Login with Google
          </button>
        </div>
      </div>
    );
  }