import 'package:flutter/material.dart';
import 'package:codenames_scanner/models.dart';
import 'package:codenames_scanner/state/state.dart';


class HomeContainer extends StatelessWidget {

  final Widget Function(BuildContext, HomeViewModel) builder;

  HomeContainer(this.builder);

  @override
  Widget build(BuildContext context) {
    return new StoreConnector<AppState, HomeViewModel>(
        builder: builder,
        converter: HomeViewModel.fromStore
    );
  }
}


class HomeViewModel {

  final LoadingStatus currentLanguageStatus;
  final void Function() loadLanguage;

  HomeViewModel({this.currentLanguageStatus, this.loadLanguage});

  static HomeViewModel fromStore(Store<AppState> store) {
    return new HomeViewModel(
      currentLanguageStatus: store.state.currentLanguageStatus,
      loadLanguage: () => loadCurrentLanguage(store),
    );
  }

}
