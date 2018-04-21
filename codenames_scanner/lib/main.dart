import 'dart:async';
import 'package:flutter/material.dart';
import 'package:camera/camera.dart';
import 'package:codenames_scanner/routes.dart';
import 'package:codenames_scanner/models.dart';
import 'package:codenames_scanner/state/state.dart';


Future<Null > main() async {

  await setCurrentLanguage(store, LANG_ENG);

  runApp(
    new StoreProvider<AppState>(
      store: store,
      child: new CodeNamesScannerApp(await availableCameras())
    )
  );
}

class CodeNamesScannerApp extends StatelessWidget {

  CodeNamesScannerApp(List<CameraDescription> cameras){
    store.dispatch(new LoadCameras(cameras));
  }

  @override
  Widget build(BuildContext context) {
    final title = 'Codenames Scanner';
    return new MaterialApp(
      theme: new ThemeData.dark(),
      title: title,
      routes: routes.builderMap,
    );
  }
}
