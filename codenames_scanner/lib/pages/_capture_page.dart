import 'package:flutter/material.dart';
import 'package:codenames_scanner/containers/capture_container.dart';
import 'package:codenames_scanner/components/capture.dart';
import 'package:codenames_scanner/pages/_base_page.dart';
import 'package:codenames_scanner/routes.dart';

class CapturePage extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    return new CaptureContainer(
      (BuildContext context, CaptureViewModel vm) {
        if (vm.camera == null) {
          return new BasePage(
            child: new IconButton(icon: new Icon(Icons.photo), onPressed: () => routes.navigate(RouteNames.Crop, context))
          );
        }
        if (vm.controller == null) {
          vm.loadCamera();
        }
        return new WillPopScope(
          child: new BasePage(
            showHeader: false,
            child: new CaptureComponent(
              controller: vm.controller,
            ),
            button: new Icon(Icons.camera),
            buttonCallback: () {
              vm.imageCaptured();
              routes.navigate(RouteNames.Crop, context);
            },
          ),
          onWillPop: () => vm.unloadCamera(),
        );
      }
    );

  }

}
