import React from 'react';
import { View, Text, Button } from 'react-native';

const Tripchat = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Trip chat</Text>
      {/* <Text>estimated toll tax</Text>
      <Button
        title="confirm"
        onPress={() => navigation.navigate('Date and Time')}
      /> */}
    </View>
  );
};

export default Tripchat;