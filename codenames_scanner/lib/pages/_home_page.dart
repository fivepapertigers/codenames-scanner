import 'package:flutter/material.dart';
import 'package:codenames_scanner/pages/_base_page.dart';
import 'package:codenames_scanner/containers/home_container.dart';
import 'package:codenames_scanner/models.dart';

const DOWNLOAD_MSG = """The app needs to download some additional files before \
we can scan the board. Please press the download button to continue. \
""";

class HomePage extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    return new HomeContainer(
      (context, vm) {

        Widget child;

        if (vm.currentLanguageStatus == LoadingStatus.Unstarted) {
          child = new Text (DOWNLOAD_MSG, textAlign: TextAlign.center);
        } else if (vm.currentLanguageStatus == LoadingStatus.Started) {
          child = new Text ('Downloading files...', textAlign: TextAlign.center);
        } else if (vm.currentLanguageStatus == LoadingStatus.Failed) {
          child = new Text('Download failed. Please try again.', textAlign: TextAlign.center);
        } else if (vm.currentLanguageStatus == LoadingStatus.Complete) {
          child = new Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              new Text(
                'Welcome to Codenames Scanner',
                textScaleFactor: 2.0,
                textAlign: TextAlign.center,
                style: new TextStyle(
                  fontWeight: FontWeight.bold,
                ),
              ),
              new Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  new Text('Click the '),
                  new Icon(Icons.camera),
                  new Text(' icon to scan your board and begin playing.')
                ],
              ),
            ]
          );
        }

        return new BasePage(
          button: (
            vm.currentLanguageStatus == LoadingStatus.Unstarted ||
            vm.currentLanguageStatus == LoadingStatus.Failed
          )
            ? new Icon(Icons.file_download)
            : null,
          buttonCallback: vm.loadLanguage,
          showHeader: vm.currentLanguageStatus == LoadingStatus.Complete,
          child: new Center(child: child),
        );
      }
    );
  }
}
