import * as React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import SocialLogin from "@modules/Social/Login";
import Toast from "react-native-toast-message";
import TextInput from "@components/TextInput";
import Theme from "@styles/theme";
import PhoneInput from "react-native-phone-number-input";
import { IpAddress } from "../services/dotenv";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default class SignUpScreen extends React.Component {
  state = {
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    passwordConfirm: "",
    error: {},
  };

  onSignup = async () => {
    await fetch("http://" + IpAddress + ":9000/api/v1/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        phoneNumber: this.state.phoneNumber,
        img: "123.jpeg",
        password: this.state.password,
        passwordConfirm: this.state.passwordConfirm,
      }),
    })
      .then((response) => response.json())
      .then(async (data) => {
        this.error = await data;
        console.log(this.error);
        if (this.error.status == 200) {
          const auth = await data.auth;
          console.log(auth);
          const token = auth.token;
          console.log(token);
          await AsyncStorage.setItem("token", token);
          await AsyncStorage.setItem("userId", auth.userId);
          this.props.navigation.navigate("Services");
          Toast.show({
            position: "bottom",
            type: "success",
            text1: "Đăng ký thành công!",
            text2: "Chào mừng tới NC Chat 👋",
          });
        } else {
          this.setState({ error: data });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  render() {
    return (
      <ScrollView style={styles.container}>
        {this.state.error.name != undefined ? (
          <View style={styles.boxError}>
            <Text style={styles.line}></Text>
            <Text style={styles.error}>{this.error.name}</Text>
          </View>
        ) : null}
        <TextInput
          style={styles.name}
          placeholder="Họ và tên"
          autoFocus={true}
          onChangeText={(text) => {
            this.setState({ name: text });
          }}
        />
        {this.state.error.email !== undefined ? (
          <View style={styles.boxError}>
            <Text style={styles.line}></Text>
            <Text style={styles.error}>{this.error.email}</Text>
          </View>
        ) : null}
        <TextInput
          style={styles.email}
          placeholder="Email"
          onChangeText={(text) => {
            this.setState({ email: text });
          }}
        />
        {this.state.error.phoneNumber !== undefined ? (
          <View style={styles.boxError}>
            <Text style={styles.line}></Text>
            <Text style={styles.error}>{this.error.phoneNumber}</Text>
          </View>
        ) : null}
        <PhoneInput
          placeholder="Số điện thoại"
          defaultCode="VN"
          containerStyle={styles.containerPI}
          textContainerStyle={styles.textInput}
          onChangeFormattedText={(text) => {
            this.setState({ phoneNumber: text });
          }}
        />
        {this.state.error.password !== undefined ? (
          <View style={styles.boxError}>
            <Text style={styles.line}></Text>
            <Text style={styles.error}>{this.error.password}</Text>
          </View>
        ) : null}
        <TextInput
          containerStyle={styles.pw}
          placeholder="Mật khẩu"
          boolean={true}
          onChangeText={(text) => {
            this.setState({ password: text });
          }}
        />
        {this.state.error.passwordConfirm !== undefined ? (
          <View style={styles.boxError}>
            <Text style={styles.line}></Text>
            <Text style={styles.error}>{this.error.passwordConfirm}</Text>
          </View>
        ) : null}
        <TextInput
          style={styles.pwc}
          placeholder="Xác thực mật khẩu"
          boolean={true}
          onChangeText={(text) => {
            this.setState({ passwordConfirm: text });
          }}
        />
        <View style={styles.formContainer}>
          <Button title="Đăng ký" onPress={this.onSignup} />
          <SocialLogin />
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.PRIMARY_BG_COLOR,
    padding: 10,
  },
  hint: {
    fontSize: Theme.FONT_SIZE_NORMAL,
    color: "gray",
    marginTop: Theme.MARGIN_2x,
    textAlign: "center",
  },
  formContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: Theme.MARGIN_5x,
  },
  linkContainer: {
    flexDirection: "row",
    marginTop: Theme.MARGIN_4x,
  },
  containerPI: {
    marginTop: Theme.MARGIN_2x,
    marginBottom: -40,
    zIndex: -100,
  },
  textInput: {
    backgroundColor: "white",
  },
  boxError: {
    display: "flex",
    flexDirection: "row",
    marginBottom: -30,
    marginTop: Theme.MARGIN_2x,
    backgroundColor: "#ff9999",
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  error: {
    color: "#b30000",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingVertical: Theme.MARGIN_1x,
    paddingLeft: Theme.MARGIN_2x,
  },
  line: {
    width: 10,
    paddingVertical: Theme.MARGIN_1x,
    backgroundColor: "#b30000",
    borderTopLeftRadius: 10,
  },
});
