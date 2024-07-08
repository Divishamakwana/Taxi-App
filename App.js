// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import SelectCar from './screens/SelectCar';
import DateAndTime from './screens/DateAndTime';
import RentDetails from './screens/RentDetails';
import TripDetails from  './screens/TripDetails';
import Tripchat from './screens/TripChat'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Select car" component={SelectCar} />
        <Stack.Screen name="Date and Time" component={DateAndTime} />
        <Stack.Screen name="Rent Details" component={RentDetails} />
        <Stack.Screen name="Trip Details" component={TripDetails} />
        <Stack.Screen name="Trip Chat" component={Tripchat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

