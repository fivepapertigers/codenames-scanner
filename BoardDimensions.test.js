import * as BoardDimensions from './BoardDimensions';
import { Card } from './Models';

test ('returns the width of the card', () => {
    expect(BoardDimensions.cardWidthPixels(144)).toBe(24);
});

test ('returns the width of the margin', () => {
    expect(BoardDimensions.marginWidthPixels(144)).toBe(12);
});

test ('returns the left position of the card', () => {
    const card = new Card(1, 1);
    expect(BoardDimensions.cardLeftPixels(144, card)).toBe(36);
});

test ('returns the left position of the card as ratio', () => {
    const card = new Card(1, 1);
    expect(BoardDimensions.cardLeftRatio(card)).toBe(12 / 48);
});

test ('returns the height of the card', () => {
    expect(BoardDimensions.cardHeightPixels(108)).toBe(18);
});

test ('returns the height of the margin', () => {
    expect(BoardDimensions.marginHeightPixels(108)).toBe(9);
});

test ('returns the top position of the card', () => {
    const card = new Card(1, 1);
    expect(BoardDimensions.cardTopPixels(108, card)).toBe(27);
});

test ('returns the top position of the card as a ratio', () => {
    const card = new Card(1, 1);
    expect(BoardDimensions.cardTopRatio(card)).toBe(9 / 36);
});