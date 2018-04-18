import 'package:flutter/material.dart';
import 'package:codenames_scanner/pages/pages.dart';

enum RouteNames {
  Home, Capture, Crop, Grid, List, Reset
}

typedef _RouteBuilder = Widget Function(BuildContext);

class _Routes {
  final names = RouteNames;
  final Map<RouteNames, _RouteBuilder> _builders = {};
  final Map<RouteNames, String> _paths = {};

  void register(RouteNames name, String path, _RouteBuilder builder) {
    _builders[name] = builder;
    _paths[name] = path;
  }

  void navigate(RouteNames name, BuildContext context) =>
    Navigator.of(context).pushNamed(_paths[name]);

  String getPath (RouteNames name) => _paths[name];

  Map<String, _RouteBuilder > get builderMap =>
      _builders.map((RouteNames name, _RouteBuilder builder) =>
        new MapEntry(_paths[name], builder));


}

_Routes routes = new _Routes()
  ..register(RouteNames.Home, '/', (BuildContext context) => new HomePage())
  ..register(RouteNames.Capture, '/capture', (BuildContext context) => new CapturePage())
  ..register(RouteNames.Crop, '/crop', (BuildContext context) => new CropPage())
  ..register(RouteNames.Grid, '/grid', (BuildContext context) => new GridPage())
//  ..register(RouteNames.List, '/list', (BuildContext context) => new ListPage())
//  ..register(RouteNames.Reset, '/reset', (BuildContext context) => new ResetPage())
;
