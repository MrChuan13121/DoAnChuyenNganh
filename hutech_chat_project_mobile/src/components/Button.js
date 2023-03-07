import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import * as React from 'react';
import ButtonStyle from '@src/styles/button';

const { 
	PRIMARY_COLOR, PRIMARY_BG_COLOR, PADDING_SIZE, WIDTH, BORDER_RADIUS, MARGIN_HORIZONTAL,
	TEXT_ALIGN, FONT_SIZE,
	SECONDARY_COLOR, SECONDARY_BG_COLOR, SECONDARY_BORDER_COLOR, SECONDARY_BORDER_WIDTH,
	CIRCLE_HEIGHT, CIRCLE_WIDTH, CIRCLE_COLOR, CIRCLE_FONT_SIZE, CIRCLE_FONT_WEIGHT, ALIGN_ITEMS, JUSTIFY_CONTENT
} = ButtonStyle;

const stylesheets = StyleSheet.create({
    btnDefault: {
        color: PRIMARY_COLOR,
		backgroundColor: PRIMARY_BG_COLOR,
		padding: PADDING_SIZE,
		width: WIDTH,
		borderRadius: BORDER_RADIUS,
		marginHorizontal: MARGIN_HORIZONTAL,
    },
	titleDefault: {
		textAlign: TEXT_ALIGN,
		color: PRIMARY_COLOR,
		fontSize: FONT_SIZE
	},
	btnSecondary: {
		color: SECONDARY_COLOR,
		backgroundColor: SECONDARY_BG_COLOR,
		borderColor: SECONDARY_BORDER_COLOR,
		borderWidth: SECONDARY_BORDER_WIDTH
	},
	titleSecondary: {
		color: SECONDARY_COLOR,
	},
	btnCircle: {
		padding: 0,
		height: CIRCLE_HEIGHT,
		width: CIRCLE_WIDTH,
		alignItems: ALIGN_ITEMS,
		justifyContent: JUSTIFY_CONTENT
	},
	titleCircle: {
		textAlign: 'center',
		color: CIRCLE_COLOR,
		fontSize: CIRCLE_FONT_SIZE,
		fontWeight: CIRCLE_FONT_WEIGHT
	}
})

export default Button = (props) => {
	const { onPress, title, type, styles } = props;

	btnStyle = stylesheets.btnDefault;
	titleStyle = stylesheets.titleDefault;

	switch(type) {
		case "secondary":
			btnStyle = [btnStyle, stylesheets.btnSecondary]
			titleStyle = [titleStyle, stylesheets.titleSecondary]
			break;
		case "circle":
			btnStyle = [btnStyle, stylesheets.btnCircle]
			titleStyle = [titleStyle, stylesheets.titleCircle]
			break;
		case "disabled":
			
			break;
	}

	if (styles?.btnStyle) {
		btnStyle = [btnStyle, styles.btnStyle]
	}

	if (styles?.titleStyle) {
		titleStyle = [titleStyle, styles.titleStyle]
	}

	return (
		<TouchableOpacity
			style={ btnStyle }
			onPress={ onPress }
		>
			<Text style={ titleStyle }>{ title }</Text>
		</TouchableOpacity>
	)
}