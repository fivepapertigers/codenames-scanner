/**
 * @jest-environment node
 */

import { findTermFromImage, base64ToJpeg } from "./util/img-processor";
import File from "../models/file";
import { handler } from "./process-image";
import TermResult from "../models/term-result";

jest.mock("../models/term-result",
  () => jest.genMockFromModule("../models/term-result"));

jest.mock("../models/file",
  () => jest.genMockFromModule("../models/file"));

jest.mock("./util/img-processor",
  () => jest.genMockFromModule("./util/img-processor"));

const EVENT = {Records: [{s3: {object: {key: "path/to/filename"}}}]};

describe("handler function", async () => {

  beforeEach(async () => {
    File.loadFromPath.mockReturnValue({
      name: "filename",
      contents: "filecontents"
    });
    findTermFromImage.mockReturnValue({term: "resultterm", confidence: 1});
    base64ToJpeg.mockReturnValue("jpegfilecontents");
  });

  afterEach(() => {
    TermResult.mockReset();
    File.mockReset();
    findTermFromImage.mockReset();
    base64ToJpeg.mockReset();
  });

  it("loads file from storage", async () => {
    return handler(EVENT).then(() => {
      expect(File.loadFromPath.mock.calls).toHaveLength(1);
      expect(File.loadFromPath.mock.calls[0]).toEqual(["path/to/filename"]);
    });
  });

  it("cast image stream to jpeg", async () => {
    return handler(EVENT).then(() => {
      expect(base64ToJpeg.mock.calls).toHaveLength(1);
      expect(base64ToJpeg.mock.calls[0]).toEqual(["filecontents"]);
    });
  });

  it("finds term from file", async () => {
    return handler(EVENT).then(() => {
      expect(findTermFromImage.mock.calls[0]).toEqual(["jpegfilecontents"]);
    });
  });

  it("saves the result", async () => {
    return handler(EVENT).then(() => {
      expect(TermResult.mock.calls).toHaveLength(1);
      expect(TermResult.mock.calls[0]).toEqual(["filename", "resultterm", 1]);
      expect(TermResult.mock.instances).toHaveLength(1);
      expect(TermResult.mock.instances[0].save.mock.calls).toHaveLength(1);
    });
  });

  it("sets term as null if can't convert image", async () => {
    base64ToJpeg.mockReset();
    base64ToJpeg.mockImplementation(() => {
      throw new Error("Can't convert image.");
    });
    return handler(EVENT).then(() => {
      expect(TermResult.mock.calls[0]).toEqual(["filename", null, 0]);
    });
  });

  it("sets term as null if can't find image term", async () => {
    findTermFromImage.mockReset();
    findTermFromImage.mockImplementation(() => {
      throw new Error("Can't convert image.");
    });
    return handler(EVENT).then(() => {
      expect(TermResult.mock.calls[0]).toEqual(["filename", null, 0]);
    });
  });

});

