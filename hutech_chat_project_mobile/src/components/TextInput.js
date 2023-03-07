import { StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import TextInputStyle from "@src/styles/text-input";

const { MARGIN_TOP, BORDER_BOTTOM_COLOR, BODERR_BOTTOM_WIDTH, PADDING_BOTTOM } =
  TextInputStyle;

const styles = StyleSheet.create({
  default: {
    marginTop: MARGIN_TOP,
    borderBottomColor: BORDER_BOTTOM_COLOR,
    borderBottomWidth: BODERR_BOTTOM_WIDTH,
    paddingBottom: PADDING_BOTTOM,
  },
});

export default TextInputCustom = (props) => {
  const { placeholder, onChangeText, boolean, type } = props;

  return (
    <TextInput
      style={styles.default}
      placeholder={placeholder || "Nhập"}
      secureTextEntry={boolean}
      textContentType={type}
      onChangeText={onChangeText}
    />
  );
};