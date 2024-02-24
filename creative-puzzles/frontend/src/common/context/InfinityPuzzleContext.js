import { createContext, useState, useContext } from "react";

export const InfinityPuzzleContext = createContext([]);

export const InfinityPuzzleGridWidth = 8;

export const updatePuzzlePieceInList = (arr, newPiece) => {
  let updatedPieces = arr.map((el) => {
    if (el.id != newPiece.id) {
      //no change
      return el;
    } else {
      return {
        ...newPiece,
      };
    }
  });

  return updatedPieces;
};
