import 'package:flutter/material.dart';
import 'package:codenames_scanner/models.dart';
import 'package:codenames_scanner/components/list.dart';
import 'package:codenames_scanner/components/grid_card.dart';
import 'package:codenames_scanner/utils/grid.dart';

class AllListsComponent extends StatelessWidget {

  final List<List<BoardCard>> board;
  final Function(int, int) onCardPress;
  final Function(int, int) onEditCard;
  final Function(CardTypes, List<CardPosition>) onReorderCards;
  final List<CardWithPosition> Function(CardTypes) orderedCards;

  AllListsComponent({
    this.board, this.onCardPress, this.onEditCard, this.orderedCards,
    this.onReorderCards
  });

  @override
  Widget build(BuildContext context) {
    CardWithPosition assassin = cardsList(board)
      .firstWhere((c) => c.card.type == CardTypes.Assassin);
    return new Column(
      children: [
        new Expanded(
          flex: 1,
          child: new GridCard(
            card: assassin.card,
            row: assassin.row,
            col: assassin.col,
            onCardPress: () =>
              onCardPress(assassin.row, assassin.col),
            onLongPress: () =>
              onEditCard(assassin.row, assassin.col)
          )
        ),
        new Expanded(
          flex: 6,
          child: new Row(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            mainAxisAlignment: MainAxisAlignment.start,
            mainAxisSize: MainAxisSize.min,
            children: [CardTypes.Blue, CardTypes.Bystander, CardTypes.Red]
              .map((cardType) =>
                new ListComponent(
                  cards: orderedCards(cardType),
                  onCardPress: onCardPress,
                  onEditCard: onEditCard,
                  onReorderCards: (cards) => onReorderCards(cardType, cards),
                )
              )
              .toList()
          )
        ),
      ]
    );
  }
}
