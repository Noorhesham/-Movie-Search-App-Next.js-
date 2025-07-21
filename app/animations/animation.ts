import { Transition, Variants } from "framer-motion";

    export const transition: Transition = {
    duration: 0.5,
    ease: [0.43, 0.13, 0.23, 0.96],
  };
  
  export const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };
  
  export const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      transition,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition,
    },
  };
  