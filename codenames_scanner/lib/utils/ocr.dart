import 'package:flutter/services.dart';
import 'package:codenames_scanner/utils/util.dart';
import 'dart:async';
import 'package:html/parser.dart';
import 'package:html/dom.dart';

const PROVIDER = MethodChannel('codenames-scanner/ocr');
const RUN_OCR = 'runOcr';
const CHECK_TRAINED_DATA = 'checkTrainedData';
const GET_TRAINED_DATA = 'getTrainedData';
const ONLY_CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';


class TesseractConfig {
  static const TESSEDIT_CHAR_WHITELIST = 'tessedit_char_whitelist';
}

abstract class OcrElement {
  final separator = '';
  final Element _htmlElement;

  OcrElement(this._htmlElement);

  String get text;
  String _getText (List<OcrElement> children) {
    return mapReduce<OcrElement, String>(
        children,
        (res, child) => '$res${child.separator}${child.text}',
        initial: ''
    );
  }
}

/*
* A single word detected in Ocr
* */
class OcrWord extends OcrElement {

  /// Separator between words
  final separator = ' ';

  /// HTML element associated with the word
  final Element _htmlElement;

  OcrWord(this._htmlElement): super(_htmlElement);

  /// Raw text for the word
  String get text => _htmlElement.innerHtml;
  /// Ocr confidence level for the word
  int get confidence => int.parse(getOcrPropFromTitle('x_wconf', _htmlElement));
}

class OcrLine extends OcrElement {

  /// Separator between lines
  final separator = '\n';
  final Element _htmlElement;

  OcrLine(this._htmlElement): super(_htmlElement);

  String get text => _getText(words);
  List<OcrWord> get words => _htmlElement.children.map((e) => new OcrWord(e)).toList();

}

class OcrParagraph extends OcrElement {

  final separator = '\n';
  final Element _htmlElement;

  OcrParagraph(this._htmlElement): super(_htmlElement);

  String get text => _getText(lines);
  List<OcrLine> get lines => _htmlElement.children.map((e) => new OcrLine(e)).toList();
  List<OcrWord> get words => flattenMap<OcrLine, OcrWord>(lines, (line) => line.words);
}

class OcrArea extends OcrElement {

  final separator = '\n\n';

  final Element _htmlElement;

  OcrArea(this._htmlElement): super(_htmlElement);

  String get text => _getText(paragraphs);
  List<OcrParagraph> get paragraphs => _htmlElement.children.map((e) => new OcrParagraph(e)).toList();
  List<OcrLine> get lines => flattenMap<OcrParagraph, OcrLine>(paragraphs, (par) => par.lines);
  List<OcrWord> get words => flattenMap<OcrLine, OcrWord>(lines, (line) => line.words);
}

class OcrPage extends OcrElement {

  final separator = '\n----------\n';

  final Element _htmlElement;

  OcrPage(this._htmlElement): super(_htmlElement);

  String get text => _getText(areas);
  List<OcrArea> get areas => _htmlElement.children.map((e) => new OcrArea(e)).toList();

  List<OcrParagraph> get paragraphs => flattenMap<OcrArea, OcrParagraph>(areas, (area) => area.paragraphs);
  List<OcrLine> get lines => flattenMap<OcrParagraph, OcrLine>(paragraphs, (par) => par.lines);
  List<OcrWord> get words => flattenMap<OcrLine, OcrWord>(lines, (line) => line.words);
}

class OcrDocument extends OcrElement {
  final Element _htmlElement;
  final separator = '\n~~~~~~~~~~~\n';

  OcrDocument(this._htmlElement): super(_htmlElement);
  static OcrDocument fromHtmlString(String html) {
    Document document = parse(html);
    return new OcrDocument(document.body);
  }

  String get text => _getText(pages);
  List<OcrPage> get pages => _htmlElement.children.map((e) => new OcrPage(e)).toList();
  List<OcrArea> get areas => flattenMap<OcrPage, OcrArea>(pages, (page) => page.areas);
  List<OcrParagraph> get paragraphs => flattenMap<OcrArea, OcrParagraph>(areas, (area) => area.paragraphs);
  List<OcrLine> get lines => flattenMap<OcrParagraph, OcrLine>(paragraphs, (par) => par.lines);
  List<OcrWord> get words => flattenMap<OcrLine, OcrWord>(lines, (line) => line.words);
}


Future<OcrDocument> runOcr (String imagePath, String lang) async {
  try {
    String ocrResultHtml = await PROVIDER.invokeMethod(RUN_OCR, {
      'imgPath': imagePath,
      'lang': lang,
      'config': {
        TesseractConfig.TESSEDIT_CHAR_WHITELIST: ONLY_CHARACTERS
      }
    });
    return OcrDocument.fromHtmlString(ocrResultHtml);
  } on PlatformException catch(err) {
    print('OCR ERROR: ${err.toString()}');
    return null;
  }
}

Future<bool> checkTrainedData (String lang) async {
  try {
    bool exists = await PROVIDER.invokeMethod(CHECK_TRAINED_DATA, lang);
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
