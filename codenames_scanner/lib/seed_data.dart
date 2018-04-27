import 'dart:async';
import 'package:codenames_scanner/models.dart';
import 'package:codenames_scanner/utils/image.dart';


Future<List<List<BoardCard>>> generateFakeBoard () async {
  ImageModel boardCardImage = await loadAssetImage('assets/fake-card-image.jpg');
  Corners corners = new Corners(
    new Offset(0.0, 0.0), new Offset(0.0, 0.0), new Offset(0.0, 0.0), new Offset(0.0, 0.0)
  );
  return [
    [
      new BoardCard(
        termResult: new TermResult(term: 'UNDERTAKER', confidence: 1.0),
        image: boardCardImage,
        covered: false,
        coordinates: corners
      ),
      new BoardCard(
        termResult: new TermResult(term: 'UNDERTAKER', confidence: 1.0),
        image: boardCardImage,
        covered: false,
        coordinates: corners
      ),
      new BoardCard(
        termResult: new TermResult(term: 'UNDERTAKER', confidence: 1.0),
        image: boardCardImage,
        covered: false,
        coordinates: corners
      ),
      new BoardCard(
        termResult: new TermResult(term: 'UNDERTAKER', confidence: 1.0),
        image: boardCardImage,
        covered: false,
        coordinates: corners
      ),
      new BoardCard(
        termResult: new TermResult(term: 'UNDERTAKER', confidence: 1.0),
        image: boardCardImage,
        covered: false,
        coordinates: corners
      ),
    ],
    [
      new BoardCard(
        termResult: new TermResult(term: 'UNDERTAKER', confidence: 1.0),
        image: boardCardImage,
        covered: false,
        coordinates: corners
      ),
      new BoardCard(
        termResult: new TermResult(term: 'UNDERTAKER', confidence: 1.0),
        image: boardCardImage,
        covered: false,
        coordinates: corners
      ),
      new BoardCard(
        termResult: new TermResult(term: 'UNDERTAKER', confidence: 1.0),
        image: boardCardImage,
        covered: false,
        coordinates: corners
      ),
      new BoardCard(
        termResult: new TermResult(term: 'UNDERTAKER', confidence: 1.0),
        image: boardCardImage,
        covered: false,
        coordinates: corners
      ),
      new BoardCard(
        termResult: new TermResult(term: 'UNDERTAKER', confidence: 1.0),
        image: boardCardImage,
        covered: false,
        coordinates: corners
      ),
    ],
    [
      new BoardCard(
        termResult: new TermResult(term: 'UNDERTAKER', confidence: 1.0),
        image: boardCardImage,
        covered: false,
        coordinates: corners
      ),
      new BoardCard(
        termResult: new TermResult(term: 'UNDERTAKER', confidence: 1.0),
        image: boardCardImage,
        covered: false,
        coordinates: corners
      ),
      new BoardCard(
        termResult: new TermResult(term: 'UNDERTAKER', confidence: 1.0),
        image: boardCardImage,
        covered: false,
        coordinates: corners
      ),
      new BoardCard(
        termResult: new TermResult(term: 'UNDERTAKER', confidence: 1.0),
        image: boardCardImage,
        covered: false,
        coordinates: corners
      ),
      new BoardCard(
        termResult: new TermResult(term: 'UNDERTAKER', confidence: 1.0),
        image: boardCardImage,
        covered: false,
        coordinates: corners
      ),
    ],
    [
      new BoardCard(
        termResult: new TermResult(term: 'UNDERTAKER', confidence: 1.0),
        image: boardCardImage,
        covered: false,
        coordinates: corners
      ),
      new BoardCard(
        termResult: new TermResult(term: 'UNDERTAKER', confidence: 1.0),
        image: boardCardImage,
        covered: false,
        coordinates: corners
      ),
      new BoardCard(
        termResult: new TermResult(term: 'UNDERTAKER', confidence: 1.0),
        image: boardCardImage,
        covered: false,
        coordinates: corners
      ),
      new BoardCard(
        termResult: new TermResult(term: 'UNDERTAKER', confidence: 1.0),
        image: boardCardImage,
        covered: false,
        coordinates: corners
      ),
      new BoardCard(
        termResult: new TermResult(term: 'UNDERTAKER', confidence: 1.0),
        image: boardCardImage,
        covered: false,
        coordinates: corners
      ),
    ],
    [
      new BoardCard(
        termResult: new TermResult(term: 'UNDERTAKER', confidence: 1.0),
        image: boardCardImage,
        covered: false,
        coordinates: corners
      ),
      new BoardCard(
        termResult: new TermResult(term: 'UNDERTAKER', confidence: 1.0),
        image: boardCardImage,
        covered: false,
        coordinates: corners
      ),
      new BoardCard(
        termResult: new TermResult(term: 'UNDERTAKER', confidence: 1.0),
        image: boardCardImage,
        covered: false,
        coordinates: corners
      ),
      new BoardCard(
        termResult: new TermResult(term: 'UNDERTAKER', confidence: 1.0),
        image: boardCardImage,
        covered: false,
        coordinates: corners
      ),
      new BoardCard(
        termResult: new TermResult(term: 'UNDERTAKER', confidence: 1.0),
        image: boardCardImage,
        covered: false,
        coordinates: corners
      ),
    ],
  ];
}
