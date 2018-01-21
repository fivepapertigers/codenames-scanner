import { UPLOAD_FOLDER } from "../config";

import File from "../models/file";
import { authorizeS3Post, authorizeS3Retrieval } from "../aws-helpers";
import { apiProxyHandler } from "./util/lambda-handler";

async function authorizeUpload () {

  const file = new File(UPLOAD_FOLDER);
  const retrieve = await authorizeS3Retrieval(file.fullPath());
  const save = await authorizeS3Post(file.fullPath());
  return { retrieve, save };
}

export const handler = apiProxyHandler(authorizeUpload);
