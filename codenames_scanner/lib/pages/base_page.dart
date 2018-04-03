import 'package:flutter/material.dart';

class BasePage extends StatelessWidget {
  final Widget widget;

  BasePage(this.widget);

  @override
  build (BuildContext context) {
    NavigatorState navigator = Navigator.of(context);
    return new Scaffold(
      appBar: new AppBar(
        title: new Text('CODENAMES SCANNER'),
        actions: <Widget>[
          new IconButton(
            icon: new Icon(Icons.camera),
            onPressed: () => navigator.pushNamed('/capture')
          ),
          new IconButton(
            icon: new Icon(Icons.grid_on),
            onPressed: () => navigator.pushNamed('/grid')
          ),
          new IconButton(
            icon: new Icon(Icons.list),
            onPressed: () => navigator.pushNamed('/list')
          ),
          new IconButton(
              icon: new Icon(Icons.refresh),
              onPressed: () => navigator.pushNamed('/reset')
          )
        ],
      ),
      body: this.widget
    );
  }

}