import 'package:codenames_scanner/actions.dart';
import 'package:codenames_scanner/models.dart';
import 'package:meta/meta.dart';
import 'dart:math';

@immutable
class AppState {
  final List<List<BoardCard>> board;
  final ImageModel boardImage;
  AppState({this.board, this.boardImage});
  static combine(AppState prevState, AppState newState) {
    return new AppState(
      board: newState.board == null ? prevState.board : newState.board,
      boardImage: newState.boardImage== null ? prevState.boardImage: newState.boardImage
    );
  }
}

AppState initialState = new AppState(
  board: generateNewBoard()
);

AppState appReducer(AppState currentState, action) {

  var state = new AppState();

  if (action is ClearBoard) {
    state = new AppState(board: generateNewBoard());
  } else if (action is AddTermToCard) {
    state = modifyCardAttributes(
      action.row, action.col, new BoardCard(termResult: action.termResult)
    )(currentState);
  } else if (action is ToggleCardCovered) {
    state = updateCard(
      action.row, action.col, (card) => card.update(new BoardCard(covered: card.covered))
    )(currentState);
  } else if (action is AddBoardImage) {
    state = new AppState(boardImage: action.image);
  } else if (action is DesignateCards) {

    var rand = new Random();
    var extraIsBlue = rand.nextBool();

    var list = new List(25);
    list.add(CardTypes.Assassin);
    for (var i = 0; i < 9; i ++) {
      if (i < 8 || extraIsBlue) {
        list.add(CardTypes.Blue);
      }
      if (i < 8 || !extraIsBlue) {
        list.add(CardTypes.Red);
      }
      if (i < 7) {
        list.add(CardTypes.Bystander);
      }
    }
    list.shuffle();

    state = updateCards((row, col, card) =>
      card.update(new BoardCard(type: list[row * 5 + col]))
    )(currentState);
  }

  return AppState.combine(currentState, state);
}

var modifyCardAttributes = (row, col, newCard) =>
  updateCard(row, col, (card) =>
    card.update(newCard));

var updateCard = (row, col, updateFunc) =>
  updateCards((irow, icol, card) =>
    irow == row && icol == col ? updateFunc(card) : card);


var updateCards = (Function updateFunc) =>
  (AppState state) =>
    new AppState(
      board: mapWithIndex(state.board, (row, boardRow) =>
        mapWithIndex(boardRow, (col, card) => updateFunc(row, col, card))));

List mapWithIndex(List list, Function func) {
  return list.asMap().map((idx, item) => new MapEntry(idx, func(idx, item))).entries.toList();
}


List<BoardCard> generateNewBoardRow() {
  return [
    new BoardCard(), new BoardCard(), new BoardCard(), new BoardCard(), new BoardCard()
  ];
}

List<List<BoardCard>> generateNewBoard() {
  return [
    generateNewBoardRow(),
    generateNewBoardRow(),
    generateNewBoardRow(),
    generateNewBoardRow(),
    generateNewBoardRow(),
  ];
}