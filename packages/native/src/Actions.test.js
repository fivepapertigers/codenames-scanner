import * as Actions from "./Actions";
import { flattenBoard } from "../helpers/BoardUtils";

jest.mock("./Backend", () => ({
  detectTerm: jest.fn(async () => ({
    id: "TERM_RESULT_ID", "term": "TERM", "confidence": .5
  }))
}));

jest.mock("../helpers/ImageProcessor", () => ({
  sliceCardFromBoardImage: jest.fn(() => jest.fn(async() => ({
    uri: "somecarduri", width: 100, height: 200
  })))
}));

jest.mock("redux");


test("generate board", () => {
  expect(Actions.clearBoard()).toEqual({
    type: "CLEAR_BOARD"
  });

});


test("add term to card", () => {
  expect(Actions.addTermToCard(2, 3, {some: "result"})).toEqual({
    type: "ADD_TERM_TO_CARD", row: 2, col: 3, termResult: {some: "result"}
  });

});


test("toggle card covered", () => {
  expect(Actions.toggleCardCovered(1, 4)).toEqual({
    type: "TOGGLE_CARD_COVERED", row: 1, col: 4
  });
});


test("designate reamining cards", () => {
  expect(Actions.designateRemainingCards()).toEqual({
    type: "DESIGNATE_REMAINING_CARDS"
  });
});


test("add board image", () => {
  expect(Actions.addImageToBoard({uri: "someimage"})).toEqual({
    type: "ADD_BOARD_IMAGE", boardImage: { uri: "someimage" }
  });
});


test("add image to card", () => {
  expect(Actions.addImageToCard(3, 4, {uri: "someimage"})).toEqual({
    type: "ADD_IMAGE_TO_CARD", row: 3, col: 4, image: { uri: "someimage" }
  });
});

describe("process board image", () => {

  const boardImage = {uri: "someuri", width: 500, height: 200};
  let getState, dispatch;

  beforeEach(() => {
    getState = () => ({
      board: [
        [{}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}]
      ]
    });
    dispatch = jest.fn();
  });

  test("resolves for all cards", async () => {
    const res = await Actions.processBoardImage(boardImage)(dispatch, getState);
    expect(res).toHaveLength(25);
  });

  test("adds image to board", async () => {
    await Actions.processBoardImage(boardImage)(dispatch, getState);
    expect(dispatch.mock.calls[0]).toEqual([{
      type: "ADD_BOARD_IMAGE", boardImage
    }]);
  });

  test("adds image to each card", async () => {
    await Actions.processBoardImage(boardImage)(dispatch, getState);
    flattenBoard(({card, row, col, idx}) => {
      expect(dispatch.mock.calls[idx + 1]).toEqual([{
        type: "ADD_IMAGE_TO_CARD",
        row: row,
        col: col,
        image: {uri: "somecarduri", width: 100, height: 200}
      }]);
    })(getState().board);
  });

  test("adds term result to each card", async () => {
    await Actions.processBoardImage(boardImage)(dispatch, getState);
    flattenBoard(({card, row, col, idx}) => {
      expect(dispatch.mock.calls[idx + 26]).toEqual([{
        type: "ADD_TERM_TO_CARD",
        row: row,
        col: col,
        termResult: {
          id: "TERM_RESULT_ID", "term": "TERM", "confidence": .5
        }
      }]);
    })(getState().board);
  });

});
