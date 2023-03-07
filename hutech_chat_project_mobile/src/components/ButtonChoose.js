import React from "react";
import { Text, StyleSheet, View, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function ButtonChoose({ navigation, title, ...rest }) {
  const showAlert = () => {
    const dateTime = rest.date;
    console.log(dateTime);
    Alert.alert(
      "Thông báo",
      "Bạn có chắc chắn đặt lịch không?",
      [
        {
          text: "Có",
          onPress: () => navigation.navigate("Book", { dateTime: dateTime }),
        },
        {
          text: "Không",
          onPress: () => console.log("No Pressed"),
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <TouchableOpacity style={styles.button} {...rest} onPress={showAlert}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#37a4f2",
    width: 300,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  text: {
    color: "#fff",
    textTransform: "capitalize",
  },
});
