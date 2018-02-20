/* eslint-env node, es6 */
/**
 * @module ImageProcessor
 * @description logic for processing capture images
 */

import { ImageEditor, ImageStore } from "react-native";
import RNTesseractOcr from "react-native-tesseract-ocr";
import jaroWinkler from "jaro-winkler";
import {
  cardWidthPixels, cardHeightPixels, cardLeftPixels, cardTopPixels
} from "./BoardDimensions";


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

const ONLY_CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LIBRARY_MATCH_WEIGHT = 20;
const SINGLE_WORD_WEIGHT = 5;
const LIBRARY_DISTANCE_WEIGHT = 8;


export async function getImageB64(image) {
  return new Promise((res, rej) => ImageStore.getBase64ForTag(image.uri, res, rej));
}

/**
 * Slices a card from the board and returns the uri
 * @param  {Image} boardImage
 * @return {(row: number, column: number) => string}
 */
export function sliceCardFromBoardImage (boardImage) {
  const width = Math.round(cardWidthPixels(boardImage.width)),
    height = Math.round(cardHeightPixels(boardImage.height));
  return async (row, col) => {
    const card = { row, col };
    const cropData = {
      offset: {
        x: cardLeftPixels(boardImage.width, card),
        y: cardTopPixels(boardImage.height, card)
      },
      size: {
        width: width,
        height: height
      },
    };
    const uri = await cropImage(boardImage.uri, cropData);
    return { uri, width, height };
  };
}

async function cropImage(uri, cropData) {
  return new Promise(
    (res, rej) => ImageEditor.cropImage(uri, cropData, res, rej));
}



export async function findTermFromImage (imageUri) {
  const resultData = await runDetection(imageUri);
  return findTermFromResult(resultData);
}

async function runDetection(imageUri) {
  const cleansedUri = decodeURI(imageUri.replace(/file:\/+/, "/"));
  const result = await RNTesseractOcr.recognize(cleansedUri, "LANG_ENGLISH", {
    whitelist: ONLY_CHARACTERS
  });
  const lines = result
    .split(/\\n/)
    .map(text => text.split(/\s/));
  return { lines };
}

function findTermFromResult(resultData) {
  const term = validTermsFromResult(resultData)
    .reduce(([bestTerm, bestTermWeight], next) => {
      const termWeight = weighTerm(next);
      if (termWeight > bestTermWeight) {
        return [next, termWeight];
      } else {
        return [bestTerm, bestTermWeight];
      }
    }, [null, -1])[0];

  if (term) {
    if (isInLibrary(term)) {
      return { term, confidence: 1 };
    }
    const { libTerm, distance } = libraryBestMatch(term);
    return { term: libTerm, confidence: distance };
  } else {
    return {
      term: null,
      confidence: 0
    };
  }
}

function validTermsFromResult(resultData) {
  return resultData.lines
    .map(breakLineIntoTerms)
    .reduce((terms, termSet) => terms.concat(termSet), [])
    .filter(isValidTerm);
}

function breakLineIntoTerms(lineWords) {
  return lineWords.reduce((collA, lineWordA, idxa) =>
    collA.concat(
      lineWordA,
      ... lineWords.slice(idxa + 1)
        .reduce(([collB, collC], lineWordB, idxb) =>
          [
            collB.concat(`${collB[idxb - 1] || lineWordA}${lineWordB}`),
            collC.concat(`${collB[idxb - 1] || lineWordA} ${lineWordB}`)
          ],
          [[], []])
    ),
    []
  );
}

function weighTerm (term) {
  const weighers = [weighLibraryMatch, weighLibraryDistance, weighSingleWord];
  return weighers.reduce((total, func) => total + func(term), 0);
}

function isValidTerm(word) {
  return word.length > 2 && word.match(/^[A-Z]{2,}(\s[A-Z]{2,})?$/);
}

function weighLibraryMatch(term) {
  return isInLibrary(term) ? LIBRARY_MATCH_WEIGHT : 0;
}

function weighLibraryDistance(term) {
  return libraryBestMatch(term).distance * LIBRARY_DISTANCE_WEIGHT;
}

function weighSingleWord(term) {
  return term.match(/\s/) ? 0 : SINGLE_WORD_WEIGHT;
}

function isInLibrary(term) {
  return CODENAMES_LIBRARY.indexOf(term) > -1;
}

function libraryBestMatch(term) {
  return CODENAMES_LIBRARY
    .map(libTerm => ({ libTerm, distance: jaroWinkler(libTerm, term) }))
    .reduce(
      (high, next) => high.distance > next.distance ? high : next,
      { distance: 0 }
    );
}
