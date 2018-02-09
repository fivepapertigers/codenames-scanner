import React from "react";
import { Text, View, Button } from "react-native";
import { connect } from "react-redux";

import { processBoardImage } from "./Actions";
import ImageCapture from "./components/ImageCapture";
import BoardOverlay from "./components/BoardOverlay";

const BoardCaptureExplanation = ({ closeExplanation }) => {
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        position: "absolute",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        padding: 10
      }}
    >
      <Text
        style={{
          fontSize: 32,
          marginBottom: 20,
          color: "#FFAAAA"
        }}
      >
        HOW TO CAPTURE YOUR BOARD
      </Text>
      <Text
        style={{
          fontSize: 20,
          color: "#FFAAAA",
          textAlign: "center"
        }}
      >
        Line up each card so that the black word is inside the approriate
        box. Make sure that all of the black words are face-up.
      </Text>
      <View
        style={{
          marginTop: 20
        }}
      >
        <Button
          onPress={closeExplanation}
          title="Got it"
        />
      </View>
    </View>
  );
};

const mapDispatchToProps = dispatch => ({
  imageCaptured: image => dispatch(processBoardImage(image)),
});

const BoardCaptureContainer = connect(() => ({}), mapDispatchToProps)(
  ({ imageCaptured, navigation }) => (
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
        navigation.navigate("Grid");
      }}>
        <BoardOverlay />
      </ImageCapture>
    </View>
  )
);

class BoardCaptureScreen extends React.Component {

  state = {
    explaining: true
  }

  closeExplanation() {
    this.setState({
      explaining: false
    });
  }

  render () {
    return (
      <View
        style={{
          width: "100%",
          height: "100%"
        }}
      >
        <BoardCaptureContainer navigation={this.props.navigation}/>
        {
          this.state.explaining
            ? <BoardCaptureExplanation closeExplanation={() => {
              this.closeExplanation();
            }}/>
            : null
        }
      </View>
    );
  }
}

export default BoardCaptureScreen;
