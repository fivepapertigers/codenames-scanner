import 'package:flutter/material.dart';
import 'package:codenames_scanner/pages/_base_page.dart';
import 'package:codenames_scanner/containers/grid_container.dart';

const GRID_ROUTE = '/grid';

class GridPage extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    return new BasePage(child: new GridContainer());
  }
}