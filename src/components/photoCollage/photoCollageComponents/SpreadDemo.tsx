/**
 * Spread Demo Component
 * 
 * Interactive demo showing how CARD_SPREAD affects card positioning
 * Supports both uniform (all-around) and custom (separate X/Y) spread modes
 */

import React, { useState } from 'react';
import * as motion from 'motion/react-client';
import { CardPosition, POSITION_CONFIGS, CardId } from './Card';
import configSettings from './Config';
import { Postcard } from './Postcard';
import { getPhotoData } from './PhotoGallery';

// Helper function to calculate position percentages with spread values
const getPositionPercentages = (
  position: CardPosition,
  uniformSpread: number,
  customSpreadX: number | null,
  customSpreadY: number | null
) => {
  const baseConfig = POSITION_CONFIGS[position];
  
  if (position === CardPosition.CENTER || position === CardPosition.CENTER_BACK) {
    return { top: 50, left: 50, rotate: baseConfig.rotate };
  }
  
  // Determine which spread values to use
  let spreadX: number;
  let spreadY: number;
  
  if (customSpreadX !== null && customSpreadY !== null) {
    spreadX = customSpreadX;
    spreadY = customSpreadY;
  } else if (customSpreadX !== null) {
    spreadX = uniformSpread + customSpreadX;
    spreadY = uniformSpread;
  } else if (customSpreadY !== null) {
    spreadX = uniformSpread;
    spreadY = uniformSpread + customSpreadY;
  } else {
    spreadX = uniformSpread;
    spreadY = uniformSpread;
  }
  
  // Calculate position percentages
  let top: number;
  let left: number;
  
  if (position === CardPosition.TOP_LEFT) {
    top = 50 - spreadY;
    left = 50 - spreadX;
  } else if (position === CardPosition.TOP_RIGHT) {
    top = 50 - spreadY;
    left = 50 + spreadX;
  } else if (position === CardPosition.BOTTOM_LEFT) {
    top = 50 + spreadY;
    left = 50 - spreadX;
  } else {
    top = 50 + spreadY;
    left = 50 + spreadX;
  }
  
  return { top, left, rotate: baseConfig.rotate };
};

interface InputProps {
  children: string;
  value: number;
  set: (newValue: number) => void;
  min?: number;
  max?: number;
  accentColor?: string;
}

function Input({ value, children, set, min = 0, max = 20, accentColor = '#9333ea' }: InputProps) {
  return (
    <label className="spread-input-label">
      <code className="spread-input-code">{children}</code>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        onChange={(e) => set(parseFloat(e.target.value))}
        className="spread-range-input"
        style={{ accentColor }}
      />
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        onChange={(e) => set(parseFloat(e.target.value) || 0)}
        className="spread-number-input"
        style={{ borderColor: accentColor, color: accentColor }}
      />
    </label>
  );
}

export const SpreadDemo: React.FC = () => {
  const [isUniformMode, setIsUniformMode] = useState(true);
  const [uniformSpread, setUniformSpread] = useState(configSettings.CARD_SPREAD);
  const [customSpreadX, setCustomSpreadX] = useState<number | null>(configSettings.CARD_SPREAD_X ?? 0);
  const [customSpreadY, setCustomSpreadY] = useState<number | null>(configSettings.CARD_SPREAD_Y ?? 0);

  // Create demo cards with positions
  const demoCards = [
    { id: CardId.CARD_A, position: CardPosition.CENTER, zIndex: 5, photoIndex: 0 },
    { id: CardId.CARD_B, position: CardPosition.TOP_LEFT, zIndex: 4, photoIndex: 1 },
    { id: CardId.CARD_C, position: CardPosition.TOP_RIGHT, zIndex: 3, photoIndex: 2 },
    { id: CardId.CARD_D, position: CardPosition.BOTTOM_LEFT, zIndex: 2, photoIndex: 3 },
    { id: CardId.CARD_E, position: CardPosition.BOTTOM_RIGHT, zIndex: 1, photoIndex: 4 },
  ];

  // Calculate effective spreads for display
  const effectiveSpreadX = customSpreadX !== null && customSpreadY !== null
    ? customSpreadX
    : customSpreadX !== null
    ? uniformSpread + customSpreadX
    : uniformSpread;
  
  const effectiveSpreadY = customSpreadX !== null && customSpreadY !== null
    ? customSpreadY
    : customSpreadY !== null
    ? uniformSpread + customSpreadY
    : uniformSpread;

  return (
    <div className="w-full" id="spread-demo">
      {/* Photo collage container - matching PhotoCollage styling */}
      <div className="photo-collage-parent-container relative w-full z-10 flex items-center justify-center mb-8">
        <div className="photo-collage-container relative w-1/2 flex-shrink-0 h-[16rem] md:h-[24rem] lg:h-[24rem] xl:h-[24rem] overflow-visible">
          {/* Render demo cards with Framer Motion animate */}
          {demoCards.map((card) => {
            const position = getPositionPercentages(
              card.position,
              uniformSpread,
              isUniformMode ? null : customSpreadX,
              isUniformMode ? null : customSpreadY
            );
            const photoData = getPhotoData(card.photoIndex);

            return (
              <motion.div
                key={card.id}
                className={`${card.id} absolute w-[10rem] md:w-[20rem] lg:w-[28rem] drop-shadow-lg select-none pointer-events-none`}
                animate={{
                  top: `${position.top}%`,
                  left: `${position.left}%`,
                  rotate: position.rotate,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{
                  x: '-50%',
                  y: '-50%',
                  scale: configSettings.SCALE_VALUE,
                  zIndex: card.zIndex,
                }}
              >
                <Postcard
                  imageUrl={photoData.path}
                  title={photoData.title}
                  footer={photoData.footer}
                  demoNumber={photoData.demoNumber}
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Controls Section */}
      <div className="w-full flex gap-8">
        {/* Toggle Switch - Left Side */}
        <div className="flex-shrink-0">
          <div className="mb-2">
            <label className="text-sm font-semibold text-gray-700 block mb-3">Spread Mode</label>
            <motion.button
              type="button"
              onClick={() => setIsUniformMode(!isUniformMode)}
              className="toggle-container"
              style={{
                width: 100,
                height: 50,
                backgroundColor: isUniformMode ? '#2563eb' : '#d1d5db',
                borderRadius: 50,
                cursor: 'pointer',
                display: 'flex',
                padding: 10,
                justifyContent: isUniformMode ? 'flex-start' : 'flex-end',
                border: 'none',
                outline: 'none',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              role="switch"
              aria-checked={isUniformMode}
            >
              <motion.div
                className="toggle-handle"
                style={{
                  width: 30,
                  height: 30,
                  backgroundColor: '#ffffff',
                  borderRadius: '50%',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                }}
                layout
                transition={{
                  type: "spring",
                  visualDuration: 0.2,
                  bounce: 0.2,
                }}
              />
            </motion.button>
          </div>
          <motion.div
            className="text-xs font-medium"
            initial={false}
            animate={{
              color: isUniformMode ? '#2563eb' : '#9333ea',
            }}
            transition={{ duration: 0.2 }}
          >
            {isUniformMode ? (
              <span className="text-blue-600">Uniform</span>
            ) : (
              <span className="text-purple-600">Custom</span>
            )}
          </motion.div>
          <motion.p
            className="text-xs text-gray-500 mt-1 max-w-[140px] leading-relaxed"
            initial={false}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {isUniformMode
              ? 'Same value for both axes'
              : 'Separate X and Y control'}
          </motion.p>
        </div>

        {/* Inputs Section */}
        <div className="flex-1">
          {isUniformMode ? (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="spread-inputs"
            >
              <Input
                value={uniformSpread}
                set={setUniformSpread}
                min={5}
                max={20}
                accentColor="#2563eb"
              >
                Uniform
              </Input>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="spread-inputs"
            >
              <Input
                value={customSpreadX ?? 0}
                set={setCustomSpreadX}
                min={0}
                max={20}
                accentColor="#9333ea"
              >
                X
              </Input>
              <Input
                value={customSpreadY ?? 0}
                set={setCustomSpreadY}
                min={0}
                max={20}
                accentColor="#9333ea"
              >
                Y
              </Input>
            </motion.div>
          )}
        </div>
      </div>

      <StyleSheet />
    </div>
  );
};

function StyleSheet() {
  return (
    <style>{`
      #spread-demo .spread-inputs {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      #spread-demo .spread-input-label {
        display: flex;
        align-items: center;
        margin: 0;
      }

      #spread-demo .spread-input-code {
        width: 100px;
        font-family: "Azeret Mono", monospace;
        font-size: 14px;
        font-weight: 600;
        color: #374151;
      }

      #spread-demo .spread-range-input {
        flex: 1;
        margin: 0 10px;
        accent-color: #9333ea;
        font-family: "Azeret Mono", monospace;
      }

      #spread-demo .spread-number-input {
        width: 80px;
        border: 0;
        border-bottom: 1px dotted #9333ea;
        color: #9333ea;
        font-family: "Azeret Mono", monospace;
        font-size: 14px;
        padding: 4px 0;
        background: transparent;
      }

      #spread-demo .spread-number-input:focus {
        outline: none;
        border-bottom: 2px solid #9333ea;
      }

      #spread-demo .spread-number-input::-webkit-inner-spin-button {
        -webkit-appearance: none;
      }

      #spread-demo input[type='range']::-webkit-slider-runnable-track {
        height: 10px;
        -webkit-appearance: none;
        background: #0b1011;
        border: 1px solid #1d2628;
        border-radius: 10px;
        margin-top: -1px;
      }

      #spread-demo input[type='range']::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: 20px;
        width: 20px;
        border-radius: 50%;
        background: #9333ea;
        top: -4px;
        position: relative;
        cursor: pointer;
      }

      #spread-demo input[type='range']::-moz-range-track {
        height: 10px;
        background: #0b1011;
        border: 1px solid #1d2628;
        border-radius: 10px;
      }

      #spread-demo input[type='range']::-moz-range-thumb {
        height: 20px;
        width: 20px;
        border-radius: 50%;
        background: #9333ea;
        border: none;
        cursor: pointer;
      }
    `}</style>
  );
}
