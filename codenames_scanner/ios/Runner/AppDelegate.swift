import UIKit
import Flutter
import Alamofire
import TesseractOCR

@UIApplicationMain
@objc class AppDelegate: FlutterAppDelegate {

  override func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?
  ) -> Bool {
    GeneratedPluginRegistrant.register(with: self);
    let controller : FlutterViewController = window?.rootViewController as! FlutterViewController;
    let ocrChannel : FlutterMethodChannel = FlutterMethodChannel.init(
        name: "codenames-scanner/ocr",
        binaryMessenger: controller
    );
    ocrChannel.setMethodCallHandler({(call: FlutterMethodCall, result: @escaping FlutterResult) -> Void in
        if (call.method == "checkTrainedData") {
            let lang = (call.arguments as! String);
            result(self.checkTrainedData(lang: lang));
        } else if (call.method == "getTrainedData") {
            let lang = (call.arguments as! String);
            self.getTrainedData(lang: lang, result: result);
        } else if (call.method == "runOcr") {
            let args = (call.arguments as! [String: Any?]);
            let lang = (args["lang"] as! String);
            let imgPath = (args["imgPath"] as! String);
            let config = (args["config"] as! [String: String]);
            self.runOcr(lang: lang, imgPath: imgPath, config: config, result: result);
        } else {
         result(FlutterMethodNotImplemented);
        }
    })
    return super.application(application, didFinishLaunchingWithOptions: launchOptions)
  }
    
    private func runOcr(lang: String, imgPath: String, config: [String: String], result: FlutterResult) {
        let tess = G8Tesseract.init(language: lang, configDictionary: config, configFileNames: [], cachesRelatedDataPath: "traineddata", engineMode: G8OCREngineMode.tesseractOnly);
        tess?.image = loadImage(imgPath: imgPath);
        let hocr: String = tess!.recognizedHOCR(forPageNumber: 0);
        result(hocr);
    }
    
    private func checkTrainedData(lang: String) -> Bool {
        let fileManager = FileManager.default;
        return fileManager.fileExists(atPath: trainedDataPath(lang: lang).path);
    }

    private func getTrainedData(lang: String, result: @escaping FlutterResult) {
        let url = "https://github.com/tesseract-ocr/tessdata/blob/3.04.00/\(lang).traineddata?raw=true";
        let path: DownloadRequest.DownloadFileDestination = { _, _ in
            return (
                self.trainedDataPath(lang: lang),
                [.removePreviousFile, .createIntermediateDirectories]
            )
        };

        Alamofire.download(url, to: path).response { response in
            let success = response.error == nil;
            result(success);
        };
    }
    
    private func trainedDataPath(lang: String) -> URL {
        return tessdataDir().appendingPathComponent(lang).appendingPathExtension("traineddata");
    }
    
    private func trainedDataDir() -> URL {
        let fileManager = FileManager.default;
        let base = fileManager.urls(for: .cachesDirectory, in: .userDomainMask).first!;
        let path = base.appendingPathComponent("traineddata");
        return path;
    }
    
    private func tessdataDir() -> URL {
        return trainedDataDir().appendingPathComponent("tessdata");
    }
    
    private func loadImage(imgPath: String) -> UIImage {
        let data = try? Data(referencing: NSData(contentsOfFile: imgPath));
        return UIImage(data: data!)!;
    }
}

