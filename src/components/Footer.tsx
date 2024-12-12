// src/components/Footer.tsx
"use client";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer className="w-full p-4 bg-gray-800 shadow mt-8" initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.3 }}>
      <div className="max-w-6xl mx-auto text-center text-sm text-gray-300">© {new Date().getFullYear()} Task Flow</div>
    </motion.footer>
  );
}
