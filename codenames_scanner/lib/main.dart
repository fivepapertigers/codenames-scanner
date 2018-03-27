import 'dart:async';
import 'package:flutter/material.dart';
import 'package:redux/redux.dart';
import 'package:camera/camera.dart';
import 'package:codenames_scanner/reducer.dart';
import 'package:codenames_scanner/pages/home_page.dart';
import 'package:codenames_scanner/pages/capture_page.dart';
import 'package:flutter_redux/flutter_redux.dart';

Future<Null > main() async {
  cameras = await availableCameras();
  runApp(new CodeNamesScannerApp());
}

const HOME_ROUTE = '/';
const CAPTURE_ROUTE = '/capture';

class CodeNamesScannerApp extends StatelessWidget {

  final Store<AppState> store = new Store<AppState>(
    appReducer, initialState: initialState
  );

  @override
  Widget build(BuildContext context) {
    final title = 'Codenames Scanner';
    return new StoreProvider(
      store: store,
      child: new MaterialApp(
        theme: new ThemeData.dark(),
        title: title,
        routes: {
          HOME_ROUTE: (BuildContext context) => new HomePage(),
          CAPTURE_ROUTE: (BuildContext context) => new CapturePage(),
        },
      ),
    );
  }
}
