class Util
{
    static getRndInteger(min, max) 
    {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }

    static collides(objectA, objectB)
    {
        if (Math.abs(objectA.x - objectB.x) > (objectA.rx + objectB.rx))
            return false;
        if (Math.abs(objectA.y - objectB.y) > (objectA.ry + objectB.ry)) 
            return false;
        return true;
    }
}