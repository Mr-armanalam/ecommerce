"use client";
import LineChart from "@/components/client/LineCharts";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="text-blue-900 ">
      { session?.user &&
        <>
          <div className="flex justify-between">
            <h2>
              Hello, <b>{session?.user.name}</b>
            </h2>
            <div className="flex bg-gray-300 text-black gap-1 rounded-lg overflow-hidden">
              <Image
                src={session?.user?.image || ""}
                width={32}
                height={32}
                alt="avatar"
                className="w-8 h-8"
              />
              <span className="pt-1 text-gray-800 font-semibold px-2">{session?.user?.name}</span>
            </div>
          </div>

          <LineChart />
        </>
      }
    </div>
  );
}
