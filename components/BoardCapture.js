import React from 'react';
import { Text, View, TouchableOpacity, Dimensions } from 'react-native';
import Camera from 'react-native-camera';
import Orientation from 'react-native-orientation';

const AspectRatios = {
  WIDE: 16.0 / 9,
  NORMAL: 4.0 / 3,
  SQUARE: 1
}

export default class BoardCapture extends React.Component {

  async capture() {
    if (this.camera) {
      const image = await this.camera.capture({});
      this.props.imageCaptured(image.path);
    }
  }


  componentDidMount() {
    // this locks the view to Landscape Mode
    Orientation.lockToLandscapeLeft();
  }


  componentWillUnmount() {
    Orientation.unlockAllOrientations();
  }

  render() {
    const dims = cameraDimensions(AspectRatios.NORMAL);
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'black'
        }}>
        <Camera
          type={Camera.constants.Type.back}
          ref={ref => { this.camera = ref; }}
          aspect={Camera.constants.Aspect.fit}
          orientation={Camera.constants.Orientation.auto}
          captureQuality={Camera.constants.CaptureQuality.high}
          style={{
            height: dims.height,
            width: dims.width,
            backgroundColor: 'grey'
          }}
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
          </View>
        </Camera>
      </View>
    );
  }
}

function cameraDimensions (ratio) {
  const { width, height } = Dimensions.get('window');
  if (width / height > ratio) {
    return { height, width: height * ratio }
  }
  return { width, height: width / ratio }
}