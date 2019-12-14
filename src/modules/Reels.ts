import * as PIXI from 'pixi.js';
import ReelSymbol from './ReelSymbol';
import { GameConstant } from './constants';

enum SymbolState{
    IDLE = 'IDLE',
    FALLING = 'FALLING'    
}

export default class Reels {

    private container: PIXI.Container = new PIXI.Container;
    private reels: PIXI.Container[] = [];
    private ticker: PIXI.Ticker;
    private reelState = 'IDLE';

    constructor(ticker: PIXI.Ticker) {        
        this.container = new PIXI.Container;
        this.ticker = ticker;        
        console.log('init reels');
    }

    public init(){

        for (let i = 0; i < GameConstant.reels.rows; i++) {
            setTimeout((): void => {                
                for (let j = 0; j < GameConstant.reels.cols; j++) {

                    let symbol = new ReelSymbol(this.ticker, j+1, i+1).symbolContainer;
                    this.container.addChild(symbol);
                    this.reels.push(symbol);
                }
            },200);            
        }
        
        this.container.y = 100;            
        this.container.scale.set(0.5, 0.5);
    }

    public dropReels() {
        for (let i = 0; i < this.reels.length; i++) {
                        
        }
    }

    public get reelsContainer(): PIXI.Container {
        return this.container;
    }

}