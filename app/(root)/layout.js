"use client";
import Logo from "@/components/Navbar/Logo";
import Nav from "@/components/Navbar/Nav";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";

export default function Pagelayout({ children }) {
  const { data: session } = useSession();
  const [showNav, setShowNav] = useState(false);
  // console.log(session);

  if (!session) {
    return (
      <div className="bg-blue-900 w-screen h-screen flex items-center">
        <div className="text-center w-full">
          <button
            onClick={() => signIn("google")}
            className="bg-white p-2 px-4 rounded-lg"
          >
            Login with Google
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-blue-900 min-h-screen">
      <div className="md:hidden text-white flex items-center p-4">
        <button onClick={()=> setShowNav(true)} className="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
        <div className="flex grow justify-center mr-8">
          <Logo />
        </div>
      </div>
      <div className="flex">
        <Nav show = {showNav} setshow={setShowNav} />
        <div className="bg-white flex-grow mt-2 mb-2 mr-1 rounded-lg p-4">
          {children}
        </div>
      </div>
    </div>
  );
}
