import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

export default function TestResults() {
  return (
    <PieChart
      series={[
        {
          data: [
            { id: 0, value: 15, color: "#525ff7" },
            { id: 1, value: 45, color: "#44ac49" },
            { id: 2, value: 40, color: "#ffce54" },
          ],
          innerRadius: 60,
          outerRadius: 110,
          paddingAngle: 1,
          cornerRadius: 5,
          startAngle: -90,
          endAngle: 270,
          cx: 130,
          cy: 130,
        },
      ]}
      width={400}
      height={250}
    />
  );
}
