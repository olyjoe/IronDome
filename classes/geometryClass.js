export class Point2d {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }

    static getDistanceBetween2Points(p1, p2)
    {
      return new Point2d(p2.x - p1.x,p2.y - p1.y)
    }

    static getPointAtDistance(p1, distance)
    {
      return new Point2d((p1.x/distance), (p1.y/distance))
    }

    static getTraveledDistance(p1, p2, travelDistance )
    {
      return new Point2d(p1.x + p2.x * travelDistance, p1.y + p2.y * travelDistance)
    }

    static isPointInCircle(p1, c1, radius)
    {
      console.log(radius)
      var zx = p1.x - c1.x;
      var zy = p1.y - c1.y;
      if (radius > 15)
      {
        console.log('left: ' + (zx * zx + zy * zy) + ' right: ' + (radius * radius))
        if((zx * zx + zy * zy) <= (radius * radius))
        {
          return true;
        }
      }
      return false;
    }
}



