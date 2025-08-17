export class Point2d {
    constructor(x, y) {
      this.x = x
      this.y = y
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
      const zx = p1.x - c1.x
      const zy = p1.y - c1.y
      if (radius > 15)
      {
        if((zx * zx + zy * zy) <= (radius * radius))
        {
          return true
        }
      }
      return false
    }
}

export class Rect2d {
  constructor(x, y, width, height)
  {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
  }

  static doesCircleHitRect(circle, rect)
  {    
    // Circle: { pDestination.x, pDestination.y, radius }
    // Rect: { x, y, width, height }

    // Find closest point on the rectangle to the circle
    const closestX = Math.max(rect.x, Math.min(circle.pDestination.x, rect.x + rect.width))
    const closestY = Math.max(rect.y, Math.min(circle.pDestination.y, rect.y + rect.height))

    // Calculate distance between circle center and closest point
    const dx = circle.pDestination.x - closestX
    const dy = circle.pDestination.y - closestY

    // If distance is less than radius, collision!
    return (dx * dx + dy * dy) < (circle.radius * circle.radius)

  }
}

