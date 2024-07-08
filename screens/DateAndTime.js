import React from 'react';
import { View, Text, Button } from 'react-native';

const DateAndTime = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>select date and time</Text>
      <Text>apply coupen too</Text>
      <Button
        title="continue"
        onPress={() => navigation.navigate('Rent Details')}
      />
    </View>
  );
};

export default DateAndTime;