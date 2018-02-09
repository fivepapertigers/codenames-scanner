/* eslint-env node, es6 */
/**
 * @module ImageProcessor
 * @description logic for processing capture images
 */

import { ImageEditor, ImageStore } from "react-native";
import {
  cardWidthPixels, cardHeightPixels, cardLeftPixels, cardTopPixels
} from "./BoardDimensions";


export async function getImageB64(image) {
  return new Promise((res, rej) => ImageStore.getBase64ForTag(image.uri, res, rej));
}

/**
 * Slices a card from the board and returns the uri
 * @param  {Image} boardImage
 * @return {(row: number, column: number) => string}
 */
export function sliceCardFromBoardImage (boardImage) {
  const width = Math.round(cardWidthPixels(boardImage.width)),
    height = Math.round(cardHeightPixels(boardImage.height));
  return async (row, col) => {
    const card = { row, col };
    const cropData = {
      offset: {
        x: cardLeftPixels(boardImage.width, card),
        y: cardTopPixels(boardImage.height, card)
      },
      size: {
        width: width,
        height: height
      },
    };
    const uri = await cropImage(boardImage.uri, cropData);
    return { uri, width, height };
  };
}

async function cropImage(uri, cropData) {
  return new Promise(
    (res, rej) => ImageEditor.cropImage(uri, cropData, res, rej));
}
