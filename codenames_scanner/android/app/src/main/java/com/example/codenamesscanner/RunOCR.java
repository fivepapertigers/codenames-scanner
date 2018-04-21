package com.example.codenamesscanner;

import android.os.AsyncTask;

import com.googlecode.tesseract.android.TessBaseAPI;

import java.io.File;
import java.util.Map;

import io.flutter.plugin.common.MethodChannel;

public class RunOCR extends AsyncTask<RunOCR.RunOCRInput, Void, Void> {

  protected Void doInBackground(RunOCRInput... inputs) {
    RunOCRInput input = inputs[0];
    try {
      TessBaseAPI tess = new TessBaseAPI();
      tess.init(input.trainedDataPath, input.lang);
      for (Map.Entry<String, String> entry: input.config.entrySet()) {
        tess.setVariable(entry.getKey(), entry.getValue());
      }
      tess.setDebug(true);
      tess.setImage(new File(input.imgPath));
      input.result.success(tess.getHOCRText(0));
      tess.end();
    } catch (Exception err) {
      input.result.error(err.getMessage(), err.getStackTrace().toString(), err);
    }
    return null;
  }


  public static class RunOCRInput {

    public final String lang;
    public final String trainedDataPath;
    public final String imgPath;
    public final MethodChannel.Result result;
    public final Map<String, String> config;

    RunOCRInput(String lang, String trainedDataPath, String imgPath, Map<String, String> config,
                MethodChannel.Result result) {
      this.lang = lang;
      this.result = result;
      this.imgPath = imgPath;
      this.trainedDataPath = trainedDataPath;
      this.config = config;
    }
  }
}

