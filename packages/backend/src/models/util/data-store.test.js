/**
 * @jest-environment node
 */

import AWS from "aws-sdk-mock";

import DataStore from "./data-store";

jest.mock("../../config", () => ({BUCKET: "somebucket"}));

const JSON_CONTENT = "{\"some\":\"content\"}";
const CONTENT = {some: "content"};

let callback;

describe("save method", async () => {
  let mockPut;

  beforeEach(async () => {
    mockPut = jest.fn();
    AWS.mock("S3", "putObject", mockPut);
    mockPut.mockImplementation((params, cb) => {
      callback = cb;
      cb();
    });
  });

  afterEach(() => {
    AWS.restore("S3");
  });

  it("saves a file", async () => {
    await DataStore.save("somecoll", "someid", {some: "content"});
    expect(mockPut.mock.calls).toHaveLength(1);
    expect(mockPut.mock.calls[0]).toEqual([{
      "Key": "somecoll/someid",
      "Bucket": "somebucket",
      "Body": JSON_CONTENT,
    }, callback]);
  });

  it("does not return", async () => {
    const res = await DataStore.save("somecoll", "someid", CONTENT);
    expect(res).toBe(undefined);
  });


});

describe("load method", async () => {

  let mockGet;

  beforeEach(async () => {
    mockGet = jest.fn();
    AWS.mock("S3", "getObject", mockGet);
    mockGet.mockImplementation((params, cb) => {
      callback = cb;
      cb(null, {Body: JSON_CONTENT});
    });
  });

  afterEach(() => {
    AWS.restore("S3");
  });

  it("retrieves a file", async () => {
    await DataStore.load("somecoll", "someid");
    expect(mockGet.mock.calls).toHaveLength(1);
    expect(mockGet.mock.calls[0]).toEqual([{
      "Key": "somecoll/someid",
      "Bucket": "somebucket",
    }, callback]);
  });

  it("does returns decoded content", async () => {
    const res = await DataStore.load("somecoll", "someid");
    expect(res).toEqual(CONTENT);
  });


});

