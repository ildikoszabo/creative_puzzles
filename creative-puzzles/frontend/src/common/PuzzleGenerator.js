//source https://www.codeproject.com/Articles/395453/Html5-Jigsaw-Puzzle
import { PIECES } from "./pieces";

export function getRandomShapes(width, height, starterArray = null) {
  var shapeArray = starterArray == null ? new Array() : starterArray.slice(0);
  var startRow = starterArray == null ? 0 : 1;

  for (var y = startRow; y < height; y++) {
    for (var x = 0; x < width; x++) {
      var topTab = undefined;
      var rightTab = undefined;
      var bottomTab = undefined;
      var leftTab = undefined;

      if (y == 0) topTab = 0;

      if (y == height - 1) bottomTab = 0;

      if (x == 0) leftTab = 0;

      if (x == width - 1) rightTab = 0;

      shapeArray.push({
        topTab: topTab,
        rightTab: rightTab,
        bottomTab: bottomTab,
        leftTab: leftTab,
        name: "",
        match: false,
        challenge: "",
      });
    }
  }

  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      var shape = shapeArray[y * width + x];

      if (starterArray == null || (starterArray != null && y != 0)) {
        //don't overwrite the prv generated valued coming from startArray
        shape.rightTab = x < width - 1 ? getRandomTabValue() : shape.rightTab;
        shape.bottomTab =
          y < height - 1 ? getRandomTabValue() : shape.bottomTab;
      }

      var shapeRight =
        x < width - 1 ? shapeArray[y * width + (x + 1)] : undefined;

      var shapeBottom =
        y < height - 1 ? shapeArray[(y + 1) * width + x] : undefined;

      if (shapeRight) shapeRight.leftTab = -shape.rightTab;

      if (shapeBottom) shapeBottom.topTab = -shape.bottomTab;
      shape.name = getPieceName(shape);
    }
  }
  return shapeArray;
}

export function getRandomTabValue() {
  return Math.pow(-1, Math.floor(Math.random() * 2));
}

export function getPieceName(shape) {
  var piece = PIECES.allPossiblePieces.find(
    (el) =>
      el.topTab == shape.topTab &&
      el.rightTab == shape.rightTab &&
      el.bottomTab == shape.bottomTab &&
      el.leftTab == shape.leftTab
  );

  var pieceName =
    piece == undefined
      ? `${shape.topTab}${shape.rightTab}${shape.bottomTab}${shape.leftTab}`
      : piece.name;
  return pieceName;
}
