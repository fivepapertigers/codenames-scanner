/* eslint-env node, es6 */

import path from "path";

import randtoken from "rand-token";

import { TOKEN_CHARACTER_SET } from "../config";
import { loadS3File, saveS3File } from "../aws-helpers";


export default class File {

    static async loadFromPath (filePath) {
        const fileName = path.basename(filePath);
        const folder = path.dirname(filePath);
        return this.load(folder, fileName);
    }

    static async load (folder, fileName) {
        const contents = loadS3File(formatFilePath(folder, fileName));
        return new File(folder, fileName, contents);
    }

    constructor(folder, name = randtoken.generate(6, TOKEN_CHARACTER_SET), contents) {
        this.folder = folder;
        this.name = name;
        this.contents = contents;
    }

    async save() {
        await saveS3File(this.fullPath(), this.contents);
        return;
    }

    fullPath() {
        return formatFilePath(this.folder, this.name);
    }

}


export function formatFilePath (folder, fileName) {
    return `${folder}/${fileName}`;
}
