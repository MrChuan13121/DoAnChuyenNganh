import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import SocialLogin from '@modules/Social/Login'
import Toast from 'react-native-toast-message'
import TextInput from '@components/TextInput'
import Theme from '@styles/theme'
import { IpAddress } from '../services/dotenv'
import { get } from '../services/networking'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default class SignInScreen extends React.Component {
  constructor(props) {
    super(props)
    this.passInput = React.createRef()
  }

  state = {
    username: '',
    password: '',
    token: '',
    status: [1],
    clearInput: false,
  }
  onLogin = async () => {
    try {
      this.setState({ status: [1] })
      let arr = [1]
      if (this.state.username == '') {
        arr.push(2)
      }
      if (this.state.password == '') {
        arr.push(3)
      }
      this.setState({ status: arr })
      if (this.state.username != '' && this.state.password != '') {
        let result = {}
        await fetch('http://' + IpAddress + ':9000/api/v1/signin', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: this.state.username.trim(),
            password: this.state.password.trim(),
          }),
        })
          .then((response) => response.json())
          .then(async (data) => {
            if (data.status == 1) {
              const auth = data.auth[0]
              console.log(auth)
              const token = auth.token
              const userId = auth.userId
              this.setState({ token: token })
              await AsyncStorage.setItem('token', token)
              await AsyncStorage.setItem('userId', userId)
            }
            result = data
          })
          .catch((error) => {
            console.error('Error:', error)
          })
        if (result.status == 1) {
          this.props.navigation.navigate('Services')
          Toast.show({
            position: 'bottom',
            type: 'success',
            text1: 'Đăng nhập thành công!',
            text2: 'Chào mừng tới NC Chat 👋',
          })
        } else if (result.status == 2) {
          Toast.show({
            position: 'bottom',
            type: 'error',
            text1: 'Mật khẩu không chính xác',
            text2: 'Vui lòng thử lại',
          })
        } else if (result.status == 3) {
          Toast.show({
            position: 'bottom',
            type: 'error',
            text1: 'Email chưa đăng ký tài khoản',
            text2: 'Vui lòng thử lại',
          })
        }
      }
    } catch (error) {
      console.log('Error: ' + error)
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.hint}>Đăng nhập để tiếp tục</Text>
        {this.state.status.includes(2) ? (
          <View style={styles.boxError}>
            <Text style={styles.line}></Text>
            <Text style={styles.error}>Vui lòng nhập email</Text>
          </View>
        ) : null}
        <TextInput
          placeholder="Email"
          textContentType="email"
          onChangeText={(text) => {
            Toast.show,
              this.setState({ username: text }),
              this.setState({ status: [1] })
          }}
        />
        {this.state.status.includes(3) ? (
          <View style={styles.boxError}>
            <Text style={styles.line}></Text>
            <Text style={styles.error}>Vui lòng nhập password</Text>
          </View>
        ) : null}
        <TextInput
          placeholder="Password"
          boolean={true}
          textContentType="password"
          onChangeText={(text) => {
            Toast.show,
              this.setState({ password: text }),
              this.setState({ status: [1] })
          }}
          ref={this.passInput}
        />
        <Text style={styles.forgot}>Quên mật khẩu?</Text>
        <View style={styles.formContainer}>
          <Button title="Đăng nhập" onPress={this.onLogin} />
          <SocialLogin />
          <View style={styles.linkContainer}>
            <Text style={styles.questionText}>Bạn chưa có tài khoản? </Text>
            <Text
              style={styles.signupText}
              onPress={() => navigateTo('SignUp')}
            >
              Đăng ký
            </Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.PRIMARY_BG_COLOR,
    padding: 20,
  },
  hint: {
    fontSize: Theme.FONT_SIZE_NORMAL,
    color: 'gray',
    marginTop: Theme.MARGIN_2x,
    textAlign: 'center',
  },
  formContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Theme.MARGIN_3x,
  },
  linkContainer: {
    flexDirection: 'row',
    marginTop: Theme.MARGIN_4x,
  },
  questionText: {
    color: 'gray',
  },
  signupText: {
    fontWeight: 'bold',
  },
  forgot: {
    textAlign: 'right',
    marginTop: Theme.MARGIN_2x,
    color: 'gray',
  },
  boxError: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: -30,
    marginTop: Theme.MARGIN_2x,
    backgroundColor: '#ff9999',
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  error: {
    color: '#b30000',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingVertical: Theme.MARGIN_1x,
    paddingLeft: Theme.MARGIN_2x,
  },
  line: {
    width: 10,
    paddingVertical: Theme.MARGIN_1x,
    backgroundColor: '#b30000',
    borderTopLeftRadius: 10,
  },
})
