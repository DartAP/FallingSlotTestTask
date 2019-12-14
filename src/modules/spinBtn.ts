import * as PIXI from 'pixi.js';
import App from '../App';
import { GameConstant } from './constants';

enum btnStates {
    onPress = 'pointerdown',
    onHover = 'pointerover',
    onOut = 'pointerout'    
}

export default class SpinBtn {
    
    private sound: Record<string, string>;    
    private container: PIXI.Container;
    private state: string = 'IDLE';    

    disabledTexture = PIXI.Texture.from(GameConstant.spinBtnTexture[0]);
    hoverTexture = PIXI.Texture.from(GameConstant.spinBtnTexture[1]);
    normalTexture = PIXI.Texture.from(GameConstant.spinBtnTexture[2]);
    pressedTexture = PIXI.Texture.from(GameConstant.spinBtnTexture[3]);
    
    isdown: boolean;
    texture: any;
    alpha: number;
    isOver: any;

    private button = new PIXI.Sprite(this.normalTexture);

    constructor() {
        
    }

    init() {        
        this.container.addChild(this.button);
        this.container.y = 10;
        this.container.x = 10;   
        
        
        this.button.addListener(btnStates.onHover, (): void => {
            this.swapTexture(this.hoverTexture);
            this.button.
        });

        this.button.addListener(btnStates.onOut, (): void => {
            this.swapTexture(this.normalTexture);
        });


    }    

    swapTexture(texture: PIXI.Texture) {
        this.button.texture = texture;
    }

}