import 'dart:io';
import 'package:flutter_test/flutter_test.dart';
import 'package:codenames_scanner/utils/ocr.dart';
import 'package:codenames_scanner/utils/term.dart';

void main() {

  test('gets ocr words from html result', () {
    String html = _getHocrHtml();
    OcrDocument ocrDoc = OcrDocument.fromHtmlString(html);
    expect(ocrDoc.words[0].text, 'ESXVCLUEIGNH');
    expect(ocrDoc.words[0].confidence, 57);
    expect(ocrDoc.words[1].text, 'UNDERTAKER');
    expect(ocrDoc.words[1].confidence, 90);
    expect(ocrDoc.words[2].text, ' ');
    expect(ocrDoc.words[2].confidence, 95);
  });


  test('gets library term', () {
    String html = _getHocrHtml();
    OcrDocument ocrDoc = OcrDocument.fromHtmlString(html);
    var lines = ocrDoc.lines.map(
      (line) => line.words.map((word) => word.text).toList()
    ).toList();
    TermConfidence result = findTermFromLinesOfText(lines);
    expect(result.term, 'UNDERTAKER');
    expect(result.confidence, 1.0);
  });
}

String _getHocrHtml() {
  File f = new File(Directory.current.path + '/assets/sample.html.hocr');
  return f.readAsStringSync();
}
