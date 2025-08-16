import { Game } from "./gameClass.js"
export class Ui
{
    #game = new Game()
    constructor()
    {
        if (Ui.instace)
        {
            return Ui.instance    
        }
        Ui.instance = this
        this.assets = [];
        this.testImage = new Image();
        this.testImage.src = 'assets/missile.png'
        this.loadAsset('missileInd', 'assets/missile.png', 20, 50)
   
    }

    loadAsset(id, path, width, height)
    {
        var oImg = new Image(width, height);
        oImg.src = path;
        oImg.onload = () => {
            for(var n = 0; n < this.assets.length; n++)
            {
                if(this.assets[n].id = id)
                {
                    this.assets[n].ready = true;
                    this.assets[n].imageObj = oImg;
                }
            }
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