import AWS from "aws-sdk";

import { BUCKET } from "../../config";

export default class DataStore {
  static async save (collection, id, data) {
    const s3 = new AWS.S3();
    const params = {
      Bucket: BUCKET,
      Key: formatS3Key(collection, id),
      Body: JSON.stringify(data)
    };
    await s3.putObject(params).promise();
    return;
  }

  static async load (folder, fileName) {
    const s3 = new AWS.S3();
    const params = {Bucket: BUCKET, Key: formatS3Key(folder, fileName)};
    const data = await s3.getObject(params).promise();
    return JSON.parse(data.Body);
  }
}

function formatS3Key (folder, fileName) {
  return `${folder}/${fileName}`;
}
