"use client";
import CountUp from "react-countup";

export default function StatCard({ value, label }) {
    return (
        <div className="text-center p-4">
            <h2 className="text-3xl font-bold text-purple-400">
                <CountUp end={value} duration={2} />
            </h2>
            <p className="text-gray-400 text-sm">{label}</p>
        </div>
    );
}