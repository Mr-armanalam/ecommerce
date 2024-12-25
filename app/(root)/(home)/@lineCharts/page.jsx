"use client";
import React from "react";
import { ChartContainer } from "@mui/x-charts/ChartContainer";
import {
  LinePlot,
  MarkPlot,
  lineElementClasses,
  markElementClasses,
} from "@mui/x-charts/LineChart";
import { MdOutlineHorizontalRule } from "react-icons/md";

// Example data for daily and weekly orders
const dailyOrders = [10, 10, 20, 50, 40, 30, 80];
const monthlyOrders = [50, 70, 100, 80, 60, 90, 110];
const xLabels = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"];

export default function LineChart() {
  return (
    <div>
      <div className="text-blue-900">
        <div>
          <h2 className="font-bold text-xl ">Today's Payment</h2>
          <span className="flex text-xs ml-0.5 font-semibold justify-between">
            <p className="">{new Date().toLocaleString()}</p>
            <span className="flex gap-2">
              <span className="flex">
                <MdOutlineHorizontalRule
                  color="blue"
                  style={{ marginTop: "auto" }}
                />{" "}
                day
              </span>
              <span className="flex mt-auto text-gray-600">
                <MdOutlineHorizontalRule style={{ marginTop: "auto" }} /> month
              </span>
            </span>
          </span>
        </div>
      </div>
      <div className="h-[320px] flex flex-col justify-evenly relative mt-8 bg-white rounded-xl">
        <hr />
        <hr />
        <hr />
        <hr />
        <hr />
        <hr />
        <hr />
        <div className="absolute">
          <ChartContainer
            width={400}
            height={300}
            series={[{ type: "line", data: dailyOrders }]}
            xAxis={[{ scaleType: "point", data: xLabels }]}
            sx={{
              [`& .${lineElementClasses.root}`]: {
                stroke: "#8884d8",
                strokeWidth: 2,
              },
              [`& .${markElementClasses.root}`]: {
                stroke: "#8884d8",
                scale: "0.6",
                fill: "#fff",
                strokeWidth: 2,
              },
            }}
            disableAxisListener
          >
            <LinePlot />
            <MarkPlot />
          </ChartContainer>
        </div>
        <div className="absolute top-8">
          <ChartContainer
            width={400}
            height={300}
            series={[{ type: "line", data: monthlyOrders }]}
            xAxis={[{ scaleType: "point", data: xLabels }]}
            sx={{
              [`& .${lineElementClasses.root}`]: {
                stroke: "#9ca3af",
                strokeWidth: 2,
              },
              [`& .${markElementClasses.root}`]: {
                stroke: "#9ca3af",
                scale: "0.6",
                fill: "#fff",
                strokeWidth: 2,
              },
            }}
            disableAxisListener
          >
            <LinePlot />
            <MarkPlot />
          </ChartContainer>
        </div>
      </div>
    </div>
  );
}
