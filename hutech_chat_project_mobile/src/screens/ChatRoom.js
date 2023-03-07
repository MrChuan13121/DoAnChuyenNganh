import React, { Component, useCallback, useEffect, useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { Bubble, GiftedChat, Send } from "react-native-gifted-chat";
import { useStore } from "@stores";
import { observer } from "mobx-react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  getDatabase,
  ref,
  onValue,
  query,
  limitToLast,
  get,
  child,
  set,
  update,
} from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { string } from "prop-types";

export default ChatRoom = observer(({ route }) => {
  const room = route.params.idRoom;

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getMessage();
  }, []);

  async function getMessage(limit) {
    try {
      if (limit == null) {
        var quantity = 10;
      } else {
        var quantity = limit * 10;
      }
      const db = getDatabase();
      const dbRef = query(
        ref(db, "conversations/" + room + "/message")
        // ,
        // limitToLast(quantity)
      );
      onValue(dbRef, (snapshot) => {
        const value = snapshot.val();
        const listMessObject = [];
        if (value != null) {
          const listMess = Object.values(value);
          listMess.reverse();
          listMess.map(async (element, index) => {
            const userId = await AsyncStorage.getItem("userId");
            if (element.userId != userId) {
              var id = 2;
            } else {
              var id = 1;
            }
            const item = {
              _id: index + 1,
              text: element.content,
              createAt: new Date(),
              user: {
                _id: id,
                avatar: null,
              },
            };

            listMessObject.push(item);

            if (listMessObject.length == listMess.length) {
              setMessages(listMessObject);
            }
          });
        }
      });
    } catch (error) {}
  }

  const sendMess = async (content) => {
    const dt = new Date();
    const dateTime = dt.getTime();
    const userId = await AsyncStorage.getItem("userId");
    const db = getDatabase();
    const refMess = ref(db, "conversations/" + room);
    const a = await get(child(refMess, "/message"));
    await set(ref(db, "conversations/" + room + "/message/" + (a.size + 1)), {
      content: content.text,
      time: dateTime,
      type: "text",
      userId: userId,
    })
      .then(console.log("Đã gửi"))
      .catch("Thất bại");
    console.log(content);
    console.log(dateTime);

    await update(refMess, {
      lastMessage: content.text,
      lastTime: dateTime,
    });
  };

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            styles={{ marginBottom: 5, marginRight: 10 }}
            size={32}
            color="#2e64e5"
          />
        </View>
      </Send>
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: "#fff",
            padding: 5,
            borderColor: "#00bfff",
            borderWidth: 0.7,
          },
          right: {
            backgroundColor: "#00bfff",
            padding: 5,
          },
        }}
        textStyle={{
          left: {
            color: "black",
          },
          right: {
            color: "white",
          },
        }}
      />
    );
  };
  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => sendMess(messages[0])}
      user={{
        _id: 1,
      }}
      renderBubble={renderBubble}
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottom
    />
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
