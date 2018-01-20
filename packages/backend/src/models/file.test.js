/**
 * @jest-environment node
 */

import File from "./file";
import { loadS3File, saveS3File } from "../aws-helpers";

jest.mock("../config", () => ({TOKEN_CHARACTER_SET: "A"}));
jest.mock("../aws-helpers");

const CONTENT = "somecontent";
const FOLDER = "somecoll";
const FILE_NAME = "someid";
const FULL_PATH = "somecoll/someid";

beforeEach(() => {
    loadS3File.mockReturnValue(CONTENT);
    saveS3File.mockReturnValue(undefined);
});

afterEach(() => {
    loadS3File.mockReset();
    saveS3File.mockReset();
});

describe("load static method", async () => {

    it("retrieves from s3", async () => {
        await File.load(FOLDER, FILE_NAME);
        expect(loadS3File.mock.calls).toHaveLength(1);
        expect(loadS3File.mock.calls[0]).toEqual([FULL_PATH]);
    });

    it("returns a File instance", async () => {
        const file = await File.load(FOLDER, FILE_NAME);
        expect(file.contents).toEqual(CONTENT);
        expect(file.folder).toEqual(FOLDER);
        expect(file.name).toEqual(FILE_NAME);
    });

});


describe("loadFromPath static method", async () => {

    it("retrieves from s3", async () => {
        await File.loadFromPath(FULL_PATH);
        expect(loadS3File.mock.calls).toHaveLength(1);
        expect(loadS3File.mock.calls[0]).toEqual([FULL_PATH]);
    });

    it("returns a File instance", async () => {
        const file = await File.loadFromPath(FULL_PATH);
        expect(file.contents).toEqual(CONTENT);
        expect(file.folder).toEqual(FOLDER);
        expect(file.name).toEqual(FILE_NAME);
    });

});


describe("constructor", () => {

    it("instantiates a new file", () => {
        const file = new File(FOLDER, FILE_NAME, CONTENT);
        expect(file.contents).toEqual(CONTENT);
        expect(file.folder).toEqual(FOLDER);
        expect(file.name).toEqual(FILE_NAME);
    });

    it("randomly generates a name", () => {
        const file = new File(FOLDER);
        expect(file.name).toEqual("AAAAAA");
    });

});


describe("save method", async () => {

    it("puts the file in S3", async () => {
        new File(FOLDER, FILE_NAME, CONTENT).save();
        expect(saveS3File.mock.calls).toHaveLength(1);
        expect(saveS3File.mock.calls[0]).toEqual([FULL_PATH, CONTENT]);
    });

    it("does not return", async () => {
        const res = await new File(FOLDER, FILE_NAME, CONTENT).save();
        expect(res).toBe(undefined);
    });

});
