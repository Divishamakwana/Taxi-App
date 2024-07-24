// screens/DetailsScreen.js
import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PersonIcon from '../assets/icons/PersonIcon';
import AcIcon from '../assets/icons/AcIcon';

const SelectCar = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Date and Time')}>
          <View style={styles.carCard}>
            <View style={styles.imageContainer}>
              {/* image will come here  */}
            </View>
            <View style={styles.carDetailsPart}>
              <View style={styles.carDetails}>
                <Text style={styles.carTitle}>
                  Innova crysta
                </Text>
                <View style={styles.iconText}>
                  <PersonIcon />
                  <Text style={styles.detailText}>4-7 person</Text>
                </View>
                <View style={styles.iconText}>
                  <AcIcon />
                  <Text style={styles.detailText}>4-7 person</Text>
                </View>
              </View>
              <View style={styles.ratePart}>
                <Text style={styles.RateText}>
                  15
                </Text>
                <Text style={styles.RateMeasureText}>
                  rs/km
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      {/* <Text style={{fontFamily:'Inter-Bold'}}>SelectCar</Text>
      <Button
        title="select car"
        onPress={() => navigation.navigate('Date and Time')}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  cardContainer: {
    marginVertical: 40
  },
  carCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#EBEEEE',
    borderRadius: 10
  },
  imageContainer: {
    height: 64,
    width: 64,
    backgroundColor: 'gray'
  },
  carDetailsPart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1
  },
  carDetails: {
    marginLeft: 20,

  },
  carTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
  },
  iconText: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  detailText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: 'gray'
  },
  RateText: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
  },
  RateMeasureText: {
    fontFamily: 'Inter-Medium',
    fontSize: 10,
  },
  ratePart: {
    marginLeft: 'auto'
  }


})

export default SelectCar;
