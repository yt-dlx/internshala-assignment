// src/components/Graphs.tsx
"use client";
import { Bar } from "react-chartjs-2";
import { motion } from "framer-motion";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type GraphsProps = {
  data: { status: string; count: number }[];
};

export default function Graphs({ data }: GraphsProps) {
  const chartData = {
    labels: data.map((d) => d.status),
    datasets: [
      {
        label: "Number of Tasks",
        data: data.map((d) => d.count),
        backgroundColor: ["#3b82f6", "#fbbf24", "#10b981"]
      }
    ]
  };

  return (
    <motion.div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow mt-8 w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <h3 className="text-lg sm:text-xl font-semibold mb-4 text-white">Task Distribution</h3>
      <div className="w-full overflow-auto">
        <div className="min-w-[300px]">
          <Bar data={chartData} />
        </div>
      </div>
    </motion.div>
  );
}
