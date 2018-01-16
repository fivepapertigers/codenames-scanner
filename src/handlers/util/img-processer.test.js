import fs from "fs";
import path from "path";

import { findTermFromImage } from "./img-processor";

const FILE_TERM_MAP = [
    ["beijing.jpg", "BEIJING"],
    ["cotton.jpg", "COTTON"],
    ["undertaker.jpg", "UNDERTAKER"],
    ["lochness.jpg", "LOCH NESS"],
    ["vacuum.jpg", "VACUUM"]
];

describe("processImage function", async () => {

    it("correctly pulls terms from images", async () => {
        for (const [filename, term] of FILE_TERM_MAP) {
            const img = fs.readFileSync(path.join(__dirname, "assets", filename))
            const result = await findTermFromImage(img);
            expect(result).toBe(term);
        }
    }, 30000);

});

