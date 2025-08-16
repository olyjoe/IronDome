
import { Point2d } from './geometryClass.js'
import { Projectile, Projectiles, ProjectileStates } from './projectileClass.js'
import { Game } from './gameClass.js'
export class Missiles extends Projectiles
{
    #game = new Game()
    constructor() {
        if (Missiles.instance)
        {
            return Missiles.instance    
        }
        super()
        Missiles.instance = this
        this.maxMissiles = 3
        this.missileCount = 10
    }

    updateMissiles(deltaTime) 
    {
        var tempArr = [];
        this.updateProjectiles( deltaTime )
        for (var n = 0; n < this.activeProjectiles.length; n++)
        {
            var o = this.activeProjectiles[n]
            if (o.state === ProjectileStates.REMOVE)
            {
                tempArr = this.activeProjectiles.slice(1);
                this.activeProjectiles = tempArr;
            }
        }
    }

    drawMissiles(ctx)
    {
        this.drawProjectile(ctx)
    }
    handleClick(e)
    {
        if(this.missileCount > 0 && this.activeProjectiles.length <= this.maxMissiles)
        {   
            var pDestination = new Point2d(e.clientX, e.clientY)
            var pOrigin = new Point2d(
                this.#game.canvasWidth / 2,
                this.#game.canvasHeight )
            var velocity = 1800
            var state = ProjectileStates.INTERCEPTING
            var rgba = {r:255, g:255, b:255, a: 1}

            var oMis = new Missile(pOrigin,pDestination, velocity, state, rgba)

            this.activeProjectiles.push(oMis);
            this.missileCount--;
        }
    }
}
class Missile extends Projectile
{
    constructor(pOrigin, pDestination, velocity, state, rgba)
    {
        super(pOrigin, pDestination, state, 'red',   'round',      velocity, 5,rgba, true)
        this.setCurrentLocation(pOrigin);
    }
}