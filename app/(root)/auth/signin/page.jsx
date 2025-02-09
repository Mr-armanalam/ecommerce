"use client";
import React, { useState } from "react";
import { Spotlight } from "@/components/ui/spotlight-new";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logoImage from '@/components/icon/images/Group 2.svg'

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
      <div className="top-6 border rounded-full pt-1 pl-0.5 pr-4 justify-center box-border left-4 flex items-center gap-x-2 absolute text-white">
        <Image src={logoImage} className="animate-bounce" height={40} width={40} alt="logo" />
        <span className="font-bold pb-1 text-xl">Welcome</span>
      </div>
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
      <div className="flex absolute right-4 bottom-2 items-center justify-center px-4 text-sm text-neutral-300">
        &copy; 2023 QuirkCart. All rights reserved.
      </div>
    </div>
  );
};

export default CustomAuth;
