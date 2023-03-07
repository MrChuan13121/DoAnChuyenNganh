import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import Button from '@components/Button';
import PropTypes from 'prop-types';

export default class SocialLogin extends React.Component {

	constructor(props) {
		super(props)
	}
	
	render() {
		const { containerStyle, direction } = this.props;

		return (
			<View style={ [styles.container, containerStyle] }>
				<View style={{flexDirection: direction || 'row'}}>
					<Button
						title="f"
						onPress={() => this.navigateTo('Facebook')}
						type="circle"
						styles={{
							btnStyle: {
								backgroundColor: '#3f51b5',
							},
						}}
					/>

					<Button
						title="G"
						onPress={() => this.navigateTo('Google')}
						type="circle"
						styles={{
							btnStyle: {
								backgroundColor: '#f44336',
							},
						}}
					/>

					<Button
						title="in"
						onPress={() => this.navigateTo('instagram')}
						type="circle"
						styles={{
							btnStyle: {
								backgroundColor: '#1565c0',
							},
						}}
					/>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		marginTop: 40,
		marginBottom: 40,
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

SocialLogin.propTypes = {
	containerStyle: PropTypes.object,
	direction: PropTypes.oneOf(['row', 'column']),
}