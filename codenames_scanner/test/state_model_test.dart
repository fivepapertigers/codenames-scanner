import 'package:flutter_test/flutter_test.dart';
import 'package:codenames_scanner/state/_state_model.dart';
import 'package:codenames_scanner/utils/util.dart';
import 'package:codenames_scanner/models.dart';

void main() {
  test('board processing status', () {
    AppState state = new AppState(board: generateNewBoard());
    expect(state.boardProcessingStatus, LoadingStatus.Unstarted);
    state.board[0][0] = new BoardCard(
      image: new ImageModel('abc'),
      termResult: new TermResult()
    );
    expect(state.boardProcessingStatus, LoadingStatus.Started);

    state = new AppState(board: generateNewBoard(
      generator: () => new BoardCard(
        image: new ImageModel('abc'),
        termResult: new TermResult()
      )
    ));

    expect(state.boardProcessingStatus, LoadingStatus.Complete);
  });

  test('board processing percentage', () {
    AppState state = new AppState(board: generateNewBoard());
    expect(state.boardProcessingPercentage, 0.0);
    state.board[0][0] = new BoardCard(
      image: new ImageModel('abc'),
      termResult: new TermResult()
    );
    expect(state.boardProcessingPercentage, 0.04);

    state = new AppState(board: generateNewBoard(
      generator: () => new BoardCard(
        image: new ImageModel('abc'),
        termResult: new TermResult()
      )
    ));

    expect(state.boardProcessingPercentage, 1.0);
  });


}
