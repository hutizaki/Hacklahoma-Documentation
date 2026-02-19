/**
 * Framer Motion Animation Variants for Photo Collage
 * 
 * This file defines all animation variants used by the photo collage cards.
 * Each variant corresponds to a specific AnimationState and controls how
 * cards appear, transition, and animate during interactions.
 * 
 * Variants are pure functions that return animation configuration objects.
 * They receive position configuration as a parameter to ensure animations
 * are always synchronized with the card's target position.
 * 
 * Design Philosophy:
 * - Variants should be stateless and deterministic
 * - All position-specific values come from PositionConfig
 * - Timing values are consistent across similar animation types
 * - Spring animations provide natural, fluid motion
*/

import type { Variants } from 'motion/react';
import { PositionConfig } from './card';
import configSettings from './config';

/**
 * Custom properties passed to variants for dynamic animation calculations.
 * Extends PositionConfig with additional context needed for specific animations.
 */
interface VariantCustomProps extends PositionConfig {
  /** Animation delay in seconds (used for staggered entrance animations) */
  delay?: number;
}

/**
 * Complete set of animation variants for photo collage cards.
 */
export const photoCollageCardVariants: Variants = {
  idle: (config: VariantCustomProps) => ({
    x: 0,
    y: 0,
  }),

  moveToPosition: (config: VariantCustomProps) => ({
    x: 0,
    y: 0,
    top: config.top,
    left: config.left,
    rotate: config.rotate,
    translateX: '-50%',
    translateY: '-50%',
    opacity: 1,
    scale: configSettings.SCALE_VALUE,
    transition: {
      type: 'spring',
      bounce: 0.2,
      duration: 0.3,
      damping: 20,
      stiffness: 200,
    },
    willChange: 'transform',
  }),

  flyLeft: (config: VariantCustomProps) => ({
    x: [0, `-${configSettings.FLY_DISTANCE}`, 0],
    y: 0,
    top: config.top,
    left: config.left,
    rotate: [0, -25, 0],
    translateX: '-50%',
    translateY: '-50%',
    opacity: 1,
    scale: configSettings.SCALE_VALUE,
    transition: {
      type: 'tween',
      duration: 0.6,
      ease: 'easeInOut',
      times: [0, 0.5, 1],
    },
    willChange: 'transform',
  }),

  flyRight: (config: VariantCustomProps) => ({
    x: [0, configSettings.FLY_DISTANCE, 0],
    y: 0,
    top: config.top,
    left: config.left,
    rotate: [0, 25, 0],
    translateX: '-50%',
    translateY: '-50%',
    opacity: 1,
    scale: configSettings.SCALE_VALUE,
    transition: {
      type: 'tween',
      duration: 0.6,
      ease: 'easeInOut',
      times: [0, 0.5, 1],
    },
    willChange: 'transform',
  }),

  offscreen: (config: VariantCustomProps) => ({
    x: config.flyDirection === 'right' ? '55vw' : '-55vw',
    y: 0,
    top: config.top,
    left: config.left,
    rotate: 0,
    translateX: '-50%',
    translateY: '-50%',
    opacity: 0,
    scale: configSettings.SCALE_VALUE,
  }),

  onscreen: (config: VariantCustomProps) => ({
    x: 0,
    y: 0,
    top: config.top,
    left: config.left,
    rotate: config.rotate,
    translateX: '-50%',
    translateY: '-50%',
    opacity: 1,
    scale: configSettings.SCALE_VALUE,
    transition: {
      type: 'spring',
      bounce: 0.3,
      duration: 0.8,
      delay: config.delay || 0,
      damping: 20,
      stiffness: 300,
    },
  }),
};


