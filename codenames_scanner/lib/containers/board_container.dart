import 'package:flutter/material.dart';
import 'package:codenames_scanner/models.dart';
import 'package:codenames_scanner/state/state.dart';

class BoardContainer extends StatelessWidget {

  final Widget Function (BuildContext, _ViewModel) builder;

  BoardContainer (this.builder);

  @override
  Widget build(BuildContext context) {
    return new StoreConnector<AppState, _ViewModel>(
      builder: this.builder,
      converter: _ViewModel.fromStore
    );
  }
}



class _ViewModel {

  final List<List<BoardCard>> board;
  final Function(int, int) onCardPress;
  final Function(int, int) onEditCard;
  final double progress;
  final LoadingStatus processingStatus;
  final List<CardWithPosition> Function(CardTypes) orderedCardPositions;
  final Function(CardTypes, List<CardPosition>) onReorderCards;

  _ViewModel({
    this.board, this.onCardPress, this.progress, this.processingStatus,
    this.onEditCard, this.orderedCardPositions, this.onReorderCards
  });

  static _ViewModel fromStore(Store<AppState> store) {
    return new _ViewModel(
      board: store.state.board,
      onCardPress: (int row, int col) => store.dispatch(new ToggleCardCovered(row, col)),
      onEditCard: (int row, int col) => store.dispatch(new SetEditCard(row, col)),
      progress: store.state.boardProcessingPercentage,
      processingStatus: store.state.boardProcessingStatus,
      orderedCardPositions: store.state.orderedCards,
      onReorderCards: (cardType, positions) =>
        store.dispatch(new ReorderCards(cardType, positions))
    );
  }
}