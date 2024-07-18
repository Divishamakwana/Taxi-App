// import React from 'react';
// import { View, Text, Button } from 'react-native';

// const DateAndTime = ({ navigation }) => {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>select date and time</Text>
//       <Text>apply coupen too</Text>
//       <Button
//         title="continue"
//         onPress={() => navigation.navigate('Rent Details')}
//       />
//     </View>
//   );
// };

// export default DateAndTime;
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
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
  const [couponCode, setCouponCode] = useState('');
  const [showCouponCode, setShowCouponCode] = useState(false);

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

  const handleCouponCodeChange = (text) => {
    setCouponCode(text);
    setShowCouponCode(!!text);
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
        {showCouponCode && (
          <View style={styles.couponInput}>
            <TextInput
              style={styles.couponInputText}
              placeholder="Enter Coupon Code"
              value={couponCode}
              onChangeText={handleCouponCodeChange}
            />
          </View>
        )}
        <TouchableOpacity
          style={styles.couponBtn}
          onPress={() => {}}
        >
          <Text style={styles.couponBtnText}>Use Coupon Code</Text>
          {showCouponCode && <AntDesign name="check" size={18} color="#000" />}
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
    flex: 1,
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
    marginBottom: 20,
  },
  couponInput: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    marginBottom: 10,
  },
  couponInputText: {
    fontSize: 16,
  },
  couponBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
  },
  couponBtnText: {
    fontSize: 16,
    flex: 1,
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DateAndTime;
