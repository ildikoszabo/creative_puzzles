//challenge
/*{
    name = "",
    width = "",
    height = "",
    blocks = [{value: "colorHex/A-Z", name:"A-Z"}],
    points = ""
}*/

import { levels } from "./constants/infinityPuzzle/levels";
import { colors } from "./constants/infinityPuzzle/colors";

//when checking if challenge was completed, filter out all the pieces that have the challenge property completed

const fixedValues = ["A", "B", "C", "D", "E", "F", "G"];

export function getNewChallenge(currentConfig, theme) {
  let newChallenge = Object.assign({}, currentConfig);
  let challengePattern = "";

  let challengeBlocks = new Array();
  let fixedColorList = new Array();
  if (currentConfig.nrOfFixedColors > 0) {
    for (var i = 1; i <= currentConfig.nrOfFixedColors; i++) {
      let randomIndex = randomNumberInRange(0, colors.length - 1);
      let randomColorRow = colors(theme)[randomIndex];
      let randomColorIndex = randomNumberInRange(0, randomColorRow.length - 1);
      fixedColorList.push(colors(theme)[randomIndex][randomColorIndex]);
    }
  }

  //select from the colors config  fixedColors, colors and generate array of random colors based on the nrOfColors and nrOfFixedColors params

  for (var y = 0; y < newChallenge.height; y++) {
    for (var x = 0; x < newChallenge.width; x++) {
      let pattern = "";
      if (currentConfig.nrOfFixedColors > 0 && fixedColorList.length > 0) {
        let randomNr = randomNumberInRange(5, 5000);
        if (randomNr % 5 == 0) {
          pattern = fixedColorList.pop();
        }
      }

      if (pattern == "") {
        let randomIndex = randomNumberInRange(0, newChallenge.width);
        pattern = fixedValues[randomIndex];
      }

      challengeBlocks.push({
        value: pattern,
        name: pattern,
      });

      challengePattern = challengePattern.concat("_", pattern);
    }
  }

  newChallenge.challengeBlocks = challengeBlocks;
  newChallenge.challengePattern = challengePattern;
  newChallenge.name =
    "C" + newChallenge.complexity + randomNumberInRange(0, 100000);

  return newChallenge;
}

export function generateChallenge(solvedChallenges, newChallenges, theme) {
  let complexity = 0;
  let generatedChallenges = new Array(0);

  if (newChallenges.length < 3) {
    //for each 10 challenges solved increase complexity
    if (solvedChallenges.length != 0 && solvedChallenges.length % 10 == 0) {
      complexity = complexity + 1;
    }

    let levelConfigs = levels.find((el) => el.complexity == complexity);
    if (levelConfigs != undefined) {
      let currentConfig = null;
      if (levelConfigs.length != undefined) {
        currentConfig =
          levelConfigs[randomNumberInRange(0, levelConfigs.length)];
      } else {
        currentConfig = levelConfigs;
      }

      for (var i = 0; i < 3; i++) {
        generatedChallenges.push(getNewChallenge(currentConfig, theme));
      }
    }
  }

  return generatedChallenges;
}

const randomNumberInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
