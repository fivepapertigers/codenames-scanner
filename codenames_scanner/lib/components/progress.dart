import 'package:flutter/material.dart';

class Progress extends StatelessWidget {

  final double progress;
  final String text;

  Progress({this.progress, this.text});

  @override
  Widget build(BuildContext context) {
    return new Center(
      child: new Row(
        children: [
          new Column(
            children: [
              new Text(text),
              new CircularProgressIndicator(value: progress)
            ]
          )
        ]
      )
    );
  }
}
