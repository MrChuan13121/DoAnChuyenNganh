import * as React from 'react';
import { Text, StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types';


export default class chatRooms extends React.Component {
	constructor(props) {
		super(props)
	}
	
  render() {
    
    return (
        <ScrollView>
        {
            chatRooms.map((roomDetail) =>
                <View style={styles.container_x}>
                    <Image
                        style={styles.avatar}
                        source={require('@assets/images/123.jpeg')}
                        resizeMode="contain"
                    />
                    <View style={styles.rightContainer}>
                        <View style={styles.row}>
                            <Text onPress={() => navigateTo('ChatItem')} style={styles.name}>{roomDetail.roomName}</Text>
                            <Text style={styles.time}>17:03</Text>
                        </View >
                        <Text numberOfLines={1} style={{ width: 200 }}>{roomDetail.lastMessage}</Text>
                    </View>
                </View>
            )
        }
    </ScrollView>
    )
  }
}

const styles = StyleSheet.create({})
