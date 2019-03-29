/**
* Latitude & Longitude Convertor.
* @author David Fisher (davidfisher24@gmail.com).
* @license MIT license
**/

class Convertor {

    constructor(coordinates){
        this.coords = coordinates;
        this.input = 'geojson';
        this.output = 'leaflet';
        return this.convert();
    }

    convert() {
        let c = this.coords;
        if (this.isCoordinates(c)) 
            return this.convertCoordinates(c)
        return c.map(c1 => {
            if (this.isCoordinates(c1)) {
                return this.convertCoordinates(c1)
            } else {
                return c1.map(c2 => {
                    if (this.isCoordinates(c2)) {
                        return this.convertCoordinates(c2)
                    } else {
                        return c2.map(c3 => {
                            return this.convertCoordinates(c3)
                        })
                }})
        }})
    }

    isNumber (value) {
        return typeof value === 'number' && isFinite(value);
    }

    isArray (value) {
        return value && typeof value === 'object' && value.constructor === Array;
    }

    isObject (value) {
        return value && typeof value === 'object' && value.constructor === Object;
    }

    isCoordinates (value) {
        return this.isArray(value) && value.length === 2 && this.isNumber(value[0]) && this.isNumber(value[1])
    }

    convertCoordinates (value) {
        return [value[1],value[0]]
    }
}

export default function (coordinates) {
    return new Convertor(coordinates)
}
