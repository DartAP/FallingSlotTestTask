import * as PIXI from 'pixi.js';
import App from '../App';
import { GameConstant } from './constants';
import { EventEmitter } from 'events';
import { emit } from 'cluster';

enum btnState {
    normal = 'IDLE',
    pressed = 'PRESSED',
    hover = 'HOVER',
    disabled = 'DISABLED'
}

export default class SpinBtn {
    
    private sound: Howl;    
    private container: PIXI.Container;
    private state: string = 'IDLE';   
    private button: PIXI.Sprite; 
    private emitter: EventEmitter;

    disabledTexture = PIXI.Texture.from(GameConstant.spinBtnTexture[0]);
    hoverTexture = PIXI.Texture.from(GameConstant.spinBtnTexture[1]);
    normalTexture = PIXI.Texture.from(GameConstant.spinBtnTexture[2]);
    pressedTexture = PIXI.Texture.from(GameConstant.spinBtnTexture[3]);
    
    isdown: boolean;
    texture: any;
    alpha: number;
    isOver: any;

     

    constructor(emitter: EventEmitter) {
        this.button = new PIXI.Sprite(this.normalTexture);
        this.sound = new Howl({src: [GameConstant.spinSound]});
        this.emitter = emitter;
        this.container = new PIXI.Container();
        this.container.addChild(this.button);
        this.init();
        this.addListeners();
    }

    init() {        
        this.container.addChild(this.button);
        this.container.y = 10;
        this.container.x = 10;   
        this.container.scale.set(0.5, 0.5);
        this.button.buttonMode = true;
        this.button.interactive = true;
        
        
        this.button.on('pointerover', (): void => {
            if (this.state != btnState.disabled)
            {
                this.swapTexture(this.hoverTexture);            
            }            
        });

        this.button.on('pointerout', (): void => {
            if (this.state != btnState.disabled)
            {
                this.swapTexture(this.normalTexture);            
            }   
        });

        this.button.on('pointerdown', ():void =>{            
            if (this.state == btnState.normal) {      
                this.swapTexture(this.pressedTexture);          
                this.sound.play();
                
                // this.emitter.emit(GameConstant.reelsEvent.remove);      
                this.emitter.emit(GameConstant.spinBtnEvent.spin);                
                this.emitter.emit(GameConstant.spinBtnEvent.disable)

                setTimeout(() => {
                    
                }, GameConstant.spinBtnPressedDelay);
                
            }
        })        

    }    




    private addListeners() {
        this.emitter.addListener(GameConstant.spinBtnEvent.enable, () => {this.enableBtn()});
        this.emitter.addListener(GameConstant.spinBtnEvent.disable, () => {this.disableBtn()});
        this.emitter.addListener(GameConstant.reelsEvent.ready, () => {this.enableBtn()})
    }

    private enableBtn() {
        this.state = btnState.normal;
        this.swapTexture(this.normalTexture);
        console.log('✔ BTN ENABLED');
        
    }

    private disableBtn() {
        this.swapTexture(this.pressedTexture);
        this.state = btnState.disabled;
        console.log('❌ BTN DISABLED');
    }

    private swapTexture(texture: PIXI.Texture) {
        this.button.texture = texture;
    }

    public get getContainer(): PIXI.Container {
        return this.container;
    }

}