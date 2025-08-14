class Cities
{
    constructor() 
    {
        this.activeCities = [];
        this.addCity(75,925,75,50);
        this.addCity(190,925,75,50);
        this.addCity(305,925,75,50);
        this.addCity(645,925,75,50);
        this.addCity(760,925,75,50);
        this.addCity(875,925,75,50);

    }

    addCity(x, y, height, width)
    {
        this.activeCities.push({x:x, y:y, height:height,width:width,health:100})
    }

    updateCities( deltaTime, activeNukes )
    {
        /*
        for(var z = 0; z < activeNukes.length; z++)
        {
            var o = activeNukes[z];
            if(o.y >= 950)
            {
                
            }
        }
        for(var n = 0; n < this.activeCities.length; n++)
        {

        }
        */
    }

    drawCities(ctx)
    {
        for(var n = 0; n < this.activeCities.length; n++)
        {
            var o = this.activeCities[n];
            ctx.beginPath();
            ctx.rect(o.x, o.y, o.width, o.height);
            ctx.fillStyle = 'gray';
            ctx.fill();
        }
    }
}
