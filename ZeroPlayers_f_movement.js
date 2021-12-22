import { simulation, drawingMatrix } from "./ZeroPlayers_f_level1.js";
import { checkForbiddenPosition } from "./ZeroPlayers_f_livingbeings.js";
import { freePositionsArrayGenerator } from "./ZeroPlayers_f_checkValues.js";
import { arrayOf2DVectorsIncludeVector } from "./ZeroPlayers_f_arraysManipulation.js";
import {
  cloneArray2D,
  removeItem,
} from "./ZeroPlayers_f_arraysManipulation.js";
import { setColor } from "./ZeroPlayers_f_matrixGeneration.js";
import { energy2Universe } from "./ZeroPlayers_f_universe.js";

function movement(
  dynamicItem_x,
  dynamicItem_y,
  f_movement,
  stageParameters,
  simulationParameters
) {
  let beforeAux = [dynamicItem_x, dynamicItem_y];
  let aux;
  let flag = false;
  if (stageParameters.universeRules.frontier == "close") {
    //close borders case

    if (stageParameters.universeRules.movementType == "zigzag") {
      //zigzag case
      aux = zigzag(dynamicItem_x, dynamicItem_y, f_movement);
    } else {
      //diagonal case
      aux = diagonal(dynamicItem_x, dynamicItem_y, f_movement);
    }
    if (checkAdjacentEdges(aux, simulationParameters)) {
      //Comprobamos si hay bordes
      aux = beforeAux;
    }
  } else {
    //Caso de extremos adyacentes 'adjacent ends'
    if (stageParameters.universeRules.movementType == "zigzag") {
      //zigzag case
      aux = zigzag(dynamicItem_x, dynamicItem_y, f_movement);
    } else {
      //diagonal case

      aux = diagonal(dynamicItem_x, dynamicItem_y, f_movement);
    }

    aux = changeAdjacentEdges(aux, simulationParameters); //Comprobamos si hay bordes
  }
  return aux;
}

function staticMovement(item, stageParameters, simulationParameters) {
  stageParameters.matrix[
    -item.y +
      Math.floor(
        simulationParameters.heightDimension / simulationParameters.squareSide
      ) -
      1
  ][item.x] = item.color;
}

function trajectoryMovement(item, stageParamenters, simulationParameters) {
  item.y = item.y + item.trajectory_y[simulationIndex];
  item.x = item.x + item.trajectory_x[simulationIndex];
  stageParamenters.matrix[
    -item.y +
      Math.floor(
        simulationParameters.heightDimension / simulationParameters.squareSide
      ) -
      1
  ][item.x] = item.color;
}

function zigzag(dynamicItem_x, dynamicItem_y, f_movement) {
  console.log("se mete en zigzag para frontier: close");
  return f_movement(dynamicItem_x, dynamicItem_y);
}

function diagonal(dynamicItem_x, dynamicItem_y, f_movement) {
  let aux1;
  let aux2;
  aux1 = f_movement(dynamicItem_x, dynamicItem_y);
  aux2 = f_movement(dynamicItem_x, dynamicItem_y);
  return [aux1[0] - aux2[0], aux1[1] - aux2[1]]; //Esto produce el movimiento exponencial
}

function checkAdjacentEdges(aux, simulationParameters) {
  let extremeEdge_x = Math.floor(
    simulationParameters.wideDimension / simulationParameters.squareSide
  );
  let extremeEdge_y = Math.floor(
    simulationParameters.heightDimension / simulationParameters.squareSide
  );
  //Comprobamos extremo derecho
  if (aux[0] + 1 > extremeEdge_x) {
    return true;
  }
  //Comprobamos extremo izquierdo
  if (aux[0] - 1 < -1) {
    return true;
  }
  //comprobamos extremo superior
  if (aux[1] + 1 > extremeEdge_y) {
    return true;
  }
  //comprobamos extremo inferior
  if (aux[1] - 1 < -1) {
    return true;
  }
}

function changeAdjacentEdges(aux, simulationParameters) {
  let extremeEdge_x =
    Math.floor(
      simulationParameters.wideDimension / simulationParameters.squareSide
    ) - 1;
  let extremeEdge_y =
    Math.floor(
      simulationParameters.heightDimension / simulationParameters.squareSide
    ) - 1;
  //Cambiamos extremo derecho por extremo izquierdo
  if (aux[0] + 1 > extremeEdge_x) {
    aux[0] = 0;
  }
  //Cambiamos extremo izquierdo por extremo derecho
  if (aux[0] - 1 < -1) {
    aux[0] = extremeEdge_x;
  }
  //comprobamos extremo superior
  if (aux[1] + 1 > extremeEdge_y) {
    aux[1] = 0;
  }
  //comprobamos extremo inferior
  if (aux[1] - 1 < -1) {
    aux[1] = extremeEdge_y;
  }
  return aux;
}

function autonomousMovement(item, stageParameters, simulationParameters) {
  let matrixAux = stageParameters.staticStage;
  let xy_before;
  let limit;
  xy_before = [item.x, item.y];
  limit = 0;
  let xy;
  let flagForbiddenPosition = false; //Por defecto no se ha activado la posición prohibida
  xy = movement(
    xy_before[0],
    xy_before[1],
    item.walk,
    stageParameters,
    simulationParameters
  );
  item.x = xy[0];
  item.y = xy[1];
  console.log(`item.x: ${item.x} item.y: ${item.y}`);

  item.energy = item.energy - item.energyConsumption;
  energy2Universe(item.energyConsumption, stageParameters);
}

export { movement, staticMovement, trajectoryMovement, autonomousMovement };
