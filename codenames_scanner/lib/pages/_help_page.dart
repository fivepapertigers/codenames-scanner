import 'package:flutter/material.dart';
import 'package:codenames_scanner/pages/_base_page.dart';

class HelpPage extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    return new BasePage(
      child: new GridView.count(
        crossAxisCount: 1,
        childAspectRatio: 5.0,
        children: <Widget>[
          new GridTile(
            child: new Card(
              color: Colors.redAccent,
              child: new Container(
                padding: EdgeInsets.all(10.0),
                child: new Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  new Container(
                    child: new Text(
                      'SCAN THE BOARD',
                      textScaleFactor: 1.3,
                      style: new TextStyle(
                        fontWeight: FontWeight.bold,
                      ),
                      textAlign: TextAlign.center,
                    ),
                    margin: EdgeInsets.only(bottom: 15.0),
                  ),
                  new Text(
                    'Click the shutter icon in the menu bar.',
                  ),
                ]
              )
            ),
          ))
        ],
      )
    );
  }
}
