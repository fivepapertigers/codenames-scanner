
/**
 * @module ImageProcessor
 * @description logic for processing capture images
 */

import { ImageEditor } from "react-native";
import {
    cardWidthPixels, cardHeightPixels, cardLeftPixels, cardTopPixels
} from "./BoardDimensions";
import { CardImage } from "./Models";


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
