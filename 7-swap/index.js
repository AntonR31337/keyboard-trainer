"use strict";
const obj = {
    a: 1,
    b: 2,
};
function swapKeysAndValues(data) {
    //   const swapped: Record<V, K> = {}; не смог типизировать этот объект, не понимаю как это сделать
    const swapped = {};
    for (const key in data) {
        if (obj.hasOwnProperty(key)) {
            swapped[data[key]] = key;
        }
    }
    return swapped;
}
console.log(swapKeysAndValues(obj));
