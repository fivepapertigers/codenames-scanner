import 'package:flutter/material.dart';
import 'package:codenames_scanner/models.dart';

class GridComponent extends StatelessWidget {

  List<List<BoardCard>> board;

  GridComponent({key, this.board}) {
    super(key: key);
  }

  @override
  Widget build(BuildContext context) {
    return new Center(child: new Text(board.toString()));
  }
}
