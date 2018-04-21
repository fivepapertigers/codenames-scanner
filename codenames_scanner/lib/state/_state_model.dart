import 'package:codenames_scanner/models.dart';
import 'package:meta/meta.dart';
import 'package:codenames_scanner/utils/util.dart';
import 'package:codenames_scanner/utils/grid.dart';
import 'package:camera/camera.dart';

class TransientAppState {
  List<List<BoardCard>> board;
  ImageModel boardImage;
  Corners gridCorners;
  List<CameraDescription> cameras;
  CameraController cameraController;
  LoadingStatus currentLanguageStatus;
  String currentLanguage;


  static TransientAppState fromAppState(AppState state) {
    return new TransientAppState()
      ..board = state.board
      ..boardImage = state.boardImage
      ..gridCorners = state.gridCorners
      ..cameras = state.cameras
      ..cameraController = state.cameraController
      ..currentLanguageStatus = state.currentLanguageStatus
      ..currentLanguage = state.currentLanguage
    ;
  }

  AppState finalize() {
    return AppState.fromTransient(this);
  }

  String toString() {
    return ('TransientAppState <board: $board / boardImage: $boardImage / '+
        'gridCorners: $gridCorners / cameras: $cameras / ' +
        'cameraController: $cameraController>');
  }
}


@immutable
class AppState {
  final List<List<BoardCard>> board;
  final ImageModel boardImage;
  final Corners gridCorners;
  final List<CameraDescription> cameras;
  final CameraController cameraController;
  final LoadingStatus currentLanguageStatus;
  final String currentLanguage;

  AppState({
    this.board, this.boardImage, this.gridCorners,
    this.cameras, this.cameraController, this.currentLanguageStatus,
    this.currentLanguage
  });


  static fromTransient(TransientAppState state) =>
      new AppState(
        board: state.board,
        boardImage: state.boardImage,
        gridCorners: state.gridCorners,
        cameras: state.cameras,
        cameraController: state.cameraController,
        currentLanguageStatus: state.currentLanguageStatus,
        currentLanguage: state.currentLanguage,
      );


  String toString() {
    return ('AppState <board: $board / boardImage: $boardImage / '+
        'gridCorners: $gridCorners / cameras: $cameras / ' +
        'cameraController: $cameraController>');
  }
}

AppState initialState = new AppState(
  board: generateNewBoard(),
  gridCorners: new Corners(
    new Offset(50.0, 50.0), new Offset(200.0, 50.0),
    new Offset(50.0, 200.0), new Offset(200.0, 200.0)
  ),
  cameras: [],
  currentLanguageStatus: LoadingStatus.Unstarted,
);
