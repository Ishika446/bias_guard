"use client";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PALETTE = [
  "#8b5cf6",
  "#ec4899",
  "#3b82f6",
  "#22d3ee",
  "#facc15",
  "#4ade80",
  "#f97316",
  "#e879f9",
];

export default function Charts({ bias }) {
  if (!bias?.country_distribution) {
    return (
      <p style={{ color: "rgba(255,255,255,0.30)", fontSize: "0.875rem" }}>
        No distribution data available.
      </p>
    );
  }

  const labels = Object.keys(bias.country_distribution);
  const values = Object.values(bias.country_distribution);

  const chartData = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: PALETTE.slice(0, labels.length).map((c) => `${c}cc`),
        borderColor: PALETTE.slice(0, labels.length),
        borderWidth: 2,
        hoverOffset: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "rgba(255,255,255,0.55)",
          font: { size: 12, family: "'Inter', sans-serif" },
          padding: 16,
          usePointStyle: true,
          pointStyleWidth: 8,
        },
      },
      tooltip: {
        backgroundColor: "rgba(10,8,25,0.92)",
        borderColor: "rgba(139,92,246,0.35)",
        borderWidth: 1,
        titleColor: "#e2e8f0",
        bodyColor: "rgba(255,255,255,0.60)",
        padding: 12,
        cornerRadius: 10,
        callbacks: {
          label: (ctx) => {
            const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
            const pct = ((ctx.parsed / total) * 100).toFixed(1);
            return ` ${ctx.label}: ${ctx.parsed} patents (${pct}%)`;
          },
        },
      },
    },
  };

  return (
    <div style={{ maxWidth: 320, margin: "0 auto" }}>
      <Pie data={chartData} options={options} />
    </div>
  );
}