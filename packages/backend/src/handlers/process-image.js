import { findTermFromImage, base64ToJpeg } from "./util/img-processor";
import File from "../models/file";
import TermResult from "../models/term-result";
import { asyncHandler } from "./util/lambda-handler";


async function processImage (event) {

  // Pull file
  const file = await File.loadFromPath(event.Records[0].s3.object.key);

  let term = null;
  let confidence = 0;
  try {
    // Convert to Jpeg
    const jpegContents = await base64ToJpeg(file.contents);
    // Run OCR
    const result = await findTermFromImage(jpegContents);
    term = result.term;
    confidence = result.confidence;
  } catch (err) {
    console.error(err);
  }

  // Save result
  await new TermResult(file.name, term, confidence).save();
}

export const handler = asyncHandler(processImage);
