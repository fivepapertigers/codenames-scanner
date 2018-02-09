import React from "react";
import { Text, View, Button } from "react-native";
import { connect } from "react-redux";

import { processBoardImage } from "../Actions";
import ImageCapture from "../components/ImageCapture";
import BoardOverlay from "../components/BoardOverlay";

const BoardCaptureContainer = ({ imageCaptured, navigateOnCapture }) => (
  <View
    style={{
      width: "100%",
      height: "100%",
      top: 0,
      left: 0,
      position: "absolute"
    }}
  >
    <ImageCapture imageCaptured={(...args) => {
      imageCaptured(...args);
      navigateOnCapture();
    }}>
      <BoardOverlay />
    </ImageCapture>
  </View>
);

const mapDispatchToProps = dispatch => ({
  imageCaptured: image => dispatch(processBoardImage(image)),
});

export default connect(() => ({}), mapDispatchToProps)(BoardCaptureContainer);
