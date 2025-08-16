export class Game
{
    constructor()
    {
        if (Game.instance)
        {
            return Game.instance    
        }
        Game.instance = this
        this.score = 0
        this.level = 1
        this.waves = this.level * 7
        this.canvasWidth = 1000
        this.canvasHeight = 900
        this.gameOver = false
    }

    levelUp()
    {
        this.level += 1
        this.waves = this.level * 7
    }
}