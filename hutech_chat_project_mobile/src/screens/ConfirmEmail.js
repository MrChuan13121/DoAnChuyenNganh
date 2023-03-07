import React, { Component } from "react";
import { Text, StyleSheet, View, TextInput } from "react-native";
import theme from "../styles/theme";
export default class ConfirmEmail extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.code}
          placeholder="Enter your confirmation code"
          onChangeText={(text) => {
            Toast.show, this.setState({ username: text });
          }}
        />

        <View style={styles.formContainer}>
          <Button title="Confirm" onPress={() => navigateTo("Services")} />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 20,
  },
  formContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.MARGIN_4x,
  },
  code: {
    borderWidth: 1,
    borderRadius: 25,
    borderColor: "gray",
    paddingLeft: 20,
  },
});
