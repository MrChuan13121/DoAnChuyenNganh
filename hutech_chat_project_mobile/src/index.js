import React, { useEffect, useState } from "react";
import { View } from "react-native";
import {
	ActivityIndicator
} from "react-native-paper";
import AppNavigator from "@src/routes";
import { NavigationContainer } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { rootStore, StoreProvider, trunk } from "@stores";
require("./services/firebase")

export default function App() {
	const [isStoreLoaded, setIsStoreLoaded] = useState(false);

	useEffect(() => {
		const rehydrate = async () => {
			await trunk.init();
			setIsStoreLoaded(true);
		}
		rehydrate();
	}, []);

	if (!isStoreLoaded) {
		return (
			<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
				<ActivityIndicator size="large" />
			</View>
		);
	} else {
		return (
			<StoreProvider value={rootStore}>
				<NavigationContainer>
					<AppNavigator />
					<Toast />
				</NavigationContainer>
			</StoreProvider>
		);
	}


}
