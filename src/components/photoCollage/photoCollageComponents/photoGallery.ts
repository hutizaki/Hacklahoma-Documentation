/**
 * Photo Data Configuration
 * 
 * Manages the photo content for each card in the collage.
 * Each photo has a unique image, title, and footer text.
 * Provides functions to create vintage postcard-styled elements.
 * 
 * NOTE: This version uses demo mode with generated numbers instead of images.
 */

import React from 'react';
import { Postcard } from './postcard';

/**
 * Photo data interface
 */
export interface PhotoData {
  /** Path to the image file (optional - can use demo mode) */
  path?: string;
  /** Title text for the photo */
  title: string;
  /** Footer text for the photo */
  footer: string;

  demoNumber?: number; // <---- 🟥🟥🟥🟥🟥 REMOVE THIS WHEN IMAGES ARE ADDED 🟥🟥🟥🟥🟥
}

/**
 * Array of photo data for each card in the collage
 * Using demo mode - no actual images, just numbered placeholders
 */
export const photoImages: PhotoData[] = [
  {
    title: 'Photo #1, Norman, Okla.',
    footer: 'DEMO-001',
  },
  {
    title: 'Photo #2, Norman, Okla.',
    footer: 'DEMO-002',
  },
  {
    title: 'Photo #3, Norman, Okla.',
    footer: 'DEMO-003',
  },
  {
    title: 'Photo #4, Norman, Okla.',
    footer: 'DEMO-004',
  },
  {
    title: 'Photo #5, Norman, Okla.',
    footer: 'DEMO-005',
  },
  {
    title: 'Photo #6, Norman, Okla.',
    footer: 'DEMO-006',
  },
  {
    title: 'Photo #7, Norman, Okla.',
    footer: 'DEMO-007',
  },
  {
    title: 'Photo #8, Norman, Okla.',
    footer: 'DEMO-008',
  },
  {
    title: 'Photo #9, Norman, Okla.',
    footer: 'DEMO-009',
  },
  {
    title: 'Photo #10, Norman, Okla.',
    footer: 'DEMO-010',
  },
  {
    title: 'Photo #11, Norman, Okla.',
    footer: 'DEMO-011',
  },
  {
    title: 'Photo #12, Norman, Okla.',
    footer: 'DEMO-012',
  },
];

/**
 * Get photo data for a specific card by index
 * Always returns demo mode data with numbered placeholders
 * @param index - Card index (0-5+)
 * @returns Photo data for the specified card with demo number
 */
export const getPhotoData = (index: number): PhotoData & { demoNumber?: number } => {
  if (index < 0) {
    throw new Error(`Invalid card index: ${index}. Must be >= 0`);
  }

  // If index is within bounds, return the photo data with demo number
  if (index < photoImages.length) {
    return {
      ...photoImages[index],
      demoNumber: index + 1, // <---- 🟥🟥🟥🟥🟥 REMOVE THIS LINE WHEN IMAGES ARE ADDED 🟥🟥🟥🟥🟥
    };
  }

  // Otherwise, return fallback with demo number
  return {
    title: `Photo #${index + 1}, Norman, Okla.`,
    footer: `DEMO-${String(index + 1).padStart(3, '0')}`,
    demoNumber: index + 1, // <---- 🟥🟥🟥🟥🟥 REMOVE THIS LINE WHEN IMAGES ARE ADDED 🟥🟥🟥🟥🟥
  };
};