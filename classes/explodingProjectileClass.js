import { Projectile } from './projectileClass.js'

export class ExplodingProjectile extends Projectile
{
    constructor()
    {
        this.maxRadius = 30;
        this.minRadius = 5;
        this.growthRate = 40;
        this.maxMissiles = 3;
        this.ProjectileCount = 10;
        this.duration = .5;
        this.explodingProjecticles = [];
    }

 
    
}