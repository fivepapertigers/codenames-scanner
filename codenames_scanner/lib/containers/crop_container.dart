import 'package:flutter/material.dart';
import 'package:codenames_scanner/models.dart';
import 'package:codenames_scanner/state/state.dart';

class CropContainer extends StatelessWidget {

  final Widget Function (BuildContext, _ViewModel) builder;

  CropContainer(this.builder);

  @override
  Widget build(BuildContext context) {

    return new StoreConnector<AppState, _ViewModel>(
        builder: builder,
        converter: _ViewModel.fromStore
    );
  }
}


class _ViewModel {

  final ImageModel boardImage;
  final Function() gridSet;
  final Function(Corner, Offset) cornerUpdated;
  final Corners gridCorners;

  _ViewModel({
    this.boardImage, this.gridSet, this.gridCorners,
    this.cornerUpdated
  });

  static _ViewModel fromStore(Store<AppState> store) {
    return new _ViewModel(
      boardImage: store.state.boardImage,
      gridCorners: store.state.gridCorners,
      gridSet: () {
        processBoardImage(store);
      },
      cornerUpdated: ((Corner corner, Offset coordinates) {
        store.dispatch(new UpdateGridCorner(corner, coordinates));
      })
    );
  }
}