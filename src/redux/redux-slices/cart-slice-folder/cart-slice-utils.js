
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


export const isProductWithSameAttributesPresent = (productsArray,productToBeAdded) => {
    let result = false;
    let foundProductObject = {};
    productsArray.forEach((productObject,i) => {
        if(checkIfObjectsAreSame(productObject.selectedAttributes,productToBeAdded.selectedAttributes)) {
            result = true;
            foundProductObject = productObject;
            return;
        } else {
            return;
        }
    })
    return {result,foundProductObject};
}


export function getIncreasedTotalPrices(previousPrices, pricesArrayOfProductToBeAdded) {
    if(previousPrices.length === 0) {
        return pricesArrayOfProductToBeAdded.map((priceObject) => {
            const tempObj = {...priceObject};
            tempObj["tax"] = Number(parseFloat(tempObj.amount*0.21).toFixed(2));
            return tempObj;
        });
    }
    return previousPrices.map((priceObject,index) => {
        const tempObj = {...priceObject};
        tempObj.amount += pricesArrayOfProductToBeAdded[index].amount;
        tempObj.amount = Number(parseFloat(tempObj.amount).toFixed(2));
        tempObj.tax = Number(parseFloat(tempObj.amount*0.21).toFixed(2));
        return tempObj;
    });
}

export function getDecreasedTotalPrices(totalPricesArray, pricesArrayOfProductToBeRemoved) {
    return totalPricesArray.map((priceObject,index) => {
        const tempObj = {...priceObject};
        tempObj.amount -= pricesArrayOfProductToBeRemoved[index].amount;
        tempObj.amount = Number(parseFloat(tempObj.amount).toFixed(2));
        tempObj.tax = Number(parseFloat(tempObj.amount*0.21).toFixed(2));
        return tempObj;
    });
}