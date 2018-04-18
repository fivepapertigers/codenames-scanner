import 'package:flutter/material.dart';
import 'package:codenames_scanner/models.dart';
import 'package:codenames_scanner/utils/grid.dart';
import 'package:codenames_scanner/utils/util.dart';


class _GridCornerVM {
  final Function(Corner, Offset) onCornerChange;
  final Offset coordinates;
  final Corner corner;
  final double width;
  final double visibleWidth;

  _GridCornerVM({
    this.coordinates, this.onCornerChange, this.corner,this.width,
    this.visibleWidth
  });
}


class CropComponent extends StatelessWidget {

  final ImageModel boardImage;
  final Corners gridCorners;
  final Function(Corner, Offset) cornerUpdated;

  CropComponent({key, this.boardImage, this.cornerUpdated, this.gridCorners}): super(key: key);

  @override
  Widget build(BuildContext context) {
    return new Center(
      child: new GridOverlay(boardImage, cornerUpdated, gridCorners)
    );
  }
}


class GridOverlay extends StatelessWidget {
  final ImageModel boardImage;
  final Function(Corner, Offset) cornerUpdated;
  final Corners corners;
  final double cornerWidth = 60.0;
  final double visibleWidth = 30.0;


  GridOverlay(this.boardImage, this.cornerUpdated, this.corners);

  onCornerChange(Size size, Corner corner, Offset coordinates) {
    double ratio = boardImage.height / size.height;
    Offset oldCoordinates = corners.get(corner);
    Offset adjustedCoordinates = new Offset(
      oldCoordinates.dx + coordinates.dx * ratio,
      oldCoordinates.dy + coordinates.dy * ratio
    );
    Corners newCorners = corners.updateCorner(corner, adjustedCoordinates);
    if (validateCorners(newCorners)) {
      cornerUpdated(corner, adjustedCoordinates);
    }
  }

  @override
  Widget build(BuildContext context) {

    List<Widget> stackChildren = buildCorners(context);
    stackChildren.insert(0,
        new Positioned.fill(
          child: new CustomPaint(
            size: _getSize(context),
            painter: new GridLinePainter(
              corners, visibleWidth, boardImage.width
            ),
          )
        )
    );
    stackChildren.insert(0, new Image.file(boardImage.file));
    return new Stack(
      children: stackChildren
    );
  }

  List<Widget> buildCorners (BuildContext context) {
    Size size = _getSize(context);
    double ratio = size.height / boardImage.height;
    return corners.applyRatio(ratio).map<Widget>((Corner corner, Offset coordinates) =>
      new GridCorner(
        new _GridCornerVM(
          corner: corner,
          coordinates: coordinates,
          onCornerChange: (Corner corner, Offset coordinates)
            => onCornerChange(size, corner, coordinates),
          width: cornerWidth,
          visibleWidth: visibleWidth,
        )
      )
    );
  }

  _getSize(BuildContext context) {
    Size screenSize = MediaQuery.of(context).size;
    double aspectRatio = boardImage.height / boardImage.width;
    return new Size(aspectRatio * screenSize.width, screenSize.height);
  }

}



class GridCorner extends StatelessWidget {

  final _GridCornerVM vm;

  GridCorner(this.vm);

  onDragging (DragUpdateDetails details) {
    Offset coordinates = new Offset(
      details.delta.dx,
      details.delta.dy
    );
    vm.onCornerChange(vm.corner, coordinates);
  }

  @override
  Widget build(BuildContext context) {
    return new Positioned(
        left: vm.coordinates.dx - vm.width / 2,
        top: vm.coordinates.dy - vm.width / 2,
        child: new GestureDetector(
            onPanUpdate: onDragging,
            child: new SizedBox(
              width: vm.width,
              height: vm.width,
              child: new DecoratedBox(
                decoration: new BoxDecoration(
                  color: Colors.transparent,
                  shape: BoxShape.rectangle
                )
              )
            )
        )
    );
  }
}

class GridLinePainter extends CustomPainter {

  final Corners corners;
  final double cornerWidth;
  final double imageWidth;

  GridLinePainter(
    this.corners, this.cornerWidth, this.imageWidth);

  @override
  void paint(Canvas canvas, Size size) {
    corners.all.forEach((Offset corner) =>
      canvas.drawCircle(
        _applyRatioToOffset(corner, size), cornerWidth/2,
        new Paint()..color = Colors.red
      )
    );

    _drawAxisLines(
        canvas, size,
        Corner.TOP_LEFT, Corner.TOP_RIGHT,
        Corner.BOTTOM_LEFT, Corner.BOTTOM_RIGHT
    );
    _drawAxisLines(
        canvas, size,
        Corner.TOP_LEFT, Corner.BOTTOM_LEFT,
        Corner.TOP_RIGHT, Corner.BOTTOM_RIGHT
    );
  }

  @override
  bool shouldRepaint(GridLinePainter oldDelegate) {
    return false;
  }

  void _drawAxisLines(Canvas canvas, Size size, Corner start1, Corner end1, Corner start2, Corner end2) {
    List<Offset> midPts1 = getMidPoints(corners.get(start1), corners.get(end1));
    List<Offset> midPts2 = getMidPoints(corners.get(start2), corners.get(end2));
    count(6).forEach((int i) {
      _drawLine(canvas, size, midPts1[i], midPts2[i]);
    });
  }

  void _drawLine(Canvas canvas, Size size, Offset start, Offset end) {
    start = _applyRatioToOffset(start, size);
    end = _applyRatioToOffset(end, size);
    canvas.drawLine(
        new Offset(start.dx, start.dy),
        new Offset(end.dx, end.dy),
        new Paint()..color = Colors.red
    );
  }

  Offset _applyRatioToOffset (Offset offset, Size size) {
    double ratio = size.width / imageWidth;
    return new Offset(offset.dx * ratio, offset.dy * ratio);
  }

}
