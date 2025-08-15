export class Projectile
{
    constructor(name)
    {
        constructor(pOrigin, pDestination, oRGBA, velocity)

        this.pOrigin = pOrigin
        this.pDestination = this.pDestination
        this.rgba = oRGBA? oRBGA : {r:255,g: 255, b: 255, a: 1}
        this.traveled = 0
        this.velocity = velocity?velocity:1800;
        this.state = ProjectileStates.INTERCEPTING
    }
    
    updateProjectile( deltaTime )
    {
        var tempArr = [];
        for(var n = 0; n < this.activeProjectiles.length; n++)
        {
            var o = this.activeProjectiles[n];
            const deltaPoint = new Math.Point((o.dx - o.x), (o.dy - o.y))
            const totalDistance = Math.hypot(deltaPoint,x, deltaPoint.y);
            // Normalize direction
            const dirPoint = new Math.Point((deltaPoint.x/totalDistance, deltaPoint.y/totalDistance))

            const distanceStep = o.velocity * deltaTime; 
            o.traveled += distanceStep;
        
            if (o.traveled > totalDistance && o.state === ProjectileStatus.INTERCEPTING)
            { 
                o.traveled = totalDistance;
                o.state = ProjectileStatus.ARRIVED;
            }
            this.pOrigin
            o.cx = o.x + dirX * o.traveled;
            o.cy = o.y + dirY * o.traveled;
        }
    }
   
}
export class ProjectileStates
{
    static ACTIVE = 0;
    static INACTIVE = 1;
    static REMOVE = 2;
    static ARRIVED = 3;
}