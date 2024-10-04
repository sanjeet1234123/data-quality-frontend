import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

export default function BasicPie() {
  return (
    <PieChart
      series={[
        {
          data: [
            {
              id: 0,
              value: 32,
              color: "#fb7857",
            },
            { id: 1, value: 25, color: "#f5c679" },
            { id: 2, value: 43, color: "green" },
          ],
          innerRadius: 105,
          outerRadius: 135,
          paddingAngle: 1,
          cornerRadius: 5,
          startAngle: -90,
          endAngle: 90,
          cx: 130,
          cy: 145,
        },
      ]}
      width={400}
      height={250}
    />
  );
}
