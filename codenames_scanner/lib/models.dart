import 'dart:io';
import 'package:image/image.dart';
import 'package:flutter/material.dart' show Offset;
import 'dart:math';

export 'package:flutter/material.dart' show Offset;


class ImageModel {
  String uri;
  Image image;
  File file;


  ImageModel(this.uri, {this.file, this.image});

  double get width => image.width.toDouble();
  double get height => image.height.toDouble();

}

class TermResult {
  final String term;
  final int confidence;
  TermResult(this.term, this.confidence);
}

enum CardTypes {
  Blue, Red, Bystander, Assassin
}

enum Corner {
  TOP_LEFT, TOP_RIGHT, BOTTOM_LEFT, BOTTOM_RIGHT
}

class Corners {
  final Offset topLeft;
  final Offset topRight;
  final Offset bottomLeft;
  final Offset bottomRight;

  Corners(this.topLeft, this.topRight, this.bottomLeft, this.bottomRight);

  Corners boundingBox() {
    return new Corners (
      new Offset(minX, minY),
      new Offset(maxX, minY),
      new Offset(minX, maxY),
      new Offset(maxX, maxY)
    );
  }

  Offset get(Corner corner) {
    Offset offset;
    switch (corner) {
      case Corner.BOTTOM_LEFT:
        offset = this.bottomLeft; break;
      case Corner.BOTTOM_RIGHT:
        offset = this.bottomRight; break;
      case Corner.TOP_LEFT:
        offset = this.topLeft; break;
      case Corner.TOP_RIGHT:
        offset = this.topRight; break;
    }
    return offset;
  }

  Corners updateCorner(Corner corner, Offset value) {
    return new Corners(
      corner == Corner.TOP_LEFT ? value : this.topLeft,
      corner == Corner.TOP_RIGHT ? value : this.topRight,
      corner == Corner.BOTTOM_LEFT ? value : this.bottomLeft,
      corner == Corner.BOTTOM_RIGHT ? value : this.bottomRight,
    );
  }

  List<T> map<T>(T Function(Corner, Offset) mapper) {
    return [
      mapper(Corner.TOP_LEFT, this.topLeft),
      mapper(Corner.TOP_RIGHT, this.topRight),
      mapper(Corner.BOTTOM_LEFT, this.bottomLeft),
      mapper(Corner.BOTTOM_RIGHT, this.bottomRight),
    ];
  }

  double get maxX {
    return all.map((Offset c) => c.dx).reduce((a, b) => max(a, b));
  }

  double get maxY {
    return all.map((Offset c) => c.dy).reduce((a, b) => max(a, b));
  }

  double get minX {
    return all.map((Offset c) => c.dx).reduce((a, b) => min(a, b));
  }

  double get minY {
    return all.map((Offset c) => c.dy).reduce((a, b) => min(a, b));
  }

  double get width {
    return maxX - minX;
  }

  double get height {
    return maxY - minY;
  }

  Corners applyRatio (double ratio) {
    return new Corners(
      _applyRatioToOffset(topLeft, ratio),
      _applyRatioToOffset(topRight, ratio),
      _applyRatioToOffset(bottomLeft, ratio),
      _applyRatioToOffset(bottomRight, ratio),
    );
  }

  Offset _applyRatioToOffset (Offset offset, double ratio) {
    return new Offset(offset.dx * ratio, offset.dy * ratio);
  }


  List<Offset> get all {
    return [topLeft, topRight, bottomRight, bottomLeft];
  }

  String toString() {
    return 'Corners <($topLeft), ($topRight), ($bottomLeft), ($bottomRight)>';
  }
}

class BoardCard {
  final int type;
  final TermResult termResult;
  final bool covered;
  final ImageModel image;
  final Corners coordinates;

  BoardCard({this.termResult, this.type, this.covered, this.image, this.coordinates});

  update(BoardCard newCard) {
    return new BoardCard(
      type: newCard.type == null ? this.type: newCard.type,
      termResult: newCard.termResult == null ? this.termResult: newCard.termResult,
      image: newCard.image == null ? this.image: newCard.image,
      coordinates: newCard.coordinates == null ? this.coordinates: newCard.coordinates,
      covered: newCard.covered == null ? this.covered: newCard.covered,
    );
  }
}


const LANG_ENG = 'eng';
Map<String, String> languages = {
  LANG_ENG: 'English'
};

enum LoadingStatus {
  Unstarted, Started, Failed, Complete
}