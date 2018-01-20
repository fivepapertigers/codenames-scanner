import path from "path";
import AWS from "aws-sdk";
import randtoken from "rand-token";

import { BUCKET, TOKEN_CHARACTER_SET } from "../config";


const EXPIRATION = 120; // 2 minutes
const MAX_FILE_SIZE = 10485760;

export default class File {

    static async loadFromPath (filePath) {
        const fileName = path.basename(filePath);
        const folder = path.dirname(filePath);
        return this.load(folder, fileName);
    }

    static async load (folder, fileName) {
        const s3 = new AWS.S3();
        const params = {Bucket: BUCKET, Key: formatS3Key(folder, fileName)};
        const data = await s3.getObject(params).promise();
        return new File(folder, fileName, data.Body);
    }

    constructor(folder, name = randtoken.generate(6, TOKEN_CHARACTER_SET), contents) {
        this.folder = folder;
        this.name = name;
        this.contents = contents;
    }

    async save() {
        const s3 = new AWS.S3();
        const params = {
            Bucket: BUCKET,
            Key: this._s3Key(),
            Body: this.contents
        };
        await s3.putObject(params).promise();
        return;
    }

    async getRetrievalLink () {
        const params = {
            Bucket: BUCKET,
            Expires: EXPIRATION,
            Key: this._s3Key()
        };
        return await getSignedUrl("getObject", params);
    }

    async getSaveLink () {
        const params = {
            Bucket: BUCKET,
            Expires: EXPIRATION,
            Key: this._s3Key(),
            // Conditions: [
            //     ["content-length-range", 0, MAX_FILE_SIZE],
            // ]
        };
        return await getSignedUrl("putObject", params);
    }

    _s3Key() {
        return formatS3Key(this.folder, this.name);
    }
}

function formatS3Key (folder, fileName) {
    return `${folder}/${fileName}`;
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
