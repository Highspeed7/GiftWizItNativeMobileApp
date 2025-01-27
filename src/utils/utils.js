export const updateObjectInArray = (lists, data, idFilter, nested = null) => {
    var result = lists.map((item) => {
        if(item[idFilter] != data.key) {
            return item;
        }
        return {
            ...item,
            ...data.item
        }
    })
    return result;
}

export const goclone = (source) => {
    if (Object.prototype.toString.call(source) === '[object Array]') {
        var clone = [];
        for (var i=0; i<source.length; i++) {
            clone[i] = goclone(source[i]);
        }
        return clone;
    } else if (typeof(source)=="object") {
        var clone = {};
        for (var prop in source) {
            if (source.hasOwnProperty(prop)) {
                clone[prop] = goclone(source[prop]);
            }
        }
        return clone;
    } else {
        return source;
    }
}