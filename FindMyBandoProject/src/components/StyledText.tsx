import React from 'react';
import { Text, StyleProp, TextStyle } from 'react-native';

interface MonoTextProps {
  style: StyleProp<TextStyle>;
}

export class MonoText extends React.Component<MonoTextProps> {
  render() {
    return <Text {...this.props} style={[this.props.style, { fontFamily: 'space-mono' }]} />;
  }
}
