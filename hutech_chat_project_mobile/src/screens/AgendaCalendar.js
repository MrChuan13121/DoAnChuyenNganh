import React, { useEffect, useRef, useState } from 'react'
import {
  Text,
  StyleSheet,
  View,
  Animated,
  Easing,
  TouchableOpacity,
} from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { Icon } from 'react-native-paper/lib/typescript/components/Avatar/Avatar'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { time } from '@src/services/time'
import ButtonChoose from '@components/ButtonChoose'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { ScrollView } from 'react-native-virtualized-view'
import moment from 'moment'
import { async } from '@firebase/util'
import { todayString } from 'react-native-calendars/src/expandableCalendar/commons'

export default function AgendaCalendar({ navigation }) {
  const [isSelected, setSelected] = useState()
  const [start, setStart] = useState('')
  const [dateString, setDate] = useState('')

  //Chuan them
  const [day, setDay] = useState('')
  const [year, setYear] = useState('')
  const [month, setMonth] = useState('')
  const [dateSelected, setDateSelected] = useState(new Date())

  const fadeAnim = useRef(new Animated.Value(0)).current
  const position = new Animated.ValueXY({ x: 0, y: 0 })

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)

  const dayCurren = new Date().getTime()
  const dayEnd = new Date(dayCurren + 604800000)
  const minDate = new Date(dayCurren)
  const maxDate = new Date(dayEnd)

  const dateValue = new Date(new Date().setDate())

  // const dateValue = new Date(new Date().setDate(7))

  const showDatePicker = () => {
    setDatePickerVisibility(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  const handelConfirm = async (date) => {
    const monthAndYear = moment(date).format('DD/MM/YYYY')
    const dateSelectd = monthAndYear.toString()
    const [day, month, year] = dateSelectd.split('/')
    setDay(day)
    setMonth(month)
    setYear(year)
    const dateObj = new Date(+year, +month - 1, +day)
    setDateSelected(dateObj)
    setDate(dateSelectd)
    hideDatePicker()
  }

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start()
  }

  const slide = () => {
    Animated.timing(position, {
      toValue: { x: 0, y: -150 },
      speed: 500,
      easing: Easing.bounce,
      useNativeDriver: true,
    }).start()
  }

  useEffect(() => {
    if (isSelected && dateString) {
      fadeIn(), slide()
    }
  })

  const addTime = (value, start) => {
    setSelected(value)
    setStart(start)
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Book')}>
        <View>
          <View style={styles.productContainer}>
            <View style={styles.icons}>
              <Ionicons name="calendar-outline" color={'gray'} size={32} />
            </View>
            <View>
              <Text style={styles.productText}>Đặt lich khám bệnh</Text>
              <Text style={styles.productInfo}>Xem lịch khám đã đặt </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <ScrollView>
        <Text style={styles.titleCategory}>Lịch khám</Text>
        <View>
          <TouchableOpacity
            style={styles.buttonCalendar}
            onPress={showDatePicker}
          >
            <Text style={styles.textDate}>
              {dateString === '' ? 'Chọn ngày' : dateString}
            </Text>
            <Text style={styles.textDate}>{start}</Text>
          </TouchableOpacity>
          {dateString !== '' ? (
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              date={dateSelected}
              onConfirm={handelConfirm}
              onCancel={hideDatePicker}
              value={dateValue}
              minimumDate={minDate}
              maximumDate={maxDate}
            />
          ) : (
            <DateTimePickerModal
              style={{ backgroundColor: '#37a4f2' }}
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handelConfirm}
              onCancel={hideDatePicker}
              value={dateValue}
              minimumDate={minDate}
              maximumDate={maxDate}
            />
          )}
        </View>

        <Text style={styles.titleCategory}>Thời gian</Text>

        <FlatList
          showsVerticalScrollIndicator={false}
          style={styles.FlatList}
          keyExtractor={(item) => item.id.toString()}
          data={time}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.timeContainer}
              onPress={() => addTime(item.id, item.start)}
            >
              <Text
                style={
                  item.id === isSelected ? styles.selected : styles.textTime
                }
              >
                {item.start} - {item.end}
              </Text>

              <View>
                <Text
                  style={
                    item.id === isSelected ? styles.selected : styles.textTime
                  }
                >
                  Chọn
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </ScrollView>

      <Animated.View
        style={{
          height: 80,
          width: '100%',
          justifyContent: 'flex-end',
          alignItems: 'center',
          position: 'absolute',
          bottom: 0,
          marginBottom: -30,
          alignSelf: 'center',
          opacity: fadeAnim,
          transform: [{ translateX: position.x }, { translateY: position.y }],
        }}
      >
        <ButtonChoose
          navigation={navigation}
          title="Xác nhận"
          date={{
            date: dateString,
            time: start,
          }}
        ></ButtonChoose>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
  },
  productContainer: {
    flexDirection: 'row',
    height: 80,
    alignItems: 'center',
    borderColor: '#DBE3Eb',
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  icons: {
    height: 50,
    width: 50,
    justifyContent: 'center',
  },
  productText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#37a4f2',
  },
  productInfo: {
    color: '#7d8392',
    fontSize: 13,
  },
  titleCategory: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#7d8392',
  },
  buttonCalendar: {
    height: 55,
    borderBottomWidth: 3,
    borderColor: '#37a4f2',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: '#F0F6FD',
    marginBottom: 10,
  },
  textDate: {
    textTransform: 'uppercase',
    color: '#37a4f2',
    fontWeight: 'bold',
    fontSize: 14,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    borderColor: '#DBE3Eb',
    borderBottomWidth: 1,
    paddingBottom: 1,
    paddingHorizontal: 20,
  },
  textTime: {
    color: '#7d8392',
  },
  selected: {
    color: '#37a4f2',
  },
})
