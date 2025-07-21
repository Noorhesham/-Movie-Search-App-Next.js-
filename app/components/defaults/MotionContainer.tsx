"use client";
/**
 * MotionContainer Component
 *
 * A wrapper component that adds staggered animation effects to its children.
 * It uses Framer Motion to create a container that reveals its children one by one
 * with a customizable stagger effect.
 *
 * Features:
 * - Staggered animations for child elements
 * - Customizable easing and duration
 * - Support for custom variants and effects
 * - Automatic delay calculation based on number of children
 *
 * @example
 * <MotionContainer>
 *   <MotionItem>Item 1</MotionItem>
 *   <MotionItem>Item 2</MotionItem>
 * </MotionContainer>
 */

import { motion, Variants, Easing, EasingDefinition } from "framer-motion";
import React, { ReactNode, Children, cloneElement, ReactElement } from "react";

interface ChildMotionProps {
  variants?: Variants;
  children?: ReactNode;
  className?: string;
}

interface CustomStaggerEffect {
  hidden?: {
    opacity?: number;
    y?: number;
    scale?: number;
    [key: string]: any;
  };
  visible?: {
    opacity?: number;
    y?: number;
    scale?: number;
    [key: string]: any;
    transition?: {
      delay?: number;
      duration?: number;
      ease?: EasingDefinition;
    };
  };
}

interface MotionContainerProps {
  children: ReactNode;
  className?: string;
  variantsCustom?: Variants;
  easing?: EasingDefinition;
  customstaggerEffect?: CustomStaggerEffect;
}

const MotionContainer = ({
  children,
  className,
  variantsCustom,
  easing = "easeOut",
  customstaggerEffect,
}: MotionContainerProps) => {
  const childrenArray = Children.toArray(children) as ReactElement<ChildMotionProps>[];
  const totalItems = childrenArray.length;

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
    },
  };

  // Calculate delay for each child element
  const maxDelay = 1;
  const delayStep = maxDelay / totalItems;

  const visible = customstaggerEffect?.visible;

  const staggerEffect = (index: number): Variants => {
    return customstaggerEffect
      ? {
          hidden: customstaggerEffect.hidden || { opacity: 0, y: 10 },
          visible: {
            ...visible,
            transition: {
              delay: Math.max(index * delayStep, 0),
              duration: 0.3,
              ease: easing,
            },
          },
        }
      : {
          hidden: { opacity: 0, y: 10 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              delay: Math.max(index * delayStep, 0),
              duration: 0.3,
              ease: easing,
            },
          },
        };
  };

  return (
    <motion.div
      className={className}
      variants={container || variantsCustom}
      initial="hidden"
      viewport={{ once: true, amount: 0.3 }}
      animate="visible"
    >
      {childrenArray.map((child, index) =>
        cloneElement(child, {
          variants: staggerEffect(index),
          key: child.key || index,
        } as Partial<ChildMotionProps>)
      )}
    </motion.div>
  );
};

export default MotionContainer;
