import 'package:flutter/material.dart';
import 'package:codenames_scanner/models.dart';
import 'package:codenames_scanner/state/state.dart';

class EditCardContainer extends StatelessWidget {

  final Widget Function (BuildContext, _ViewModel) builder;

  EditCardContainer(this.builder);

  @override
  Widget build(BuildContext context) {

    return new StoreConnector<AppState, _ViewModel>(
      builder: builder,
      converter: _ViewModel.fromStore
    );
  }
}


class _ViewModel {

  final BoardCard card;
  final void Function(String) updateCardTerm;
  
  _ViewModel({
    this.card, this.updateCardTerm
  });

  static _ViewModel fromStore(Store<AppState> store) {
    return new _ViewModel(
      card: store.state.editCard,
      updateCardTerm: (String term) => store.dispatch(
        new AddTermToCard(
          store.state.editCardLocation[0],
          store.state.editCardLocation[1],
          new TermResult(term: term, confidence: 1.0)
        )
      )
    );
  }
}