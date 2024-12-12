// src/components/NavBar.tsx
"use client";
import { motion } from "framer-motion";
import { HomeIcon, SettingsIcon, BarChartIcon, ListIcon } from "lucide-react";

export default function NavBar() {
  return (
    <motion.nav className="w-full bg-gray-800 px-4 py-3 shadow" initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1, duration: 0.3 }}>
      <div className="max-w-6xl mx-auto flex flex-wrap items-center gap-4">
        <div className="text-xl font-bold text-white whitespace-nowrap">Task Flow</div>
        <div className="flex-1 flex flex-wrap items-center gap-6">
          <NavItem icon={<HomeIcon className="w-5 h-5" />} label="Home" />
          <NavItem icon={<ListIcon className="w-5 h-5" />} label="Tasks" />
          <NavItem icon={<BarChartIcon className="w-5 h-5" />} label="Analytics" />
          <NavItem icon={<SettingsIcon className="w-5 h-5" />} label="Settings" />
        </div>
      </div>
    </motion.nav>
  );
}

function NavItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="flex items-center space-x-1 text-gray-300 hover:text-blue-400 transition-colors focus:outline-none text-sm sm:text-base">
      {icon}
      <span className="font-medium">{label}</span>
    </button>
  );
}
