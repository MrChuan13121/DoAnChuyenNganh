import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import Theme from '@styles/theme';

export default class ChatItem extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text> This is Chat Item Screen! </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.PRIMARY_BG_COLOR,
    paddingHorizontal: 15,
  },
})
