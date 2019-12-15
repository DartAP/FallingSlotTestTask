import * as PIXI from 'pixi.js';
import ReelSymbol from './ReelSymbol';
import { GameConstant } from './constants';
import { EventEmitter } from 'events';
import App from '../App';

enum SymbolState{
    IDLE = 'IDLE',
    FALLING = 'FALLING',
    READY = 'READY'    
}

export default class Reels {

    private container: PIXI.Container = new PIXI.Container;
    private reels: ReelSymbol[] = new Array<ReelSymbol>();
    private ticker: PIXI.Ticker;
    private reelState = 'IDLE';
    private emiter: EventEmitter;

    constructor(ticker: PIXI.Ticker, emitter: EventEmitter) {        
        this.container = new PIXI.Container;
        this.ticker = ticker;              
        this.emiter = emitter;  
        this.container.y = 100;
        this.container.scale.set(0.5, 0.5);        

        this.addListeners();
        this.initSpin();
        console.log('init reels');
    }

    private addListeners() {
        this.emiter.on(GameConstant.spinBtnEvent.spin, () => {this.removeReels()});//{this.initSpin()});        
        this.emiter.on(GameConstant.reelsEvent.ready, () => {this.reelState = SymbolState.READY});
        this.emiter.on(GameConstant.reelsEvent.clean, () => {this.dropReels()});
        
    }

    private initSpin() {        
        for (let i = 0; i < GameConstant.reels.rows; i++) {
            setTimeout((): void => {                
                for (let j = 0; j < GameConstant.reels.cols; j++) {

                    let symbol = new ReelSymbol(this.ticker, this.emiter, j+1, i+1);
                    this.container.addChild(symbol.symbolContainer);
                    this.reels.push(symbol);
                }
            },200);            
        }        
        console.log('INIT SPIN'); 
        console.log('Reels[].length: ' + this.reels.length);
        console.log('Reels container childs: ' + this.container.children.length);
        
    }

    public removeReels() {
        console.log('💩 DAMN: ' + this.reels.length);
        
        this.reels.forEach(item => {
            item.removeSymbol(GameConstant.dropReelPos);
        });
    }

    public dropReels() {
        // this.reelState = SymbolState.FALLING
        this.container.y = 100;
        this.reels.forEach(item => {
            item.dropSymbol();
        });
    }

    public get reelsContainer(): PIXI.Container {
        return this.container;
    }

}