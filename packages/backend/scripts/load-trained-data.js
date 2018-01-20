/* eslint-env node, es6 */

var path = require("path");
var fs = require("fs");
var request = require("request");
var zlib = require("zlib");

module.exports = () => {
    return new Promise((res, rej) => {
        var filePath = path.join(path.dirname(__dirname), "eng.traineddata");
        console.log("Loading Trained Data...");
        fs.exists(filePath, (exists) => {
            if (exists) {
                console.log("Already a file at " + filePath + ".");
                res(filePath);
            } else {
                console.log("Downloading Trained Data...");
                var file = fs.createWriteStream(filePath);
                request("http://cdn.rawgit.com/naptha/tessdata/gh-pages/3.02/eng.traineddata.gz")
                    .pipe(zlib.createGunzip())
                    .pipe(file)
                    .on("finish", () => res())
                    .on("error", () => rej());
            }
        });

    }).then(() => {
        console.log("Complete.");
        return "complete";
    });
};

if (require.main === module) {
    module.exports();
}
