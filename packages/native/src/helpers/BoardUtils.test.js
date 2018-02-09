import { flattenBoard } from "./BoardUtils";

test("flattens board", () => {
  const res = flattenBoard()([
    [{}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}]
  ]);

  expect(res).toEqual([
    {}, {}, {}, {}, {},
    {}, {}, {}, {}, {},
    {}, {}, {}, {}, {},
    {}, {}, {}, {}, {},
    {}, {}, {}, {}, {},
  ]);

});

test("flattens board with processing", () => {
  const res = flattenBoard(({card, row, col}) => Object.assign({}, card, {sum: row + col}))([
    [{}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}]
  ]);

  expect(res).toEqual([
    {sum: 0}, {sum: 1}, {sum: 2}, {sum: 3}, {sum: 4},
    {sum: 1}, {sum: 2}, {sum: 3}, {sum: 4}, {sum: 5},
    {sum: 2}, {sum: 3}, {sum: 4}, {sum: 5}, {sum: 6},
    {sum: 3}, {sum: 4}, {sum: 5}, {sum: 6}, {sum: 7},
    {sum: 4}, {sum: 5}, {sum: 6}, {sum: 7}, {sum: 8},
  ]);

});
