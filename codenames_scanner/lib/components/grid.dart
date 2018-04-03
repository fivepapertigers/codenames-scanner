import 'package:flutter/material.dart';
import 'package:codenames_scanner/models.dart';

class GridComponent extends StatelessWidget {

  final List<List<BoardCard>> board;

  GridComponent({key, this.board});

  @override
  Widget build(BuildContext context) {
    print(board[0][0].image);
    return new Center(
      child: new Column(
        children: board.map((List<BoardCard> cards) =>
          new Row(
            children: cards.map((BoardCard card) =>
              new Column(
                children: [card.image == null
                    ? new Text('No image for card')
                    : new SizedBox(
                  width: 8.0,
                  height: 8.0,
                  child: new Image.memory(card.image.image.getBytes()),
                )],
              )
            ).toList(),
          )
        ).toList()
      )
    );
  }
}
