/**
 * @jest-environment node
 */

import AWS from "aws-sdk-mock";

import {
    authorizeS3Retrieval, authorizeS3Post, loadS3File, saveS3File
} from "./aws-helpers";


const CONTENT = "somecontent";
const MOCK_URL = "someurl";
const KEY = "somekey";
const BUCKET = "somebucket";
jest.mock("./config", () => ({BUCKET: "somebucket"}));

let callback, mockMethod;


describe("authorizeS3Retrieval method", async () => {

    beforeEach(async () => {
        mockMethod = jest.fn();
        AWS.mock("S3", "getSignedUrl", mockMethod);
        mockMethod.mockImplementation((meth, params, cb) => {
            callback = cb;
            cb(null, MOCK_URL);
        });
    });

    afterEach(() => {
        AWS.restore("S3");
    });

    it("gets the link from S3", async () => {
        await authorizeS3Retrieval(KEY);
        expect(mockMethod.mock.calls).toHaveLength(1);
        expect(mockMethod.mock.calls[0]).toEqual([
        "getObject",
        {
            "Key": "somekey",
            "Bucket": BUCKET,
            "Expires": 120
        }, callback]);
    });

    it("returns the link", async () => {
        const url = await authorizeS3Retrieval(KEY);
        expect(url).toEqual(MOCK_URL);
    });

});

describe("createPresignedPost method", async () => {

    const FIELDS = "somefields";
    const MOCK_RESPONSE = {
        url: MOCK_URL,
        fields: FIELDS
    };

    beforeEach(async () => {
        mockMethod = jest.fn();
        AWS.mock("S3", "createPresignedPost", mockMethod);
        mockMethod.mockImplementation((params, cb) => {
            callback = cb;
            cb(null, MOCK_RESPONSE);
        });
    });

    afterEach(() => {
        AWS.restore("S3");
    });

    it("gets fields from s3", async () => {
        await authorizeS3Post(KEY);
        expect(mockMethod.mock.calls).toHaveLength(1);
        expect(mockMethod.mock.calls[0]).toEqual([
        {
            Bucket: BUCKET,
            Expires: 120,
            Conditions: [
                ["content-length-range", 0, 10485760],
                ["eq", "$key", KEY]
            ]
        }, callback]);
    });

    it("returns the fields", async () => {
        const fields = await authorizeS3Post(KEY);
        expect(fields).toEqual(MOCK_RESPONSE);
    });

});



describe("loadS3File method", async () => {

    beforeEach(async () => {
        mockMethod = jest.fn();
        AWS.mock("S3", "getObject", mockMethod);
        mockMethod.mockImplementation((params, cb) => {
            callback = cb;
            cb(null, {Body: CONTENT});
        });
    });

    afterEach(() => {
        AWS.restore("S3");
    });

    it("retrieves from s3", async () => {
        await loadS3File(KEY);
        expect(mockMethod.mock.calls).toHaveLength(1);
        expect(mockMethod.mock.calls[0]).toEqual([{
            "Key": KEY,
            "Bucket": BUCKET,
        }, callback]);
    });

    it("returns a File instance", async () => {
        const contents = await loadS3File(KEY);
        expect(contents).toEqual(CONTENT);
    });

});


describe("save method", async () => {

    beforeEach(async () => {
        mockMethod = jest.fn();
        AWS.mock("S3", "putObject", mockMethod);
        mockMethod.mockImplementation((params, cb) => {
            callback = cb;
            cb(null);
        });
    });

    afterEach(() => {
        AWS.restore("S3");
    });

    it("puts the file in S3", async () => {
        await saveS3File(KEY, CONTENT);
        expect(mockMethod.mock.calls).toHaveLength(1);
        expect(mockMethod.mock.calls[0]).toEqual([{
            "Key": KEY,
            "Bucket": BUCKET,
            "Body": CONTENT,
        }, callback]);
    });

    it("does not return", async () => {
        const res = await saveS3File(KEY, CONTENT);
        expect(res).toBe(undefined);
    });

});
