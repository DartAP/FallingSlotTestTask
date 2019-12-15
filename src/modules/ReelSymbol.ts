import * as PIXI from 'pixi.js';
import { GameConstant } from './constants';
import 'howler';
import { EventEmitter } from 'events';

export default class ReelSymbol {
    
    private sound = new Howl({src: this.getRandomSound()}); 
    private container = new PIXI.Container();   
    private colIndex: number;
    private rowIndex: number;
    private ticker: PIXI.Ticker;
    private symbol = new PIXI.Sprite(this.getRandomTexture());
    private emitter: EventEmitter;
    
    public constructor(ticker: PIXI.Ticker, emitter: EventEmitter, colIndex: number, rowIndex: number) {                       
        this.colIndex = colIndex;
        this.rowIndex = rowIndex;
        this.ticker = ticker;
        this.emitter = emitter;

        this.container.addChild(this.symbol);        
        this.container.x = this.rowIndex * GameConstant.symbol.height;

        this.addListeners();        
        this.dropSymbol(); // For initial spin
        
    }    

    private addListeners() {
        this.emitter.on(GameConstant.spinBtnEvent.spin, () => {this.removeSymbol()});
        this.emitter.on(GameConstant.reelsEvent.clean, () => {this.dropSymbol()});
    }

    private calcGround(): number {
        return (GameConstant.reels.cols - this.colIndex) * GameConstant.symbol.height;
    }

    private calcDelay(): number {
        return (this.colIndex * GameConstant.fallingDelay) * (this.rowIndex * 0.4);
    }

    private getRandomTexture(): PIXI.Texture {
        const textureId = Math.floor(Math.random() * GameConstant.symbolTexture.length);
        return PIXI.Texture.from(GameConstant.symbolTexture[textureId]);
    }

    private getRandomSound(): string {
        const soundId = Math.floor(Math.random() * GameConstant.landingSounds.length);
        return GameConstant.landingSounds[soundId];
    }    

    public dropSymbol() {                        
        this.container.y = (this.colIndex * -GameConstant.reels.rows) * GameConstant.symbol.height;
        let groundY = this.calcGround();
        this.symbol.texture = this.getRandomTexture();
        this.container.visible = true;            

        const fall = (deltaTime: number): void =>{
            this.container.y += GameConstant.fallingSpeed * deltaTime;                
            
            if (this.container.y >= groundY) {                                                            
                this.container.y = groundY;
                console.log("👌 LANDED");
                this.sound.play();

                if (this.lastElement()) {
                    this.emitter.emit(GameConstant.reelsEvent.ready);
                    console.log('👌👌👌 LAST LANDING');
                    
                }                    
                this.ticker.remove(fall);
            }
        }            
        
        setTimeout((): void => { this.ticker.add(fall) },this.calcDelay()); 
    };

    public removeSymbol() {                    
        const fall = (deltaTime: number): void =>{
            this.container.y += GameConstant.fallingSpeed * deltaTime;                
            
            if (this.container.y >= GameConstant.dropReelPos) {                
                console.log("💥 REMOVED");
                if (this.lastElement()) {
                    this.emitter.emit(GameConstant.reelsEvent.clean);
                    console.log('💥💥💥 LAST REMOVED');
                }                
                this.ticker.remove(fall);                    
            }
        }            
        
        setTimeout((): void => { this.ticker.add(fall) },this.calcDelay()); 
    };

    private lastElement(): boolean {
        return this.colIndex == GameConstant.reels.cols &&
               this.rowIndex == GameConstant.reels.rows
    }

    public get symbolContainer(): PIXI.Container {
        return this.container;
    }

}