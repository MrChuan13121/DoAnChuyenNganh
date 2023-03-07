import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import "react-native-gesture-handler";

import Services from "@screens/Services";
import Home from "@screens/Home";
import Profile from "@screens/Profile";
import AgendaCalendar from "../screens/AgendaCalendar";

const Tab = createBottomTabNavigator();

const TabNavigator = (props) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#37a4f2",
        },
        tabBarInactiveTintColor: "white",
        tabBarActiveTintColor: "#ffc30a",
      }}
    >
      <Tab.Screen
        name="Trang chủ"
        component={Services}
        options={{
          headerTintColor: "white",
          headerBackTitleVisible: false,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#37a4f2",
            shadowColor: "#fff",
            elevation: 0,
          },

          tabBarIcon: ({}) => (
            <Ionicons name="home-outline" color={"white"} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Tin nhắn"
        component={Home}
        options={{
          headerTintColor: "white",
          headerBackTitleVisible: false,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#37a4f2",
            shadowColor: "#fff",
            elevation: 0,
          },

          tabBarIcon: ({}) => (
            <Ionicons name="chatbubbles-outline" color={"white"} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Lịch khám"
        component={AgendaCalendar}
        options={{
          headerTintColor: "white",
          headerBackTitleVisible: false,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#37a4f2",
            shadowColor: "#fff",
            elevation: 0,
          },

          tabBarIcon: ({}) => (
            <Ionicons
              name="checkmark-done-circle-outline"
              color={"white"}
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Cá nhân"
        component={Profile}
        options={{
          headerTintColor: "white",
          headerBackTitleVisible: false,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#37a4f2",
            shadowColor: "#fff",
            elevation: 0,
          },

          tabBarIcon: ({}) => (
            <Ionicons name="person-circle-outline" color={"white"} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
