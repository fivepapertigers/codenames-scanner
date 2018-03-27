class Image {
  final String uri;
  final int width;
  final int height;
  Image(this.uri, this.width, this.height);
}

class TermResult {
  final String term;
  final int confidence;
  TermResult(this.term, this.confidence);
}

enum CardTypes {
  Blue, Red, Bystander, Assassin
}

class BoardCard {
  final int type;
  final TermResult termResult;
  final bool covered;
  final Image image;

  BoardCard({this.termResult, this.type, this.covered, this.image});

  update(BoardCard newCard) {
    return new BoardCard(
      type: newCard.type == null ? this.type: newCard.type,
      termResult: newCard.termResult == null ? this.termResult: newCard.termResult,

    );
  }
}
