import * as PIXI from 'pixi.js';
import Reels from './modules/Reels';
import { GameConstant } from './modules/constants';
import ReelSymbol from './modules/ReelSymbol';

export default class App{    

    private symbolsAssetsCount = 8;
    app: PIXI.Application;

    static start(){        
        
        const app = new PIXI.Application({
            width: 800,
            height: 600,
            antialias: true,
            transparent: false,
            resolution: 1
        });
        document.body.appendChild(app.view);
        this.initAssets();

        const ticker = new PIXI.Ticker();
        ticker.start();
        const mainScene = new PIXI.Container;
        
        const reels = new Reels(ticker);
        reels.init();
        mainScene.addChild(reels.reelsContainer);        
        
        app.stage.addChild(mainScene);

        
    };

    static initAssets() {
        PIXI.Loader.shared.add([GameConstant.symbolTexture]).load();
    }
    
}