import { Game } from "./gameClass.js"
export class Ui
{
    #game = new Game()
    constructor()
    {
        if (Ui.instance)
        {
            return Ui.instance    
        }
        Ui.instance = this
        this.assets = [];
        this.loadAsset('missileInd', 'assets/missile.png', 20, 50)
        this.loadAsset('building','assets/building.png', 70,100 )
  
    }

    loadAsset(id, path, width, height)
    {
        var index = this.assets.length;
        var oImg = new Image(width, height);
        oImg.src = path;
        oImg.onload = () => {
            this.assets[index].imageObj = oImg
            this.assets[index].ready = true
        };
        this.assets.push([{id: id, imageObj: oImg, ready: false}]);
    }

    drawHUD(ctx) {
        ctx.font = '20px Arial';
        ctx.fillStyle = 'white';
        ctx.fillText(`Score: ${this.#game.score}`, 0, 60);
        //ctx.fillText(`Time: 100`, 0, 90);
    }

}