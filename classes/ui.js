class Ui
{
    constructor()
    {
        this.assets = [];
        this.testImage = new Image();
        this.testImage.src = 'assets/missile.png'
        this.loadAsset('missileInd', 'assets/missile.png', 20, 50)
    }

    loadAsset(id, path, width, height)
    {
        var oImg = new Image(width, height);
        oImg.src = path;
        oImg.onload = () => {
            for(var n = 0; n < this.assets.length; n++)
            {
                if(this.assets[n].id = id)
                {
                    this.assets[n].ready = true;
                    this.assets[n].imageObj = oImg;
                }
            }
        };
        this.assets.push([{id: id, imageObj: oImg, ready: false}]);
    }
}