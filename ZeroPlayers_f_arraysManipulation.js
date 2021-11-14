function cloneArray2D(original){
    let clone = [];
    let row = [];
    original.forEach(item =>{
        item.forEach(subitem => {
            row.push(subitem);
        })
        clone.push(row)
        row = [];
    })
    return clone;
}   

function cloneArray(original){
    let clone = [];
    original.forEach(item => {
        clone.push(item)
    })
    return clone;
}

function lastElement(array){
    return array[array.length - 1];
}

function arrayOf2DVectorsIncludeVector(array, vector){
    let result = false;
    array.forEach(item => {
        if(item[0] === vector[0] && item[1] === vector[1]){
            result = true;
        }

    })
    return result;
}
    //HOLA!!
export {cloneArray2D,cloneArray,lastElement,arrayOf2DVectorsIncludeVector}