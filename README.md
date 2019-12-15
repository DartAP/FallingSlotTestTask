# Slot Game Test Task

### Layout
Slot consists of 5 columns of symbols and a spin button (should have 4 states: normal, hover,
pressed, disabled) with label “Spin”. Falling symbols should be cut by a mask on top and
bottom.

### Flow
- Spin button click initiates symbols fall from the top of the screen, spin button disables,
sound Start_Button.mp3 plays;
- Symbols fall from the top of the screen row by row with a small delay in landing (in a row
and between rows);
- When a symbol lands sound Reel_Stop_{n}.mp3 should play, where n changes from 1
to 5 randomly each fall;
- When all symbols landed start button enables;
- Spin button click initiates a new fall, previously displayed symbols on the screen should
fall down and disappear and everything starts with p.1 in a loop.
Flow described above should resemble one seen on video_example.mp4 .

### Tech Stack
* [Typescript](http://www.typescriptlang.org/) (use OOP please);
* [pixi.js](https://github.com/pixijs/pixi.js/) for rendering ;
* [Howler](https://github.com/goldfire/howler.js)
 
See [DEMO](https://dartap.github.io/SkywindSlotExample/)