import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

export default function MonitorTable({ label1, label2 }) {
  return (
    <PieChart
      series={[
        {
          data: [
            {
              id: 0,
              value: 15,
              color: "#464646",
              label: label1,
            },
            { id: 1, value: 85, color: "#ff8567", label: label2 },
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
