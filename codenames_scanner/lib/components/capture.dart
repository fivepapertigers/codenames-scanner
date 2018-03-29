import 'package:camera/camera.dart';
import 'package:flutter/material.dart';
import 'package:path_provider/path_provider.dart';
import 'dart:io';
import 'dart:async';
import 'package:uuid/uuid.dart';
import 'package:codenames_scanner/models.dart';
import 'package:flutter/services.dart';
import 'package:image/image.dart' as ImageLib;


List<CameraDescription> cameras;

class CaptureComponent extends StatefulWidget {

  final Function(ImageModel) imageCaptured;

  CaptureComponent({this.imageCaptured});

  @override
  State<StatefulWidget> createState() {
    return new _CaptureState(imageCaptured);
  }
}

class _CaptureState extends State<CaptureComponent> {

  final Function(ImageModel) imageCaptured;
  CameraController controller;

  _CaptureState (this.imageCaptured);

  @override
  void initState() {
    super.initState();
    if (cameras != null && cameras.length > 0) {
      CameraDescription camera = cameras.firstWhere(
              (cam) => cam.lensDirection == CameraLensDirection.back,
          orElse: () => null);

      if (camera != null) {
        controller = new CameraController(camera, ResolutionPreset.high);
        controller.initialize().then((_) {
          if (!mounted) {
            return;
          }
        });
      }
    }

  }

  @override
  void dispose() {
    controller?.dispose();
    super.dispose();
  }

  Future<Null> capture() async {
    debugPrint('happening');
    if (!mounted) {
      return;
    }
    final Directory tempDir = await getTemporaryDirectory();
    List<int> imgData;
    String path = 'assets/fake-image.jpg';
    if (!initialized()) {
      ByteData byteData = await rootBundle.load(path);
      imgData = byteData.buffer.asUint8List();

    } else {
      final String tempPath = tempDir.path;
      final String uuid = new Uuid().toString();
      final String path = '${tempPath}/${uuid}.jpg';
      await controller.capture(path);
      File imgFile = new File(path);
      imgData = await imgFile.readAsBytes();
    }
    ImageLib.Image image = ImageLib.decodeImage(imgData);
    debugPrint(image.width.toString() + image.height.toString());
    imageCaptured(new ImageModel(path, image.width, image.height));
  }

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      backgroundColor: Colors.black,
      body: new RotatedBox(
        quarterTurns: 3,
        child: new Center(
          child: new GestureDetector(
            onTap: () => capture(),
            child: initialized()
              ? new AspectRatio(
                aspectRatio: controller.value.aspectRatio,
                child: new CameraPreview(controller)
              )
              : new Text('Could not find a camera on your device.')
          )
        )
      )
    );
  }

  initialized() {
    return controller != null && controller.value.initialized;
  }
}
