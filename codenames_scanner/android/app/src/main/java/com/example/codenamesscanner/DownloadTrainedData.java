package com.example.codenamesscanner;

import android.os.AsyncTask;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

import io.flutter.plugin.common.MethodChannel;

public class DownloadTrainedData extends AsyncTask<DownloadTrainedData.Input, Void, Void> {
  private static final String URL_BASE = "https://github.com/tesseract-ocr/tessdata/raw/master/%s.traineddata";

  protected Void doInBackground(Input... inputs) {
    Input input = inputs[0];
    HttpURLConnection connection;
    try {
      URL url = new URL(String.format(URL_BASE, input.lang));
      connection = (HttpURLConnection) url.openConnection();
      connection.connect();
      if (connection.getResponseCode() == HttpURLConnection.HTTP_OK) {
        InputStream inputStream = connection.getInputStream();
        OutputStream output = new FileOutputStream(input.file);

        int bytesRead = -1;
        byte[] buffer = new byte[4096];
        while ((bytesRead = inputStream.read(buffer)) != -1) {
          output.write(buffer, 0, bytesRead);
        }
        output.flush();
        output.close();
        inputStream.close();
        input.result.success(true);
      }
    } catch (Exception err) {
      err.printStackTrace();
      System.err.println(err.getMessage());
      input.result.error(err.getMessage(), err.getStackTrace().toString(), false);
    }
    return null;
  }


  public static class Input {
    public final String lang;
    public final MethodChannel.Result result;
    public final File file;

    Input(String lang, File file, MethodChannel.Result result) {
      this.lang = lang;
      this.result = result;
      this.file = file;
    }
  }


}
