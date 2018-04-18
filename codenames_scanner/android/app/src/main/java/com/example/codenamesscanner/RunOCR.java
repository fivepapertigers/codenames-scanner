package com.example.codenamesscanner;

import android.os.AsyncTask;

import com.googlecode.tesseract.android.TessBaseAPI;

import java.io.File;

import io.flutter.plugin.common.MethodChannel;

public class RunOCR extends AsyncTask<RunOCR.RunOCRInput, Void, Void> {

  protected Void doInBackground(RunOCRInput... inputs) {
    RunOCRInput input = inputs[0];
    System.out.println(input.imgPath);
    System.out.println(input.lang);
    System.out.println(input.trainedDataPath);

    try {
      TessBaseAPI tess = new TessBaseAPI();
      tess.init(input.trainedDataPath, input.lang);
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

    RunOCRInput(String lang, String trainedDataPath, String imgPath, MethodChannel.Result result) {
      this.lang = lang;
      this.result = result;
      this.imgPath = imgPath;
      this.trainedDataPath = trainedDataPath;
    }
  }
}

