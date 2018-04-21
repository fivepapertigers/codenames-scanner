import 'package:codenames_scanner/models.dart';
import 'package:codenames_scanner/utils/grid.dart';
import 'package:camera/camera.dart';

class ClearBoard {}

class AddBoardImage {
  final ImageModel image;
  AddBoardImage(this.image);
}

class RemoveBoardImage {}

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

class SetCurrentLanguage {
  final String lang;
  SetCurrentLanguage(this.lang);
}

class UpdateCurrentLanguageStatus {
  final LoadingStatus status;
  UpdateCurrentLanguageStatus(this.status);
}
