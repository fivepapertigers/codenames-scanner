import 'dart:async';
import 'package:flutter/material.dart';
import 'package:redux/redux.dart';
import 'package:camera/camera.dart';
import 'package:codenames_scanner/reducer.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:redux_thunk/redux_thunk.dart';
import 'package:codenames_scanner/routes.dart';
import 'package:codenames_scanner/actions.dart';


Future<Null > main() async {
  runApp(new CodeNamesScannerApp(await availableCameras()));
}

class CodeNamesScannerApp extends StatelessWidget {

  final Store<AppState> store = new Store<AppState>(
      appReducer, initialState: initialState, middleware: [thunkMiddleware]
  );

  CodeNamesScannerApp(List<CameraDescription> cameras){
    store.dispatch(new LoadCameras(cameras));
  }

  @override
  Widget build(BuildContext context) {
    final title = 'Codenames Scanner';
    return new StoreProvider<AppState>(
      store: store,
      child: new MaterialApp(
        theme: new ThemeData.dark(),
        title: title,
        routes: routes.builderMap,
      ),
    );
  }
}
