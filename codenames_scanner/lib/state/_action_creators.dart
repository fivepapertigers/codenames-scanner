import 'dart:async';
import 'package:codenames_scanner/models.dart';
import 'package:codenames_scanner/utils/image.dart';
import 'package:codenames_scanner/utils/util.dart';
import 'package:codenames_scanner/utils/grid.dart';
import 'package:camera/camera.dart';
import 'package:codenames_scanner/utils/ocr.dart';
import 'package:codenames_scanner/utils/term.dart';
import 'package:codenames_scanner/state/_action_types.dart';
import 'package:codenames_scanner/state/_store.dart';
import 'package:codenames_scanner/state/_state_model.dart';
import 'package:codenames_scanner/seed_data.dart';


Future<void> processBoardImage (Store<AppState> store) async {
  store.dispatch(new ClearBoard());
  store.dispatch(new DesignateCards());
  List<List<Corners>> coordinates = getCardCoordinates(store.state.gridCorners);
  await Future.wait(
    mapReduce<List<Future<void>>, List<Future<void>>>(
      mapWithIndex(coordinates,
        (List<Corners> coordinatesList, int row) =>
          mapWithIndex(coordinatesList,
            (Corners coordinates, int col) async =>
              _processCard(store, row, col, coordinates))
      ),
      (List<Future<void>> combined, List<Future<void>> item) =>
        new List.from(combined)..addAll(item),
      initial: []
    )
  );
}

Future<void> _processCard (Store<AppState> store, int row, int col, Corners coordinates) async {
  ImageModel boardImage = store.state.boardImage;
  store.dispatch(new AddCoordinatesToCard(row, col, coordinates));
  ImageModel cardImage = await cropFromCoordinates(boardImage, coordinates);
  store.dispatch(new AddImageToCard(row, col, cardImage));
//  Run OCR
  OcrDocument ocrResult = await runOcr(cardImage.file.path, store.state.currentLanguage);
//  Find term and confidence
  List<List<String>> textLines = ocrResult.lines == null ? [] : ocrResult.lines.map(
    (line) => line.words.map((word) => word.text).toList()
  ).toList();
  TermResult termResult = findTermFromLinesOfText(textLines);
  store.dispatch(new AddTermToCard(row, col, termResult));
}


Future<void> activateCamera(Store<AppState> store) async {
  List<CameraDescription> cameras = store.state.cameras;
  if (cameras.length > 0) {
    CameraDescription camera = store.state.cameras.firstWhere(
      (cam) => cam.lensDirection == CameraLensDirection.back,
      orElse: () => null
    );
    CameraController controller = new CameraController(camera, ResolutionPreset.low);
    await controller.initialize();
    store.dispatch(new AddCameraController(controller));
  }
}


Future<void> captureImage(Store<AppState> store) async {
  store.dispatch(new RemoveBoardImage());
  ImageModel image = await captureImageFromCamera(store.state.cameraController);
  store.dispatch(new UpdateGridCorner(
    Corner.TOP_LEFT, new Offset(image.width * 0.1, image.height * 0.1)
  ));

  store.dispatch(new UpdateGridCorner(
    Corner.TOP_RIGHT, new Offset(image.width * 0.9, image.height * 0.1)
  ));

  store.dispatch(new UpdateGridCorner(
    Corner.BOTTOM_LEFT, new Offset(image.width * 0.1, image.height * 0.9)
  ));

  store.dispatch(new UpdateGridCorner(
    Corner.BOTTOM_RIGHT, new Offset(image.width * 0.9, image.height * 0.9)
  ));

  store.dispatch(new AddBoardImage(image));
  await deactivateCamera(store);

}

Future<void> deactivateCamera(Store<AppState> store) async {
  await store.state.cameraController.dispose();
  store.dispatch(new RemoveCameraController());
}

Future<void> setCurrentLanguage(Store<AppState> store, String lang) async {
  store.dispatch(new SetCurrentLanguage(lang));
  store.dispatch(new UpdateCurrentLanguageStatus(
    await checkTrainedData(lang)
      ? LoadingStatus.Complete
      : LoadingStatus.Unstarted
  ));
}

Future<void> loadCurrentLanguage(Store<AppState> store) async {
  store.dispatch(new UpdateCurrentLanguageStatus(LoadingStatus.Started));
  bool res = await getTrainedData(store.state.currentLanguage);
  store.dispatch(new UpdateCurrentLanguageStatus(
    res ? LoadingStatus.Complete : LoadingStatus.Failed
  ));
}

Future<void> loadDevData (Store<AppState> store) async {
  store.dispatch(
    new LoadDevState(
      new AppState(
        board: await generateFakeBoard(),
        gridCorners: new Corners(
          new Offset(50.0, 50.0), new Offset(1000.0, 50.0),
          new Offset(50.0, 1000.0), new Offset(1000.0, 1000.0)
        ),
        cameras: [],
        boardImage: await loadAssetImage('assets/fake-image.jpg'),
        currentLanguageStatus: LoadingStatus.Unstarted,
      )
    )
  );
  store.dispatch(new DesignateCards());
}
