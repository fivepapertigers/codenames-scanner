/* eslint-env node, es6 */
/**
 * @module ImageProcessor
 * @description logic for processing capture images
 */

import { getImageB64 } from "./ImageProcessor";

const AUTHORIZATION_URL = "https://eh8d1i5yeb.execute-api.us-east-1.amazonaws.com/dev/image/authorize";


export async function detectTerm(image) {
  const { save, retrieve } = await authorizeUpload();
  await uploadImage(save.url, save.fields, image);
  const pollStart = Date.now();
  while (Date.now() - pollStart < 30000) {
    const result = await retrieveResult(retrieve);
    if (result) {
      return result;
    }
    await timeout(300);
  }
  return {
    id: null,
    term: null,
    confidence: 0
  };
}

async function authorizeUpload() {
  const response = await fetch(AUTHORIZATION_URL, {
    method: "POST",
  });
  return await response.json();
}

async function uploadImage (url, uploadFields, image) {
  const formData = await prepareUpload(uploadFields, image);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "multipart/form-data",
      "Content-Type": "multipart/form-data"
    },
    body: formData
  });
  if (!response.ok) {
    throw new Error("Upload failed");
  }
  return;
}

async function prepareUpload(uploadFields, image) {
  const formData = new FormData();
  for (const fieldName in uploadFields) {
    formData.append(fieldName, uploadFields[fieldName]);
  }
  const img64 = await getImageB64(image);
  formData.append("file", img64);
  return formData;
}

async function retrieveResult(url) {
  const response = await fetch(url);
  if (response.ok) {
    return response.json();
  }
  return null;
}


async function timeout (ms) {
  return new Promise(res => setTimeout(res, ms));
}
