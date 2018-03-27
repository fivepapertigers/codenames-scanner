import 'package:flutter/material.dart';
import 'package:codenames_scanner/pages/base_page.dart';


class HomePage extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    return new BasePage(
      new Center(
        child: new Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            new Text(
              'Welcome to Codenames Scanner',
              textScaleFactor: 2.0,
              textAlign: TextAlign.center,
              style: new TextStyle(
                fontWeight: FontWeight.bold,
              ),
            ),
            new Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                new Text('Click the '),
                new Icon(Icons.camera),
                new Text(' icon to scan your board and begin playing.')
              ],
            )

          ]
        )
      )
    );
  }
}