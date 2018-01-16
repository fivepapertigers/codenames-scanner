import React from 'react';
import { Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { Camera, Permissions, ScreenOrientation } from 'expo';

const AspectRatios = {
  WIDE: 16.0 / 9,
  NORMAL: 4.0 / 3,
  SQUARE: 1
}

export default class BoardCapture extends React.Component {
  state = {
    camera: null,
    hasCameraPermission: null,
    image: null,
    type: Camera.Constants.Type.back
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
    ScreenOrientation.allow(ScreenOrientation.Orientation.LANDSCAPE_LEFT);
  }

  async capture() {
    if (this.camera) {
      const image = await this.camera.takePictureAsync();
      this.setState({image: image});
      ScreenOrientation.allow(ScreenOrientation.Orientation.ALL);
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
            justifyContent: 'center',
            alignItems: 'center',
            'backgroundColor': 'black'
          }}>
          <Camera
            style={{
              ...cameraDimensions(AspectRatios.NORMAL)
            }}
            type={this.state.type}
            ref={ref => { this.camera = ref; }}
            ratio='4:3'
          >
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              {this.props.children}
              <TouchableOpacity
                style={{flex: 1}}
                onPress={this.capture.bind(this)}>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={this.changeCameras.bind(this)}>
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                  {' '}Flip{' '}
                </Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}

function cameraDimensions (ratio) {
  const { width, height } = Dimensions.get('window');
  if (width / height > ratio) {
    return { height, width: height * ratio }
  }
  return { width, height: width / ratio }
}