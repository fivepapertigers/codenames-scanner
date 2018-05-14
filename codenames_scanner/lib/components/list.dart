import 'package:flutter/material.dart';
import 'package:flutter_list_drag_and_drop/drag_and_drop_list.dart';
import 'package:codenames_scanner/components/grid_card.dart';
import 'package:codenames_scanner/models.dart';

class ListComponent extends StatelessWidget {

  final List<CardWithPosition> cards;
  final Function(int, int) onCardPress;
  final Function(int, int) onEditCard;
  final Function(List<CardWithPosition>) onReorderCards;


  ListComponent({
    this.cards, this.onCardPress, this.onEditCard, this.onReorderCards
  });

  @override
  Widget build(BuildContext context) {
    return new Expanded(
      flex: 1,
      child: new DragAndDropList<CardWithPosition>(
        cards,
        itemBuilder: (context, cardWithPosition) => new GridCard(
          card: cardWithPosition.card,
          row: cardWithPosition.row,
          col: cardWithPosition.col,
          onCardPress: () =>
            onCardPress(cardWithPosition.row, cardWithPosition.col),
          onDoubleTap: () =>
            onEditCard(cardWithPosition.row, cardWithPosition.col)
        ),
        canBeDraggedTo: (one, two) => true,
        dragElevation: 1.0,
        onDragFinish: (before, after) {
//          short circuit if position didn't change or no callback
          if (onReorderCards == null || before == after) {
            return;
          }
          List<CardWithPosition> newCards = new List.from(cards);
          newCards.insert(after, newCards.removeAt(before));
          onReorderCards(newCards);
        }
      )
    );
  }
}


