export class Projectile
{
    constructor(name)
    {
        this.name  = name
    }
    
    greet()
    {
        console.log('projectile ' + this.name)
    }
}