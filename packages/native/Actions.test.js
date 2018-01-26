import {
  generateBoard, addTermToCard, toggleCardCovered, designateCard,
  designateRemainingCards, addImageToCard, addImageToBoard
} from "./Actions";


test("generate board", () => {
  expect(generateBoard()).toEqual({
    type: "GENERATE_BOARD"
  });

});


test("add term to card", () => {
  expect(addTermToCard(2, 3)).toEqual({
    type: "ADD_TERM_TO_CARD", row: 2, col: 3
  });

});


test("toggle card covered", () => {
  expect(toggleCardCovered(1, 4)).toEqual({
    type: "TOGGLE_CARD_COVERED", row: 1, col: 4
  });
});


test("designate reamining cards", () => {
  expect(designateRemainingCards()).toEqual({
    type: "DESIGNATE_REMAINING_CARDS"
  });
});


test("add board image", () => {
  expect(addImageToBoard({uri: "someimage"})).toEqual({
    type: "ADD_BOARD_IMAGE", image: { uri: "someimage" }
  });
});


test("add image to card", () => {
  expect(addImageToCard(3, 4, {uri: "someimage"})).toEqual({
    type: "ADD_IMAGE_TO_CARD", row: 3, col: 4, image: { uri: "someimage" }
  });
});
