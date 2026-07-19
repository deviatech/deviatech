"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4 }}
      className={`rounded-sm border border-line-grid bg-surface p-6 transition-[transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:shadow-md md:p-8 ${className}`}
    >
      {children}
    </motion.div>
  );
}
