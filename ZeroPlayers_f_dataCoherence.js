import { simulationParameters } from './index.js';
import { multiple} from './ZeroPlayers_f_math.js';

function  checkDataCoherence(stageParameters,simulationParameters){
    let flagMultiple = true; //checkDataCoherence is true if there isn´t data coherence errors
    let flagCheckInside = true;
    let flag = true;
    //1. Comprobar que wideDimension es multiplo de squarSide
    flagMultiple = multiple(simulationParameters);
    //2. Comprobar que ningún elemento dinámico queda fuera del canvas
    flagCheckInside = checkInsideCanvas(stageParameters,simulationParameters);
    if (flagMultiple&&flagCheckInside){
        flag = true
    }else {
        flag = false;
    }
    return flag;
}

function checkInsideCanvas(stageParameters,simulationParameters){
    let flag = true;
    stageParameters.dynamicElementsArray.forEach(item => {
        if ((item.x > simulationParameters.wideDimension/simulationParameters.squareSide) && (item.y > simulationParameters.wideDimension/simulationParameters.squareSide)){
        flag = false;
        }
        if ((item.x < 0) && item.y <0 ){
        flag = false;
        }
    });
    return flag;
}

function checkExistenceInMatrix(x,y,stageParameters){
    let a;
    let flag = false;
    for(a=0;a<stageParameters.dynamicElementsArray.length;a++){
        if (stageParameters.dynamicElementsArray[a].x == x){
            if (stageParameters.dynamicElementsArray[a].y == y){
                flag = true
            }
        }
    }
    return flag;
}

function coordinatesAssigment(simulationParameters,stageParameters,item){
let x_index;
let y_index;
let coordinate = [];
let freePlacesArray = [];
//Construimos una matriz de posiciones libres
for(x_index=0;x_index<Math.floor(simulationParameters.wideDimension/simulationParameters.squareSide)-1;x_index++){
    for(y_index=0;y_index<Math.floor(simulationParameters.heightDimension/simulationParameters.squareSide)-1;y_index){
        //Se comprueba que la coordenada esta libre
        /* if(!((includesAnyOf(stageParameters.matrix[x_index][y_index],stageParameters.dynamicElementsArray[stageParameters.dynamicElementsArray.length-1].forbiddenColors)))){
           //Si la coordenada está libre se mete en freePlacesArray */
           console.log(item);
           if (!(item.behaviourRules.forbiddenColors.includes(stageParameters.matrix[x_index][y_index]))){
            freePlacesArray.push([x_index,y_index])
           }
           
        }
    }
//Asignamos una posición libre al azar al elemento dinámico generado, que es el último
coordinate = freePlacesArray[Math.round(Math.random()*(freePlacesArray.length-1))];
stageParameters.dynamicElementsArray[stageParameters.dynamicElementsArray.length-1].x = coordinate[0];
stageParameters.dynamicElementsArray[stageParameters.dynamicElementsArray.length-1].y = coordinate[1];
}

export {checkDataCoherence, checkExistenceInMatrix, coordinatesAssigment}
