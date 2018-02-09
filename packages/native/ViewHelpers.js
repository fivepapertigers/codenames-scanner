import { CardTypes } from "./Models";

export const getCardColor = cardType => {
  switch (cardType) {
    case CardTypes.Blue:
      return "#B3B2C5";
    case CardTypes.Red:
      return "#E6B3B3";
    case CardTypes.Assassin:
      return "black";
    default:
      return "#C4C4C4";
  }
};

export const getFontColor = cardType => {
  switch (cardType) {
    case CardTypes.Assassin:
      return "white";
    default:
      return "black";
  }
};
