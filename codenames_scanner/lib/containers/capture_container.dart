import 'package:flutter/material.dart';
import 'package:codenames_scanner/reducer.dart';
import 'package:codenames_scanner/actions.dart';
import 'package:codenames_scanner/models.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:redux/redux.dart';
import 'package:codenames_scanner/components/capture.dart';
import 'package:codenames_scanner/components/draw_grid.dart';

class CaptureContainer extends StatelessWidget {

  @override
  Widget build(BuildContext context) {

    return new StoreConnector<AppState, _ViewModel>(
        builder: (context, vm) {
          if (vm.boardImage == null) {
            return new CaptureComponent(imageCaptured: vm.imageCaptured);
          }
          return new DrawGridComponent(
            boardImage: vm.boardImage,
            gridSet: () {
              vm.gridSet();
              Navigator.of(context).pushNamed('/grid');
            },
            cornerUpdated: vm.cornerUpdated,
            gridCorners: vm.gridCorners
          );
        },
        converter: _ViewModel.fromStore

    );
  }
}


class _ViewModel {

  final ImageModel boardImage;
  final Function(ImageModel) imageCaptured;
  final Function() gridSet;
  final Function(Corner, Offset) cornerUpdated;
  final Corners gridCorners;

  _ViewModel({
    this.boardImage, this.imageCaptured, this.gridSet, this.gridCorners,
    this.cornerUpdated
  });

  static _ViewModel fromStore(Store<AppState> store) {
    return new _ViewModel(
      boardImage: store.state.boardImage,
      imageCaptured: (ImageModel image) => store.dispatch(new AddBoardImage(image)),
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