export class Game
{
    constructor(missiles, nukes, cities)
    {
        if (Game.instance)
        {
            return Game.instance    
        }
        Game.instance = this
        this.score = 0;
        this.level = 1;
        this.missiles = missiles;
        this.nukes = nukes;
        this.cities = cities;
    }

}