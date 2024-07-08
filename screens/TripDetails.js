import React from 'react';
import { View, Text, Button } from 'react-native';

const TripDetails = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Trip details</Text>
      {/* <Text>estimated toll tax</Text> */}
      <Button
        title="confirm"
        onPress={() => navigation.navigate('Trip Chat')}
      />
    </View>
  );
};

export default TripDetails;