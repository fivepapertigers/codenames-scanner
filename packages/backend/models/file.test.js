/**
 * @jest-environment node
 */

import AWS from "aws-sdk-mock";

import File from "./file";

jest.mock("../config", () => ({BUCKET: "somebucket", TOKEN_CHARACTER_SET: "A"}));

const CONTENT = "somecontent";
const MOCK_URL = "someurl";

let callback;

describe("load static method", async () => {

    let mockGet;

    beforeEach(async () => {
        mockGet = jest.fn();
        AWS.mock("S3", "getObject", mockGet);
        mockGet.mockImplementation((params, cb) => {
            callback = cb;
            cb(null, {Body: CONTENT});
        });
    });

    afterEach(() => {
        AWS.restore("S3");
    });

    it("retrieves from s3", async () => {
        await File.load("somecoll", "someid");
        expect(mockGet.mock.calls).toHaveLength(1);
        expect(mockGet.mock.calls[0]).toEqual([{
            "Key": "somecoll/someid",
            "Bucket": "somebucket",
        }, callback]);
    });

    it("returns a File instance", async () => {
        const file = await File.load("somecoll", "someid");
        expect(file.contents).toEqual(CONTENT);
        expect(file.folder).toEqual("somecoll");
        expect(file.name).toEqual("someid");
    });

});


describe("loadFromPath static method", async () => {

    let mockGet;

    beforeEach(async () => {
        mockGet = jest.fn();
        AWS.mock("S3", "getObject", mockGet);
        mockGet.mockImplementation((params, cb) => {
            callback = cb;
            cb(null, {Body: CONTENT});
        });
    });

    afterEach(() => {
        AWS.restore("S3");
    });

    it("returns a File instance", async () => {
        const file = await File.loadFromPath("somecoll/someid");
        expect(file.contents).toEqual(CONTENT);
        expect(file.folder).toEqual("somecoll");
        expect(file.name).toEqual("someid");
    });

});


describe("constructor", () => {

    it("instantiates a new file", () => {
        const file = new File("somecoll", "someid", CONTENT);
        expect(file.contents).toEqual(CONTENT);
        expect(file.folder).toEqual("somecoll");
        expect(file.name).toEqual("someid");
    });

    it("randomly generates a name", () => {
        const file = new File("somecoll");
        expect(file.name).toEqual("AAAAAA");
    });

});


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

    it("puts the file in S3", async () => {
        new File("somecoll", "someid", CONTENT).save();
        expect(mockPut.mock.calls).toHaveLength(1);
        expect(mockPut.mock.calls[0]).toEqual([{
            "Key": "somecoll/someid",
            "Bucket": "somebucket",
            "Body": CONTENT,
        }, callback]);
    });

    it("does not return", async () => {
        const res = await new File("somecoll", "someid", CONTENT).save();
        expect(res).toBe(undefined);
    });

});


describe("getRetievalLink method", async () => {

    let mockSignUrl;

    beforeEach(async () => {
        mockSignUrl = jest.fn();
        AWS.mock("S3", "getSignedUrl", mockSignUrl);
        mockSignUrl.mockImplementation((meth, params, cb) => {
            callback = cb;
            cb(null, MOCK_URL);
        });
    });

    afterEach(() => {
        AWS.restore("S3");
    });

    it("gets the link from S3", async () => {
        const file = new File("somecoll", "someid", CONTENT);
        file.getRetrievalLink();
        expect(mockSignUrl.mock.calls).toHaveLength(1);
        expect(mockSignUrl.mock.calls[0]).toEqual([
        "getObject",
        {
            "Key": "somecoll/someid",
            "Bucket": "somebucket",
            "Expires": 120,
        }, callback]);
    });

    it("returns the link", async () => {
        const file = new File("somecoll", "someid", CONTENT);
        const url = await file.getRetrievalLink();
        expect(url).toEqual(MOCK_URL);
    });
});


describe("getSaveLink method", async () => {

    let mockSignUrl;

    beforeEach(async () => {
        mockSignUrl = jest.fn();
        AWS.mock("S3", "getSignedUrl", mockSignUrl);
        mockSignUrl.mockImplementation((meth, params, cb) => {
            callback = cb;
            cb(null, MOCK_URL);
        });
    });

    afterEach(() => {
        AWS.restore("S3");
    });

    it("gets the link from S3", async () => {
        const file = new File("somecoll", "someid", CONTENT);
        file.getSaveLink();
        expect(mockSignUrl.mock.calls).toHaveLength(1);
        expect(mockSignUrl.mock.calls[0]).toEqual([
        "putObject",
        {
            "Key": "somecoll/someid",
            "Bucket": "somebucket",
            "Expires": 120,
            // "Conditions": [["content-length-range", 0, 10485760]]
        }, callback]);
    });

    it("returns the link", async () => {
        const file = new File("somecoll", "someid", CONTENT);
        const url = await file.getSaveLink();
        expect(url).toEqual(MOCK_URL);
    });

});

