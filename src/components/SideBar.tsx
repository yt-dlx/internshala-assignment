// src/components/SideBar.tsx
"use client";
import { motion } from "framer-motion";
import { BarChartIcon, CheckCircleIcon, ListIcon } from "lucide-react";

export default function SideBar() {
  return (
    <motion.aside
      className="hidden md:flex md:flex-col w-64 bg-gray-800 border-r border-gray-700 p-4 space-y-4"
      initial={{ x: -60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center space-x-2 text-gray-200 font-semibold">
        <ListIcon className="w-5 h-5" />
        <span>Task Boards</span>
      </div>
      <div className="flex items-center space-x-2 text-gray-300 hover:text-blue-500 cursor-pointer transition-colors text-sm sm:text-base">
        <CheckCircleIcon className="w-5 h-5" />
        <span>My Tasks</span>
      </div>
      <div className="flex items-center space-x-2 text-gray-300 hover:text-blue-500 cursor-pointer transition-colors text-sm sm:text-base">
        <BarChartIcon className="w-5 h-5" />
        <span>Analytics</span>
      </div>
    </motion.aside>
  );
}
