import React, { useState, useEffect } from 'react'
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native'
import { Text } from 'react-native-paper'
import Button from '@components/Button'
import Theme from '@styles/theme'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { observer } from 'mobx-react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { IpAddress, url } from '../services/dotenv'
import { launchImageLibrary } from 'react-native-image-picker'

export default Profile = observer((props) => {
  const [profiles, setProfiles] = useState({})
  useEffect(() => {
    getProfile()
  }, [])

  const logOut = async () => {
    try {
      await AsyncStorage.removeItem('token')
      await AsyncStorage.removeItem('userId')
      this.navigateTo('SignIn')
    } catch (error) {
      console.log(error)
    }
  }

  const option = {
    title: 'Chọn ảnh',
    type: 'library',
    options: {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    },
  }
  async function chooseFile() {
    try {
      //Lấy token
      const tokenString = await AsyncStorage.getItem('token')
      const userId = await AsyncStorage.getItem('userId')
      const imgs = await launchImageLibrary(option)
      if (imgs.didCancel != true) {
        const formdata = new FormData()
        formdata.append('nameUser', profiles.name)
        formdata.append('email', profiles.email)
        if (profiles.address == undefined || profiles.address == 'undefined') {
          formdata.append('address', '')
        } else {
          formdata.append('address', profiles.address)
        }
        formdata.append('phoneNumber', profiles.phoneNumber)
        formdata.append('role', profiles.role)
        formdata.append('image', {
          uri: imgs.assets[0].uri,
          type: imgs.assets[0].type,
          name: imgs.assets[0].fileName,
        })
        await fetch(
          'http://' + IpAddress + ':9000/api/v1/updateuser/' + userId,
          {
            method: 'POST',
            body: formdata,
            headers: {
              Accept: 'application/json',
              'content-Type': 'multipart/form-data',
              Authorization: 'Bearer ' + tokenString,
            },
          },
        )
          .then((response) => response.json())
          .then((value) => {
            if (value.status == 200) {
              getProfile()
              Alert.alert('Thành công', 'Cập nhật thành công!')
            } else if (value.status == 500) {
              Alert.alert('Lỗi', value.message)
            }
          })
      }
    } catch (error) {}
  }
  const getProfile = async () => {
    try {
      //Lấy token
      const token = await AsyncStorage.getItem('token')
      console.log(token)
      const userId = await AsyncStorage.getItem('userId')
      //Lấy thông tin người dùng đang đăng nhập
      const response = await fetch(
        'http://' + IpAddress + ':9000/api/v1/user/' + userId,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'content-Type': 'application/json',
          },
        },
      )

      const data = await response.json()
      console.log(data)
      setProfiles(data)
    } catch (error) {}
  }
  return (
    <ScrollView style={styles.container}>
      {profiles != {} ? (
        <View>
          <View style={styles.imgs} key={profiles._id}>
            <TouchableOpacity
              onPress={() => {
                chooseFile()
              }}
            >
              <Image
                style={styles.img}
                source={{
                  uri: url + 'avatars/' + profiles.img,
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View style={styles.button}>
              <Ionicons name="create" color={'#black'} size={22}></Ionicons>
            </View>
          </View>
          <View style={styles.text}>
            <View style={styles.menuWrapper}>
              {/* <TouchableRipple onPress={() => {}}> */}
              <View style={styles.menuItem}>
                <Ionicons name="person" color={'#black'} size={22} />
                <Text style={styles.menuItemText}>
                  {' '}
                  Họ và tên: {profiles.name}
                </Text>
              </View>
              {/* </TouchableRipple> */}

              {/* <TouchableRipple onPress={() => {}}> */}
              <View style={styles.menuItem}>
                <Ionicons name="mail" color={'#black'} size={22} />
                <Text style={styles.menuItemText}>
                  {' '}
                  Email: {profiles.email}
                </Text>
              </View>
              {/* </TouchableRipple> */}

              {/* <TouchableRipple onPress={() => {}}> */}
              <View style={styles.menuItem}>
                <Ionicons name="home" color={'#black'} size={22} />
                <Text style={styles.menuItemText}>
                  Địa chỉ: {profiles.address}
                </Text>
              </View>
              {/* </TouchableRipple> */}

              {/* <TouchableRipple onPress={() => {}}> */}
              <View style={styles.menuItem}>
                <Ionicons name="call" color={'#black'} size={22} />
                <Text style={styles.menuItemText}>
                  Số điện thoại: {profiles.phoneNumber}
                </Text>
              </View>
              {/* </TouchableRipple> */}
            </View>
          </View>
          <View
            style={{
              marginVertical: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button
              title="Đăng xuất"
              onPress={() => {
                logOut()
              }}
            />
          </View>
        </View>
      ) : null}
    </ScrollView>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.PRIMARY_BG_COLOR,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  imgs: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: Theme.WIDTH_2x,
    height: Theme.HEIGHT_2x,
    borderRadius: 100,

    marginVertical: 15,
  },
  text: {
    marginHorizontal: Theme.MARGIN_3x,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 20,
    backgroundColor: 'white',
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 25,
    paddingLeft: 10,
  },
  menuItemText: {
    color: '#7777777',
    marginLeft: Theme.MARGIN_1x,
    color: 'black',
    marginRight: Theme.MARGIN_3x,
  },
  button: {
    paddingLeft: 200,
    paddingBottom: 10,
  },
})
