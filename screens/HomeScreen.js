import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet, Alert, ActivityIndicator, Modal, TextInput, Image } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const HomeScreen = ({ navigation }) => {
  const [region, setRegion] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [pickupPoint, setPickupPoint] = useState('');
  const [dropPoint, setDropPoint] = useState('');
  const [pickupCoordinate, setPickupCoordinate] = useState(null);
  const [dropCoordinate, setDropCoordinate] = useState(null);
  const [searchText, setSearchText] = useState('');
  const mapRef = useRef(null);

  const closeModal = () => {
    setIsVisible(false);
    setSearchText('');
  };

  const geocodeLocation = async (locationName, type) => {
    try {
      const geocode = await Location.geocodeAsync(locationName);
      if (geocode.length > 0) {
        const { latitude, longitude } = geocode[0];
        const coordinate = { latitude, longitude };
        if (type === 'pickup') {
          setPickupCoordinate(coordinate);
          setPickupPoint(locationName);
        } else if (type === 'drop') {
          setDropCoordinate(coordinate);
          setDropPoint(locationName);
        }
        if (type === 'pickup' && !dropCoordinate) {
          setRegion({
            latitude,
            longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          });
        }
      } else {
        Alert.alert('Location not found');
      }
    } catch (error) {
      Alert.alert('Error fetching location');
    }
  };

  const reverseGeocodeLocation = async (coordinate, type) => {
    try {
      const [result] = await Location.reverseGeocodeAsync(coordinate);
      if (result) {
        const cityName = result.city || result.name;
        if (type === 'pickup') {
          setPickupPoint(cityName || '');
        } else if (type === 'drop') {
          setDropPoint(cityName || '');
        }
      } else {
        Alert.alert('Unable to retrieve city name');
      }
    } catch (error) {
      Alert.alert('Error fetching city name');
    }
  };

  const searchLocation = () => {
    if (searchText) {
      geocodeLocation(searchText, 'pickup');
      setSearchText('');
    }
  };

  const confirmLocations = () => {
    if (pickupPoint) {
      geocodeLocation(pickupPoint, 'pickup');
    }
    if (dropPoint) {
      geocodeLocation(dropPoint, 'drop');
    }
    setIsVisible(false);
    // Zoom the map to fit both markers after confirming
    if (pickupCoordinate && dropCoordinate) {
      fitMapToMarkers();
    }
  };

  const fitMapToMarkers = () => {
    if (pickupCoordinate && dropCoordinate && mapRef.current) {
      
      const coordinates = [pickupCoordinate, dropCoordinate];
      mapRef.current.fitToCoordinates(coordinates, {
        edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
        animated: true,
      });
    } else {
      console.log("Error: Missing coordinates or map reference", {
        pickupCoordinate,
        dropCoordinate,
        mapRef: mapRef.current,
      });
    }
  };

  const handleDragEnd = (event, type) => {
    const { coordinate } = event.nativeEvent;
    if (type === 'pickup') {
      setPickupCoordinate(coordinate);
      reverseGeocodeLocation(coordinate, 'pickup');
    } else if (type === 'drop') {
      setDropCoordinate(coordinate);
      reverseGeocodeLocation(coordinate, 'drop');
    }
    // Update region to reflect new coordinates
    if (pickupCoordinate && dropCoordinate) {
      fitMapToMarkers();
    }
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

  useEffect(() => {
    if (pickupCoordinate && dropCoordinate && mapRef.current) {
      fitMapToMarkers();
    }
  }, [pickupCoordinate, dropCoordinate]);

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
        ref={mapRef} // Set map reference
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
        customMapStyle={mapStyle}
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
        {pickupCoordinate && (
          <Marker
            coordinate={pickupCoordinate}
            title={pickupPoint}
            description={"Pickup Point"}
            pinColor="red"
            draggable
            onDragEnd={(event) => handleDragEnd(event, 'pickup')}
            identifier="pickup"
          >
            <Image
              source={require('.././assets/redpin.png')}
              style={styles.markerImage} // Apply styles for marker size
            />
          </Marker>
        )}
        {dropCoordinate && (
          <Marker
            coordinate={dropCoordinate}
            title={dropPoint}
            description={"Drop Point"}
            draggable
            onDragEnd={(event) => handleDragEnd(event, 'drop')}
            identifier="drop"
          >
            <Image
              source={require('.././assets/greenpin.png')}
              style={styles.markerImage} // Apply styles for marker size
            />
          </Marker>
        )}
      </MapView>
      <Text>Home Screen</Text>
      <View style={styles.input}>
        <TextInput
          editable
          numberOfLines={1}
          maxLength={40}
          onChangeText={text => setSearchText(text)}
          value={searchText}
          style={{ padding: 10 }}
          placeholder='Search here'
        />
      </View>
      <Button
        title="Search Location"
        onPress={searchLocation}
      />
      <Button
        title="Confirm"
        onPress={() => {
          if (pickupCoordinate && dropCoordinate) {
            navigation.navigate('Select car');
          } else {
            Alert.alert("Please set both pickup and drop points.");
          }
        }}
      />
      <Button
        title="Open Modal"
        onPress={() => setIsVisible(true)}
      />
      <Modal visible={isVisible} animationType="none" transparent={true} onRequestClose={() => setIsVisible(false)}>
        <View style={styles.modalContent}>
          <View style={styles.input}>
            <TextInput
              editable
              numberOfLines={1}
              maxLength={40}
              onChangeText={text => setPickupPoint(text)}
              value={pickupPoint}
              style={{ padding: 10 }}
              placeholder='Pickup Location'
            />
          </View>
          <View style={styles.input}>
            <TextInput
              editable
              numberOfLines={1}
              maxLength={40}
              onChangeText={text => setDropPoint(text)}
              value={dropPoint}
              style={{ padding: 10 }}
              placeholder='Drop Location'
            />
          </View>
          <Button
            title="Confirm"
            onPress={confirmLocations}
          />
          <Button
            title="Close"
            onPress={closeModal}
          />
        </View>
      </Modal>
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
  markerImage: {
    width: 40, // Adjust the width
    height: 40, // Adjust the height
    resizeMode: 'contain', // Ensures image maintains aspect ratio
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
    marginBottom: 10,
    width: '100%',
  }
});

const mapStyle = [
  {
    "featureType": "all",
    "elementType": "all",
    "stylers": [
      { "visibility": "on" }
    ]
  },
  {
    "featureType": "landscape",
    "elementType": "geometry",
    "stylers": [
      { "color": "#EBEEEE" }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      { "color": "#ADD8E6" }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      { "color": "#d0d0d0" } // Light grey color for roads
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      { "color": "#c0c0c0" } // Slightly darker grey color for highways
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      { "color": "#b0b0b0" } // Medium grey color for arterial roads
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "geometry",
    "stylers": [
      { "color": "#a0a0a0" } // Darker grey color for local roads
    ]
  }
];

export default HomeScreen;
