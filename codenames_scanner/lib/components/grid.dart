import 'package:flutter/material.dart';
import 'package:codenames_scanner/models.dart';
import 'package:codenames_scanner/components/grid_card.dart';
import 'package:codenames_scanner/utils/grid.dart';

class GridComponent extends StatelessWidget {

  final List<List<BoardCard>> board;
  final Function(int, int) onCardPress;

  GridComponent({key, this.board, this.onCardPress});

  @override
  Widget build(BuildContext context) {
    return new Center(
      child: new GridView.count(
        childAspectRatio: 2.0,
        crossAxisCount: 5,
        children: cardsList(board).map(
          (cardWithPosition) => new GridCard(
            card: cardWithPosition.card,
            row: cardWithPosition.row,
            col: cardWithPosition.col,
            onCardPress: () => onCardPress(cardWithPosition.row, cardWithPosition.col)
          )
        ).toList()
      )
    );
  }
}
