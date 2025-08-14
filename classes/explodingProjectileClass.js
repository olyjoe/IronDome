import { Projectile } from './projectileClass.js'

export class ExplodingProjectile //extends Projectile
{
    constructor(name)
    {
        this.greet(name);
        var myProj = new Projectile('test');
        myProj.greet()
    }

    greet(name){
        console.log('hello ' + name)
    }
    
}