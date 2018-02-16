import React from "react";
import { View } from "react-native";

import BoardCaptureContainer from "../containers/BoardCaptureContainer";
import BoardCaptureExplanation from "../components/BoardCaptureExplanation";

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
        <BoardCaptureContainer
          navigateOnCapture={() => this.props.navigation.navigate("Grid")}
        />
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
