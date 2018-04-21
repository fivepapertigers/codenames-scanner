import 'package:flutter/material.dart';
import 'package:codenames_scanner/models.dart';
import 'package:redux/redux.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:codenames_scanner/components/grid.dart';
import 'package:codenames_scanner/reducer.dart';
import 'package:codenames_scanner/actions.dart';

class GridContainer extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    return new StoreConnector<AppState, _ViewModel>(
      builder: (context, vm) => new GridComponent(
        board: vm.board,
        onCardPress: vm.onCardPress
      ),
      converter: _ViewModel.fromStore
    );
  }
}



class _ViewModel {

  final List<List<BoardCard>> board;
  final Function(int, int) onCardPress;

  _ViewModel({
    this.board, this.onCardPress
  });

  static _ViewModel fromStore(Store<AppState> store) {
    return new _ViewModel(
      board: store.state.board,
      onCardPress: (int row, int col) => store.dispatch(new ToggleCardCovered(row, col)),
    );
  }
}