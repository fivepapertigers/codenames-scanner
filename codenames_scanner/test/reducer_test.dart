import 'package:flutter_test/flutter_test.dart';
import 'package:codenames_scanner/state/_reducer.dart';
import 'package:codenames_scanner/state/_state_model.dart';
import 'package:codenames_scanner/models.dart';
import 'package:codenames_scanner/utils/util.dart';

void main() {
  test('updates cards', () {
    TransientAppState appState = new TransientAppState()..board = generateNewBoard();
    BoardCard newBC = new BoardCard();
    TransientAppState newAppState = updateCards((int row, int col, BoardCard bc) => newBC)(appState);

    expect(newAppState.board[0][0], newBC);
  });

  test('updates card', () {
    TransientAppState appState = new TransientAppState()..board = generateNewBoard();
    BoardCard newBC = new BoardCard();
    TransientAppState newAppState = updateCard(0, 0, (BoardCard bc) => newBC)(appState);

    expect(newAppState.board[0][0], newBC);
  });


  test('modifies card', () {
    TransientAppState appState = new TransientAppState()..board = generateNewBoard();
    BoardCard newBC = new BoardCard(covered: true);
    TransientAppState newAppState = modifyCardAttributes(0, 0, newBC)(appState);
    expect(newAppState.board[0][0].covered, true);
  });

  test('creates transient from state', () {
    AppState state = new AppState(
        board: [],
        boardImage: new ImageModel('abc')
    );

    TransientAppState transient = TransientAppState.fromAppState(state);
    expect(transient.boardImage, state.boardImage);

  });

  test('creates state from transient', () {

    TransientAppState transient = new TransientAppState()
      ..board = []
      ..boardImage = new ImageModel('abc');

    AppState state = transient.finalize();
    expect(transient.board, state.board);
    expect(transient.boardImage, state.boardImage);

  });
}
