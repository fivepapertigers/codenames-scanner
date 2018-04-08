import 'package:flutter/material.dart';
import 'package:codenames_scanner/containers/capture_container.dart';
import 'package:codenames_scanner/components/capture.dart';
import '_base_page.dart';
import 'package:codenames_scanner/routes.dart';
import 'package:codenames_scanner/models.dart';

class CapturePage extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    return new CaptureContainer(
      (BuildContext context, CaptureViewModel vm) {
        if (vm.controller == null) {
          vm.loadCamera();
        }
        return new WillPopScope(
          child: new BasePage(
            showHeader: false,
            child: new CaptureComponent(
              imageCaptured: (ImageModel image) {
                vm.imageCaptured(image);
                routes.navigate(RouteNames.Crop, context);
              },
              controller: vm.controller,
            ),
            button: new Icon(Icons.camera),
            buttonCallback: vm.imageCaptured,
          ),
          onWillPop: () => vm.unloadCamera(),
        );
      }
    );

  }

}
