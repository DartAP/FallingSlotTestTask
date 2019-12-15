import * as PIXI from 'pixi.js';
import { GameConstant } from './constants';
import { EventEmitter } from 'events';

enum btnState {
    normal = 'IDLE',
    disabled = 'DISABLED'
}

export default class SpinBtn {
    
    private disabledTexture = PIXI.Texture.from(GameConstant.spinBtnTexture[0]);
    private hoverTexture = PIXI.Texture.from(GameConstant.spinBtnTexture[1]);
    private normalTexture = PIXI.Texture.from(GameConstant.spinBtnTexture[2]);
    private pressedTexture = PIXI.Texture.from(GameConstant.spinBtnTexture[3]);

    private sound = new Howl({src: [GameConstant.spinSound]});
    private container = new PIXI.Container();
    private state = 'IDLE';   
    private button = new PIXI.Sprite(this.normalTexture);
    private emitter: EventEmitter;


    constructor(emitter: EventEmitter) {
        this.emitter = emitter;        
        this.container.addChild(this.button);

        this.container.x = 1200;
        this.container.y = 800
        this.button.buttonMode = true;
        this.button.interactive = true;
        
        this.addListeners();
        this.disableBtn();  // Because of initial first spin
    } 

    private addListeners() {
        this.emitter.addListener(GameConstant.spinBtnEvent.enable, () => {this.enableBtn()});
        this.emitter.addListener(GameConstant.spinBtnEvent.disable, () => {this.disableBtn()});
        this.emitter.addListener(GameConstant.reelsEvent.ready, () => {this.enableBtn()})

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
                                
                setTimeout(() => { // To show pressed state
                    this.emitter.emit(GameConstant.spinBtnEvent.spin);                
                    this.emitter.emit(GameConstant.spinBtnEvent.disable) 
                }, GameConstant.spinBtnPressedDelay);                  
            }
        })
    }

    private enableBtn() {
        this.state = btnState.normal;
        this.swapTexture(this.normalTexture);
        console.log('✔ BTN ENABLED');
        
    }

    private disableBtn() {
        this.swapTexture(this.disabledTexture);
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