import 'package:codenames_scanner/models.dart';
import 'package:codenames_scanner/reducer.dart';
import 'package:codenames_scanner/utils/image.dart';
import 'package:redux/redux.dart';
import 'package:codenames_scanner/utils/util.dart';
import 'package:codenames_scanner/utils/grid.dart';
import 'dart:async';
import 'package:camera/camera.dart';

class ClearBoard {}

class AddBoardImage {
  final ImageModel image;
  AddBoardImage(this.image);
}

class AddImageToCard {
  final int row;
  final int col;
  final ImageModel image;
  AddImageToCard(this.row, this.col, this.image);
}

class AddCoordinatesToCard {
  final int row;
  final int col;
  final Corners coordinates;
  AddCoordinatesToCard(this.row, this.col, this.coordinates);
}

class AddTermToCard {
  final int row;
  final int col;
  final TermResult termResult;
  AddTermToCard(this.row, this.col, this.termResult);
}

class LoadCameras {
  final List<CameraDescription> cameras;
  LoadCameras(this.cameras);
}


class AddCameraController {
  final CameraController cameraController;
  AddCameraController(this.cameraController);
}


class RemoveCameraController {}


class ToggleCardCovered {
  final int row;
  final int col;

  ToggleCardCovered(this.row, this.col);
}

class UpdateGridCorner {
  final Corner corner;
  final Offset coordinates;

  UpdateGridCorner(this.corner, this.coordinates);
}

class DesignateCards {}


Future<void> processBoardImage (Store<AppState> store) async {
  List<List<Corners>> coordinates = getCardCoordinates(store.state.gridCorners);
  await Future.wait(mapReduce<List<Future<void>>, List<Future<void>>>(
    mapWithIndex(coordinates, ((List<Corners> coordinatesList, int row) =>
      mapWithIndex(coordinatesList, (Corners coordinates, int col) async =>
        processCard(store, row, col, coordinates))
    )),
    (List<Future<void>> combined, List<Future<void>> item) => new List.from(combined)..addAll(item),
    initial: []
  ));
}


Future<void> processCard (Store<AppState> store, int row, int col, Corners coordinates) async {
  ImageModel boardImage = store.state.boardImage;
  store.dispatch(new AddCoordinatesToCard(row, col, coordinates));
  ImageModel cardImage = await cropFromCoordinates(boardImage, coordinates);
  store.dispatch(new AddImageToCard(row, col, cardImage));
}


Future<void> activateCamera(Store<AppState> store) async {
  List<CameraDescription> cameras = store.state.cameras;
  print(cameras);
  if (cameras.length > 0) {
    CameraDescription camera = store.state.cameras.firstWhere(
      (cam) => cam.lensDirection == CameraLensDirection.back,
      orElse: () => null);
    CameraController controller = new CameraController(camera, ResolutionPreset.high);
    await controller.initialize();
    print(controller);
    store.dispatch(new AddCameraController(controller));
  }
}


Future<void> captureImage(Store<AppState> store) async {
  ImageModel image = await captureImageFromCamera(store.state.cameraController);
  store.dispatch(new AddBoardImage(image));
  await deactivateCamera(store);

}

Future<void> deactivateCamera(Store<AppState> store) async {
  await store.state.cameraController.dispose();
  store.dispatch(new RemoveCameraController());
}