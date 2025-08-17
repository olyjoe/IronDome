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
        this.assets = []
        this.loadAsset('missileInd', 'assets/missile.png', 20, 50)
        this.loadAsset('building','assets/building.png', 70,100 )

        this.menuItems = [
            { text: 'Restart', x: 50, y: 50, width: 100, height: 40 },
            { text: 'About', x: 50, y: 110, width: 100, height: 40 },
            { text: 'Contact', x: 50, y: 170, width: 100, height: 40 }
        ];
  
    }

    loadAsset(id, path, width, height)
    {
        var index = this.assets.length
        var oImg = new Image(width, height)
        oImg.src = path
        oImg.onload = () => {
            this.assets[index].imageObj = oImg
            this.assets[index].ready = true
        };
        this.assets.push([{id: id, imageObj: oImg, ready: false}])
    }

    drawHUD(ctx) {
        ctx.font = '20px Arial'
        ctx.fillStyle = 'white'
        ctx.fillText(`Score: ${this.#game.score}`, 0, 60)
    }

    drawMenu(ctx)
    {
        this.menuItems.forEach(item => {
            ctx.fillStyle = '#007BFF';
            ctx.fillRect(item.x, item.y, item.width, item.height);
            ctx.fillStyle = '#FFFFFF';
            ctx.font = '16px Arial';
            ctx.fillText(item.text, item.x + 10, item.y + 25);
        });
        let canvas = document.getElementById("gameview")
        canvas.addEventListener('click', (event) => {
            const rect = canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;

            this.menuItems.forEach(item => {
                if (
                mouseX >= item.x &&
                mouseX <= item.x + item.width &&
                mouseY >= item.y &&
                mouseY <= item.y + item.height
                ) {
                    if(item.text === 'Restart')
                    {
                        this.#game.restart()
                        this.#game.isRestarting = true
                    }
                }
        });
    });
}

 

    drawGameOver(ctx)
    {
        ctx.font = '50px Arial'
        ctx.fillStyle = 'white'
        ctx.fillText(`Game Over! score: ${this.#game.score}`, 
            parseInt(this.#game.canvasWidth / 4), 
            parseInt(this.#game.canvasHeight / 2)
        )
    }

}