import React, { useState } from 'react'
import { Text, StyleSheet, View, ScrollView, Alert } from 'react-native'
import Theme from '@styles/theme';
import RadioForm from 'react-native-simple-radio-button';
import Button from "@components/Button";
import { TouchableOpacity } from 'react-native-gesture-handler';

const showAlert = (props) => {
  Alert.alert(
    'Thông báo',
    'Bạn có chắc chắn đặt lịch không?',
    [
      {
        text: 'Có',
        onPress: () => navigateTo("Book")
      },
      {
        text: 'Không',
        onPress: () => console.log('No Pressed'), style: 'cancel'
      },
    ],
    {cancelable: false},
  );
};
const BookAMedicalAppointment = () => {

  const [isSelected, setSelection] = useState(false);

  const [chosenOption, setChosenOption] = useState('Tai - Mũi - Họng');
  const options = [
    { label: 'Tai - Mũi - Họng', value: 'Tai - Mũi - Họng' },
    { label: 'Đông - Y', value: 'Đông - Y' },
    { label: 'Da Liễu', value: 'Da Liễu' },
    { label: 'Phụ Khoa', value: 'Phụ Khoa' },
  ];

  return (
    <ScrollView>

      <View style={styles.container}>

        <Text style={styles.text}>Chọn khoa khám bệnh</Text>

        <View style={styles.chose}>
          <Text style={styles.option}> {chosenOption}</Text>
          <RadioForm
            radio_props={options}
            initial={0}
            onPress={(value) => {
              setChosenOption(value);
            }}
          />
        </View>

        <Text style={styles.text}>Ngày</Text>
        <View style={styles.date}>
          <View style={styles.row}>
            <TouchableOpacity>
              <Text style={styles.content}>Hôm nay</Text>
              <Text style={styles.time}>05/11</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity>
              <Text style={styles.content}>Ngày mai</Text>
              <Text style={styles.time}>06/11</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity>
              <Text style={styles.content}>Ngày khác</Text>
              <Text style={styles.time}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.text}>Thời gian hẹn</Text>
        <Text>Ca sáng</Text>

        <View style={styles.chose_time}>
          <View style={styles.row}>
            <TouchableOpacity>
              <Text style={styles.time_2}>8:30</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity>
              <Text style={styles.time_2}>9:00</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity>
              <Text style={styles.time_2}>9:30</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.chose_time}>
          <View style={styles.row}>
            <TouchableOpacity>
              <Text style={styles.time_2}>10:00</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity>
              <Text style={styles.time_2}>10:30</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity>
              <Text style={styles.time_2}>11:00</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text>Ca chiều</Text>

        <View style={styles.chose_time}>
          <View style={styles.row}>
            <TouchableOpacity>
              <Text style={styles.time_2}>13:30</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity>
              <Text style={styles.time_2}>14:00</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity>
              <Text style={styles.time_2}>14:30</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.chose_time}>
          <View style={styles.row}>
            <TouchableOpacity>
              <Text style={styles.time_2}>15:00</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity>
              <Text style={styles.time_2}>15:30</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity>
              <Text style={styles.time_2}>16:00</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.submit}>
          <Button title="Xác nhận " onPress={showAlert} />
          {/* <Button title="Xác nhận " onPress={() => navigateTo("Book")} /> */}
        </View>

      </View>
    </ScrollView>
  )
};

export default BookAMedicalAppointment; showAlert;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.PRIMARY_BG_COLOR,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  chose: {
    marginVertical: Theme.MARGIN_x,
    marginLeft: Theme.MARGIN_4x,
  },
  option: {
    marginLeft: Theme.MARGIN_4x,
    paddingBottom: 10,
    fontSize: Theme.FONT_SIZE_NORMAL,
  },
  label: {
    paddingLeft: 10,
    fontSize: Theme.FONT_SIZE_LARGE,
    color: 'black',
  },
  text: {
    color: 'black',
    fontWeight: Theme.BOLD_NORMAL,
    paddingBottom: 10,
  },
  date: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  row: {
    flex: 1,

    marginHorizontal: Theme.MARGIN_x,
    borderColor: Theme.PRIMARY_COLOR,
    borderRadius: 10,
    borderWidth: 1,
  },
  content: {
    textAlign: 'center',
    marginTop: Theme.MARGIN_2x,
    fontSize: Theme.FONT_SIZE_NORMAL,
    color: 'black',
  },
  time: {
    marginTop: Theme.MARGIN_x,
    marginBottom: Theme.MARGIN_2x,
    textAlign: 'center',
    fontSize: Theme.FONT_SIZE_NORMAL,
    fontWeight: Theme.BOLD_NORMAL,
    color: 'black',
  },
  chose_time: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  time_2: {
    textAlign: 'center',
    color: 'black',
    fontWeight: Theme.BOLD_NORMAL,
    fontSize: Theme.FONT_SIZE_NORMAL_1x,
    marginVertical: Theme.MARGIN_2x,
  },
  submit: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: Theme.MARGIN_2x,
  },
})
