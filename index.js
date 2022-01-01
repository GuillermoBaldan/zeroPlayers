import { init, simulation } from "./ZeroPlayers_f_level1.js";
import {
  down,
  left,
  right,
  totalFreedom,
  up,
} from "./ZeroPlayers_f_livingbeings.js";
import { generateStaticStage } from "./ZeroPlayers_f_matrixGeneration.js";
import { grossCell, grossPredator, yellowPredator } from "./ZeroPlayers_classes_livingBeings.js";
import {
  continuosSimulationStep,
  killSimulation,
  oneSimulationStep,
} from "./ZeroPlayers_f_simulation.js";
import { debug_energyOfUniverse } from "./ZeroPlayers_f_debugging.js";
import { clickButtonsDetection } from "./ZeroPlayers_f_GUI.js";

let staticStage;
let lienzo;
let ctx;
let init_output;
let stopFlag = false;
let singularSimulationStep = 0;

let universeRules = {
  movementType: "zigzag", //There are two options: 'zigzag' and 'diagonal'
  frontier: "close", //There are two options: 'close' and 'adjacent ends'
};
//We put into one object, stageParamenters, the next objects: legend, cell, universeRules

let stageParameters = {
  universeRules: universeRules,
  legendTerrain: {
    ground: "brown"
  },
  legend: {
    water: "blue",
    simpleCell: "yellow",
  },
  legendForbiddenColors: ["blue", "yellow","green", "purple"],
  livingBeingsCollection: [
    {
      type: grossCell,
      number: 394,
    },
    { type: grossPredator, number: 1 },
    { type: yellowPredator, number: 5 }
  ],
  dynamicElementsArray: [],
  staticStage: [],
  matrix: [],
  freePlacesArray: [],
  universeEnergy: 50000,
};

let simulationParameters = {
  simulationStepsNumber: 25,
  timePerStep: 100,
  wideDimension: 400,
  heightDimension: 400,
  squareSide: 20,
  lienzo: lienzo,
  ctx: ctx,
  init_output: init_output,
  stopFlag: false,
  singularSimulationStep: 0,
  historicalSimulationSteps: 0,
  globalCounter: 0,
  auxCounter: 0,
  auxStep: 0,
};

function modifyStopFlag(value) {
  //To avoid modifing an imported 'variable' causes 'Assignment to constant variable' even it is not a constant
  stopFlag = value;
}

function loadsingularSimulationStep(index) {
  simulationParameters.singularSimulationStep = index;
}

//debug_energyOfUniverse();
simulationParameters.init_output = init(stageParameters, simulationParameters);
clickButtonsDetection();

/*If true, the listener receives synthetic events dispatched by web content
 (the default is false for chrome and true for regular web pages). 
 çThis parameter is only available in Gecko and is mainly useful for the code in add-ons and the browser itself. 
 See Interaction between privileged and non-privileged pages for an example.*/

export {
  stopFlag,
  singularSimulationStep,
  loadsingularSimulationStep,
  simulationParameters,
  stageParameters,
  modifyStopFlag,
};
