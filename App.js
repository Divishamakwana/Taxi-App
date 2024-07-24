import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import SelectCar from './screens/SelectCar';
import DateAndTime from './screens/DateAndTime';
import RentDetails from './screens/RentDetails';
import TripDetails from  './screens/TripDetails';
import Tripchat from './screens/TripChat';
import * as Font from 'expo-font';
import { Text } from 'react-native';
import { useFonts } from 'expo-font';

const fetchFonts = () => {
  return Font.loadAsync({
    'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
    'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
    'Inter-Medium': require('./assets/fonts/Inter-Medium.ttf'),
    'Inter-SemiBold': require('./assets/fonts/Inter-SemiBold.ttf')
  });
};

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
    'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
    'Inter-Medium': require('./assets/fonts/Inter-Medium.ttf'),
    'Inter-SemiBold': require('./assets/fonts/Inter-SemiBold.ttf')
  });

  if (!fontsLoaded) {
    return (
      <Text> Loading....</Text>
    )
  }

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

