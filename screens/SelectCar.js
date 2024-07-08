// screens/DetailsScreen.js
import React from 'react';
import { View, Text, Button } from 'react-native';

const SelectCar = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>SelectCar</Text>
      <Button
        title="select car"
        onPress={() => navigation.navigate('Date and Time')}
      />
    </View>
  );
};

export default SelectCar;
