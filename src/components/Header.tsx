// src/components/Header.tsx
"use client";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <motion.header className="w-full p-4 bg-white dark:bg-gray-800 shadow" initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.3 }}>
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold dark:text-white">Task Flow</h1>
      </div>
    </motion.header>
  );
}
