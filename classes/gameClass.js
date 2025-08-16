export class Game
{
    constructor(missiles, nukes, cities)
    {
        if (Game.instance)
        {
            return Game.instance    
        }
        Game.instance = this
        this.score = 0
        this.level = 1
        this.missiles = missiles
        this.nukes = nukes
        this.cities = cities
        this.waves = this.level * 7
        this.canvasWidth = 1000
        this.canvasHeight = 900
    }

    levelUp()
    {
        this.level += 1
        this.waves = this.level * 7
    }
}