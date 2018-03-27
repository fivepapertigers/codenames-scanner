import 'package:flutter/material.dart';

class ActionBar extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    NavigatorState navigator = Navigator.of(context);
    return new Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: <Widget>[
        new Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            new Text (
              'CODENAMES SCANNER',
              textAlign: TextAlign.left,
              maxLines: 1,
            )
          ],
        ),
        new Column(
          children: <Widget>[
            new IconButton(
                icon: new Icon(Icons.camera),
                onPressed: () => navigator.pushNamed('/')
            )
          ]
        )
      ],
    );
  }
}
