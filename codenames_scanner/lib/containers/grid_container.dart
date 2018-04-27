import 'package:flutter/material.dart';
import 'package:codenames_scanner/models.dart';
import 'package:codenames_scanner/components/grid.dart';
import 'package:codenames_scanner/components/progress.dart';
import 'package:codenames_scanner/state/state.dart';
import 'package:codenames_scanner/routes.dart';

class GridContainer extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    return new StoreConnector<AppState, _ViewModel>(
      builder: (context, vm) {
        if (vm.processingStatus == LoadingStatus.Complete) {
          return new GridComponent(
            board: vm.board,
            onCardPress: vm.onCardPress,
            onEditCard: (int row, int col) {
              vm.onEditCard(row, col);
              routes.navigate(RouteNames.EditCard, context);
            }
          );
        } else if (vm.processingStatus == LoadingStatus.Started) {
          return new Progress(
            text: 'Processing the board image. Please be patient: ',
            progress: vm.progress
          );
        } else {
          return new Center(
            child: new Text('No image loaded.')
          );
        }
      },
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

  _ViewModel({
    this.board, this.onCardPress, this.progress, this.processingStatus,
    this.onEditCard
  });

  static _ViewModel fromStore(Store<AppState> store) {
    return new _ViewModel(
      board: store.state.board,
      onCardPress: (int row, int col) => store.dispatch(new ToggleCardCovered(row, col)),
      onEditCard: (int row, int col) => store.dispatch(new SetEditCard(row, col)),
      progress: store.state.boardProcessingPercentage,
      processingStatus: store.state.boardProcessingStatus
    );
  }
}