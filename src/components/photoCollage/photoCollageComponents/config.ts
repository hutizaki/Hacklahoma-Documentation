const configSettings = {
    FRAMED_CARD_BG: '#ffffff',
    SCALE_VALUE: 0.7 as number,
    OFF_SCREEN_DISTANCE: '35vw',
    FLY_DISTANCE: '50vw',
    SHUFFLE_DELAY: 300, // ms - delay before cards fly back in after shuffle
    CARD_SPREAD: 10, // Percentage offset from center for non-center cards (uniform spread for both X and Y)
    CARD_SPREAD_X: null as number | null, // Optional: Custom horizontal spread (overrides CARD_SPREAD when both X and Y are set)
    CARD_SPREAD_Y: null as number | null, // Optional: Custom vertical spread (overrides CARD_SPREAD when both X and Y are set)
}

export default configSettings;