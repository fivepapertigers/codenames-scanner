import 'package:flutter/material.dart';
import 'package:codenames_scanner/routes.dart';
import 'package:codenames_scanner/components/crop.dart';
import 'package:codenames_scanner/containers/crop_container.dart';
import 'package:codenames_scanner/pages/_base_page.dart';


class CropPage extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    return new CropContainer(
      (context, vm) =>
        new BasePage(
          showHeader: false,
          button: new Icon(Icons.check),
          buttonCallback: () {
            vm.gridSet();
            routes.navigate(RouteNames.Grid, context);
          },
          child: vm.boardImage == null
            ? new Center(child: new Text('Loading...'))
            : new CropComponent(
            boardImage: vm.boardImage,
            cornerUpdated: vm.cornerUpdated,
            gridCorners: vm.gridCorners
          ),
        )
    );
  }

}
