/* eslint-env node, es6 */
/**
 * @module ImageProcessor
 * @description logic for processing capture images
 */

import { ImageEditor, ImageStore } from "react-native";
import {
  cardWidthPixels, cardHeightPixels, cardLeftPixels, cardTopPixels
} from "./BoardDimensions";
import { CardImage } from "./Models";

const AUTHORIZATION_URL = "https://eh8d1i5yeb.execute-api.us-east-1.amazonaws.com/dev/image/authorize";

export function sliceImageIntoCards (image, board) {
  const width = Math.round(cardWidthPixels(image.width)),
    height = Math.round(cardHeightPixels(image.height));
  return Promise.all(board.cards.map((card) => {
      const cropData = {
        offset: {
          x: cardLeftPixels(image.width, card),
          y: cardTopPixels(image.height, card)
        },
        size: {
          width: width,
          height: height
        },
      };

      return cropImage(image.uri, cropData)
        .then(uri => new CardImage(card, { uri, width, height }));
  }));
}

function cropImage(uri, cropData) {
  return new Promise(
    (res, rej) => ImageEditor.cropImage(uri, cropData, res, rej));
}


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
  return null;
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

async function getImageB64(image) {
  return new Promise((res, rej) => ImageStore.getBase64ForTag(image.uri, res, rej));
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
