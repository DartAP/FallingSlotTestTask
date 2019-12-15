export const GameConstant = {
    //=== VALUES ===//
    game: {
        height: 1000,
        width: 1400,
        posx: -200,
        posy: 20
    },

    symbol: {
        height: 226,
        width: 236
    },

    reels: {
        rows: 5,
        cols: 3
    },

    fallingSpeed: 50,
    fallingDelay: 70,
    dropReelDelay: 200,
    dropReelPos: 1000,
    spinBtnPressedDelay: 200,

    //=== TEXTURES ===//

    symbolTexture: [
        'assets/symbols/symbol_1.png',
        'assets/symbols/symbol_2.png',
        'assets/symbols/symbol_3.png',
        'assets/symbols/symbol_4.png',
        'assets/symbols/symbol_5.png',
        'assets/symbols/symbol_6.png',
        'assets/symbols/symbol_7.png',
        'assets/symbols/symbol_8.png',
    ],
    spinBtnTexture: [
        'assets/ui/btn_spin_disabled.png',
        'assets/ui/btn_spin_hover.png',
        'assets/ui/btn_spin_normal.png',
        'assets/ui/btn_spin_pressed.png'
    ],

    //=== SOUNDS ===//

    landingSounds: [
        'assets/sounds/Reel_Stop_1.mp3',
        'assets/sounds/Reel_Stop_2.mp3',
        'assets/sounds/Reel_Stop_3.mp3',
        'assets/sounds/Reel_Stop_4.mp3',
        'assets/sounds/Reel_Stop_5.mp3'
    ],
    spinSound: 'assets/sounds/Start_Button.mp3',

    //=== EVENTS ===//

    spinBtnEvent: {
        spin: 'SPINBTN_SPIN',
        enable: 'SPINBTN_ENABLE',
        disable: 'SPINBTN_DISABLE'
    },
    reelsEvent: {
        drop: 'DROP_NEW_REELS',
        remove: 'REMOVE_REELS',
        ready: 'REELS_IS_READY',
        clean: 'REELS_IS_CLEAN'
    }
}