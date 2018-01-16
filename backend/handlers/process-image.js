import { findTermFromImage } from "./util/img-processor";
import File from "../models/file";
import TermResult from "../models/term-result";
import { asyncHandler } from "./util/lambda-handler";


async function processImage (event) {
    // Pull file
    const file = await File.loadFromPath(event.Records[0].s3.object.key);

    // Run OCR
    const term = await findTermFromImage(file.contents);
    // Save result
    await new TermResult(file.name, term).save();
}

export default class Handler {
    static handle = asyncHandler(processImage);
}
