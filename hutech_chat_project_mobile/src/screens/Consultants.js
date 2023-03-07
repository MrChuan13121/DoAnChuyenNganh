import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Theme from "@styles/theme";
import { observer } from "mobx-react";
import { IpAddress, url } from "../services/dotenv";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDatabase, ref, get, child, query, set } from "firebase/database";
import { color } from "react-native-reanimated";
import { Alert } from "react-native";

export default Consultants = observer(({ route, navigation }) => {
  const idService = route.params.idService;

  const [personnel, setpersonnel] = useState([]);

  useEffect(() => {
    getStaffGroup();
  }, []);

  async function getProfile(req) {
    const pesponse = await fetch(
      "http://" + IpAddress + ":9000/api/v1/user/" + req,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "content-Type": "application/json",
        },
      }
    );
    const userProfile = pesponse.json();
    console.log(userProfile);
    return userProfile;
  }

  async function gotToChatRoom(req) {
    const userId = await AsyncStorage.getItem("userId");
    const db = getDatabase();
    const refUser = query(ref(db, "users"));
    const userCurren = await getProfile(userId);
    console.log(userCurren);
    const personnelCurren = await getProfile(req);
    console.log(personnelCurren);
    const checkRoom = await (await get(child(refUser, userId))).val();
    console.log(checkRoom);
    if (checkRoom == null) {
      const dt = new Date();
      const dateTime = dt.getTime();
      const nameRoom = "room-" + dateTime;
      const refMess = ref(db, "conversations/" + nameRoom);

      //Set id phòng mới
      await set(ref(db, "conversations/" + nameRoom + "/idRoom"), nameRoom);
      //Set phòng mới
      await set(
        ref(db, "conversations/" + nameRoom + "/lastMessage"),
        "Chào mừng bạn đến với NC chat. \n Tôi có thể giúp gì cho bạn ?"
      );
      //Set phòng mới
      await set(ref(db, "conversations/" + nameRoom + "/lastTime"), dateTime);
      await set(ref(db, "users/" + userId + "/" + req), nameRoom);
      await set(ref(db, "users/" + req + "/" + userId), nameRoom);

      const a = await get(child(refMess, "/message"));
      await set(
        ref(db, "conversations/" + nameRoom + "/message/" + (a.size + 1)),
        {
          content:
            "Chào mừng bạn đến với NC chat. \n Tôi có thể giúp gì cho bạn ?",
          time: dateTime,
          type: "text",
          userId: req,
        }
      );
      const b = await get(child(refMess, "/people"));
      await set(
        ref(
          db,
          "conversations/" + nameRoom + "/people/" + "user-" + (b.size + 1)
        ),
        userId
      );
      const c = await get(child(refMess, "/people"));
      await set(
        ref(
          db,
          "conversations/" + nameRoom + "/people/" + "user-" + (c.size + 1)
        ),
        req
      );
      navigation.navigate("ChatRoom", { idRoom: nameRoom });
    } else {
      const listRoom = Object.keys(checkRoom);
      console.log(listRoom);
      const isCheck = listRoom.includes(req);
      if (isCheck == true) {
        const idRoom = await (
          await get(child(refUser, userId + "/" + req))
        ).val();
        navigation.navigate("ChatRoom", { idRoom: idRoom });
      } else {
        const dt = new Date();
        const dateTime = dt.getTime();
        const nameRoom = "room-" + dateTime;
        const refMess = ref(db, "conversations/" + nameRoom);

        //Set id phòng mới
        await set(ref(db, "conversations/" + nameRoom + "/idRoom"), nameRoom);
        //Set phòng mới
        await set(
          ref(db, "conversations/" + nameRoom + "/lastMessage"),
          "Chào mừng bạn đến với NC chat. \n Tôi có thể giúp gì cho bạn ?"
        );
        //Set phòng mới
        await set(ref(db, "conversations/" + nameRoom + "/lastTime"), dateTime);
        await set(ref(db, "users/" + userId + "/" + req), nameRoom);
        await set(ref(db, "users/" + req + "/" + userId), nameRoom);
        const a = await get(child(refMess, "/message"));
        await set(
          ref(db, "conversations/" + nameRoom + "/message/" + (a.size + 1)),
          {
            content:
              "Chào mừng bạn đến với NC chat. \n Tôi có thể giúp gì cho bạn ?",
            time: dateTime,
            type: "text",
            userId: req,
          }
        );
        const b = await get(child(refMess, "/people"));
        await set(
          ref(
            db,
            "conversations/" + nameRoom + "/people/" + "user-" + (b.size + 1)
          ),
          userId
        );
        const c = await get(child(refMess, "/people"));
        await set(
          ref(
            db,
            "conversations/" + nameRoom + "/people/" + "user-" + (c.size + 1)
          ),
          req
        );

        navigation.navigate("ChatRoom", { idRoom: nameRoom });
      }
    }
  }

  const getStaffGroup = async () => {
    try {
      const tokenString = await AsyncStorage.getItem("token");
      const listPersonnel = await fetch(
        "http://" + IpAddress + ":9000/api/v1/getAll/personnel",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "content-Type": "application/json",
            Authorization: "Bearer " + tokenString,
          },
        }
      );
      const data = await listPersonnel.json();
      console.log(data);
      if (data.code == 200) {
        setpersonnel(data.data);
      } else {
        Alert.alert("Lỗi hệ thống");
      }
    } catch (error) {}
  };

  return (
    <ScrollView style={styles.container}>
      {personnel != [] ? (
        personnel.map((item) => (
          <TouchableOpacity
            key={item._id}
            onPress={() => {
              gotToChatRoom(item._id);
            }}
          >
            <View>
              {console.log(item._id)}
              <View style={styles.container_x} key={item}>
                <Image
                  style={styles.avatar}
                  source={{
                    uri: url + "avatars/" + item.img,
                  }}
                  resizeMode="contain"
                />
                <View style={styles.test}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.role}>Tư vấn viên</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <View></View>
      )}
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.PRIMARY_BG_COLOR,
    paddingHorizontal: 30,
  },

  container_x: {
    flexDirection: "row",
    textAlign: "center",

    color: "gray",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 30,

    marginVertical: Theme.MARGIN_2x,
  },

  avatar: {
    width: 100,
    height: 80,
    borderRadius: 20,
    height: Theme.HEIGHT_1x,
    paddingHorizontal: 20,
    // marginLeft: Theme.MARGIN_2x,
  },
  test: {
    flexDirection: "column",
  },
  name: {
    fontSize: Theme.FONT_SIZE_LARGE_2x,
    fontWeight: Theme.BOLD_NORMAL,
    color: "black",

    marginLeft: Theme.MARGIN_1x,
    textAlign: "center",
    justifyContent: "center",

    marginTop: Theme.MARGIN_3x,
  },

  role: {
    fontSize: Theme.FONT_SIZE_NORMAL,
    color: "gray",
    paddingLeft: 10,
  },
});
