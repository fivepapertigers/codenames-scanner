/**
 * @jest-environment node
 */

import File from "../models/file";
import Handler from "./authorize-upload";

jest.mock("../models/file",
    () => jest.genMockFromModule("../models/file"));

const RETRIEVE_LINK = "http://retrieval";
const SAVE_LINK = "http://save";

describe("handler function", async () => {

    beforeEach(async () => {
        File.mockImplementation(() => ({
            getRetrievalLink: async () => RETRIEVE_LINK,
            getSaveLink: async () => SAVE_LINK
        }));
    });


    it("instantiates a file", async () => {
        await Handler.handle();
        expect(File.mock.calls).toHaveLength(1);
        expect(File.mock.calls[0]).toEqual(["image-input"]);
    });

    it("gets links", async () => {
        const { retrieve, save } = await Handler.handle();
        expect(retrieve).toBe(RETRIEVE_LINK);
        expect(save).toBe(SAVE_LINK);
    });

});

