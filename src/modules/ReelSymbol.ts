import * as PIXI from 'pixi.js';
import { GameConstant } from './constants';
import 'howler';
import { EventEmitter } from 'events';

export default class ReelSymbol extends PIXI.DisplayObject {
    
    private size:{
        height: number,
        width: number
    }
    private sound: Howl;    
    private container: PIXI.Container;    
    private colIndex: number;
    private rowIndex: number;
    private ticker: PIXI.Ticker;
    private symbol: PIXI.Sprite;
    private emitter: EventEmitter;
    
    public constructor(ticker: PIXI.Ticker, emitter: EventEmitter, colIndex: number, rowIndex: number) {
        super();
        this.size = GameConstant.symbol;        
        this.container = new PIXI.Container();
        this.colIndex = colIndex;
        this.rowIndex = rowIndex;
        this.ticker = ticker;
        this.emitter = emitter;
        this.init();                    
    }    

    init() {
        this.symbol = new PIXI.Sprite(this.getRandomTexture())        
        this.sound = new Howl({src: this.getRandomSound()});
        this.container.addChild(this.symbol);        
        this.container.x = this.rowIndex * this.size.height;
        this.dropSymbol();
    }    

    private calcGround(): number {
        return (GameConstant.reels.cols - this.colIndex) * this.size.height;
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

    public get symbolContainer(): PIXI.Container {
        return this.container;
    }

    public dropSymbol(): Promise<void> {                        
        return new Promise((landing): void =>{
            this.container.y = (this.colIndex * -3) * this.size.height;
            let groundY = this.calcGround();
            this.symbol.texture = this.getRandomTexture();
            this.container.visible = true;            
            let velocity = GameConstant.fallingSpeed;

            const fall = (delta: number): void =>{
                this.container.y += velocity * delta;                
                
                if (this.container.y >= groundY) {                                        
                    landing();
                    this.container.y = groundY;
                    console.log("👌 LANDED");
                    this.sound.play();

                    if (this.colIndex == GameConstant.reels.cols &&
                        this.rowIndex == GameConstant.reels.rows) {
                        this.emitter.emit(GameConstant.reelsEvent.ready);
                        console.log('👌👌👌 LAST LANDING');
                        
                    }                    
                    this.ticker.remove(fall);
                }
            }            
            
            setTimeout((): void => {
                this.ticker.add(fall);
            },this.calcDelay());            
        });
    };

    public removeSymbol(): Promise<void> {                    
        return new Promise((landing): void =>{
            let velocity = GameConstant.fallingSpeed;            

            const fall = (delta: number): void =>{
                this.container.y += velocity * delta;                
                
                if (this.container.y >= GameConstant.dropReelPos) {                                        
                    landing();
                    console.log("💥 REMOVED");
                    if (this.colIndex == GameConstant.reels.cols &&
                        this.rowIndex == GameConstant.reels.rows) {
                        this.emitter.emit(GameConstant.reelsEvent.clean);
                        console.log('💥💥💥 LAST REMOVED');
                    }
                    // this.container.visible = false;
                    this.ticker.remove(fall);                    
                }
            }            
            
            setTimeout((): void => {
                this.ticker.add(fall);
            },this.calcDelay());                     
        });
    };

}