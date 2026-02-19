/**
 * Navigation Button Component
 *
 * Shared component for left and right navigation arrows.
 * Handles entrance animation, interactive hover/tap states, and shuffle logic.
 */

import React, { MutableRefObject } from 'react';
import * as motion from 'motion/react-client';
import { Card, CardId, CardAnimationMap } from './card';
import { executeForwardShuffle, executeBackwardShuffle } from './cardShuffleLogic';
import configSettings from './config';

/**
 * Simple SVG arrow component (inline to avoid external asset dependencies)
 */
const ArrowSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
  </svg>
);

type Direction = 'left' | 'right';

interface ShuffleButtonProps {
  /** Direction of the button */
  direction: Direction;
  /** Whether the entrance animation has completed */
  hasCompletedEntrance: boolean;
  /** Whether the button's entrance animation has completed */
  animationComplete: boolean;
  /** Callback when button animation completes */
  onAnimationComplete: () => void;
  /** Current cards state */
  cards: Card[];
  /** Whether buttons are disabled (for click throttling) */
  buttonsDisabled: boolean;
  /** Callback to set cards state */
  setCards: (cards: Card[]) => void;
  /** Callback to set animation states */
  setAnimationStates: (states: CardAnimationMap) => void;
  /** Callback to set buttons disabled state */
  setButtonsDisabled: (disabled: boolean) => void;
  /** Ref to track if animation is in progress (synchronous check) */
  isAnimatingRef: MutableRefObject<boolean>;
  /** Callback to swap center back card's photo before shuffle (left only) */
  swapPhotoBackShuffle?: (cards: Card[]) => Card[];
  /** Callback to swap a card's photo after flying animation (right only) */
  swapPhotoOnCardID?: (cardId: CardId, cards: Card[]) => Card[];
}

const DIRECTION_CONFIG = {
  left: {
    className: 'left-arrow mr-16',
    ariaLabel: 'Previous photo',
    rotate: 90,
    initialX: '30vw',
    animateX: 0,
  },
  right: {
    className: 'right-arrow ml-16',
    ariaLabel: 'Next photo',
    rotate: -90,
    initialX: '-30vw',
    animateX: 0,
  },
} as const;

/**
 * Shuffle button for photo collage
 */
export const ShuffleButton: React.FC<ShuffleButtonProps> = ({
  direction,
  hasCompletedEntrance,
  animationComplete,
  onAnimationComplete,
  cards,
  buttonsDisabled,
  setCards,
  setAnimationStates,
  setButtonsDisabled,
  isAnimatingRef,
  swapPhotoBackShuffle,
  swapPhotoOnCardID,
}) => {
  const config = DIRECTION_CONFIG[direction];

  /**
   * Handle shuffle (left or right arrow click)
   */
  const handleShuffle = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    // Synchronous check using ref (prevents race conditions)
    if (isAnimatingRef.current || buttonsDisabled) return;

    // Set ref immediately (synchronous) - this blocks all subsequent clicks
    isAnimatingRef.current = true;

    // Execute direction-specific logic
    if (direction === 'left') {
      // Left button: backward shuffle
      const delay = configSettings.SHUFFLE_DELAY;
      setButtonsDisabled(true);
      setTimeout(() => {
        setButtonsDisabled(false);
        isAnimatingRef.current = false;
      }, delay);

      // Swap photo BEFORE shuffle logic executes
      const cardsWithUpdatedPhoto = swapPhotoBackShuffle ? swapPhotoBackShuffle(cards) : cards;
      const shuffleResult = executeBackwardShuffle(cardsWithUpdatedPhoto);

      setCards(shuffleResult.cardsWithOldZIndex);
      setAnimationStates(shuffleResult.animationStates);
      setTimeout(() => setCards(shuffleResult.cardsWithNewZIndex), delay / 2);
    } else {
      // Right button: forward shuffle
      const delay = configSettings.SHUFFLE_DELAY + 100;
      setButtonsDisabled(true);
      setTimeout(() => {
        setButtonsDisabled(false);
        isAnimatingRef.current = false;
      }, delay);

      const shuffleResult = executeForwardShuffle(cards);

      setCards(shuffleResult.cardsWithOldZIndex);
      setAnimationStates(shuffleResult.animationStates);
      setTimeout(() => setCards(shuffleResult.cardsWithNewZIndex), configSettings.SHUFFLE_DELAY);
      setTimeout(() => {
        if (swapPhotoOnCardID) {
          const updatedCards = swapPhotoOnCardID(shuffleResult.flyingCardId, shuffleResult.cardsWithNewZIndex);
          setCards(updatedCards);
        }
      }, delay);
    }
  };

  return (
    <motion.button
      className={`${config.className} relative opacity-20 cursor-pointer bg-transparent border-none p-0 flex items-center justify-center select-none`}
      style={{ zIndex: animationComplete ? 10 : 0 }}
      aria-label={config.ariaLabel}
      onClick={handleShuffle}
      initial={{
        x: config.initialX,
        opacity: 0,
        scale: 0.5,
      }}
      animate={hasCompletedEntrance ? {
        x: config.animateX,
        opacity: 0.40,
        scale: 1,
      } : {
        x: config.initialX,
        opacity: 0,
        scale: 0.5,
      }}
      transition={{
        x: { type: 'spring', stiffness: 100, damping: 25, duration: 0.8 },
        opacity: { duration: 0.6 },
        scale: { type: 'spring', stiffness: 100, damping: 25 },
        delay: hasCompletedEntrance ? 0.2 : 0,
      }}
      onAnimationComplete={() => {
        if (hasCompletedEntrance && !animationComplete) {
          onAnimationComplete();
        }
      }}
      whileHover={{
        opacity: 0.8,
        scale: 1.15,
        transition: {
          type: 'spring',
          stiffness: 300,
          damping: 20,
        }
      }}
      whileTap={{
        scale: 1.05,
        transition: {
          type: 'spring',
          stiffness: 300,
          damping: 20,
        }
      }}
    >
      <motion.div
        className="w-16 h-16 md:w-20 md:h-20 pointer-events-none flex items-center justify-center"
        initial={{ rotate: config.rotate }}
        animate={{ rotate: config.rotate }}
      >
        <ArrowSvg className="w-full h-full text-[var(--ifm-color-emphasis-1000)]" />
      </motion.div>
    </motion.button>
  );
};
