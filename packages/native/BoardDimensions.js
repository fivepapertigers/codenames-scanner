/**
 * @module BoardDimensions
 * @description
 *
 *     Logic for calculating the dimensions of cards on the board. A codenames
 *     board should have the following layout and proportions:
 *
 *     Note: A card's aspect ration is 21/13.
 *
 *          M |    0    |    1    |    2    |    3    |    4    | M
 *        +---+---------+---------+---------+---------+---------+---|
 *      M | x x x x x x x x x x x x x x x x x x x x x x x x x x x x |
 *     ---| x +---------+---------+---------+---------+---------+ x |
 *        | x | * * * * | * * * * | * * * * | * * * * | * * * * | x |
 *      0 | x | * * * * | * * * * | * * * * | * * * * | * * * * | x |
 *        | x | * * * * | * * * * | * * * * | * * * * | * * * * | x |
 *     ---| x +---------+---------+---------+---------+---------+ x |
 *        | x | * * * * | * * * * | * * * * | * * * * | * * * * | x |
 *      1 | x | * * * * | * * * * | * * * * | * * * * | * * * * | x |
 *        | x | * * * * | * * * * | * * * * | * * * * | * * * * | x |
 *     ---| x +---------+---------+---------+---------+---------+ x |
 *        | x | * * * * | * * * * | * * * * | * * * * | * * * * | x |
 *      2 | x | * * * * | * * * * | * * * * | * * * * | * * * * | x |
 *        | x | * * * * | * * * * | * * * * | * * * * | * * * * | x |
 *     ---| x +---------+---------+---------+---------+---------+ x |
 *        | x | * * * * | * * * * | * * * * | * * * * | * * * * | x |
 *      3 | x | * * * * | * * * * | * * * * | * * * * | * * * * | x |
 *        | x | * * * * | * * * * | * * * * | * * * * | * * * * | x |
 *     ---| x +---------+---------+---------+---------+---------+ x |
 *        | x | * * * * | * * * * | * * * * | * * * * | * * * * | x |
 *      4 | x | * * * * | * * * * | * * * * | * * * * | * * * * | x |
 *        | x | * * * * | * * * * | * * * * | * * * * | * * * * | x |
 *     ---+ x +---------+---------+---------+---------+---------+ x |
 *      M | x x x x x x x x x x x x x x x x x x x x x x x x x x x x |
 *        +---+---------+---------+---------+---------+---------+---|
 *
 *      Card width: 42 parts
 *      Card height: 26 parts
 *
 *      Margin width: 3 parts
 *      Margin height: 16 parts
 *
 *      Image width: 216 parts
 *      Image height: 162 parts
 *
 */

/**
 * Ratio of the card width to the board
 * @type {[type]}
 */
export const CARD_WIDTH_RATIO = 42 / 216;

/**
 * Ratio of the card height to the board
 * @type {[type]}
 */
export const CARD_HEIGHT_RATIO = 26 / 162;

/**
 * Ratio of the margin width to the board
 * @type {[type]}
 */
export const MARGIN_WIDTH_RATIO = 3 / 216;

/**
 * Ratio of the margin height to the board
 * @type {[type]}
 */
export const MARGIN_HEIGHT_RATIO = 16 / 162;

/**
 * Width of a card given width of the board
 * @param  {number} boardWidth width of board in pixels
 * @return {number}            width of a card in pixels
 */
export function cardWidthPixels (boardWidth) {
  return boardWidth * CARD_WIDTH_RATIO;
}

/**
 * Height of a card given height of the board
 * @param  {number} boardHeight height of board in pixels
 * @return {number}             height of a card in pixels
 */
export function cardHeightPixels (boardHeight) {
  return boardHeight * CARD_HEIGHT_RATIO;
}

/**
 * Left position of a card given width of the board and card column
 * @param  {number} boardWidth width of board in pixels
 * @param  {Card} card
 * @return {number}             left position of card in pixels
 */
export function cardLeftPixels (boardWidth, card) {
  return marginWidthPixels(boardWidth) + cardWidthPixels(boardWidth) * card.col;
}

/**
 * Left position of a card given width of the board and card column
 * @param  {Card} card
 * @return {number}             left position of card as a ratio
 */
export function cardLeftRatio (card) {
  return MARGIN_WIDTH_RATIO + CARD_WIDTH_RATIO * card.col;
}

/**
 * Top position of a card given height of the board and card row
 * @param  {number} boardHeight height of board in pixels
 * @param  {Card} card
 * @return {number}             top position of card in pixels
 */
export function cardTopPixels (boardHeight, card) {
  return marginHeightPixels(boardHeight) + cardHeightPixels(boardHeight) * card.row;
}

/**
 * Top position of a card given height of the board and card row
 * @param  {Card} card
 * @return {number}             top position of card as a ratio
 */
export function cardTopRatio (card) {
  return MARGIN_HEIGHT_RATIO + CARD_HEIGHT_RATIO * card.row;
}

/**
 * Width of margins given width of the board
 * @param  {number} boardWidth width of board in pixels
 * @return {number}            width of margins in pixels
 */
export function marginWidthPixels (boardWidth) {
  return boardWidth * MARGIN_WIDTH_RATIO;
}

/**
 * Height of margins given height of the board
 * @param  {number} boardHeight height of board in pixels
 * @return {number}             height of margins in pixels
 */
export function marginHeightPixels (boardHeight) {
  return boardHeight * MARGIN_HEIGHT_RATIO;
}
