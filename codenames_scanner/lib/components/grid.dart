import 'package:flutter/material.dart';
import 'package:codenames_scanner/models.dart';

class GridComponent extends StatelessWidget {

  final List<List<BoardCard>> board;

  GridComponent({key, this.board});

  @override
  Widget build(BuildContext context) {
    return new Center(
      child: new Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: board.map((List<BoardCard> cards) =>
          new Row(
            crossAxisAlignment: CrossAxisAlignment.center,
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: cards.map((BoardCard card) =>
              new Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [card.image == null
                    ? new Text('No image for card')
                    : new SizedBox(
                  width: 130.0,
                  height: 50.0,
                  child: new Image.file(card.image.file),
                )],
              )
            ).toList(),
          )
        ).toList()
      )
    );
  }
}
