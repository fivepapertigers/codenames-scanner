import 'package:camera/camera.dart';
import 'package:flutter/material.dart';

class CaptureComponent extends StatelessWidget {

  final Function imageCaptured;
  final CameraController controller;

  CaptureComponent({this.imageCaptured, this.controller});

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      backgroundColor: Colors.black,
      body: new RotatedBox(
        quarterTurns: 3,
        child: new Center(
          child: controller == null || !controller.value.initialized
            ? new Text('Could not find a camera on your device.')
            : new AspectRatio(
              aspectRatio: controller.value.aspectRatio,
              child: new CameraPreview(controller)
            )
        )
      )
    );
  }

}
