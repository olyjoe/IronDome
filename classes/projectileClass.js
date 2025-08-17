import { Point2d } from "./geometryClass.js"
export class Projectiles
{
    constructor()
    {   
        this.activeProjectiles = []
    }
    
    updateProjectiles( deltaTime )
    {
        for(const o of this.activeProjectiles)
        {
            const deltaPoint = Point2d.getDistanceBetween2Points(o.pOrigin, o.pDestination)
            const totalDistance = Math.hypot(deltaPoint.x, deltaPoint.y)
            const dirPoint = Point2d.getPointAtDistance(deltaPoint, totalDistance)
            const distanceStep = o.velocity * deltaTime
            o.traveled += distanceStep
            if (o.traveled > totalDistance && (o.state === ProjectileStates.INTERCEPTING || o.state === ProjectileStates.ACTIVE))
            { 
                o.traveled = totalDistance
                o.state = ProjectileStates.EXPANDING
            }
            o.setCurrentLocation(Point2d.getTraveledDistance(o.pOrigin, dirPoint, o.traveled))
            if(o.isExplosive === true)
            {
                if(o.radius < o.maxRadius && o.state === ProjectileStates.EXPANDING)
                {
                    o.radius += o.growthRate * deltaTime
                }
                else if (o.radius >= o.maxRadius && o.state === ProjectileStates.EXPANDING)
                {
                    o.state = ProjectileStates.RETRACTING
                }
                else if (o.radius > o.minRadius && o.state === ProjectileStates.RETRACTING)
                {
                    o.radius -= o.growthRate * deltaTime
                }
                else if (o.radius <= o.minRadius && o.state === ProjectileStates.RETRACTING)
                {
                    o.radius = 0
                    o.state = ProjectileStates.REMOVE
                }
            }
        }
    }
    
    drawProjectile(ctx)
    {
        for(const o of this.activeProjectiles)
        {            
            if(o.state===ProjectileStates.INTERCEPTING)
            {
                let pCur = o.getCurrentLocation()
                ctx.beginPath()
                ctx.moveTo(o.pOrigin.x, o.pOrigin.y)
                ctx.lineTo(pCur.x, pCur.y)
                ctx.lineWidth = o.lineWidth
                ctx.strokeStyle = o.getStrokeStyle()
                ctx.lineCap = o.lineCap
                ctx.lineCapStyle = o.lineCapStyle
                ctx.stroke()
            }
            else (o.isExplosive === true && o.state === ProjectileStates.EXPANDING || o.state === ProjectileStates.RETRACTING)
            {
                ctx.beginPath()
                ctx.arc(o.pDestination.x, o.pDestination.y, o.radius, 0, Math.PI * 2)
                if(o.hit === true)
                {
                        ctx.fillStyle = 'orange'
                }
                else
                {
                    ctx.fillStyle = 'white'
                }    
                ctx.fill()
            }
            
        }
    }
}
export class ProjectileStates
{
    static ACTIVE = 0
    static INACTIVE = 1
    static REMOVE = 2
    static ARRIVED = 3
    static INTERCEPTING = 4
    static EXPANDING = 5
    static RETRACTING = 6
    static STAGED = 7
    static QUEUED = 8
}

export class Projectile
{
    #pCurrent = new Point2d()
    constructor(pOrigin, pDestination, state, lineCap, lineCapStyle, velocity, lineWidth, rgba, isExplosive)
    {
        this.pOrigin = pOrigin
        this.pDestination = pDestination
        this.traveled = 0
        this.velocity = velocity
        this.state = state
        this.lineWidth = lineWidth
        //this.lineCap = lineCap
        //this.lineCapStyle = lineCapStyle
        this.rgba = rgba
        this.isExplosive = isExplosive
        this.maxRadius = 30
        this.minRadius = 5
        this.radius = 0
        this.growthRate = 40
        this.hit = false
    }
    getCurrentLocation()
    {
        return this.#pCurrent
    }
    setCurrentLocation(pLocation)
    {
        this.#pCurrent = pLocation
    }
    getStrokeStyle(){
        return 'rgba(' + this.rgba.r + ',' + this.rgba.g + ',' + this.rgba.b + ',' + this.rgba.a + ')'
    }

}