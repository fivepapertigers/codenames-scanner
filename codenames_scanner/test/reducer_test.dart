import 'package:flutter_test/flutter_test.dart';
import 'package:codenames_scanner/reducer.dart';
import 'package:codenames_scanner/models.dart';

void main() {
  test('updates cards', () {
    AppState appState = new AppState(board: generateNewBoard());
    BoardCard newBC = new BoardCard();
    AppState newAppState = updateCards((int row, int col, BoardCard bc) => newBC)(appState);

    expect(newAppState.board[0][0], newBC);
  });

  test('updates card', () {
    AppState appState = new AppState(board: generateNewBoard());
    BoardCard newBC = new BoardCard();
    AppState newAppState = updateCard(0, 0, (BoardCard bc) => newBC)(appState);

    expect(newAppState.board[0][0], newBC);
  });


  test('modifies card', () {
    AppState appState = new AppState(board: generateNewBoard());
    BoardCard newBC = new BoardCard(covered: true);
    AppState newAppState = modifyCardAttributes(0, 0, newBC)(appState);
    expect(newAppState.board[0][0].covered, true);
  });
}
