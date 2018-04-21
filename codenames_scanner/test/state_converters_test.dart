import 'package:flutter_test/flutter_test.dart';
import 'package:codenames_scanner/state/_converters.dart';
import 'package:codenames_scanner/state/_state_model.dart';
import 'package:codenames_scanner/utils/util.dart';
import 'package:codenames_scanner/models.dart';

void main() {
  test('cards processing', () {
    AppState state = new AppState(board: generateNewBoard());
    expect(cardsProcessing(state), 0);
    state.board[0][0] = new BoardCard(
      image: new ImageModel('abc'),
      termResult: new TermResult()
    );
    expect(cardsProcessing(state), 1);
  });
}
