"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="text-blue-900 flex justify-between">
      { session?.user &&
        <>
          <h2>
            Hello, <b>{session?.user.name}</b>
          </h2>
          <div className="flex bg-gray-300 text-black gap-1 rounded-lg overflow-hidden">
            <Image
              src={session?.user?.image || ""}
              width={24}
              height={24}
              alt="avatar"
              className="w-6 h-6"
            />
            <span className=" px-2">{session?.user?.name}</span>
          </div>
        </>
      }
    </div>
  );
}
