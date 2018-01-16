import { UPLOAD_FOLDER } from "../config";

import File from "../models/file";
import { apiProxyHandler } from "./util/lambda-handler";

async function authorizeUpload () {

    const file = new File(UPLOAD_FOLDER);
    const retrieve = await file.getRetrievalLink();
    const save = await file.getSaveLink();
    return { retrieve, save };
}

export const handler = apiProxyHandler(authorizeUpload);
