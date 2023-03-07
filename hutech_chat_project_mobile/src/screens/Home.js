import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Theme from "@styles/theme";
import { observer } from "mobx-react";
import { IpAddress, url } from "../services/dotenv";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getDatabase,
  ref,
  onValue,
  get,
  child,
  query,
} from "firebase/database";

export default Home = observer(({ navigation }) => {
  const [listRoom, setListRoom] = useState([]);

  useEffect(() => {
    getAllRoom();
  }, []);

  async function convertTime(miliseconds) {
    var res = "";
    const time = new Date().getTime();
    var timed = Number(time) - miliseconds;
    var secondsFloat = Number(timed) / 1000;
    var seconds = Math.floor(secondsFloat);
    if (seconds < 60) {
      res = seconds + " giây trước";
    } else if (seconds < 3600) {
      var m = Number(seconds) / 60;
      var min = Math.floor(m);
      res = min + " phút trước";
    } else if (seconds < 86400) {
      var h = seconds / 3600;
      var hour = Math.floor(h);
      res = hour + " giờ trước";
    } else if (seconds < 259200) {
      var d = seconds / 86400;
      var day = Math.floor(d);
      res = day + " ngày trước";
    } else {
      var dateTime = new Date(miliseconds);
      res =
        dateTime.getDate() +
        "/" +
        dateTime.getMonth() +
        "/" +
        dateTime.getFullYear();
    }

    return res;
  }

  async function getProfile(req) {
    const response = await fetch(
      "http://" + IpAddress + ":9000/api/v1/user/" + req,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "content-Type": "application/json",
        },
      }
    );
    console.log(response);
    const userProfile = response.json();
    return userProfile;
  }

  async function getAllRoom() {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const db = getDatabase();
      const countRef = query(ref(db, "users/" + userId));
      onValue(countRef, async (snapshot) => {
        const val = await snapshot.val();
        if (val != null) {
          const listTitleRoom = Object.values(val);
          var list = [];
          listTitleRoom.map((element) => {
            const refConversation = query(ref(db, "conversations/" + element));
            onValue(refConversation, async (snap) => {
              const i = snap.val().idRoom;
              var flag = 0;
              for (var j = 0; j < list.length; j++) {
                if (list[j] == i && flag == 0) {
                  list.splice(j, 1);
                  flag = 1;
                }
              }
              list.push(i);
              var listCurren = [];
              if (list.length == listTitleRoom.length) {
                for (var j = 0; j < list.length; j++) {
                  const abcf = query(ref(db, "conversations"));
                  const value = await get(child(abcf, "/" + list[j]));
                  const timedcurren = await convertTime(value.val().lastTime);
                  const nameRoomCurren = await (
                    await get(child(abcf, "/" + list[j] + "/people"))
                  ).val();
                  console.log(nameRoomCurren);

                  const listIdUser = Object.values(nameRoomCurren);
                  console.log(listIdUser);
                  console.log(userId);
                  var idReceiver = listIdUser.filter((item) => {
                    if (item != userId) {
                      return true;
                    }
                  });
                  console.log("IdReceiver");
                  console.log(idReceiver[0]);
                  if (idReceiver[0] != undefined) {
                    const receiver = await getProfile(idReceiver[0]);
                    console.log(receiver);
                    const m = {
                      idRoom: value.val().idRoom,
                      lastMessage: value.val().lastMessage,
                      timed: timedcurren,
                      lastTime: value.val().lastTime,
                      nameRoom: receiver.name,
                      avatar: receiver.img,
                    };
                    listCurren.push(m);
                  }
                }
                if (listCurren.length != 0) {
                  const listSort = listCurren.sort(
                    (a, b) => parseFloat(b.lastTime) - parseFloat(a.lastTime)
                  );
                  setListRoom(listSort);
                } else {
                  setListRoom(listSort);
                }
              }
            });
          });
        }
      });
    } catch (error) {}
  }

  return (
    <View style={styles.container}>
      <TextInput style={styles.search} placeholder="Tìm kiếm tin nhắn... " />
      <ScrollView>
        {listRoom.length != 0 ? (
          <View style={styles.content}>
            {listRoom.map((item) => (
              <TouchableOpacity
                key={item.idRoom}
                onPress={() =>
                  navigation.navigate("ChatRoom", {
                    idRoom: item.idRoom,
                    name: item.nameRoom,
                  })
                }
              >
                <View style={styles.container_x}>
                  <Image
                    style={styles.avatar}
                    source={{
                      uri: url + "avatars/" + item.avatar,
                    }}
                    resizeMode="contain"
                  />
                  <View style={styles.rightContainer}>
                    <View style={styles.row}>
                      <Text style={styles.name}>{item.nameRoom}</Text>
                      <Text style={styles.time}>{item.timed}</Text>
                    </View>
                    <Text numberOfLines={1} style={styles.last}>
                      {item.lastMessage}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.PRIMARY_BG_COLOR,
    paddingHorizontal: 15,
  },

  search: {
    fontSize: Theme.FONT_SIZE_NORMAL,
    marginTop: Theme.MARGIN_1x,
    marginBottom: Theme.MARGIN_2x,

    paddingLeft: 30,
    color: "gray",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 62,
  },

  menu: {
    alignItems: "flex-end",
  },

  container_x: {
    flexDirection: "row",
    paddingVertical: 10,
  },
  contentNull: {
    display: "flex",
    height: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 50,
    paddingHorizontal: 20,
  },

  rightContainer: {
    marginTop: Theme.MARGIN_1x,
    flex: 1,
    paddingLeft: 20,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  name: {
    fontSize: Theme.FONT_SIZE_NORMAL_1x,
    fontWeight: Theme.BOLD_NORMAL,
    color: "black",
  },

  time: {
    color: "gray",
    marginRight: 5,
  },
  last: {
    color: "gray",
    marginRight: 5,
    width: 140,
  },
});
