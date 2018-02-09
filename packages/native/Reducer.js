import * as Actions from "./Actions";
import { CardTypes } from "./Models";
import { generateEmptyBoard } from "./BoardUtils";

import shuffle from "shuffle-array";


export function appReducer(currentState, action) {
  return updateState(reduceState(action))(currentState);
}


function reduceState(action) {
  switch (action.type) {
    case Actions.CLEAR_BOARD: {
      return () => ({ board: generateEmptyBoard() });
    }
    case Actions.ADD_TERM_TO_CARD:{
      const { termResult, row, col } = action;
      return modifyCardAttrs({ termResult })(row, col);
    }
    case Actions.TOGGLE_CARD_COVERED:{
      const { row, col } = action;
      return updateCard(
        currentCard => Object.assign({}, currentCard, {covered: !currentCard.covered})
      )(row, col);
    }
    case Actions.ADD_IMAGE_TO_CARD:{
      const { row, col, image } = action;
      return modifyCardAttrs({ image })(row, col);
    }
    case Actions.ADD_BOARD_IMAGE:{
      const { boardImage } = action;
      return () => ({ boardImage });
    }
    case Actions.DESIGNATE_REMAINING_CARDS:{
      return designateRemainingCards;
    }
  }
  return () => ({});
}


function updateState(updateFunc) {
  return currentState => Object.assign({}, currentState,
    updateFunc ? updateFunc(currentState) : {}
  );
}


function modifyCardAttrs(newCard) {
  return updateCard(currentCard => Object.assign({}, currentCard, newCard));
}


function updateCard(updateFunc) {
  return (rowNum, colNum) => currentState => ({
      board: currentState.board.map((r, ri) => r.map((currentCard, ci) =>
      ri === rowNum && ci === colNum
        ? updateFunc(currentCard)
        : currentCard
      ))
    });
}


function designateRemainingCards(currentState) {

  const typeCounts = {
    [CardTypes.Blue]: 8,
    [CardTypes.Red]: 8,
    [CardTypes.Bystander]: 7,
    [CardTypes.Assassin]: 1
  };

  currentState.board
    .forEach(row => row.forEach(card => {
      if (card.type) {
        typeCounts[card.type]--;
      }
    }));

  // if neither blue nor red has the wild, randomly assign to one or the other
  if (typeCounts[CardTypes.Blue] > -1 && typeCounts[CardTypes.Red] > -1) {
    const wild = shuffle([CardTypes.Red, CardTypes.Blue])[0];
    typeCounts[wild]++;
  }

  const typeStack = shuffle([].concat(
    ...Object.keys(typeCounts).map(
      type => iterate(() => type)(typeCounts[type])
    )
  ));

  return {
    board: currentState.board
      .map(row => row.map(card => {
        if (card.type) {
          return card;
        }
        const type = typeStack.pop();
        return Object.assign({}, card, { type });
      }))
    };
}


function iterate(iteratee) {
  return iterations => {
    let arr = [];
    for (let idx = 0; idx < iterations; idx++) {
      arr.push(iteratee(idx));
    }
    return arr;
  };
}
