import 'package:codenames_scanner/models.dart';
import 'dart:math';
import 'package:codenames_scanner/utils/util.dart';
import 'package:codenames_scanner/state/_state_model.dart';
import 'package:codenames_scanner/state/_action_types.dart';


AppState appReducer(AppState state, action) {
  TransientAppState newState = transientReducer(TransientAppState.fromAppState(state), action);
  AppState finalized = newState.finalize();
  return finalized;
}


TransientAppState transientReducer(TransientAppState state, action) {

  if (action is ClearBoard) {
    return state..board = generateNewBoard();
  } else if (action is AddTermToCard) {
    return modifyCardAttributes(
        action.row, action.col, new BoardCard(termResult: action.termResult)
    )(state);
  } else if (action is AddImageToCard) {
    return modifyCardAttributes(
        action.row, action.col, new BoardCard(image: action.image)
    )(state);
  } else if (action is ToggleCardCovered) {
    return updateCard(
        action.row, action.col, (card) => card.update(
        new BoardCard(covered: card.covered == true ? false : true))
    )(state);
  } else if (action is AddBoardImage) {
    return state..boardImage = action.image;
  } else if (action is RemoveBoardImage) {
    return state..boardImage = null;
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

    return updateCards((row, col, card) =>
        card.update(new BoardCard(type: list[row * 5 + col]))
    )(state);
  } else if (action is UpdateGridCorner) {
    return state
      ..gridCorners = state.gridCorners.updateCorner(
          action.corner, action.coordinates
      );
  } else if (action is LoadCameras) {
    return state..cameras = action.cameras;
  } else if (action is AddCameraController) {
    return state..cameraController = action.cameraController;
  } else if (action is RemoveCameraController) {
    return state..cameraController = null;
  } else if (action is UpdateCurrentLanguageStatus) {
    return state..currentLanguageStatus = action.status;
  } else if (action is SetCurrentLanguage) {
    return state
      ..currentLanguage = action.lang
      ..currentLanguageStatus = LoadingStatus.Unstarted;
  }

  return state;
}

typedef TransientAppState StateUpdateFunc(TransientAppState state);

StateUpdateFunc modifyCardAttributes (int row, int col, BoardCard newCard) =>
    updateCard(row, col, (BoardCard card) => card.update(newCard));

StateUpdateFunc updateCard (int row, int col, BoardCard Function(BoardCard) updateFunc) =>
    updateCards((int innerRow, int innerCol, BoardCard card) =>
    innerRow == row && innerCol == col ? updateFunc(card) : card);


StateUpdateFunc updateCards (BoardCard Function(int, int, BoardCard) updateFunc) =>
        (TransientAppState state) =>
    state
      ..board = mapWithIndex(state.board, (List<BoardCard> boardRow, int row) =>
          mapWithIndex(boardRow, (BoardCard card, int col) =>
              updateFunc(row, col, card)));
