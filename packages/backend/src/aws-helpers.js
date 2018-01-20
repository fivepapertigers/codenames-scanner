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
    return getSignedUrl("getObject", params);
}

export async function authorizeS3Post(key) {
    const s3 = new AWS.S3();
    const params = {
        Bucket: BUCKET,
        Expires: EXPIRATION,
        Conditions: [
            ["content-length-range", 0, MAX_FILE_SIZE],
            ["eq", "$key", key]
        ]
    };
    const result = await s3.createPresignedPost(params).promise();
    return result.Fields;
}

export async function loadS3File (key) {
    const s3 = new AWS.S3();
    const params = {Bucket: BUCKET, Key: key};
    const data = await s3.getObject(params).promise();
    return data.Body;
}


export async function saveS3File (key, contents) {
    const s3 = new AWS.S3();
    const params = {
        Bucket: BUCKET,
        Key: key,
        Body: contents
    };
    await s3.putObject(params).promise();
    return;
}


async function getSignedUrl (method, params) {
    return new Promise((res, rej) => {
        const s3 = new AWS.S3();
        s3.getSignedUrl(method, params, (err, url) => {
            if (err) {
                rej(err);
            } else {
                res(url);
            }
        });
    });
}
