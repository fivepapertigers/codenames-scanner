import 'package:codenames_scanner/actions.dart';
import 'package:codenames_scanner/models.dart';
import 'package:meta/meta.dart';
import 'dart:math';
import 'package:codenames_scanner/utils/util.dart';
import 'package:codenames_scanner/utils/grid.dart';

@immutable
class AppState {
  final List<List<BoardCard>> board;
  final ImageModel boardImage;
  final Corners gridCorners;
  AppState({this.board, this.boardImage, this.gridCorners});
  static combine(AppState prevState, AppState newState) {
    return new AppState(
      board: newState.board == null ? prevState.board : newState.board,
      boardImage: newState.boardImage== null ? prevState.boardImage: newState.boardImage,
      gridCorners: newState.gridCorners== null ? prevState.gridCorners: newState.gridCorners
    );
  }
}

AppState initialState = new AppState(
  board: generateNewBoard(),
  gridCorners: new Corners(
      new Offset(50.0, 50.0), new Offset(200.0, 50.0),
      new Offset(50.0, 200.0), new Offset(200.0, 200.0)
  )
);

AppState appReducer(AppState currentState, action) {

  var state = new AppState();

  if (action is ClearBoard) {
    state = new AppState(board: generateNewBoard());
  } else if (action is AddTermToCard) {
    state = modifyCardAttributes(
      action.row, action.col, new BoardCard(termResult: action.termResult)
    )(currentState);
  } else if (action is AddImageToCard) {
    state = modifyCardAttributes(
        action.row, action.col, new BoardCard(image: action.image)
    )(currentState);
  } else if (action is ToggleCardCovered) {
    state = updateCard(
      action.row, action.col, (card) => card.update(new BoardCard(covered: card.covered))
    )(currentState);
  } else if (action is AddBoardImage) {
    state = new AppState(
      boardImage: action.image,
      gridCorners: defaultCornersFromImage(action.image)
    );
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
  } else if (action is UpdateGridCorner) {
    state = new AppState(
      gridCorners: currentState.gridCorners.updateCorner(
        action.corner, action.coordinates
      )
    );
  }

  return AppState.combine(currentState, state);
}

typedef AppState StateUpdateFunc(AppState appState);

StateUpdateFunc modifyCardAttributes (int row, int col, BoardCard newCard) =>
  updateCard(row, col, (BoardCard card) {
    print('Image: ${card.image}');
    return card.update(newCard);
  })
    ;

StateUpdateFunc updateCard (int row, int col, BoardCard Function(BoardCard) updateFunc) =>
  updateCards((int innerRow, int innerCol, BoardCard card) =>
    innerRow == row && innerCol == col ? updateFunc(card) : card);


StateUpdateFunc updateCards (BoardCard Function(int, int, BoardCard) updateFunc) =>
  (AppState state) =>
    new AppState(
      board: mapWithIndex(state.board, (List<BoardCard> boardRow, int row) =>
        mapWithIndex(boardRow, (BoardCard card, int col) =>
          updateFunc(row, col, card))));


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