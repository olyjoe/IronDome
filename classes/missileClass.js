//import { ExplodingProjectile } from './explodingProjectileClass.js'
export class Missiles //extends ExplodingProjectile
{
    constructor() {


        this.maxRadius = 30;
        this.minRadius = 5;
        this.growthRate = 40;
        this.maxMissiles = 3;
        this.missileCount = 10;
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
            var oMis = new Missile(500,1000,e.clientX, e.clientY);
            this.activeMissiles.push(oMis);
            this.missileCount--;
       
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
    #cx = 0
    #cy = 0

    constructor(originX, originY, destX, destY)
    {
        
        this.x = originX
        this.y = originY
        this.dx = destX
        this.dy = destY
        this.rgba = {r:255, g:255, b:255, a: 1}
        this.radius = 5
        this.traveled = 0
        this.velocity = 1800;
        this.state = MissileStates.INTERCEPTING
        this.setCurrentLcation(this.x, this.y);


    }

    getCurrentLocation()
    {
        return {x:this.#cx, y:this.#cy}
    }
    setCurrentLcation(x,y)
    {
        this.#cx = x
        this.#cy = y
    }

    getStrokeStyle(){
        return 'rgba(' + this.rgba.r + ',' + this.rgba.g + ',' + this.rgba.b + ',' + this.rgba.a + ')'
    }
    
    
    
}