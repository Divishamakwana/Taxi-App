import React from 'react';
import { View, Text, Button } from 'react-native';

const MenuScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* <Button
        title="menu"
        onPress={() => navigation.navigate('Menu')}
      /> */}
      <Text>Menu Screen</Text>
      <Button
        title="profile"
        onPress={() => navigation.navigate('Profile Details')}
      />
       <Button
        title="rides"
        onPress={() => navigation.navigate('Rides')}
      />
    </View>
  );
};

export default MenuScreen;
