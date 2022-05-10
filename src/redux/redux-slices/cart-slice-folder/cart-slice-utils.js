import { current } from '@reduxjs/toolkit';

const checkIfObjectsAreSame = (object1,object2) => {
    let result = true;
    const keysOfObject1 = Object.keys(object1);
    const keysOfObject2 = Object.keys(object2);
    if(keysOfObject1.length !== keysOfObject2.length) {
        result = false;
        return result;
    }
    keysOfObject1.forEach(key => {
        if(!(object1[key] === object2[key])) {
            result = false;
            return result;
        }
    });
    return result;
}

checkIfObjectsAreSame({Size:"40"},{Size:"40"})

export const isProductWithSameAttributesPresent = (productsArray,productToBeAdded) => {
    let result = false;
    let foundProductObject = {};
    productsArray.forEach((productObject,i) => {
        if(checkIfObjectsAreSame(productObject.attributes,productToBeAdded.attributes)) {
            // console.log(current(attributes),productToBeAdded.attributes)
            result = true;
            foundProductObject = productObject;
            return;
        } else {
            return;
        }
    })
    return {result,foundProductObject};
}