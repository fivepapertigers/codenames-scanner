import React from 'react';
import { Text, View, TouchableOpacity, Dimensions } from 'react-native';
import * as BoardDimensions from '../BoardDimensions';

const AspectRatios = {
  WIDE: 16.0 / 9,
  NORMAL: 4.0 / 3,
  SQUARE: 1
}

const colors = ['red', 'blue', 'green', 'yellow', 'purple'];

export default class BoardOverlay extends React.Component {

  renderBoard() {
    return this.props.board.cards.map((card) => {
      let style = {
          position: 'absolute',
          top: ratioToPerc(BoardDimensions.cardTopRatio(card)),
          left: ratioToPerc(BoardDimensions.cardLeftRatio(card)),
          width: ratioToPerc(BoardDimensions.CARD_WIDTH_RATIO),
          height: ratioToPerc(BoardDimensions.CARD_HEIGHT_RATIO),
          padding: 1
        };
      return (
        <View
          key={`${card.row}${card.column}`}
          style={style}
        >
          <View
            style={{
              backgroundColor: card.color(),
              width: '100%',
              height: '100%'
            }} />
        </View>
      );
    });
  }

  render() {
    return (
      <View style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        opacity: .2
      }}>
        {this.renderBoard()}
      </View>
    )
  }
}

function ratioToPerc(ratio) {
  return `${roundTwoDecimals(ratio * 100)}%`;
}

function roundTwoDecimals(num) {
  return Math.round(num * 100) / 100;
}