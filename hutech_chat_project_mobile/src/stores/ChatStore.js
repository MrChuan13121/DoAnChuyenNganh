import { makeAutoObservable } from "mobx";

export class ChatStore {
    chatrooms = []

    constructor() {
        makeAutoObservable(this);
    }

    setChatRooms = () => {
        this.chatrooms = [
            {
                _id: 1,
                text: "Hello all friends",
                createdAt: new Date(),
                user: {
                  _id: 2,
                  name: "React Native",
                  avatar: require("@assets/images/123.jpeg"),
                },
              },
              {
                _id: 2,
                text: "Hello ",
                createdAt: new Date(),
                user: {
                  _id: 1,
                  name: "React Native",
                  avatar: require("@assets/images/123.jpeg"),
                },
              },
              {
                _id: 3,
                text: "How are you?",
                createdAt: new Date(),
                user: {
                  _id: 2,
                  name: "React Native",
                  avatar: require("@assets/images/123.jpeg"),
                },
              },
              {
                _id: 4,
                text: "Im fine",
                createdAt: new Date(),
                user: {
                  _id: 1,
                  name: "React Native",
                  avatar: require("@assets/images/123.jpeg"),
                },
              },
        ];
    }

    getChatRooms = () => {
        return this.chatrooms;
    }
}