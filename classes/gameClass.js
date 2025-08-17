export class Game
{
    constructor()
    {
        if (Game.instance)
        {
            return Game.instance    
        }
        Game.instance = this
        this.canvasWidth = 1000
        this.canvasHeight = 900
        this.isRestarting = false
        this.init()
    }

    levelUp()
    {
        this.level += 1
        this.waves = this.level * 7
    }

    init()
    {
        this.score = 0
        this.level = 1
        this.waves = this.level * 7
        this.gameOver = false
        this.CurrentMissiles = 10
    }
    restart()
    {
        this.init()     
    }
}