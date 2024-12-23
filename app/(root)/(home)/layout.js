"use client";
import { useSession } from "next-auth/react";
import React from "react";

const Layout = ({ dnav, orderstatus, lineCharts, trend, recent }) => {
  const { data: session } = useSession();
  return (
    <div>
      {session?.user && (
        <>
          {dnav}
          {orderstatus}
          <div className=" py-5 grid grid-cols-5 gap-4">
            <div className=" col-span-3 h-fit flex flex-col gap-4">
              <div className="dashboard-statusbox ">{trend}</div>
              <div className="dashboard-statusbox">{recent}</div>
            </div>
            <div className="dashboard-statusbox h-fit col-span-2">{lineCharts}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default Layout;
