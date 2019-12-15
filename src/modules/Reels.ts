import * as PIXI from 'pixi.js';
import ReelSymbol from './ReelSymbol';
import { GameConstant } from './constants';
import { EventEmitter } from 'events';

export default class Reels {

    private container: PIXI.Container = new PIXI.Container();    
    private ticker: PIXI.Ticker;
    private emiter: EventEmitter;

    constructor(ticker: PIXI.Ticker, emitter: EventEmitter) {                
        this.ticker = ticker;              
        this.emiter = emitter;  

        this.container.x = GameConstant.game.posx;
        this.container.y = GameConstant.game.posy;        

        this.initReels();        
    }    

    private initReels() {        
        for (let i = 0; i < GameConstant.reels.rows; i++) {
            setTimeout((): void => {                
                for (let j = 0; j < GameConstant.reels.cols; j++) {

                    let symbol = new ReelSymbol(this.ticker, this.emiter, j+1, i+1);
                    this.container.addChild(symbol.symbolContainer);                    

                }
            },GameConstant.dropReelDelay);            
        }                
    }    

    public get reelsContainer(): PIXI.Container {
        return this.container;
    }

}