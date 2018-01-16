var path = require("path");
var fs = require("fs");
var request = require("request");

module.exports = () => {
    return new Promise((res, rej) => {
        const filePath = path.join(path.dirname(__dirname), "langs", "eng.traineddata")
        console.log("Loading Trained Data...");
        fs.exists(filePath, (exists) => {
            if (exists) {
                res(filePath);
            } else {
                const file = fs.createWriteStream(filePath);
                request("http://raw.githubusercontent.com/tesseract-ocr/tessdata/master/eng.traineddata",
                    (err, response, body) => {
                        if (err) {
                            rej(err);
                        }
                        file.write(body);
                        res(filePath);
                    });
            }
        });

    });
};
