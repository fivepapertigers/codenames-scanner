import 'package:camera/camera.dart';
import 'package:flutter/material.dart';

List<CameraDescription> cameras;

class CapturePage extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return new _CaptureState();
  }
}

class _CaptureState extends State<CapturePage> {

  CameraController controller;

  @override
  void initState() {
    super.initState();
    if (cameras.length > 0) {
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

  @override
  Widget build(BuildContext context) {
    if (controller == null || !controller.value.initialized) {
      return new Scaffold(
        body: new Center(child: new Text('Could not find a camera on your device.'))
      );
    }
    return new AspectRatio(
      aspectRatio: controller.value.aspectRatio,
      child: new CameraPreview(controller)
    );
  }
}