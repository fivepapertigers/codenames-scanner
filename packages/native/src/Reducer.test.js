import { appReducer, generateEmptyBoard } from "./Reducer";
import { flattenBoard } from "./BoardUtils";

test("CLEAR_BOARD", () => {
  expect(appReducer({}, {type: "CLEAR_BOARD"})).toEqual({
    board: [
      [{}, {}, {}, {}, {}],
      [{}, {}, {}, {}, {}],
      [{}, {}, {}, {}, {}],
      [{}, {}, {}, {}, {}],
      [{}, {}, {}, {}, {}]
    ]
  });
});


test("ADD_TERM_TO_CARD", () => {
  expect(appReducer({board: generateEmptyBoard()}, {
    row: 1, col: 3, type: "ADD_TERM_TO_CARD", termResult: "termresult"
  })).toEqual({
    board: [
      [{}, {}, {}, {}, {}],
      [{}, {}, {}, {termResult: "termresult"}, {}],
      [{}, {}, {}, {}, {}],
      [{}, {}, {}, {}, {}],
      [{}, {}, {}, {}, {}]
    ]
  });
});


test("ADD_IMAGE_TO_CARD", () => {
  expect(appReducer({board: generateEmptyBoard()}, {
    row: 1, col: 3, type: "ADD_IMAGE_TO_CARD", image: {"uri": "someuri"}
  })).toEqual({
    board: [
      [{}, {}, {}, {}, {}],
      [{}, {}, {}, {image: {"uri": "someuri"}}, {}],
      [{}, {}, {}, {}, {}],
      [{}, {}, {}, {}, {}],
      [{}, {}, {}, {}, {}]
    ]
  });
});


test("TOGGLE_CARD_COVERED", () => {
  const board = generateEmptyBoard();
  board[1][3].covered = true;
  expect(appReducer({ board }, {
    row: 1, col: 3, type: "TOGGLE_CARD_COVERED", team: "red"
  })).toEqual({
    board: [
      [{}, {}, {}, {}, {}],
      [{}, {}, {}, {covered: false}, {}],
      [{}, {}, {}, {}, {}],
      [{}, {}, {}, {}, {}],
      [{}, {}, {}, {}, {}]
    ]
  });
});


test("DESIGNATE_REMAINING_CARDS with empty board", () => {
  runBoardAssertions(appReducer(
    { board: generateEmptyBoard() }, {type: "DESIGNATE_REMAINING_CARDS"}
  ).board);
});


test("DESIGNATE_REMAINING_CARDS with some cards", () => {
  const board = generateEmptyBoard();
  board[1][4] = {type: "red"};
  board[3][2] = {type: "assassin"};
  runBoardAssertions(appReducer(
    { board }, {type: "DESIGNATE_REMAINING_CARDS"}
  ).board);
});


test("ADD_BOARD_IMAGE", () => {
  expect(appReducer({}, {type: "ADD_BOARD_IMAGE", boardImage: {uri: "someuri"}}))
    .toEqual({boardImage: {uri: "someuri"}});
});


function runBoardAssertions(board) {
  const cards = flattenBoard()(board);
  const redCards = cards.filter(c => c.type === "red").length;
  const blueCards = cards.filter(c => c.type === "blue").length;
  expect(redCards >= 8).toBe(true);
  expect(redCards <= 9).toBe(true);
  expect(blueCards >= 8).toBe(true);
  expect(blueCards <= 9).toBe(true);
  expect(redCards !== blueCards).toBe(true);
  expect(cards.filter(c => c.type === "assassin")).toHaveLength(1);
  expect(cards.filter(c => c.type === "bystander")).toHaveLength(7);
}
