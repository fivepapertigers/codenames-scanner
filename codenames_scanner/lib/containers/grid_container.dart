import 'package:flutter/material.dart';
import 'package:codenames_scanner/models.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:codenames_scanner/components/grid.dart';
import 'package:codenames_scanner/reducer.dart';

class GridContainer extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    return new StoreConnector<AppState, List<List<BoardCard>>>(
      builder: (context, board) => new GridComponent(board: board),
      converter: (store) => store.state.board
    );
  }
}
