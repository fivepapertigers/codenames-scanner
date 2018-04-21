import 'package:codenames_scanner/models.dart' show Corners, ImageModel, BoardCard;
import 'package:flutter/material.dart' show Offset;
import 'package:codenames_scanner/utils/util.dart';

export 'package:flutter/material.dart' show Offset;

class CardWithPosition {
  final int row;
  final int col;
  final BoardCard card;

  CardWithPosition(this.row, this.col, this.card);
}

List<Offset> getMidPoints(Offset start, Offset end) {

  double intervalX = (end.dx - start.dx) / 5;

  double intervalY = (end.dy - start.dy) / 5;
  return count(6)
      .map((int i) => new Offset(
      start.dx + i * intervalX,
      start.dy + i * intervalY
  )).toList();
}

List<List<Offset>> getAllGridCoordinates(Corners corners) {
  List<Offset> leftMidPoints = getMidPoints(
      corners.topLeft,
      corners.bottomLeft
  ).toList();
  List<Offset> rightMidPoints = getMidPoints(
      corners.topRight,
      corners.bottomRight
  ).toList();
  return count(6)
      .map((int i) => getMidPoints(leftMidPoints[i], rightMidPoints[i]))
      .toList();
}

Iterable<Iterable<Corners>> getCardCoordinates(Corners corners, {double ratio = 1.0}) {
  List<List<Offset>> allCoordinates = getAllGridCoordinates(corners);
  return count(5).map((int rowIdx) =>
    count(5).map((int colIdx) => new Corners(
      allCoordinates[rowIdx][colIdx],
      allCoordinates[rowIdx + 1][colIdx],
      allCoordinates[rowIdx][colIdx + 1],
      allCoordinates[rowIdx + 1][colIdx + 1]
    )..applyRatio(ratio)).toList()
  ).toList();
}

bool validateCorners (Corners corners) {
  Offset tl = corners.topLeft;
  Offset tr = corners.topRight;
  Offset bl = corners.bottomLeft;
  Offset br = corners.bottomRight;
  return
    tl.dx <= tr.dx && tl.dx <= br.dx
        && bl.dx <= tr.dx && bl.dx <= br.dx
        && tl.dy <= bl.dy && tl.dy <= br.dy
        && tr.dy <= bl.dy && tr.dy <= br.dy;
}

Corners defaultCornersFromImage(ImageModel image) {
  double left = image.width * 0.1;
  double right = image.width * 0.9;
  double top = image.height * 0.1;
  double bottom = image.height * 0.9;
  return new Corners(
      new Offset(left, top), new Offset(right, top),
      new Offset(left, bottom), new Offset(right, bottom)
  );
}

List<CardWithPosition> cardsList(List<List<BoardCard>> board) =>
  mapReduceWithIdx(board, (List<CardWithPosition> result, List<BoardCard> rowCards, int row) =>
    result..addAll(
      mapWithIndex(rowCards, (BoardCard card, int col) => new CardWithPosition(row, col, card))
    ),
    initial: new List<CardWithPosition>());


