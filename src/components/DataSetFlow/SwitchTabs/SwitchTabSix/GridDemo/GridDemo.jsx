import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

const dataset = [
  { seoul: 21, month: "Jan" },
  { seoul: 21, month: "fab" },
  { seoul: 21, month: "march" },
];

const chartSetting = {
  xAxis: [
    {
      label: "rainfall (mm)",
    },
  ],
  width: 500,
  height: 400,
};

const valueFormatter = (value) => `${value}mm`;

export default function GridDemo() {
  return (
    <BarChart
      dataset={dataset}
      yAxis={[{ scaleType: "band", dataKey: "month" }]}
      series={[{ dataKey: "seoul", label: "Seoul rainfall", valueFormatter }]}
      layout="horizontal"
      grid={{ vertical: true }}
      {...chartSetting}
    />
  );
}
