import 'package:flutter/material.dart';
import 'package:codenames_scanner/pages/_base_page.dart';
import 'package:codenames_scanner/containers/board_container.dart';
import 'package:codenames_scanner/components/progress.dart';
import 'package:codenames_scanner/components/all_lists.dart';
import 'package:codenames_scanner/models.dart';
import 'package:codenames_scanner/routes.dart';

const LIST_ROUTE = '/list';

class ListPage extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    return new BasePage(
      child: new BoardContainer(
        (containerContext, vm) => new Progress(
          status: vm.processingStatus,
          statusTextMap: {
            LoadingStatus.Started: 'Processing the board image. Please be patient: ',
            LoadingStatus.Unstarted: 'No image loaded.',
          },
          progress: vm.progress,
          completeChild: new AllListsComponent(
            board: vm.board,
            onCardPress: vm.onCardPress,
            onEditCard: (int row, int col) {
              vm.onEditCard(row, col);
              routes.navigate(RouteNames.EditCard, context);
            },
            orderedCards: vm.orderedCardPositions,
            onReorderCards: vm.onReorderCards,
          )
        )
      )
    );
  }
}