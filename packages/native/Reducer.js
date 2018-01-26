import * as Actions from "./Actions";
import { Teams, CardTypes } from "./Models";

import shuffle from "shuffle-array";


export function appReducer(currentState, action) {
  return updateState(reduceState(action))(currentState);
}


export function generateEmptyBoard() {
  const board = [];
  for (let i = 0; i < 5; i++ ){
    const row = [];
    for (let j = 0; j < 5; j++ ){
      row.push({});
    }
    board.push(row);
  }
  return board;
}


function reduceState(action) {
  switch (action.type) {
    case Actions.GENERATE_BOARD: {
      return () => ({ board: generateEmptyBoard() });
    }
    case Actions.ADD_TERM_TO_CARD:{
      const { term, row, col } = action;
      return modifyCardAttrs({ term })(row, col);
    }
    case Actions.TOGGLE_CARD_COVERED:{
      const { row, col } = action;
      return updateCard(
        currentCard => ({covered: !currentCard.covered})
      )(row, col);
    }
    case Actions.ADD_IMAGE_TO_CARD:{
      const { row, col, image } = action;
      return modifyCardAttrs({ image })(row, col);
    }
    case Actions.ADD_BOARD_IMAGE:{
      const { image } = action;
      return () => ({ image });
    }
    case Actions.DESIGNATE_REMAINING_CARDS:{
      return designateRemainingCards;
    }
  }
  return () => {};
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
  const teamCounts = {
    [Teams.Red]: 8,
    [Teams.Blue]: 8
  };

  const typeCounts = {
    [CardTypes.Team]: 16,
    [CardTypes.Wild]: 1,
    [CardTypes.Bystander]: 7,
    [CardTypes.Assassin]: 1
  };

  currentState.board
    .forEach(row => row.forEach(card => {
      if (card.type) {
        typeCounts[card.type]--;
      }
      if (card.type !== CardTypes.Wild && card.team) {
        teamCounts[card.team]--;
      }
    }));

  const teamStack = shuffle([].concat(
    ...Object.keys(teamCounts).map(
      team => iterate(() => team)(teamCounts[team])
    )
  ));

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
        let team;
        switch (type) {
          case CardTypes.Team:
            team = teamStack.pop();
            break;
          case CardTypes.Wild:
            team = shuffle([Teams.Red, Teams.Blue])[0];
            break;
          default:
            team = Teams.None;
            break;
        }
        return Object.assign({}, card, { type, team });
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
