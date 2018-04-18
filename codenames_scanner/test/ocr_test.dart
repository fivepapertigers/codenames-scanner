import 'dart:io';
import 'package:flutter_test/flutter_test.dart';
import 'package:codenames_scanner/utils/ocr.dart';

void main() {
  
  test('gets ocr words from html result', () {
    String html = _get_hocr_html();
    OcrDocument ocrDoc = OcrDocument.fromHtmlString(html);
    expect(ocrDoc.words[0].text, 'ESXVCLUEIGNH');
    expect(ocrDoc.words[0].confidence, 57);
    expect(ocrDoc.words[1].text, 'UNDERTAKER');
    expect(ocrDoc.words[1].confidence, 90);
    expect(ocrDoc.words[2].text, ' ');
    expect(ocrDoc.words[2].confidence, 95);
  });
}


String _get_hocr_html() {
  File f = new File(Directory.current.path + '/assets/sample.html.hocr');
  return f.readAsStringSync();
}