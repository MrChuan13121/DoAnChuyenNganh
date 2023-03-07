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
import Ionicons from "react-native-vector-icons/Ionicons";
import { observer } from "mobx-react";
import { IpAddress, url } from "../services/dotenv";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default Services = observer(({ navigation }) => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    getAllServices();
  }, []);

  const getAllServices = async () => {
    try {
      //Lấy token
      const tokenString = await AsyncStorage.getItem("token");
      //Lấy danh sách các khoa
      const response = await fetch(
        "http://" + IpAddress + ":9000/api/v1/allServices",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      setServices(data);
    } catch (error) {}
  };
  console.log(services);
  return (
    <ScrollView scrollEnabled={true} style={styles.container}>
      <View style={styles.search}>
        <View style={styles.icon}>
          <Ionicons name="search-outline" color={"gray"} size={20} />
        </View>
        <TextInput placeholder="Search here ... " />
      </View>
      <View>
        <Image
          style={styles.logo}
          source={require("@assets/images/doctor1.jpeg")}
          resizeMode="contain"
        />
      </View>
      <View></View>

      <View style={styles.content}>
        {services != []
          ? services.map((item) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Consultants", { idService: item._id })
                }
                key={item._id}
              >
                <View style={styles.item} key={item._id}>
                  <Image
                    style={styles.img}
                    source={{
                      uri: url + "services/" + item.img,
                    }}
                    resizeMode="contain"
                  />
                  <Text
                    style={styles.name}
                    onPress={() =>
                      navigation.navigate("Consultants", {
                        idService: item.name,
                      })
                    }
                  >
                    {item.name}
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          : null}
      </View>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.PRIMARY_BG_COLOR,
    paddingHorizontal: 10,

    fontFamily: Theme.FONT_FAMILY,
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 10,
  },
  search: {
    flex: 1,
    flexDirection: "row",

    fontSize: Theme.FONT_SIZE_NORMAL,
    marginTop: Theme.MARGIN_1x,
    paddingLeft: 30,
    color: Theme.PRIMARY_COLOR,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 60,
  },
  logo: {
    width: Theme.WIDTH_FULL,
    height: Theme.HEIGHT_2x,
    borderRadius: 15,
    marginTop: 10,
  },
  content: {
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingTop: 16,
  },
  item: {
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 15,
    marginVertical: Theme.MARGIN_1x,
  },
  img: {
    width: 175,
    height: Theme.HEIGHT_1x,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 15,
  },
  name: {
    textAlign: "center",
    marginVertical: Theme.MARGIN_1xx,
    color: "black",
    fontWeight: Theme.BOLD_NORMAL,
    fontSize: Theme.FONT_SIZE_NORMAL,
  },
});
