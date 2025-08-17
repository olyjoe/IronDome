import { Rect2d } from "./geometryClass.js"
import { Ui } from "./ui.js"
import { Game } from "./gameClass.js"
export class Cities
{
    #game = new Game()
    #ui = new Ui()

    constructor() 
    {
        if (Cities.instance)
        {
            return Cities.instance    
        }
        Cities.instance = this
        this.activeCities = []
        this.frameWidth = 256
        this.frameCount = 4
        this.frameTop = 281
        this.frameHeight = 450
        this.cityHeight = 175
        this.cityWidth = 50

        this.restart()
       

    }

    restart()
    {
        this.activeCities = []
        this.addCity(75)
        this.addCity(190)
        this.addCity(305)
        this.addCity(645)
        this.addCity(760)
        this.addCity(875)
    }

    addCity(x)
    {
        var rect = new Rect2d(
                //x
                x,
                //y
                this.#game.canvasHeight - this.cityHeight, 
                // draw width       
                this.cityWidth, 
                // draw height
                this.cityHeight
        )
        
        this.activeCities.push(new City(rect, 100))
    }

    updateCities( deltaTime, activeNukes )
    {
        if(this.#game.isRestarting)
        {
            this.restart()
        }
        if(this.activeCities.reduce((sum, item) => sum + item.health, 0) === 0)
            this.#game.gameOver = true

        for(var z = 0; z < activeNukes.length; z++)
        {
            var o = activeNukes[z]
            if(o.radius > 5)
            {
                for(var n = 0; n < this.activeCities.length; n++)
                {
                    var c = this.activeCities[n]
                    
                    if(c.hitBy.indexOf(o.id) === -1)
                    {
                        var hit = Rect2d.doesCircleHitRect(
                            o, c.rect
                        )
                        if (hit === true)
                        {
                            c.hitBy.push(o.id)
                            c.health -= o.damage
                            if (c.health <= 0)
                            {
                                //TODO
                                //remove city from array
                                c.health = 0
                            }
                        }
                    }
                }
            }
        }
        
    }

    drawCities(ctx)
    {
        if(this.#ui.assets[1].ready != true)
            return;

        for(var n = 0; n < this.activeCities.length; n++)
        {
            var o = this.activeCities[n]

            ctx.drawImage(
                //maybe make a spriteSheet class?
                //image sprite sheet asset
                this.#ui.assets[1].imageObj,
                //sprite source x - use .25 city damage to determine which frame
                parseInt((100 - o.health)/25) * this.frameWidth, 
                //sprite source y
                this.frameTop,  
                //sprite source width
                this.frameWidth, 
                //sprite source height
                this.frameHeight, 
                // city x
                o.rect.x,
                // city y
                o.rect.y, 
                // city width       
                o.rect.width, 
                // city height
                o.rect.height        
            )
        }
    }
}

class City
{
    constructor(rect, health)
    {
        this.rect = rect
        this.health = health
        this.rgba = {r:200, g:200, b:200, a:1}
        this.hitBy = [];
    }

     getStrokeStyle()
    {
       return 'rgba(' + this.rgba.r + ',' + this.rgba.g + ',' + this.rgba.b + ',' + this.rgba.a + ')'
    }

}


function draw(ctx, x, y) {
  ctx.drawImage(
    spriteSheet,
    currentFrame * frameWidth, 0, // source x, y
    frameWidth, frameHeight,      // source width, height
    x, y,                         // destination x, y
    frameWidth, frameHeight       // destination width, height
  )
}