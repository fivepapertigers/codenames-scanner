import * as BoardDimensions from "./BoardDimensions";

it("returns the width of the card", () => {
  expect(BoardDimensions.cardWidthPixels(9072)).toBe(1764);
});

it("returns the width of the margin", () => {
  expect(BoardDimensions.marginWidthPixels(9072)).toBe(126);
});

it("returns the left position of the card", () => {
  const card = {row: 1, col: 1};
  expect(BoardDimensions.cardLeftPixels(9072, card)).toBe(1890);
});

it("returns the left position of the card as ratio", () => {
  const card = {row: 1, col: 1};
  expect(BoardDimensions.cardLeftRatio(card)).toBe(45 / 216);
});

it("returns the height of the card", () => {
  expect(BoardDimensions.cardHeightPixels(4212)).toBe(676);
});

it("returns the height of the margin", () => {
  expect(BoardDimensions.marginHeightPixels(4212)).toBe(416);
});

it("returns the top position of the card", () => {
  const card = {row: 1, col: 1};
  expect(BoardDimensions.cardTopPixels(4212, card)).toBe(1092);
});

it("returns the top position of the card as a ratio", () => {
  const card = {row: 1, col: 1};
  expect(BoardDimensions.cardTopRatio(card)).toBe(42 / 162);
});
