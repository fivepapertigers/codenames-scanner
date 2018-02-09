/* eslint-env es6 */

import { detectTerm } from "./Backend";
import { sliceCardFromBoardImage } from "./helpers/ImageProcessor";
import { flattenBoard } from "./helpers/BoardUtils";
import { mockDetectTerm } from "./MockData";

export const CLEAR_BOARD = "CLEAR_BOARD";

export function clearBoard () {
  return {
    type: CLEAR_BOARD
  };
}

export const ADD_BOARD_IMAGE = "ADD_BOARD_IMAGE";

export function addImageToBoard(boardImage) {
  return {
    type: ADD_BOARD_IMAGE, boardImage
  };
}


export const ADD_IMAGE_TO_CARD = "ADD_IMAGE_TO_CARD";

export function addImageToCard(row, col, image) {
  return {
    type: ADD_IMAGE_TO_CARD, row, col, image
  };
}


export const ADD_TERM_TO_CARD = "ADD_TERM_TO_CARD";

export function addTermToCard(row, col, termResult) {
  return {
    type: ADD_TERM_TO_CARD, row, col, termResult
  };
}


export const TOGGLE_CARD_COVERED = "TOGGLE_CARD_COVERED";

export function toggleCardCovered (row, col) {
  return {
    type: TOGGLE_CARD_COVERED, row, col
  };
}


export const DESIGNATE_REMAINING_CARDS = "DESIGNATE_REMAINING_CARDS";

export function designateRemainingCards() {
  return {
    type: DESIGNATE_REMAINING_CARDS
  };
}


/**
 * Given a new board image:
 *   1) Clear current board
 *   2) Dispatch new image
 *   3) Slice into cards
 *   4) Detect terms for cards
 * @param  {Image} boardImage
 * @return {(dispatch: function, getState: function)} A redux thunk
 */
export function processBoardImage(boardImage) {
  return (dispatch, getState) => {
    // clear current board
    dispatch(clearBoard());
    dispatch(designateRemainingCards());

    // add image to board
    dispatch(addImageToBoard(boardImage));

    // slice each image
    const slicer = sliceCardFromBoardImage(boardImage);
    const { board } = getState();

    // Process each card in the board in parallel, then resolve
    return Promise.all(flattenBoard(async (card, row, col) => {
      // Slice card image from board and dispatch
      const cardImage = await slicer(row, col);
      dispatch(addImageToCard(row, col, cardImage));

      // Run term detection and dispatch
      // const termResult = await detectTerm(cardImage);
      const termResult = await mockDetectTerm(row, col);
      dispatch(addTermToCard(row, col, termResult));

      return;
    })(board));
  };
}
