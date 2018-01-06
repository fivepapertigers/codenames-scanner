import { AWS } from 'aws-sdk';
import { uuid4 } from 'uuid';

const S3 = new AWS.S3();
const UPLOAD_BUCKET = 'codenames-scanner';
const EXPIRATION = 120; // 2 minutes
const MAX_FILE_SIZE = 10485760;
const FOLDER = 'image-input'

const DEFAULT_PARAMS = {
    Bucket: UPLOAD_BUCKET,
    Expires: EXPIRATION,
    Conditions: [
        ['content-length-range', 0, MAX_FILE_SIZE],
    ]
};

export function handler (event, context, callback) {
    const body = event.body;
    const fileName = uuid4();
    const key = `${FOLDER}/${filename}`;
    const data = Object.assign({ key }, DEFAULT_PARAMS);

    S3.getSignedUrl('putObject', params, function (err, url) {
        if (err) {
            console.error(err);
            raiseServerError(callback);
        } else {
            formatResponse(200, { url }, callback);
        }
    });
}

function raiseServerError (callback) {
    return formatResponse(500, {'error': 'Server Error'});
}

function formatResponse (status, body, callback) {
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
            'Content-Type': 'application/json'
        },
        'body': body
    }
}
