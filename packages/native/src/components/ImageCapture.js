import React from "react";
import { ActivityIndicator, Text, View, TouchableOpacity, Dimensions } from "react-native"; // eslint-disable-line no-unused-vars
import { Camera, Permissions, ScreenOrientation } from "expo"; // eslint-disable-line no-unused-vars

const AspectRatios = {
  WIDE: 16.0 / 9,
  NORMAL: 4.0 / 3,
  SQUARE: 1
};

export default class ImageCapture extends React.Component {
  state = {
    camera: null,
    hasCameraPermission: null,
    image: null,
    type: Camera.Constants.Type.back,
    capturing: false
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  async capture() {
    if (this.camera && !this.capturing) {
      this.setState({capturing: true});
      const image = await this.camera.takePictureAsync();
      this.setState({
        image: image,
        capturing: false
      });
      this.props.imageCaptured(image);
    }
  }

  changeCameras() {
    this.setState({
      type: this.state.type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back,
    });
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <Text>Loading...</Text>;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            "backgroundColor": "black"
          }}>
          <Camera
            style={{
              ...cameraDimensions(AspectRatios.NORMAL)
            }}
            type={this.state.type}
            ref={ref => { this.camera = ref; }}
            ratio="4:3"
            onMountError={(...args) => {
              console.log("camera error", arg);
            }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: "transparent",
                width: "100%",
                height: "100%"
              }}>
              <TouchableOpacity
                style={{
                  height: "100%",
                  width: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0
                }}
                onPress={this.capture.bind(this)}
              >
                {this.props.children}
              </TouchableOpacity>
              {
                this.state.capturing
                ? (
                  <ActivityIndicator
                    style={{
                      width: "100%",
                      height: "100%",
                      top: 0,
                      left: 0,
                      position: "absolute",
                      backgroundColor: "rgba(0, 0, 0, .7)"
                    }}
                    size="large"
                    color="white"
                  />
                )
                : null
              }
            </View>
          </Camera>
        </View>
      );
    }
  }
}

function cameraDimensions (ratio) {
  const { width, height } = Dimensions.get("window");
  if (width / height > ratio) {
    return { height, width: height * ratio };
  }
  return { width, height: width / ratio };
}
