

export const GENERATE_BOARD = "GENERATE_BOARD";

export function generateBoard () {
  return {
    type: GENERATE_BOARD
  };
}


export const ADD_BOARD_IMAGE = "ADD_BOARD_IMAGE";

export function addImageToBoard(image) {
  return {
    type: ADD_BOARD_IMAGE, image
  };
}


export const ADD_IMAGE_TO_CARD = "ADD_IMAGE_TO_CARD";

export function addImageToCard(row, col, image) {
  return {
    type: ADD_IMAGE_TO_CARD, row, col, image
  };
}


export const ADD_TERM_TO_CARD = "ADD_TERM_TO_CARD";

export function addTermToCard(row, col) {
  return {
    type: ADD_TERM_TO_CARD, row, col
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
