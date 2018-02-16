import { ImageEditor, ImageStore } from "react-native";

import { getImageB64, sliceCardFromBoardImage } from ".ImageProcessor";
import * as BD from "./BoardDimensions";

jest.mock("react-native", () => ({
  ImageEditor: {
    cropImage: jest.fn((uri, cropData, successCb, errorCb) => {
      if (uri === "somegooduri") {
        return successCb("somecarduri");
      }
      return errorCb(new Error("error"));
    })
  },
  ImageStore: {
    getBase64ForTag: jest.fn((uri, successCb, errorCb) => {
      if (uri === "somegooduri") {
        return successCb("success64");
      }
      return errorCb(new Error("error"));
    })
  }
}));

jest.mock("./BoardDimensions", () => ({
  cardWidthPixels: jest.fn(() => 100.3),
  cardHeightPixels: jest.fn(() => 199.5),
  cardLeftPixels: jest.fn(() => "cardleft"),
  cardTopPixels: jest.fn(() => "cardtop")
}));


describe("getImageB64", () => {

  test("gets base64 image", async() => {
    const res = await getImageB64({uri: "somegooduri"});
    expect(res).toBe("success64");
  });

  test("gets image from ImageStore", async() => {
    await getImageB64({uri: "somegooduri"});
    expect(ImageStore.getBase64ForTag.mock.calls[0][0]).toEqual("somegooduri");
  });

  test("throws error", async() => {
    let error = null;
    try {
      await getImageB64({uri: "somebadri"});
    } catch (e) {
      error = e;
    }
    expect(error && error.message).toEqual("error");
  });

});

describe("sliceCardFromBoardImage", () => {

  afterEach(() => {
    BD.cardHeightPixels.mockReset();
    BD.cardWidthPixels.mockReset();
    BD.cardLeftPixels.mockReset();
    BD.cardTopPixels.mockReset();
  });

  test("slices a board into individual card", async() => {
    const res = await sliceCardFromBoardImage({
      uri: "somegooduri",
      width: 500,
      height: 500
    })(2, 4);
    expect(res).toEqual({
      uri: "somecarduri",
      width: 100,
      height: 200
    });
  });

  test("crops original image with correct coordinates", async() => {
    const card = {row: 2, col: 4};
    await sliceCardFromBoardImage({
      uri: "somegooduri",
      width: "boardwidth",
      height: "boardheight"
    })(2, 4);

    expect(BD.cardWidthPixels.mock.calls[0]).toEqual(["boardwidth"]);
    expect(BD.cardHeightPixels.mock.calls[0]).toEqual(["boardheight"]);
    expect(BD.cardLeftPixels.mock.calls[0]).toEqual(["boardwidth", card]);
    expect(BD.cardTopPixels.mock.calls[0]).toEqual(["boardheight", card]);
    expect(ImageEditor.cropImage.mock.calls[0].slice(0, 2)).toEqual([
      "somegooduri",
      {
        offset: {
          x: "cardleft",
          y: "cardtop"
        },
        size: {
          width: 100,
          height: 200
        },
      }
    ]);
  });

  test("throws an error", async() => {
    let error = null;
    try {
      await sliceCardFromBoardImage({
        uri: "somebadri", width: 20, height: 20
      })(2, 4);
    } catch (e) {
      error = e;
    }
    expect(error && error.message).toEqual("error");
  });

});
