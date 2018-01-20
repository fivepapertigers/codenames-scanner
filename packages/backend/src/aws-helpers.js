/* eslint-env node, es6 */

import AWS from "aws-sdk";
import { BUCKET } from "./config";
const EXPIRATION = 120; // 2 minutes
const MAX_FILE_SIZE = 10485760;

export async function authorizeS3Retrieval(key) {
    const params = {
        Bucket: BUCKET,
        Expires: EXPIRATION,
        Key: key
    };
    return promisify("S3", "getSignedUrl")("getObject", params);
}

export async function authorizeS3Post(key) {
    const params = {
        Bucket: BUCKET,
        Expires: EXPIRATION,
        Conditions: [
            ["content-length-range", 0, MAX_FILE_SIZE],
            ["eq", "$key", key]
        ]
    };
    return await promisify("S3", "createPresignedPost")(params);
}

export async function loadS3File (key) {
    const params = {Bucket: BUCKET, Key: key};
    const data = await promisify("S3", "getObject")(params);
    return data.Body;
}

export async function saveS3File (key, contents) {
    const params = {
        Bucket: BUCKET,
        Key: key,
        Body: contents
    };
    await promisify("S3", "putObject")(params);
    return;
}


function promisify (service, method) {
    return async (...params) => new Promise((res, rej) => {
        return new AWS[service]()[method](...params, (err, data) => {
            if (err) {
                rej(err);
            } else {
                res(data);
            }
        });
    });
}
