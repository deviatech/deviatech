"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function RevealSection({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
}
