/**
 * Utility functions for manipulating the board
 */

/**
 * Flattens the board into a list of cards
 */
export const flattenBoard = ({transform, filter, sort}) => board =>
  board
    .reduce((flat, cards, row) =>
      flat.concat(
        cards.map((card, col) => ({card, row, col, idx: getCardNumber(row, col)}))
      ),
      []
    )
    .filter(filter ? filter : ({card}) => card)
    .sort(sort ? sort : () => 0)
    .map(transform ? transform : ({card}) => card);

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
  flattenBoard({
    transform: ({card}) => Boolean(card && card.termResult)
  })(board).length > 0;

/**
 * Gets the card number given board coordinates
 * @param  {number} row
 * @param  {number} col
 * @return {number}
 */
export const getCardNumber = (row, col) => row * 5 + col;


export const getProcessedCards = board =>
  flattenBoard({transform: ({card}) => card.termResult})(board).filter(tr => tr);


export const getCardTerm = card =>
  card && card.termResult && card.termResult.term;


export const coveredCardSorter = (cardDataA, cardDataB) =>
  Number(Boolean(cardDataA.card.covered)) - Number(Boolean(cardDataB.card.covered));
