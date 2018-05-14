import 'package:flutter/material.dart';
import 'package:codenames_scanner/models.dart';

const Map<LoadingStatus, String> DEFAULT_MAP = {
  LoadingStatus.Started: 'Processing...',
  LoadingStatus.Unstarted: 'Waiting to start processing...',
  LoadingStatus.Failed: 'Uh, oh. Something went wrong!',
  LoadingStatus.Complete: 'Complete!'
};


class Progress extends StatelessWidget {

  final double progress;
  final Map<LoadingStatus, String> statusTextMap;
  final LoadingStatus status;
  final Widget completeChild;

  Progress({this.progress, this.statusTextMap, this.completeChild, this.status});

  @override
  Widget build(BuildContext context) {
    if (status == LoadingStatus.Complete && this.completeChild != null) {
      return completeChild;
    } else if (status != LoadingStatus.Started) {
      return new Center(child: new Text(statusText));
    }
    return new Center(
      child: new Column(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          new Expanded(
            child: new Center(
              child: new Text(statusText)
            ),
            flex: 1
          ),
          new Expanded(
              child: new Container(
                padding: new EdgeInsets.only(bottom: 40.0),
                child: new AspectRatio(
                  aspectRatio: 1.0,
                  child: new CircularProgressIndicator(
                    value: progress,
                    strokeWidth: 6.0,
                  )
                )
              ),
              flex: 2
            ),
        ]
      )
    );
  }

  String get statusText => statusTextMap.containsKey(status) ? statusTextMap[status] : DEFAULT_MAP[status];
}
