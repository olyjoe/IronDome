import { Rect2d } from "./geometryClass.js";

export class Cities
{
    constructor() 
    {
        if (Cities.instace)
        {
            return Cities.instance    
        }
        Cities.instance = this
        this.activeCities = [];
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
        
        for(var z = 0; z < activeNukes.length; z++)
        {
            var o = activeNukes[z];
            if(o.radius > 5)
            {
                console.log('boom')
            }
        }
        
    }

    drawCities(ctx)
    {
        for(var n = 0; n < this.activeCities.length; n++)
        {
            var o = this.activeCities[n];
            ctx.beginPath();
            ctx.rect(o.rect.x, o.rect.y, o.rect.height, o.rect.width);
            ctx.fillStyle = o.getStrokeStyle();
            ctx.fill();
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
    }

     getStrokeStyle()
    {
       return 'rgba(' + this.rgba.r + ',' + this.rgba.g + ',' + this.rgba.b + ',' + this.rgba.a + ')'
    }

}