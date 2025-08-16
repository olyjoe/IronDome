import { Missiles } from "./missileClass.js"
import { Cities } from "./cityClass.js"
import { Nukes } from "./nukeClass.js"
import { Ui } from "./ui.js"
import { Game } from "./gameClass.js"


    const canvas = document.getElementById("gameview");
    const ctx = canvas.getContext("2d");



    let missiles = new Missiles();
    let cities = new Cities();
    let nukes = new Nukes();
    let ui = new Ui();

    let game = new Game(missiles, nukes, cities);

    let lastTime = performance.now();
    var deltaTime = 0;
    function gameLoop( currentTime ) {
        deltaTime = (currentTime - lastTime) / 1000;
        lastTime = currentTime;
        update(deltaTime);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        draw(ctx);
        requestAnimationFrame(gameLoop);
    }

    function update(deltaTime)
    {
        missiles.updateMissiles(deltaTime);
        nukes.updateNukes(deltaTime);      
        cities.updateCities(deltaTime, nukes.activeProjectiles)    
    }

    function draw(ctx) {
        if(ui.assets[0].ready)
        {
        
            for(var n = 0; n < missiles.missileCount; n++)
            {
                ctx.drawImage(ui.assets[0].imageObj,(25*n),0, 25, 50);
            }
        }
        ui.drawHUD(ctx);
        missiles.drawMissiles(ctx);
        cities.drawCities(ctx);
        nukes.drawNukes(ctx, missiles.activeProjectiles);
    }
    
    canvas.addEventListener('click', (event) => {
            missiles.handleClick(event);
    })
    
    requestAnimationFrame(gameLoop);    