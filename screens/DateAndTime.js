import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

const DateAndTime = () => {
  const [tripType, setTripType] = useState('oneWay');
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [showFromDatePicker, setShowFromDatePicker] = useState(false);
  const [showToDatePicker, setShowToDatePicker] = useState(false);
  const [showFromTimePicker, setShowFromTimePicker] = useState(false);
  const [showToTimePicker, setShowToTimePicker] = useState(false);
  const [carrierPreference, setCarrierPreference] = useState('withCarrier');

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
          <Text style={styles.tripTypeText}>One Way Trip</Text>
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
          <Text style={styles.tripTypeText}>Round Trip</Text>
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
              <AntDesign name="calendar" size={18} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.timeInputBox}
              onPress={() => setShowFromTimePicker(true)}
            >
              <Text style={styles.dateInputText}>{fromDate.toLocaleTimeString('en-US')}</Text>
              <AntDesign name="clockcircleo" size={18} color="#000" />
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
        {tripType === 'roundTrip' && (
          <View style={styles.dateInput}>
            <Text style={styles.dateLabel}>To</Text>
            <View style={styles.dateTimeRow}>
              <TouchableOpacity
                style={styles.dateInputBox}
                onPress={() => setShowToDatePicker(true)}
              >
                <Text style={styles.dateInputText}>{formatDate(toDate)}</Text>
                <AntDesign name="calendar" size={18} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.timeInputBox}
                onPress={() => setShowToTimePicker(true)}
              >
                <Text style={styles.dateInputText}>{toDate.toLocaleTimeString('en-US')}</Text>
                <AntDesign name="clockcircleo" size={18} color="#000" />
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
        )}
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
          <Text style={styles.carrierPreferenceText}>With Carrier</Text>
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
          <Text style={styles.carrierPreferenceText}>Without Carrier</Text>
        </View>
      </View>

      <View style={styles.couponContainer}>
        <TouchableOpacity
          style={styles.couponBtn}
          onPress={() => {}}
        >
          <Image
            source={require('.././assets/coupon.png')} // Replace with your image path
            style={styles.couponImage}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.confirmButton} onPress={() => {}}>
        <Text style={styles.confirmButtonText}>Confirm</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tripTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
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
    borderColor: '#38AA78',
  },
  radioBtnInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#38AA78',
  },
  tripTypeText: {
    fontSize: 16,
  },
  dateContainer: {
    marginBottom: 20,
  },
  dateInput: {
    marginBottom: 10,
  },
  dateLabel: {
    fontSize: 16,
    marginBottom: 5,
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
    borderColor: '#000',
    borderRadius: 5,
    marginRight: 10,
    flex: 1,
  },
  timeInputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    flex: 1,
  },
  dateInputText: {
    fontSize: 16,
  },
  carrierPreferenceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  carrierPreferenceOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  carrierPreferenceText: {
    fontSize: 16,
    marginLeft: 10,
  },
  couponContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  couponBtn: {
    // Remove any additional styling here
  },
  couponImage: {
    width: 300,
    height: 80,
    resizeMode: 'contain',
  },
  confirmButton: {
    backgroundColor: '#38AA78',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DateAndTime;
