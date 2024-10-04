import React from "react";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const RuleOccurenceGraph = () => {
  const data = {
    labels: ["Consistency", "Validity", "Accuracy"],
    datasets: [
      {
        axis: "y",
        label: "Total no. of tickets",
        data: [1, 3, 2],
        backgroundColor: ["#2043DF", "#FB7857", "#F5DC5D"],
        barThickness: 20,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          callback: function (value) {
            if (value % 1 === 0) {
              return value;
            }
          },
          stepSize: 1,
          max: 4,
        },
      },
    },
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default RuleOccurenceGraph;
