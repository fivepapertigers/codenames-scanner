import 'package:flutter/material.dart';
import 'package:codenames_scanner/models.dart';
import 'package:camera/camera.dart';
import 'package:codenames_scanner/state/state.dart';


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
  final CameraDescription camera;

  CaptureViewModel({
    this.boardImage, this.imageCaptured, this.controller,
    this.unloadCamera, this.loadCamera, this.camera
  });

  static CaptureViewModel fromStore(Store<AppState> store) {
    return new CaptureViewModel(
      boardImage: store.state.boardImage,
      imageCaptured: () => captureImage(store),
      controller: store.state.cameraController,
      unloadCamera: () => deactivateCamera(store),
      loadCamera: () => activateCamera(store),
      camera: store.state.cameras.length > 0 ? store.state.cameras.first : null
    );
  }

}
