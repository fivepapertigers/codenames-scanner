import 'package:flutter/material.dart';
import 'package:codenames_scanner/actions.dart';
import 'package:codenames_scanner/models.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:redux/redux.dart';
import 'package:camera/camera.dart';
import 'package:codenames_scanner/reducer.dart';


class CaptureContainer extends StatelessWidget {

  final Widget Function(BuildContext, CaptureViewModel) builder;

  CaptureContainer(this.builder);

  @override
  Widget build(BuildContext context) {
    return new StoreConnector<AppState, CaptureViewModel>(
        builder: builder,
        converter: CaptureViewModel.fromStore
    );
  }
}


class CaptureViewModel {

  final ImageModel boardImage;
  final Function imageCaptured;
  final CameraController controller;
  final Function unloadCamera;
  final Function loadCamera;

  CaptureViewModel({
    this.boardImage, this.imageCaptured, this.controller,
    this.unloadCamera, this.loadCamera
  });

  static CaptureViewModel fromStore(Store<AppState> store) {
    return new CaptureViewModel(
      boardImage: store.state.boardImage,
      imageCaptured: () => captureImage(store),
      controller: store.state.cameraController,
      unloadCamera: () => deactivateCamera(store),
      loadCamera: () => activateCamera(store)
    );
  }

}
