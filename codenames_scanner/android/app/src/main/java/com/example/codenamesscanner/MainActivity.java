package com.example.codenamesscanner;

import android.os.Bundle;
import android.content.Context;

import com.googlecode.tesseract.android.TessBaseAPI;

import io.flutter.app.FlutterActivity;
import io.flutter.plugins.GeneratedPluginRegistrant;
import io.flutter.plugin.common.MethodCall;
import io.flutter.plugin.common.MethodChannel;
import io.flutter.plugin.common.MethodChannel.MethodCallHandler;
import io.flutter.plugin.common.MethodChannel.Result;


import java.io.File;
import java.io.IOException;
import java.util.Map;

public class MainActivity extends FlutterActivity {

  private static final String CHANNEL = "codenames-scanner/ocr";
  private static final String RUN_OCR = "runOcr";
  private static final String CHECK_TRAINED_DATA = "checkTrainedData";
  private static final String GET_TRAINED_DATA = "getTrainedData";
  static{
    System.loadLibrary("jpgt");
    System.loadLibrary("pngt");
    System.loadLibrary("lept");
    System.loadLibrary("tess");
  }
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    GeneratedPluginRegistrant.registerWith(this);

    new MethodChannel(getFlutterView(), CHANNEL).setMethodCallHandler(
      new MethodCallHandler() {
        @java.lang.Override
        public void onMethodCall(MethodCall methodCall, Result result) {
          if (methodCall.method.equals(CHECK_TRAINED_DATA)) {
            String lang = methodCall.arguments();
            result.success(checkTrainedData(lang));
          }
          if (methodCall.method.equals(GET_TRAINED_DATA)) {
            String lang = methodCall.arguments();
            getTrainedData(lang, result);
          }
          if (methodCall.method.equals(RUN_OCR)) {
            String lang = methodCall.argument("lang");
            String imgPath = methodCall.argument("imgPath");
            Map<String, String> config = methodCall.argument("config");
            runOcr(lang, imgPath, config, result);
          }
        }
      }
    );
  }

  private void runOcr(String lang, String imgPath, Map<String, String> config, Result result) {
    try {
      tessdataDir();
      new RunOCR().execute(
        new RunOCR.RunOCRInput(lang, trainedDataDir().getAbsolutePath(), imgPath, config, result)
      );
    } catch (IOException err) {
      result.error(err.getMessage(), err.getStackTrace().toString(), null);
    }

  }

  private Boolean checkTrainedData(String lang) {
    try {
      return trainedDataFile(lang).exists();
    } catch (IOException err) {
      return false;
    }
  }


  private void getTrainedData(String lang, Result result) {
    try {
      File file = trainedDataFile(lang);
      if (!file.exists()) {
        new DownloadTrainedData().execute(new DownloadTrainedData.Input(lang, file, result));
      } else {
        result.success(true);
      }
    } catch (IOException err) {
      result.error(err.getMessage(), err.toString(), false);
    }
  }

  private String trainedDataPath(String lang) throws IOException {
    return tessdataDir() + File.separator + lang.toLowerCase() + ".traineddata";
  }

  private File trainedDataDir() throws IOException {
    Context context = getApplicationContext();
    return ensureDir(context.getFilesDir().getAbsolutePath() + File.separator + "traineddata");
  }

 private File tessdataDir() throws IOException {
    Context context = getApplicationContext();
    return ensureDir(trainedDataDir().getAbsolutePath() + File.separator + "tessdata");
  }

  private File trainedDataFile(String lang) throws IOException {
    return new File(trainedDataPath(lang));
  }

  private File ensureDir(String path) throws IOException {
    File dir = new File(path);
    if (dir.exists() || dir.mkdir()) {
      return dir;
    }
    throw new IOException("Could not create directory");
  }
}
