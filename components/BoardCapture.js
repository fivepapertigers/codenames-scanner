import React from 'react';
import { Text, View, TouchableOpacity, Dimensions } from 'react-native';
import CameraKitCamera from 'react-native-camera-kit';

const AspectRatios = {
  WIDE: 16.0 / 9,
  NORMAL: 4.0 / 3,
  SQUARE: 1
}

export default class BoardCapture extends React.Component {

  async capture() {
    if (this.camera) {
      const image = await this.camera.capture(false);
      console.log(image);
      this.props.imageCaptured(image.path);
    }
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          'backgroundColor': 'black'
        }}>
        <CameraKitCamera
          type={Camera.constants.Type.back}
          ref={ref => { this.camera = ref; }}
          cameraOptions={{
            flashMode: 'auto',             // on/off/auto(default)
            focusMode: 'on',               // off/on(default)
            zoomMode: 'on',                // off/on(default)
            ratioOverlay:'4:3',            // optional, ratio overlay on the camera and crop the image seamlessly
            ratioOverlayColor: '#00000077' // optional
          }}
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center'
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
        </CameraKitCamera>
      </View>
    );
  }
}

// function cameraDimensions (ratio) {
//   const { width, height } = Dimensions.get('window');
//   if (width / height > ratio) {
//     return { height, width: height * ratio }
//   }
//   return { width, height: width / ratio }
// }