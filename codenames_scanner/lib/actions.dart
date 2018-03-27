import 'package:codenames_scanner/models.dart';

class ClearBoard {}

class AddBoardImage {
  final Image image;
  AddBoardImage(this.image);
}

class AddImageToCard {
  final int row;
  final int col;
  final Image image;
  AddImageToCard(this.row, this.col, this.image);
}

class AddTermToCard {
  final int row;
  final int col;
  final TermResult termResult;
  AddTermToCard(this.row, this.col, this.termResult);
}

class ToggleCardCovered {
  final int row;
  final int col;

  ToggleCardCovered(this.row, this.col);
}

class DesignateCards {}

//
// **
// * Given a new board image:
// *   1) Clear current board
// *   2) Dispatch new image
// *   3) Slice into cards
// *   4) Detect terms for cards
// * @param  {Image} boardImage
// * @return {(dispatch: function, getState: function)} A redux thunk
// */
//export function processBoardImage(boardImage) {
//  return async (dispatch, getState) => {
//    // clear current board
//    dispatch(clearBoard());
//    dispatch(designateRemainingCards());
//
//    // add image to board
//    dispatch(addImageToBoard(boardImage));
//
//    // slice each image
//    const slicer = sliceCardFromBoardImage(boardImage);
//    const { board } = getState();
//
//  // Process each card in the board in parallel, then resolve
//  return Promise.all(flattenBoard({
//  transform: async ({row, col}) => {
//  // Slice card image from board and dispatch
//  const cardImage = await slicer(row, col);
//  dispatch(addImageToCard(row, col, cardImage));
//
//  const termResult = await findTermFromImage(cardImage.uri);
//  dispatch(addTermToCard(row, col, termResult));
//
//  return;
//  }
//  })(board));
//};
//}
