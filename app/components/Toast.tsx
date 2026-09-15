"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export function Toast({ message }: { message: string | null }) {
  return <AnimatePresence>{message && <motion.div className="restaurant-toast" role="status" initial={{ opacity: 0, y: 24, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 18, scale: 0.95 }}><CheckCircle2 />{message}</motion.div>}</AnimatePresence>;
}
