/**
 * @jest-environment node
 */

import { findTermFromImage } from "./util/img-processor";
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
        findTermFromImage.mockReturnValue("resultterm");
    });

    afterEach(() => {
        TermResult.mockReset();
        File.mockReset();
        findTermFromImage.mockReset();
    });

    it("loads file from storage", async () => {
        return handler(EVENT).then(() => {
            expect(File.loadFromPath.mock.calls).toHaveLength(1);
            expect(File.loadFromPath.mock.calls[0]).toEqual(["path/to/filename"]);
        });
    });

    it("finds term from file", async () => {
        return handler(EVENT).then(() => {
            expect(findTermFromImage.mock.calls[0]).toEqual(["filecontents"]);
        });
    });

    it("saves the result", async () => {
        return handler(EVENT).then(() => {
            expect(TermResult.mock.calls).toHaveLength(1);
            expect(TermResult.mock.calls[0]).toEqual(["filename", "resultterm"]);
            expect(TermResult.mock.instances).toHaveLength(1);
            expect(TermResult.mock.instances[0].save.mock.calls).toHaveLength(1);
        });
    });

});

