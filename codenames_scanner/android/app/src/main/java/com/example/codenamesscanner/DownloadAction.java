package com.example.codenamesscanner;

import java.io.File;

import io.flutter.plugin.common.MethodChannel.Result;


public class DownloadAction {
  public final String lang;
  public final Result result;
  public final File file;

  DownloadAction(String lang, File file, Result result) {
    this.lang = lang;
    this.result = result;
    this.file = file;
  }
}
