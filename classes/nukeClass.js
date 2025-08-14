class Nukes
{
    constructor()
    {
        this.activeNukes = [];
        this.counter = 0;
        this.duration = 9;

        var randomX = util.getRandomValue(1,999);

        this.activeNukes.push(new Nuke(++this.counter, randomX,1, this.duration, 1));
        
    }

    updateNukes( deltaTime )
    {
 
        for(var n = 0; n < this.activeNukes.length; n++)
        {
            var o = this.activeNukes[n];
            if(o.state === NukeStates.REMOVE)
            {
                this.activeNukes.splice(n,1);
                break;
            }
        }


        
        for(var n = 0; n < this.activeNukes.length; n++)
        {
            
            var o = this.activeNukes[n];
           
            if(o.state === NukeStates.INACTIVE  || o.state === NukeStates.REMOVE)
            {
                o.state = NukeStates.REMOVE;   
            }

            o.progress += deltaTime / o.duration;
            if (o.progress > 1) 
            {
                o.progress = 1;
            }

            o.cx = o.x + (o.dx - o.x) * o.progress;
            o.cy = o.y + (o.dy - o.y) * o.progress;
            
           
            if(o.cy > 150  && o.maxSplits > 0)
            {
                o.maxSplits -= 1;
                var nk = new Nuke(++this.counter, o.cx, o.cy, this.duration, 0);
                this.activeNukes.push(nk);
            }
        }
    }

    drawNukes(ctx, activeMissiles)
    {
        for(var n = 0; n < this.activeNukes.length; n++)
        {
            var o = this.activeNukes[n];
            const gradient = ctx.createLinearGradient(o.x, o.y, o.cx, o.cy);
            gradient.addColorStop(0, 'black'); // Start color
            gradient.addColorStop(1, 'red');  // End color
            ctx.beginPath();
            ctx.moveTo(o.x, o.y);
            ctx.lineTo(o.cx, o.cy);
            ctx.lineWidth = 5;
            //ctx.strokeStyle = o.getStrokeStyle();
            ctx.strokeStyle = gradient;
            ctx.lineCap = 'round';
            ctx.lineCapStyle = 'red';
            ctx.stroke();
            if (o.state === NukeStates.ACTIVE && this.checkCircleCollision(o.cx, o.cy, o.index, activeMissiles) === true)
            {
                o.state = NukeStates.INACTIVE;
            }
        }
    }

   

    checkCircleCollision(x, y,index, activeMissiles)
    {
      
        if(activeMissiles.length > 0)
        {
            for(var n = 0; n < activeMissiles.length; n++)
            {
                var o = activeMissiles[n];
                var zx = x - o.dx;
                var zy = y - o.dy;

                if((zx * zx + zy * zy) <= (o.radius * o.radius))
                {
                    return true;
                }
            }
            return false;
        }
    }
}

class NukeStates
{
    static ACTIVE = 0;
    static INACTIVE = 1;
    static REMOVE = 2;
}

class Nuke
{
    constructor(index, originX, originY, duration, maxSplits)
    {
        this.index = index
        this.x = originX
        this.y = originY
        this.cx = originX
        this.cy = originY
        this.dx = util.getRandomValue(1,999);
        this.dy = 1000
        this.r = 100
        this.g = 0
        this.b = 255
        this.a = 1
        this.progress = 0
        this.duration = duration
        this.maxSplits = maxSplits
        this.state = NukeStates.ACTIVE
        this.hassplit = false;
    }

    
    getStrokeStyle(){
        return 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + this.a + ')'
    }
    
    // fadeOut(activeNukes){
    //     if(this.a > 0)
    //     {
    //         this.a -= .05;
    //     }
    //     else
    //     {
    //         this.state = NukeStates.REMOVE;
    //     }
            
    // }
    
}