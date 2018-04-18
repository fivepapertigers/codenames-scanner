import 'package:image/image.dart';
import 'package:codenames_scanner/models.dart';
import 'dart:io';
import 'dart:async';
import 'package:uuid/uuid.dart';
import 'package:path_provider/path_provider.dart';
import 'package:camera/camera.dart';

export 'package:image/image.dart' show Image;

Future<ImageModel> cropFromCoordinates (ImageModel original, Corners coordinates) async {
  Image image = copyCrop(
    original.image,
    coordinates.minX.round(),
    coordinates.minY.round(),
    coordinates.width.round(),
    coordinates.height.round()
  );
  String path = await _tempPath();
  File file = await storeImage(image, path);
  return new ImageModel(path, file: file, image: image);

}

Future<File> storeImage (Image image, String path) async {
  String path = await _tempPath();
  File file = new File(path);
  await file.writeAsBytes(encodeJpg(image, quality: 100));
  return file;
}


Future<ImageModel> captureImageFromCamera (CameraController controller) async {
  String path = await _tempPath();
  await controller.capture(path);
  File file = new File(path);
  List<int> bytes = await file.readAsBytes();
  Image image = decodeImage(bytes);
  return new ImageModel(path, file: file, image: image);
}

Future<String> _tempPath () async {
  String tempPath = (await getTemporaryDirectory()).path;
  final String uuid = new Uuid().v4().toString();
  return '$tempPath/$uuid.jpg';
}
