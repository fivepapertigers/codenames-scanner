
/**
 * @module ImageProcessor
 * @description logic for processing capture images
 */

import { ImageEditor, ImageStore } from 'react-native';
import RNTesseractOcr from 'react-native-tesseract-ocr';
import ImageResizer from 'react-native-image-resizer';

import {
    cardWidthPixels, cardHeightPixels, cardLeftPixels, cardTopPixels
} from './BoardDimensions';
import { CardImage } from './Models';
import base64 from 'base-64';

const LANG_ENGLISH = 'eng';

export async function sliceImageIntoCards (image, board) {

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
            return cropImage(`file://${image.path}`, cropData)
                .then(uri => new CardImage(card, { uri, width, height }));
    }));
}

export async function detectWordsOnCardImage (cardImage) {
    const path = cardImage.image.uri.replace('file://', '');
    try {
        const result = await RNTesseractOcr.startOcr(path, 'LANG_ENGLISH');
    } catch (exp) {
        throw new Error(`OCR error: ${exp}`);
    }
    this.cardImage.card.word = result;
}

// function loadImage(uri) {
//     return new Promise((res, rej) => ImageStore.getBase64ForTag(uri, res, rej))
//         .then(base64.decode);
// }

function cropImage(uri, cropData) {
    return new Promise(
        (res, rej) => ImageEditor.cropImage(uri, cropData, res, rej));
}
