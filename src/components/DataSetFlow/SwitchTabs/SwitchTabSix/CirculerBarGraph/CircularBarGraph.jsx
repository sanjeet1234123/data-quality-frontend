import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

export default function CirculerBarGraph({ value1, color1, color2 }) {
  return (
    <PieChart
      series={[
        {
          data: [
            { id: 0, value: value1, color: color1 },
            { id: 1, value: 38, color: color2 },
          ],
          innerRadius: 60,
          outerRadius: 110,
          paddingAngle: 1,
          cornerRadius: 5,
          startAngle: 230,
          endAngle: -130,
          cx: 130,
          cy: 130,
        },
      ]}
      width={400}
      height={250}
    />
  );
}
