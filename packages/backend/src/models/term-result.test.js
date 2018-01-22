/**
 * @jest-environment node
 */

import TermResult from "./term-result";

import DataStore from "./util/data-store";

jest.mock("./util/data-store",
  () => jest.genMockFromModule("./util/data-store"));

it("instantiates a new term result", () => {
  const termResult = new TermResult("someid", "TERM", 1);
  expect(termResult.id).toEqual("someid");
  expect(termResult.term).toEqual("TERM");
  expect(termResult.confidence).toEqual(1);
});

it("saves the term result", async () => {
  const termResult = new TermResult("someid", "TERM", 1);
  const res = await termResult.save();
  expect(res).toBe(undefined);
  expect(DataStore.save.mock.calls[0]).toEqual(["term-results", "someid", {
    id: "someid",
    term: "TERM",
    confidence: 1
  }]);
});
