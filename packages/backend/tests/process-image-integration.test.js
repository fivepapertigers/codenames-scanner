/* eslint-env node, es6 */
/**
 * @jest-environment node
 */
import fs from "fs";
import path from "path";
import AWS from "aws-sdk-mock";
import { handler } from "../src/handlers/process-image";


jest.mock("../src/config", () => ({
  BUCKET: "somebucket",
  LOG: {
    error: () => {}
  }
}));


afterEach(() => {
  AWS.restore("S3");
});


it("should detect the term and save results", async () => {
  const { mockPut, event } = prepareTest("B64VACUUM");

  const result = await handler(event);
  expect(result).toEqual(undefined);
  expect(mockPut.mock.calls).toHaveLength(1);
  expect(mockPut.mock.calls[0][0]).toEqual({
    Bucket: "somebucket",
    Key: "term-results/B64VACUUM",
    Body: JSON.stringify({id: "B64VACUUM", "term": "VACUUM", confidence: 1})
  });
}, 30000);


it("should fail gracefully when no word is found", async () => {
  const { mockPut, event } = prepareTest("B64NOWORD");

  const result = await handler(event);
  expect(result).toEqual(undefined);
  expect(mockPut.mock.calls).toHaveLength(1);
  expect(mockPut.mock.calls[0][0]).toEqual({
    Bucket: "somebucket",
    Key: "term-results/B64NOWORD",
    Body: JSON.stringify({id: "B64NOWORD", "term": null, confidence: 0})
  });
}, 30000);


it("should fail gracefully when file is formatted incorrectly", async () => {
  const { mockPut, event } = prepareTest("B64BAD");

  const result = await handler(event);
  expect(result).toEqual(undefined);
  expect(mockPut.mock.calls).toHaveLength(1);
  expect(mockPut.mock.calls[0][0]).toEqual({
    Bucket: "somebucket",
    Key: "term-results/B64BAD",
    Body: JSON.stringify({id: "B64BAD", "term": null, confidence: 0})
  });
}, 30000);



function prepareTest (fileName) {
  const image = fs.readFileSync(path.join(__dirname, "assets", fileName));

  const mockGet = jest.fn();
  AWS.mock("S3", "getObject", mockGet);
  mockGet.mockImplementation((params, cb) => cb(null, {Body: image}));

  const mockPut = jest.fn();
  AWS.mock("S3", "putObject", mockPut);
  mockPut.mockImplementation((params, cb) => cb(null));


  const event = {Records: [{s3: {object: {key: `image-input/${fileName}`}}}]};
  return { mockGet, mockPut, event, image };
}
