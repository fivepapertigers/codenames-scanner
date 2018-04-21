import 'package:codenames_scanner/utils/util.dart';
import 'package:codenames_scanner/state/_state_model.dart';

int cardsProcessing (AppState state) =>
  mapReduce(state.board,
    (count, cards) => count + mapReduce(
      cards,
      (count, card) => card.image != null && card.termResult != null
        ? count + 1
        : count,
      initial: 0
    ),
    initial: 0
);
