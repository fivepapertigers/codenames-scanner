/**
 * Utility functions for manipulating the board
 */

/**
 * Flattens the board into a list of cards
 * @param  {(card: Card, row: number, col: number) => Card} processFunc a function to process each flattened card
 * @return {(board: Card[][]) => Card[]}                    a list of cards
 */
export const flattenBoard = processFunc => board =>
  board.reduce((flat, cards, row) =>
    flat.concat(...
      (processFunc !== undefined
        ? cards.map((card, col) => processFunc(card, row, col, getCardNumber(row, col)))
        : cards
      )
    ),
    []
  ).filter(card => card);

/**
 * Generates an empty board
 * @return {Card[][]}
 */
export function generateEmptyBoard() {
  const board = [];
  for (let i = 0; i < 5; i++ ){
    const row = [];
    for (let j = 0; j < 5; j++ ){
      row.push({});
    }
    board.push(row);
  }
  return board;
}

/**
 * Checks if the board is still processing
 */
export const boardIsProcessing = board =>
  flattenBoard(card => Boolean(card && card.termResult))(board).length > 0;

/**
 * Gets the card number given board coordinates
 * @param  {number} row
 * @param  {number} col
 * @return {number}
 */
export const getCardNumber = (row, col) => row * 5 + col;


export const getProcessedCards = board =>
  flattenBoard(card => card.termResult)(board).filter(tr => tr);


export const getCardTerm = card =>
  card && card.termResult && card.termResult.term;
