//import { ExplodingProjectile } from './explodingProjectileClass.js'
export class Missiles
{
    constructor() {
        this.ep = new ExplodingProjectile("test1");

        this.maxRadius = 30;
        this.minRadius = 5;
        this.growthRate = 40;
        this.maxMissiles = 3;
        this.missileCount = 10;
        this.duration = .5;
        this.activeMissiles = [];
    }

    updateMissiles(deltaTime) {
        var tempArr = [];
        for(var n = 0; n < this.activeMissiles.length; n++)
        {
            var o = this.activeMissiles[n];
            
            const dx = o.dx - o.x;
            const dy = o.dy - o.y;
            const totalDistance = Math.hypot(dx, dy);
            // Normalize direction
            const dirX = dx / totalDistance;
            const dirY = dy / totalDistance;

            const distanceStep = o.velocity * deltaTime; 
            o.traveled += distanceStep;
        
            if (o.traveled > totalDistance && o.state === MissileStates.INTERCEPTING)
            { 
                o.traveled = totalDistance;
                o.state = MissileStates.EXPANDING;
            }

            o.cx = o.x + dirX * o.traveled;
            o.cy = o.y + dirY * o.traveled;

            if(o.radius < this.maxRadius && o.state === MissileStates.EXPANDING)
            {
                o.radius += this.growthRate * deltaTime;
            }
            else if (o.radius >= this.maxRadius && o.state === MissileStates.EXPANDING)
            {
                o.state = MissileStates.RETRACTING;
            }
            else if (o.radius > this.minRadius && o.state === MissileStates.RETRACTING)
            {
                o.radius -= this.growthRate * deltaTime;
            }
            else if (o.state !== MissileStates.INTERCEPTING)
            {
                tempArr = this.activeMissiles.slice(1);
                this.activeMissiles = tempArr;
            }
        }
    }
    drawMissiles(ctx)
    {
        
        for(var n = 0; n < this.activeMissiles.length; n++)
        {
            var o = this.activeMissiles[n];
            
            if(o.state===MissileStates.INTERCEPTING)
            {
                ctx.beginPath();
                ctx.moveTo(o.x, o.y);
                ctx.lineTo(o.cx, o.cy);
                ctx.lineWidth = 5;
                ctx.strokeStyle = o.getStrokeStyle();
                ctx.lineCap = 'round';
                ctx.lineCapStyle = 'red';
                ctx.stroke();
            }
            else //(o.state === MissileStates.EXPANDING || o.state === MissileStates.RETRACTING)
            {
                ctx.beginPath();
                ctx.arc(o.dx, o.dy, o.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'white';
                ctx.fill();
            }
        }
    }
    handleClick(e)
    {
        if(this.missileCount > 0 && this.activeMissiles.length <= this.maxMissiles)
        {
            
            
            var oMis = new Missile(500,1000,e.clientX, e.clientY, this.duration);
           // oMis.state = MissileStates.EXPANDING
            //this.activeMissiles.push({x: e.clientX, y: e.clientY, radius: 1, state: MissileStates.EXPANDING, currentTime: lastTime});
            this.activeMissiles.push(oMis);
            this.missileCount--;
       
            //document.getElementById("missilesRemaining").innerText = this.missileCount;
        }
    }
}

class MissileStates
{
    static INTERCEPTING = 0;
    static EXPANDING = 1;
    static RETRACTING = 2;
}

class Missile
{
    constructor(originX, originY, destX, destY, duration)
    {
        
        this.x = originX
        this.y = originY
        this.cx = originX
        this.cy = originY
        this.dx = destX
        this.dy = destY
        this.r = 255
        this.g = 255
        this.b = 255
        this.a = 1
        this.radius = 5
        this.progress = 0
        this.duration = duration
        this.traveled = 0
        this.velocity = 1800;
        this.state = MissileStates.INTERCEPTING
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