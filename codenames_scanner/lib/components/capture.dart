import 'package:camera/camera.dart';
import 'package:flutter/material.dart';
import 'dart:async';
import 'package:codenames_scanner/models.dart';



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
    if (!mounted) {
      return;
    }
    String path = await ImageModel.generatePath();
    await controller.capture(path);
    imageCaptured(await ImageModel.fromPath(path));
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
