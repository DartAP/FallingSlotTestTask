import * as PIXI from 'pixi.js';
import { GameConstant } from './constants';
import { resolve } from 'dns';

export default class ReelSymbol {//extends PIXI.Container{
    
    private size:{
        height: number,
        width: number
    }
    private sound: Record<string, string>;    
    private container: PIXI.Container;
    private state: string = 'IDLE';
    private colIndex: number;
    private rowIndex: number;
    private ticker: PIXI.Ticker;
    
    public constructor(ticker: PIXI.Ticker, colIndex: number, rowIndex: number) {
        this.size = GameConstant.symbol;
        // this.sound = sound;
        this.container = new PIXI.Container();
        this.colIndex = colIndex;
        this.rowIndex = rowIndex;
        this.ticker = ticker;
        this.init();
        console.log('init reel symbol');      
    }

    init() {
        const symbol = new PIXI.Sprite(this.getRandomTexture())
        this.container.addChild(symbol);
        this.container.y = Math.floor((this.colIndex * -3) * this.size.height);
        this.container.x = this.rowIndex * this.size.height;
        this.dropSymbol(this.calcGround());
    }

    calcGround(): number {
        return Math.trunc((GameConstant.reels.cols - this.colIndex) * this.size.height);
    }

    calcDeley(): number {
        return (this.colIndex * GameConstant.fallingDelay) * (this.rowIndex * 0.4);
    }

    private getRandomTexture(): PIXI.Texture {
        const textureId = Math.floor(Math.random() * GameConstant.symbolTexture.length);
        return PIXI.Texture.from(GameConstant.symbolTexture[textureId]);
    }

    public get symbolContainer(): PIXI.Container {
        return this.container;
    }

    public dropSymbol(groundY: number): Promise<void> {        
        return new Promise((landing): void =>{
            let velocity = GameConstant.fallingSpeed;

            const fall = (delta: number): void =>{
                this.container.y += velocity * delta;                
                
                if (this.container.y >= groundY) {                    
                    landing();
                    this.ticker.remove(fall);
                }
            }            
            
            setTimeout((): void => {
                this.ticker.add(fall);
            },this.calcDeley());            
        });
    };

    public removeSymbol(screenBorder: number)
    {
        return new Promise((landing): void =>{
            let velocity = GameConstant.fallingSpeed;

            const fall = (delta: number): void =>{
                this.container.y += velocity * delta;                
                
                if (this.container.y <= screenBorder) {                    
                    landing();                    
                    this.ticker.remove(fall);
                    this.init();
                }
            }            
            
            setTimeout((): void => {
                this.ticker.add(fall);
            },GameConstant.dropReelDelay);            
        }); 
    };

}