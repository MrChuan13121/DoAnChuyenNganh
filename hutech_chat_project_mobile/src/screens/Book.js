import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  ScrollView,
  Text,
  StyleSheet,
  View,
  Alert,
  FlatList,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Theme from "@styles/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { IpAddress, url } from "../services/dotenv";

import { observer } from "mobx-react";
import { List } from "react-native-paper";
import { keyframes } from "styled-components";

export default Books = observer(({ route }) => {
  // const [selected, setSelected] = useState("");
  if (route.params != null) {
    console.log("Vao day");
    const dateT = route.params.dateTime;
    console.log(dateT.date);
    useEffect(() => {
      create();
    }, []);
    const create = async () => {
      try {
        //Lấy token
        const tokenString = await AsyncStorage.getItem("token");
        //Lấy danh sách các lịch đã đặt
        const response = await fetch(
          "http://" + IpAddress + ":9000/api/v1/user/createbook",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "content-Type": "application/json",
              Authorization: "Bearer " + tokenString,
            },
            body: JSON.stringify({
              date: dateT.date,
              time: dateT.time,
            }),
          }
        );
        const data = await response.json();
        Alert.alert("Thông báo", data.message);
        await getBooksByUser();
      } catch (error) {}
    };
  }

  const deleteBook = async (id) => {
    try {
      //Lấy token
      const tokenString = await AsyncStorage.getItem("token");
      //Xóa
      const response = await fetch(
        "http://" + IpAddress + ":9000/api/v1//books/delete/" + id,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "content-Type": "application/json",
            Authorization: "Bearer " + tokenString,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      await Alert.alert("Thông báo", data.message);
      await getBooksByUser();
    } catch (error) {}
  };
  const [books, setBooks] = useState([]);
  useEffect(() => {
    getBooksByUser();
  }, []);
  const getBooksByUser = async () => {
    try {
      //Lấy token
      const tokenString = await AsyncStorage.getItem("token");
      const userId = await AsyncStorage.getItem("userId");
      //Lấy danh sách các lịch đã đặt
      const response = await fetch(
        "http://" + IpAddress + ":9000/api/v1/" + userId + "/books",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "content-Type": "application/json",
            Authorization: "Bearer " + tokenString,
          },
        }
      );
      const data = await response.json();
      setBooks(data);
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      {books.length != 0 ? (
        <FlatList
          data={books}
          renderItem={({ item }) => (
            <View style={styles.content} key={item._id}>
              <View style={styles.row}>
                <View style={styles.right}>
                  {item.status == 0 ? (
                    <View style={styles.column}>
                      <View style={styles.title}>
                        <Text style={styles.time}>Lịch khám</Text>
                        <TouchableOpacity onPress={() => deleteBook(item._id)}>
                          <Ionicons
                            name="trash-outline"
                            color={"gray"}
                            size={25}
                          />
                        </TouchableOpacity>
                      </View>
                      <Text style={styles.time}>
                        {item.time} {item.date}
                      </Text>
                      <Text style={styles.info}>{item.address}</Text>
                      <Text style={styles.statuswait}>Chờ xác nhận</Text>
                    </View>
                  ) : item.status == 1 ? (
                    <View style={styles.column}>
                      <Text style={styles.time}>Lịch khám</Text>
                      <Text style={styles.time}>{item.time}</Text>
                      <Text style={styles.info}>{item.address}</Text>
                      <Text style={styles.status}>Đã xác nhận</Text>
                    </View>
                  ) : (
                    <View style={styles.column}>
                      <Text style={styles.time}>Lịch khám</Text>
                      <Text style={styles.time}>{item.time}</Text>
                      <Text style={styles.info}>{item.address}</Text>
                      <Text style={styles.statuscancel}>Đã hủy</Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
          )}
        />
      ) : (
        <View style={styles.contentNull}></View>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.PRIMARY_BG_COLOR,
  },
  content: {
    flexDirection: "row",
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "#37a4f2",
    paddingVertical: 5,
    marginVertical: 10,
    shadowColor: "#37a4f2",
    borderStartWidth: 10,
  },

  contentNull: {
    display: "flex",
    height: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
  left: {
    flex: 1,
  },
  right: {
    flex: 1,
  },
  column: {
    flexDirection: "column",
    paddingLeft: 10,
  },
  text_date: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Theme.PRIMARY_COLOR,

    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#B2DFEE",

    flexDirection: "column",
  },
  date: {
    fontSize: Theme.FONT_SIZE_LARGE,
    color: "black",
    paddingVertical: 5,
  },
  day: {
    fontSize: Theme.FONT_SIZE_BIG_2x,
    fontWeight: Theme.BOLD_NORMAL,
    color: "black",
  },
  title: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  time: {
    fontSize: Theme.FONT_SIZE_NORMAL,
    fontWeight: Theme.BOLD_NORMAL,
    color: "black",
  },
  info: {
    fontSize: Theme.FONT_SIZE_NORMAL,
  },
  status: {
    color: "#009933",
  },
  statuswait: {
    color: "#FF0000",
  },
  statuscancel: {
    color: "#FFCC00",
  },
});
