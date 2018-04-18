import 'package:flutter/services.dart';
import 'package:codenames_scanner/utils/util.dart';
import 'dart:async';
import 'package:html/parser.dart';
import 'package:html/dom.dart';

const PROVIDER = MethodChannel('codenames-scanner/ocr');
const RUN_OCR = 'runOcr';
const CHECK_TRAINED_DATA = 'checkTrainedData';
const GET_TRAINED_DATA = 'getTrainedData';

class OcrWord {
  final Element _htmlElement;

  OcrWord(this._htmlElement);

  String get text => _htmlElement.innerHtml;

  int get confidence => int.parse(getOcrPropFromTitle('x_wconf', _htmlElement));
}

class OcrLine {
  final Element _htmlElement;

  OcrLine(this._htmlElement);

  List<OcrWord> get words => _htmlElement.children.map((e) => new OcrWord(e)).toList();

}

class OcrParagraph {
  final Element _htmlElement;

  OcrParagraph(this._htmlElement);

  List<OcrLine> get lines => _htmlElement.children.map((e) => new OcrLine(e)).toList();
  List<OcrWord> get words => flattenMap<OcrLine, OcrWord>(lines, (line) => line.words);
}

class OcrArea{
  final Element _htmlElement;

  OcrArea(this._htmlElement);

  List<OcrParagraph> get paragraphs => _htmlElement.children.map((e) => new OcrParagraph(e)).toList();
  List<OcrLine> get lines => flattenMap<OcrParagraph, OcrLine>(paragraphs, (par) => par.lines);
  List<OcrWord> get words => flattenMap<OcrLine, OcrWord>(lines, (line) => line.words);
}

class OcrPage{
  final Element _htmlElement;

  OcrPage(this._htmlElement);

  List<OcrArea> get areas => _htmlElement.children.map((e) => new OcrArea(e)).toList();

  List<OcrParagraph> get paragraphs => flattenMap<OcrArea, OcrParagraph>(areas, (area) => area.paragraphs);
  List<OcrLine> get lines => flattenMap<OcrParagraph, OcrLine>(paragraphs, (par) => par.lines);
  List<OcrWord> get words => flattenMap<OcrLine, OcrWord>(lines, (line) => line.words);
}

class OcrDocument {
  final Element _htmlElement;

  OcrDocument(this._htmlElement);
  static OcrDocument fromHtmlString(String html) {
    Document document = parse(html);
    return new OcrDocument(document.body);
  }

  List<OcrPage> get pages => _htmlElement.children.map((e) => new OcrPage(e)).toList();
  List<OcrArea> get areas => flattenMap<OcrPage, OcrArea>(pages, (page) => page.areas);
  List<OcrParagraph> get paragraphs => flattenMap<OcrArea, OcrParagraph>(areas, (area) => area.paragraphs);
  List<OcrLine> get lines => flattenMap<OcrParagraph, OcrLine>(paragraphs, (par) => par.lines);
  List<OcrWord> get words => flattenMap<OcrLine, OcrWord>(lines, (line) => line.words);
}


Future<String> runOcr (String imagePath, String lang) async {
  print(imagePath);
  try {
    String termResult = await PROVIDER.invokeMethod(RUN_OCR, {
      'imgPath': imagePath,
      'lang': lang
    });
    return termResult;
  } on PlatformException catch(err) {
    print('OCR ERROR: ${err.toString()}');
    return null;
  }
}

Future<bool> checkTrainedData (String lang) async {
  try {
    bool exists = await PROVIDER.invokeMethod(CHECK_TRAINED_DATA, lang);
    print(exists);
    return exists;
  } on PlatformException catch(err) {
    print('checkTrainedData error: ${err.toString()}');
    return false;
  }
}

Future<bool> getTrainedData (String lang) async {
  try {
    return await PROVIDER.invokeMethod(GET_TRAINED_DATA, lang);
  } on PlatformException catch(err) {
    print('getTrainedData error: ${err.toString()}');
    return false;
  }
}


String getOcrPropFromTitle(String key, Element elem) {
  String title = elem.attributes['title'];
  if (title != null) {
    List<String> parts = title.split('; ');
    String item = parts.firstWhere((part) => part.startsWith('$key '));
    if (item != null) {
      return item.split('$key ')[1];
    }
  }
  return null;
}
