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

        //TODO - no longer drawing a rectangle for a city
        // needs cleanup unless I need the rectangle for collision detection

        this.addCity(75,925,75,50)
        this.addCity(190,925,75,50)
        this.addCity(305,925,75,50)
        this.addCity(645,925,75,50)
        this.addCity(760,925,75,50)
        this.addCity(875,925,75,50)

    }

    addCity(x, y, h, w)
    {
        var rect = new Rect2d(x, y, h, w)
        this.activeCities.push(new City(rect, 100))
    }

    updateCities( deltaTime, activeNukes )
    {
        //TODO..collision detection
        //only subtract nuke.damage per collision
        //direct hit vs splash dmg?
        for(var z = 0; z < activeNukes.length; z++)
        {
            var o = activeNukes[z]
            if(o.radius > 5)
            {
 
                this.activeCities[0].health -= .05
                console.log('boom')
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
                // draw on canvas at x
                o.rect.x,
                // draw on cavas at y
                this.#game.canvasHeight - this.cityHeight, 
                // draw width       
                this.cityWidth, 
                // draw height
                this.cityHeight        
            )
        }
        
        /*
        for(var n = 0; n < this.activeCities.length; n++)
        {
            var o = this.activeCities[n];
            ctx.beginPath();
            ctx.rect(o.rect.x, o.rect.y, o.rect.height, o.rect.width);
            ctx.fillStyle = o.getStrokeStyle();
            ctx.fill();
        }
            */
    }

}

class City
{
    constructor(rect, health)
    {
        this.rect = rect
        this.health = health
        this.rgba = {r:200, g:200, b:200, a:1}
    }

     getStrokeStyle()
    {
       return 'rgba(' + this.rgba.r + ',' + this.rgba.g + ',' + this.rgba.b + ',' + this.rgba.a + ')'
    }

}
/*
const spriteSheet = new Image();
spriteSheet.src = 'https://example.com/sprite-sheet.png';

const frameWidth = 64; // adjust to your frame size
const frameHeight = 64;
const totalFrames = 6;
let currentFrame = 0;
let frameTimer = 0;
const frameDuration = 100; // milliseconds per frame

function update(deltaTime) {
  frameTimer += deltaTime;
  if (frameTimer >= frameDuration) {
    currentFrame = (currentFrame + 1) % totalFrames;
    frameTimer = 0;
  }
}

function draw(ctx, x, y) {
  ctx.drawImage(
    spriteSheet,
    currentFrame * frameWidth, 0, // source x, y
    frameWidth, frameHeight,      // source width, height
    x, y,                         // destination x, y
    frameWidth, frameHeight       // destination width, height
  );
}
  */