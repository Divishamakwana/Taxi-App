// screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert, ActivityIndicator, Modal, TextInput } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import * as Location from 'expo-location';



const HomeScreen = ({ navigation }) => {
  const [region, setRegion] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [pickupPoint, setPickupPoint] = useState('')
  const [dropPoint, setDropPoint] = useState('')
  const [searchText, setsearchText] = useState('')

  const closeModal = () => {
    setIsVisible(false);
    setAmount('')
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        setLoading(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      });
      setLocation(location.coords);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading map...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
      >
        {location && (
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title={"You are here"}
            description={"Your current location"}
          />
        )}
      </MapView>
      <Text>Home Screen</Text>
      <View
        style={styles.input}
        onPress={() => setIsVisible(true)}>
        <TextInput
          editable
          numberOfLines={4}
          maxLength={40}
          onChangeText={text => setsearchText(text)}
          value={searchText}
          style={{ padding: 10 }}
          placeholder='search here'
        />
      </View>
      <Button
        title="Confirm"
        onPress={() => navigation.navigate('Select car')}
      />
      <Modal visible={isVisible} animationType="none" transparent={true} onRequestClose={() => { setIsVisible(!isVisible) }}>
        <View style={styles.modalContent}>
          <View
            style={
              styles.input}>
            <TextInput
              editable
              numberOfLines={4}
              maxLength={40}
              onChangeText={text => setPickupPoint(text)}
              value={pickupPoint}
              style={{ padding: 10 }}
              placeholder='pickup'
            />
          </View>
          <View
            style={styles.input}>
            <TextInput
              editable
              numberOfLines={4}
              maxLength={40}
              onChangeText={text => setDropPoints(text)}
              value={dropPoint}
              style={{ padding: 10 }}
              placeholder='drop'
            />
          </View>
          <Button
            title="close"
            onPress={() => closeModal}
          />
        </View>

      </Modal >
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContent: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 24,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 10,
  }
});


export default HomeScreen;
