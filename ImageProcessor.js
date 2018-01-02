
/**
 * @module ImageProcessor
 * @description logic for processing capture images
 */

import { ImageEditor, ImageStore } from 'react-native';
import {
    cardWidthPixels, cardHeightPixels, cardLeftPixels, cardTopPixels
} from './BoardDimensions';
import { CardImage } from './Models';
import base64 from 'base-64';


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

export async function detectWordsOnCardImage (cardImage) {
    const imageData = await loadImage(cardImage.image.uri)
    return Tesseract.recognize(imageData)
        .then(console.log);
}

function loadImage(uri) {
    return new Promise((res, rej) => ImageStore.getBase64ForTag(uri, res, rej))
        .then(base64.decode);
}

function cropImage(uri, cropData) {
    return new Promise(
        (res, rej) => ImageEditor.cropImage(uri, cropData, res, rej));
}