import React from 'react';
import { View, Text, Button } from 'react-native';

const RentDetails = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Rent details</Text>
      <Text>estimated toll tax</Text>
      <Button
        title="confirm"
        onPress={() => navigation.navigate('Trip Details')}
      />
    </View>
  );
};

export default RentDetails;