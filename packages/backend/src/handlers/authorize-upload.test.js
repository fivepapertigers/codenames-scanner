/**
 * @jest-environment node
 */

import File from "../models/file";
import { handler } from "./authorize-upload";
import { authorizeS3Post, authorizeS3Retrieval } from "../aws-helpers";

jest.mock("../models/file",
  () => jest.genMockFromModule("../models/file"));

jest.mock("../aws-helpers");

const RETRIEVE_DATA = "http://retrieval";
const SAVE_DATA = {"some": "field"};
const FILE_PATH = "somecoll/someid";

File.mockImplementation(() => ({
  fullPath: () => FILE_PATH,
}));

describe("handler function", async () => {

  beforeEach(async () => {
    authorizeS3Post.mockReturnValue(SAVE_DATA);
    authorizeS3Retrieval.mockReturnValue(RETRIEVE_DATA);
  });

  afterEach(() => {
    authorizeS3Post.mockReset();
    authorizeS3Retrieval.mockReset();
  });


  it("instantiates a file", async () => {
    await handler();
    expect(File.mock.calls).toHaveLength(1);
    expect(File.mock.calls[0]).toEqual(["image-input"]);
  });

  it("returns authorizations", async () => {
    const { retrieve, save } = await handler();
    expect(retrieve).toBe(RETRIEVE_DATA);
    expect(save).toBe(SAVE_DATA);
  });

  it("authorizes via s3", async () => {
    await handler();
    expect(authorizeS3Retrieval.mock.calls).toHaveLength(1);
    expect(authorizeS3Retrieval.mock.calls[0]).toEqual([FILE_PATH]);
    expect(authorizeS3Post.mock.calls).toHaveLength(1);
    expect(authorizeS3Post.mock.calls[0]).toEqual([FILE_PATH]);
  });

});

