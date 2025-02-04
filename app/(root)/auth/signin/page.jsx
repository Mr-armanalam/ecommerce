// 'use client'
// import { signIn, useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import React from "react";

//  export default function CustomAuth () {
//   const router = useRouter();
//   const { data: session } = useSession();

//     if (session?.user) {
//       return router.push('/');
//     }
//       return (
//       <div className=" w-full h-screen rounded-md flex items-center">
//         <div className="bg-blue-900 text-center h-20 flex items-center justify-center w-full">
//           <button
//             onClick={() => signIn("google",{callbackUrl: '/'})}
//             className="bg-white p-2 px-4 rounded-lg"
//           >
//             Login with Google
//           </button>
//         </div>
//       </div>
//     );
//   }

"use client";
import React, { useState } from "react";
import { Spotlight } from "@/components/ui/spotlight-new";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const CustomAuth = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [ isSignedClick, setIsSignedClick ] = useState(false);

  if (session?.user) {
    return router.push("/");
  }

  const handleSignIn = () => {
    setIsSignedClick(true);
    signIn("google", { callbackUrl: "/" })
  }

  return (
    <div className="h-screen w-full flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight />
      <div className=" p-4 max-w-7xl flex flex-col mx-auto relative z-10  w-full pt-20 md:pt-0">
        <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
          QuirkCart <br />{" "}
          <span className="text-6xl">Sale Each and Everything</span>
        </h1>
        <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
          Your one-stop destination for sale the latest and exclusive product.
          Elevate your saling experience.
        </p>
        <button
          className="text-neutral-200 active:bg-neutral-200 font-bold active:text-black rounded-lg border px-8 self-center mt-12 py-2 bg-transparent"
          onClick={handleSignIn}
          disabled= {isSignedClick}
        >
          Login With Google
        </button>
      </div>
    </div>
  );
};

export default CustomAuth;
