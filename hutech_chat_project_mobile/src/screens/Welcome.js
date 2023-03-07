import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import Button from '@components/Button'
import SocialLogin from '@modules/Social/Login'
import Theme from '@styles/theme'
import { useStore } from '@stores'
import { observer } from 'mobx-react'

import Services from '../screens/Services'
import TabNavigator from '../navigation/TabNavigator'
import { getDatabase, ref, onValue } from 'firebase/database'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default Home = observer((props) => {
  const [isLogged, setIsLogged] = useState(false)

  retriveToken = async () => {
    try {
      const data = await AsyncStorage.getItem('token')
      console.log(data)
      if (data !== null) {
        this.navigateTo('Services')
        setIsLogged(true)
      } else {
        setIsLogged(false)
      }
    } catch (err) {}
  }

  useEffect(() => {
    retriveToken()
  })
  // testRootStore = () => {
  //   rootStore.user.setUserInfo({
  //     name: "James",
  //   })
  //   rootStore.rooms.setRooms()
  // }

  // useEffect(() => {
  //   const db = getDatabase();
  //   const starCountRef = ref(db, 'chat');
  //   onValue(starCountRef, (snapshot) => {
  //     const data = snapshot.val();
  //     console.log("data: ", data)
  //   });

  // async function writeData() {
  //   try {
  //     console.log("Prepare set data ...")
  //     await firebase.app()
  //       .database('https://nc-chat-1462e-default-rtdb.asia-southeast1.firebasedatabase.app/')
  //       .ref('/users')
  //       .set({
  //         name: 'Ada Lovelace',
  //         age: 31,
  //       })
  //       .then(() => console.log("==>> Then write success"))
  //     console.log("Write success");
  //   } catch (error) {
  //     console.log("error data set: ", error);
  //   }
  // }
  // writeData()
  // }, [0])

  navigateTo = (name) => {
    console.log('navigateTo => ', name)
    props.navigation.navigate(name)
  }

  if (isLogged) {
    return (
      <View style={styles.container}>
        <Text style={styles.normalText}>Hệ thống đang bảo trì</Text>
      </View>
    )
  } else {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Image
            style={styles.logo}
            source={require('@assets/images/Logo.jpeg')}
            resizeMode="contain"
          />
          <Text style={styles.largeText}>Xin chào</Text>
          <Text style={styles.normalText}>Chào mừng bạn đến với NC CHAT!</Text>

          <View style={styles.btnContainer}>
            <Button title="Đăng nhập" onPress={() => navigateTo('SignIn')} />
            <Button
              title="Đăng ký"
              onPress={() => navigateTo('SignUp')}
              type="secondary"
            />
          </View>
          <Text style={styles.normalText}>hoặc</Text>
          <SocialLogin />
        </View>
      </ScrollView>
    )
  }
})

const styles = StyleSheet.create({
  logo: {
    width: Theme.WIDTH_FULL,
    height: Theme.HEIGHT_3x,
  },
  container: {
    flex: 1,
    backgroundColor: Theme.PRIMARY_BG_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Theme.MARGIN_5x,
  },
  largeText: {
    fontSize: Theme.FONT_SIZE_BIG_2x,
    fontWeight: Theme.BOLD_NORMAL,
  },
  normalText: {
    fontSize: Theme.FONT_SIZE_NORMAL,
    marginTop: Theme.MARGIN_1x,
    color: Theme.PRIMARY_COLOR,
    textAlign: 'center',
  },
  btnContainer: {
    flexDirection: 'row',
    margin: Theme.MARGIN_2x,
    paddingVertical: 20,
  },
})
