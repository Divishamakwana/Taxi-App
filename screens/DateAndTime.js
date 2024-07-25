import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  Animated,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import CalendarIcon from '../assets/icons/CalendarIcon';
import ClockIcon from '../assets/icons/ClockIcon';
import DisableCalendarIcon from '../assets/icons/DisableCalendarIcon';
import DisableClockIcon from '../assets/icons/DisableClockIcon';
import DownArrowIcon from '../assets/icons/DownArrowIcon';

const DateAndTime = ({navigation}) => {
  const [tripType, setTripType] = useState('oneWay');
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [showFromDatePicker, setShowFromDatePicker] = useState(false);
  const [showToDatePicker, setShowToDatePicker] = useState(false);
  const [showFromTimePicker, setShowFromTimePicker] = useState(false);
  const [showToTimePicker, setShowToTimePicker] = useState(false);
  const [carrierPreference, setCarrierPreference] = useState('withCarrier');
  const [modalVisible, setModalVisible] = useState(false);

  const handleTripTypeChange = (value) => {
    setTripType(value);
  };

  const handleDateChange = (event, selectedDate, type) => {
    if (type === 'from') {
      setShowFromDatePicker(false);
      setFromDate(selectedDate || fromDate);
    } else if (type === 'to') {
      setShowToDatePicker(false);
      setToDate(selectedDate || toDate);
    }
  };

  const handleTimeChange = (event, selectedDate, type) => {
    if (type === 'from') {
      setShowFromTimePicker(false);
      setFromDate(selectedDate || fromDate);
    } else if (type === 'to') {
      setShowToTimePicker(false);
      setToDate(selectedDate || toDate);
    }
  };

  const handleCarrierPreferenceChange = (value) => {
    setCarrierPreference(value);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Trip Type</Text>
      <View style={styles.tripTypeContainer}>
        <View style={styles.tripTypeOption}>
          <TouchableOpacity
            style={[
              styles.radioBtn,
              tripType === 'oneWay' && styles.radioBtnActive,
            ]}
            onPress={() => handleTripTypeChange('oneWay')}
          >
            {tripType === 'oneWay' && <View style={styles.radioBtnInner} />}
          </TouchableOpacity>
          <Text style={[styles.tripTypeText, tripType === 'oneWay' && styles.ActiveText]}>One Way Trip</Text>
        </View>
        <View style={styles.tripTypeOption}>
          <TouchableOpacity
            style={[
              styles.radioBtn,
              tripType === 'roundTrip' && styles.radioBtnActive,
            ]}
            onPress={() => handleTripTypeChange('roundTrip')}
          >
            {tripType === 'roundTrip' && <View style={styles.radioBtnInner} />}
          </TouchableOpacity>
          <Text style={[styles.tripTypeText, tripType === 'roundTrip' && styles.ActiveText]}>Round Trip</Text>
        </View>
      </View>

      <Text style={styles.title}>Date & Time</Text>
      <View style={styles.dateContainer}>
        <View style={styles.dateInput}>
          <Text style={styles.dateLabel}>From</Text>
          <View style={styles.dateTimeRow}>
            <TouchableOpacity
              style={styles.dateInputBox}
              onPress={() => setShowFromDatePicker(true)}
            >
              <Text style={styles.dateInputText}>{formatDate(fromDate)}</Text>
              {/* <AntDesign name="calendar" size={18} color="#000" /> */}
              <CalendarIcon />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.timeInputBox}
              onPress={() => setShowFromTimePicker(true)}
            >
              <Text style={styles.dateInputText}>{fromDate.toLocaleTimeString('en-US')}</Text>
              {/* <AntDesign name="clockcircleo" size={18} color="#000" /> */}
              <ClockIcon />
            </TouchableOpacity>
          </View>
          {showFromDatePicker && (
            <DateTimePicker
              value={fromDate}
              mode="date"
              display="default"
              onChange={(event, selectedDate) =>
                handleDateChange(event, selectedDate, 'from')
              }
            />
          )}
          {showFromTimePicker && (
            <DateTimePicker
              value={fromDate}
              mode="time"
              display="default"
              onChange={(event, selectedDate) =>
                handleTimeChange(event, selectedDate, 'from')
              }
            />
          )}
        </View>
        {/* {tripType === 'roundTrip' && ( */}
        <View style={styles.dateInput}>
          <Text style={styles.dateLabel}>To</Text>
          <View style={styles.dateTimeRow}>
            <TouchableOpacity
              style={[styles.dateInputBox, tripType === 'oneWay' && styles.DisableInputBox]}
              onPress={() => setShowToDatePicker(true)}
              disabled={tripType === 'oneWay'}
            >
              <Text style={[styles.dateInputText, tripType === 'oneWay' && styles.DisableText]}>{formatDate(toDate)}</Text>
              {/* <AntDesign name="calendar" size={18} color="#000" /> */}
              {tripType === 'oneWay' ? <DisableCalendarIcon /> : <CalendarIcon />}

            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.timeInputBox, tripType === 'oneWay' && styles.DisableInputBox]}
              onPress={() => setShowToTimePicker(true)}
              disabled={tripType === 'oneWay'}
            >
              <Text style={[styles.dateInputText, tripType === 'oneWay' && styles.DisableText]}>{toDate.toLocaleTimeString('en-US')}</Text>
              {/* <AntDesign name="clockcircleo" size={18} color="#000" /> */}
              {tripType === 'oneWay' ? <DisableClockIcon /> : <ClockIcon />}

            </TouchableOpacity>
          </View>
          {showToDatePicker && (
            <DateTimePicker
              value={toDate}
              mode="date"
              display="default"
              onChange={(event, selectedDate) =>
                handleDateChange(event, selectedDate, 'to')
              }
            />
          )}
          {showToTimePicker && (
            <DateTimePicker
              value={toDate}
              mode="time"
              display="default"
              onChange={(event, selectedDate) =>
                handleTimeChange(event, selectedDate, 'to')
              }
            />
          )}
        </View>
        {/* )} */}
      </View>

      <Text style={styles.title}>Carrier Preference</Text>
      <View style={styles.carrierPreferenceContainer}>
        <View style={styles.carrierPreferenceOption}>
          <TouchableOpacity
            style={[
              styles.radioBtn,
              carrierPreference === 'withCarrier' && styles.radioBtnActive,
            ]}
            onPress={() => handleCarrierPreferenceChange('withCarrier')}
          >
            {carrierPreference === 'withCarrier' && <View style={styles.radioBtnInner} />}
          </TouchableOpacity>
          <Text style={[styles.carrierPreferenceText, carrierPreference === 'withCarrier' && styles.ActiveText]}>With Carrier</Text>
        </View>
        <View style={styles.carrierPreferenceOption}>
          <TouchableOpacity
            style={[
              styles.radioBtn,
              carrierPreference === 'withoutCarrier' && styles.radioBtnActive,
            ]}
            onPress={() => handleCarrierPreferenceChange('withoutCarrier')}
          >
            {carrierPreference === 'withoutCarrier' && <View style={styles.radioBtnInner} />}
          </TouchableOpacity>
          <Text style={[styles.carrierPreferenceText, carrierPreference === 'withoutCarrier' && styles.ActiveText,]}>Without Carrier</Text>
        </View>
      </View>

      <View style={styles.couponContainer}>
        <TouchableOpacity
          style={styles.couponBtn}
          onPress={() => {setModalVisible(true)}}
        >
          <Image
            source={require('.././assets/images/coupon.png')} 
            style={styles.couponImage}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.confirmButton} onPress={() => { navigation.navigate('Rent Details')}}>
        <Text style={styles.confirmButtonText}>Confirm</Text>
      </TouchableOpacity>
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="none"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity style={styles.modalBackground} onPress={() => setModalVisible(false)} />
          <Animated.View style={[styles.modalContainer]}>
            <View style={styles.arrowContainer}>
            <DownArrowIcon/>
            </View>
           
            <Text style={styles.modalTitle}>Coupon Details</Text>
            {/* Add your modal content here */}
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    marginTop: 20,
    fontFamily: 'Inter-Bold'
  },
  tripTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 5
  },
  tripTypeOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioBtn: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#000',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioBtnActive: {
    borderColor: '#28825B',
  },
  radioBtnInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#28825B',
  },
  tripTypeText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold'
  },
  dateContainer: {
    marginBottom: 20,
  },
  dateInput: {
    marginBottom: 10,
  },
  dateLabel: {
    fontSize: 14,
    marginBottom: 10,
    fontFamily: 'Inter-Medium'
  },
  dateTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateInputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderWidth: 1,
    borderColor: '#28825B',
    borderRadius: 10,
    marginRight: 10,
    flex: 1,
  },
  DisableInputBox: {
    borderColor: '#c7c7c7'
  },
  timeInputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderWidth: 1,
    borderColor: '#28825B',
    borderRadius: 10,
    flex: 1,
  },
  dateInputText: {
    fontSize: 14,
    color: '#28825B',
    fontFamily: 'Inter-Bold'
  },
  DisableText: {
    color: '#c7c7c7'
  },
  carrierPreferenceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop:10
  },
  carrierPreferenceOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  carrierPreferenceText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    marginLeft: 5,
  },
  couponContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  couponBtn: {
    // Remove any additional styling here
  },
  couponImage: {
    width: 400,
    height: 80,
    resizeMode: 'contain',
  },
  confirmButton: {
    backgroundColor: '#28825B',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontFamily: 'Inter-Bold',
    fontSize:16
  },
  ActiveText: {
    color: '#28825B'
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontFamily: 'Inter-Bold'
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#28825B',
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontFamily: 'Inter-Bold',
    fontSize: 16,
  },
  arrowContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
});

export default DateAndTime;
