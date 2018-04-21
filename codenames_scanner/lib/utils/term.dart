
import 'package:codenames_scanner/utils/util.dart';
import 'package:edit_distance/edit_distance.dart';
import 'package:codenames_scanner/models.dart';


const CODENAMES_LIBRARY = [
  "AFRICA", "AGENT", "AIR", "ALIEN", "ALPS", "AMAZON", "AMBULANCE",
  "AMERICA", "ANGEL", "ANTARCTICA", "APPLE", "ARM", "ATLANTIS", "AUSTRALIA",
  "AZTEC", "BACK", "BALL", "BAND", "BANK", "BAR", "BARK", "BAT", "BATTERY",
  "BEACH", "BEAR", "BEAT", "BED", "BEIJING", "BELL", "BELT", "BERLIN",
  "BERMUDA", "BERRY", "BILL", "BLOCK", "BOARD", "BOLT", "BOMB", "BOND",
  "BOOM", "BOOT", "BOTTLE", "BOW", "BOX", "BRIDGE", "BRUSH", "BUCK",
  "BUFFALO", "BUG", "BUGLE", "BUTTON", "CALF", "CANADA", "CAP", "CAPITAL",
  "CAR", "CARD", "CARROT", "CASINO", "CAST", "CAT", "CELL", "CENTAUR",
  "CENTER", "CHAIR", "CHANGE", "CHARGE", "CHECK", "CHEST", "CHICK", "CHINA",
  "CHOCOLATE", "CHURCH", "CIRCLE", "CLIFF", "CLOAK", "CLUB", "CODE", "COLD",
  "COMIC", "COMPOUND", "CONCERT", "CONDUCTOR", "CONTRACT", "COOK", "COPPER",
  "COTTON", "COURT", "COVER", "CRANE", "CRASH", "CRICKET", "CROSS", "CROWN",
  "CYCLE", "CZECH", "DANCE", "DATE", "DAY", "DEATH", "DECK", "DEGREE",
  "DIAMOND", "DICE", "DINOSAUR", "DISEASE", "DOCTOR", "DOG", "DRAFT",
  "DRAGON", "DRESS", "DRILL", "DROP", "DUCK", "DWARF", "EAGLE", "EGYPT",
  "EMBASSY", "ENGINE", "ENGLAND", "EUROPE", "EYE", "FACE", "FAIR", "FALL",
  "FAN", "FENCE", "FIELD", "FIGHTER", "FIGURE", "FILE", "FILM", "FIRE",
  "FISH", "FLUTE", "FLY", "FOOT", "FORCE", "FOREST", "FORK", "FRANCE",
  "GAME", "GAS", "GENIUS", "GERMANY", "GHOST", "GIANT", "GLASS", "GLOVE",
  "GOLD", "GRACE", "GRASS", "GREECE", "GREEN", "GROUND", "HAM", "HAND",
  "HAWK", "HEAD", "HEART", "HELICOPTER", "HIMALAYAS", "HOLE", "HOLLYWOOD",
  "HONEY", "HOOD", "HOOK", "HORN", "HORSE", "HORSESHOE", "HOSPITAL", "HOTEL",
  "ICE", "ICE CREAM", "INDIA", "IRON", "IVORY", "JACK", "JAM", "JET",
  "JUPITER", "KANGAROO", "KETCHUP", "KEY", "KID", "KING", "KIWI", "KNIFE",
  "KNIGHT", "LAB", "LAP", "LASER", "LAWYER", "LEAD", "LEMON", "LEPRECHAUN",
  "LIFE", "LIGHT", "LIMOUSINE", "LINE", "LINK", "LION", "LITTER",
  "LOCH NESS", "LOCK", "LOG", "LONDON", "LUCK", "MAIL", "MAMMOTH", "MAPLE",
  "MARBLE", "MARCH", "MASS", "MATCH", "MERCURY", "MEXICO", "MICROSCOPE",
  "MILLIONAIRE", "MINE", "MINT", "MISSILE", "MODEL", "MOLE", "MOON",
  "MOSCOW", "MOUNT", "MOUSE", "MOUTH", "MUG", "NAIL", "NEEDLE", "NET",
  "NEW YORK", "NIGHT", "NINJA", "NOTE", "NOVEL", "NURSE", "NUT", "OCTOPUS",
  "OIL", "OLIVE", "OLYMPUS", "OPERA", "ORANGE", "ORGAN", "PALM", "PAN",
  "PANTS", "PAPER", "PARACHUTE", "PARK", "PART", "PASS", "PASTE", "PENGUIN",
  "PHEONIX", "PIANO", "PIE", "PILOT", "PIN", "PIPE", "PIRATE", "PISTOL",
  "PIT", "PITCH", "PLANE", "PLASTIC", "PLATE", "PLATYPUS", "PLAY", "PLOT",
  "POINT", "POISON", "POLE", "POLICE", "POOL", "PORT", "POST", "POUND",
  "PRESS", "PRINCESS", "PUMPKIN", "PUPIL", "PYRAMID", "QUEEN", "RABBIT",
  "RACKET", "RAY", "REVOLUTION", "RING", "ROBIN", "ROBOT", "ROCK", "ROME",
  "ROOT", "ROSE", "ROULETTE", "ROUND", "ROW", "RULER", "SATELLITE", "SATURN",
  "SCALE", "SCHOOL", "SCIENTIST", "SCORPION", "SCREEN", "SCUBA DIVER",
  "SEAL", "SERVER", "SHADOW", "SHAKESPEARE", "SHARK", "SHIP", "SHOE", "SHOP",
  "SHOT", "SINK", "SKYSCRAPER", "SLIP", "SLUG", "SMUGGLER", "SNOW",
  "SNOWMAN", "SOCK", "SOLDIER", "SOUL", "SOUND", "SPACE", "SPELL", "SPIDER",
  "SPIKE", "SPINE", "SPOT", "SPRING", "SPY", "SQUARE", "STADIUM", "STAFF",
  "STAR", "STATE", "STICK", "STOCK", "STRAW", "STREAM", "STRIKE", "STRING",
  "SUB", "SUIT", "SUPERHERO", "SWING", "SWITCH", "TABLE", "TABLET", "TAG",
  "TAIL", "TAP", "TEACHER", "TELESCOPE", "TEMPLE", "THEATER", "THIEF",
  "THUMB", "TICK", "TIE", "TIME", "TOKYO", "TOOTH", "TORCH", "TOWER",
  "TRACK", "TRAIN", "TRIANGLE", "TRIP", "TRUNK", "TUBE", "TURKEY",
  "UNDERTAKER", "UNICORN", "VACUUM", "VAN", "VET", "WAKE", "WALL", "WAR",
  "WASHER", "WASHINGTON", "WATCH", "WATER", "WAVE", "WEB", "WELL", "WHALE",
  "WHIP", "WIND", "WITCH", "WORM", "YARD"
];

const LIBRARY_MATCH_WEIGHT = 20.0;
const SINGLE_WORD_WEIGHT = 5.0;
const LIBRARY_DISTANCE_WEIGHT = 8.0;
RegExp validTermRe = new RegExp(r'^[A-Z]{2,}(\s[A-Z]{2,})?$');
RegExp multiWordRe = new RegExp(r'\s');



TermResult findTermFromLinesOfText(List<List<String>> textLines) {
  List<TermResult> termResults = validTermsFromTextLines(textLines)
    .map((String term) =>
      new TermResult(
        term: term, confidence: weighTerm(term)
      )
    ).toList();

  if (termResults.length == 0) {
    return new TermResult(confidence: 0.0);
  }
  TermResult termResult = termResults
      .reduce((best, next) => best.confidence > next.confidence ? best : next);

  return libraryBestMatch(termResult.term);
}

List<String> validTermsFromTextLines(List<List<String>> textLines) {
  return flatten(textLines.map(breakLineIntoTerms).toList())
     ..retainWhere(isValidTerm);
}

List<String> breakLineIntoTerms(List<String> line) {
  return mapReduceWithIdx<String, List<String>>(
    line,
    (List<String> resultCollection, String word, int idxA) =>
      new List<String>.from(resultCollection)
      ..add(word)
      ..addAll(
        mapReduceWithIdx<String, List<List<String>>>(
          line.getRange(idxA, line.length).toList(),
          (combinedCollections, innerWord, idxB) {
            List<String> noSpaceColl = combinedCollections[0];
            List<String> spacesColl = combinedCollections[1];
            String lastWord = noSpaceColl.length > 0 ? noSpaceColl.last : word;
            noSpaceColl.add('$lastWord$innerWord');
            spacesColl.add('$lastWord $innerWord');
            return combinedCollections;
          },
          initial: new List<List<String>>.of([new List<String>(), new List<String>()])
        )
        .reduce((singleColl, item) => singleColl..addAll(item))
      ),
    initial: new List<String>()
  );
}

typedef Weigher = double Function(String term);

double weighTerm (String term) {
  List<Weigher> weighers = [weighLibraryMatch, weighLibraryDistance, weighSingleWord];
  return mapReduce<Weigher, double>(
      weighers, (weight, weigher) => weight + weigher(term), initial: 0.0);
}

bool isValidTerm(String word) {
  return word.length > 2 && validTermRe.hasMatch(word);
}

double weighLibraryMatch(String term) {
  return isInLibrary(term) ? LIBRARY_MATCH_WEIGHT : 0.0;
}

double weighLibraryDistance(String term) {
  return libraryBestMatch(term).confidence * LIBRARY_DISTANCE_WEIGHT;
}

double weighSingleWord(String term) {
  return multiWordRe.hasMatch(term) ? 0.0 : SINGLE_WORD_WEIGHT;
}

bool isInLibrary(String term) {
  return CODENAMES_LIBRARY.indexOf(term) > -1;
}

TermResult libraryBestMatch(String term) {
  return mapReduce<String, TermResult>(CODENAMES_LIBRARY,
      (TermResult highestTerm, String libTerm) {
        double confidence = matchConfidence(term, libTerm);
        return highestTerm == null || highestTerm.confidence < confidence
          ? new TermResult(confidence: confidence, term: libTerm)
          : highestTerm;
      });
}


double matchConfidence (String term1, String term2) {
  return 1 - new JaroWinkler().normalizedDistance(term1, term2);
}
