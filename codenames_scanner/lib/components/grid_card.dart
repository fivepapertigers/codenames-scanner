import 'package:flutter/material.dart';
import 'package:codenames_scanner/models.dart';

class CardColors {
  Color _background;
  Color _font;

  CardColors.fromCardType(CardTypes cardType, bool covered) {
    double opacity = covered ? 0.4 : 1.0;
    _font = Color.fromRGBO(0, 0, 0, opacity);
    switch (cardType) {
      case CardTypes.Blue:
        _background = Color.fromRGBO(179, 178, 197, opacity);
        break;
      case CardTypes.Red:
        _background = Color.fromRGBO(230, 179, 179, opacity);
        break;
      case CardTypes.Assassin:
        _background = Color.fromRGBO(0, 0, 0, opacity);
        _font = Color.fromRGBO(255, 255, 255, opacity);
        break;
      default:
        _background = Color.fromRGBO(196, 196, 196, opacity);
    }
  }

  Color get font => _font;
  Color get background => _background;
}

class GridCard extends StatelessWidget {

  final int row;
  final int col;
  final BoardCard card;
  final Function onCardPress;
  final Function onLongPress;
  final Function onDoubleTap;

  GridCard({this.card, this.row, this.col, this.onCardPress, this.onLongPress,
            this.onDoubleTap});

  @override
  Widget build(BuildContext context) {
    CardColors cardColors = new CardColors.fromCardType(card.type, card.covered);
    return new GestureDetector(
      onTap: onCardPress,
      onLongPress: onLongPress,
      onDoubleTap: onDoubleTap,
      child: new GridTile(
        child: new Card(
          color: cardColors.background,
          child: new Center(
            child: card.image == null || card.termResult == null
              ? new Icon(Icons.refresh)
              : new Text(
                card.termResult.term == null
                  ? '???'
                  : card.termResult.term,
                style: new TextStyle(
                  color: cardColors.font,
                  decoration: card.covered ? TextDecoration.lineThrough : null,
                  decorationColor: cardColors.font,
                  decorationStyle: TextDecorationStyle.solid
                )
              )
          )
        ),
      )
    );
  }
}
