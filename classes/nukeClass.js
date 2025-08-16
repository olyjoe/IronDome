import { util } from './utilities.js'
import { Point2d } from './geometryClass.js'
import { Projectile, Projectiles, ProjectileStates } from './projectileClass.js'
import { Game } from './gameClass.js'
export class Nukes extends Projectiles
{
    #game = new Game()
    constructor()
    {
        if (Nukes.instance)
        {
            return Nukes.instance    
        }
        super()
        Nukes.instance = this
        this.activeProjectiles = [];
        this.counter = 0;
        this.level = 2;

        this.addRandomNuke(this.level);
        
    }

    addRandomNuke(level)
    {
        for (var n = 0; n < level; n++)
        {  
            var pOrigin = new Point2d(
                    util.getRandomValue(1,this.#game.canvasWidth), 
                    0)
            
            var pDest = new Point2d(
                    util.getRandomValue(1,this.#game.canvasWidth),
                    this.#game.canvasHeight)
            
            this.activeProjectiles.push(new Nuke(pOrigin, pDest, ProjectileStates.ACTIVE, 100, {r: 200, g:10, b:10, a:1}, ++this.counter))

        }
    }

    updateNukes( deltaTime )
    {
        if ( this.activeProjectiles.length === 0)
        {
            this.addRandomNuke(this.level);
        }
        this.updateProjectiles( deltaTime )
        
        for(var n = 0; n < this.activeProjectiles.length; n++)
        {
            var o = this.activeProjectiles[n];
            if(o.state === ProjectileStates.REMOVE)
            {
                this.activeProjectiles.splice(n,1);
                break;
            }
        }
        
        for(var n = 0; n < this.activeProjectiles.length; n++)
        {
            
            var o = this.activeProjectiles[n];
           
            if(o.state === ProjectileStates.INACTIVE)
            {
                o.fadeOut();
                continue; 
            }

            if(o.state === ProjectileStates.RETRACTING)
            {
                o.fadeOut();
                continue;
            }
        }
       /*
            
            if(o.radius < o.maxRadius && o.state === ProjectileStates.EXPANDING)
            {
                o.radius += o.growthRate * deltaTime;
            }
            else if (o.radius >= o.maxRadius && o.state === ProjectileStates.EXPANDING)
            {
                o.state = ProjectileStates.EXPANDED;
            }
            o.cx = o.x + (o.dx - o.x) * o.progress;
            o.cy = o.y + (o.dy - o.y) * o.progress;
            
           
            if(o.cy > 150  && o.maxSplits > 0)
            {
                o.maxSplits -= 1;
                var nk = new Nuke(++this.counter, o.cx, o.cy, this.duration, 0);
                this.activeProjectiles.push(nk);
            }
        }
                */
    }

    drawNukes(ctx, activeMissiles)
    {        
        for(var n = 0; n < this.activeProjectiles.length; n++)
        {
            var o = this.activeProjectiles[n];
            const gradient = ctx.createLinearGradient(o.pOrigin.x, o.pOrigin.y, o.getCurrentLocation().x, o.getCurrentLocation().y);
            gradient.addColorStop(0, o.getStrokeStyle(1))
            gradient.addColorStop(1, o.getStrokeStyle(2))

            ctx.beginPath();
            ctx.moveTo(o.pOrigin.x, o.pOrigin.y);
            ctx.lineTo(o.getCurrentLocation().x, o.getCurrentLocation().y);
            ctx.lineWidth = 5;
            ctx.strokeStyle = gradient;
            ctx.lineCap = 'round';
            ctx.lineCapStyle = 'red';
            ctx.stroke();
            
            if (o.state === ProjectileStates.EXPANDING)
            {
                ctx.beginPath();
                ctx.arc(o.pDestination.x,o.pDestination.y, o.radius, 0, Math.PI * 2);
                ctx.fillStyle = o.getStrokeStyle(2);
                ctx.fill();
            }
        
            if (    o.state === ProjectileStates.ACTIVE && 
                    this.checkCircleCollision(o.getCurrentLocation(), activeMissiles) === true)
            {
                o.state = ProjectileStates.INACTIVE;
                o.pDestination = o.getCurrentLocation()
                this.#game.score += 100
            }
        }
    }

    checkCircleCollision(pCurrent, activeMissiles)
    {
        
        if(activeMissiles.length > 0)
        {
            for(var n = 0; n < activeMissiles.length; n++)
            {
                var o2 = activeMissiles[n];
                var result = Point2d.isPointInCircle(pCurrent, o2.pDestination, o2.radius)
                if (result)
                {
                    o2.hit = true;
                }
                return result
            }
            return false;
        }
    }
}
class Nuke extends Projectile
{
    constructor(pOrigin, pDestination, state, velocity, rgba, index)
    {
        super(pOrigin, pDestination, state, 'red',   'round',      velocity, 5,rgba, true)
        this.setCurrentLocation(pOrigin);
        this.maxSplits = 0
        this.hassplit = false
        this.maxRadius = 50;
        this.growthRate = 30;
    }

    
    getStrokeStyle(option)
    {
        if (option === 1)
        {
            return 'rgba(0, 0, 0,' + this.rgba.a + ')'
        } else
            return 'rgba(' + this.rgba.r + ',' + this.rgba.g + ',' + this.rgba.b + ',' + this.rgba.a + ')'
    }
    
    fadeOut()
    {
        if(this.rgba.a > 0)
        {
            this.rgba.a -= .02;
        }
        else
        {
            this.state = ProjectileStates.REMOVE;
        }
    }
    
}