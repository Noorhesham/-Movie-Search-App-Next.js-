"use client";
import React from "react";
import { motion, Variants, TargetAndTransition, VariantLabels } from "framer-motion";

interface MotionItemProps {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  initial?: boolean | TargetAndTransition | VariantLabels;
  animate?: TargetAndTransition | VariantLabels | boolean;
  exit?: TargetAndTransition | VariantLabels;
  whileInView?: TargetAndTransition | VariantLabels;
  nohover?: boolean;
  transition?: any;
  onMouseEnter?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLDivElement>) => void;
  style?: React.CSSProperties;
  whileHover?: TargetAndTransition | VariantLabels;
}

const MotionItem = ({
  children,
  className,
  variants,
  initial,
  animate,
  exit,
  whileInView,
  nohover = true,
  transition,
  onMouseEnter,
  onMouseLeave,
  style,
  whileHover,
}: MotionItemProps) => {
  return (
    <motion.div
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      whileHover={nohover ? {} : whileHover}
      initial={initial}
      animate={animate}
      exit={exit}
      transition={transition}
      className={className}
      whileInView={whileInView}
      variants={animate ? undefined : variants}
    >
      {children}
    </motion.div>
  );
};

export default MotionItem;
