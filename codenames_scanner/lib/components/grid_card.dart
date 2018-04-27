import 'package:flutter/material.dart';
import 'package:codenames_scanner/models.dart';

class CardColors {
  Color _background;
  Color _font;

  CardColors.fromCardType(CardTypes cardType) {
    _font = Colors.black;
    switch (cardType) {
      case CardTypes.Blue:
        _background = Color.fromRGBO(179, 178, 197, 1.0);
        break;
      case CardTypes.Red:
        _background = Color.fromRGBO(230, 179, 179, 1.0);
        break;
      case CardTypes.Assassin:
        _background = Colors.black;
        _font = Colors.white;
        break;
      default:
        _background = Color.fromRGBO(196, 196, 196, 1.0);
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

  GridCard({this.card, this.row, this.col, this.onCardPress, this.onLongPress});

  @override
  Widget build(BuildContext context) {
    CardColors cardColors = new CardColors.fromCardType(card.type);

    return new GestureDetector(
      onTap: onCardPress,
      onLongPress: onLongPress,
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
