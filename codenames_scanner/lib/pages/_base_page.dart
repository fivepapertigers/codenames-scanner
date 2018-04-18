import 'package:flutter/material.dart';
import 'package:codenames_scanner/routes.dart';

class BasePage extends StatelessWidget {
  final Widget child;
  final Widget button;
  final bool showHeader;
  final buttonCallback;

  BasePage({
    this.child,
    this.showHeader = true,
    this.button,
    this.buttonCallback,
  });

  @override
  build (BuildContext context) {
    return new Scaffold(
      appBar: showHeader ? new AppBar(
        title: new Text('CODENAMES SCANNER'),
        actions: <Widget>[
          new IconButton(
            icon: new Icon(Icons.camera),
            onPressed: () => routes.navigate(RouteNames.Capture, context)
          ),
          new IconButton(
            icon: new Icon(Icons.grid_on),
            onPressed: () => routes.navigate(RouteNames.Grid, context)
          ),
          new IconButton(
            icon: new Icon(Icons.list),
            onPressed: () => routes.navigate(RouteNames.List, context)
          ),
          new IconButton(
              icon: new Icon(Icons.refresh),
              onPressed: () => routes.navigate(RouteNames.Reset, context)
          )
        ],
      ) : null,
      floatingActionButton: button == null ? null : new FloatingActionButton(
        child: button,
        onPressed: buttonCallback
      ),
      body: child
    );
  }

}