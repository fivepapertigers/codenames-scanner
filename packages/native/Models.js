const shuffle = require("shuffle-array");


export const CardTypes = {
  Team: "team",
  Bystander: "bystander",
  Assassin: "assassin",
  Wild: "wild"
};

export const Teams = {
  Blue: "blue",
  Red: "red",
  None: "none"
};

export const CardQuantities = {
  [CardTypes.Blue]: 8,
  [CardTypes.Red]: 8,
  [CardTypes.Bystander]: 7,
  [CardTypes.Assassin]: 1,
  [CardTypes.Wild]: 1
};

export const CardColors = {
  [CardTypes.Blue]: "blue",
  [CardTypes.Red]: "red",
  [CardTypes.Bystander]: "grey",
  [CardTypes.Assassin]: "black"
};

export class Card {
    constructor (row, column, term = null, type = null, id = null, confidence = null) {
        this.id = id;
        this.row = row;
        this.column = column;
        this.term = term;
        this.type = type;
        this.confidence = confidence;
        this.exposed = false;
    }

    color () {
      if (this.type) {
        return CardColors[this.type];
      }
      return null;
    }
}

export class Board {
  constructor () {
    this.cards = [];
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        this.cards.push(new Card(row, col));
      }
    }
    this.regenerateSpyMap();
  }

  regenerateSpyMap () {
    this.wildColor = Math.random() > .5 ? CardTypes.Blue : CardTypes.Red;
    let spyMap = getRandomSpyMap(this.wildColor);
    this.cards.forEach(card => {
        card.type = spyMap.pop();
    });
  }
}


export class CardImage {
  constructor(card, image) {
    this.card = card;
    this.image = image;
  }
}

function getRandomSpyMap (wildColor) {
  return shuffle(Object.keys(CardQuantities).reduce((types, type) => {
    let newTypes = [];
    for (let i = 0; i < CardQuantities[type]; i++) {
      newTypes.push(type === CardTypes.Wild ? wildColor : type);
    }
    return types.concat(newTypes);
  }, []));
}
