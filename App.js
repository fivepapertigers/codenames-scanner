import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import { Board } from './Models';
import { sliceImageIntoCards, detectWordsOnCardImage } from './ImageProcessor';
import BoardCapture from './components/BoardCapture';
import BoardOverlay from './components/BoardOverlay';

import ImagePicker from 'react-native-image-picker';



export default class App extends React.Component {

  state = {
    board: new Board(),
    cardImages: [],
    image: null
  }


  async componentDidMount () {
    const image = await captureImage();
    this.setState({ image });

    let cardImages = await sliceImageIntoCards(image, this.state.board);
    this.setState({ cardImages });

    cardImages = await Promise.all(cardImages.map(detectWordsOnCardImage));
    this.setState({ cardImages });

  }


  render() {
    if (this.state.image) {
      return (
        <View>
          <Image source={this.state.image} style={{width: 400, height: 300}}/>
          <Text>{this.state.image.width} x {this.state.image.height}</Text>
          {this.renderCardImages()}
        </View>
      )
    } else {
      return (
        <View/>
      );
    }
  }

  renderCardImages() {
    return this.state.cardImages.map((cardImage) => {
      const {card, image} = cardImage;
      return (
        <View
          key={`${card.row}${card.column}`}
        >
          <Text>Row: {card.row} / Column: {card.column}</Text>
          <Text>Word: {card.word}</Text>
          <Image source={image} style={{width: 210, height: 130}}></Image>
        </View>
      )
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

async function getImageFromPath(imagePath) {
  return {uri: imagePath}
  return new Promise((res, rej) => {
    try {
      Image.getSize(imagePath, (width, height) => {
        image.width = width;
        image.height = height;
        res(Object.assign({width, height}, image));
      });
    } catch (e) {
      rej(e);
    }
  });
}

async function captureImage() {
  return new Promise((res, rej) => {
    const options = {
      cameraType: 'front',
      mediaType: 'photo',
      noData: true
    }
    ImagePicker.launchCamera(options, (image)  => {
      res(image)
    });
  })
}
