import 'package:flutter/material.dart';
import 'package:codenames_scanner/reducer.dart';
import 'package:codenames_scanner/actions.dart';
import 'package:codenames_scanner/models.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:codenames_scanner/components/capture.dart';

class CaptureContainer extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    return new StoreConnector<AppState, Function(ImageModel)>(
        builder: (context, imageCaptured) => new CaptureComponent(imageCaptured: imageCaptured),
        converter: (store) => (ImageModel image) => store.dispatch(new AddBoardImage(image))
    );
  }
}
