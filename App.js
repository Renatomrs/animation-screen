import React, { useEffect, useState, useRef } from 'react';

import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
} from 'react-native';

const {width} = Dimensions.get('window');

import Carousel from 'react-native-snap-carousel';

const carouselItems = [
  {
    image:
      'https://images.pexels.com/photos/6976369/pexels-photo-6976369.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    text: 'Envie uma encomenda a partir de R$ 7.99 e + por mais R$ 1.00 coloque seu anúncio em destaque.',
  },
  {
    image:
      'https://images.pexels.com/photos/577696/pexels-photo-577696.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    text: 'Envie uma encomenda a partir de R$ 7.99 e + por mais R$ 1.00 coloque seu anúncio em destaque.',
  },
  {
    image:
      'https://images.pexels.com/photos/3019893/pexels-photo-3019893.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    text: 'Envie uma encomenda a partir de R$ 7.99 e + por mais R$ 1.00 coloque seu anúncio em destaque.',
  },
];

const renderItem = ({item}) => {
  return (
    <View
      style={[
        styles.cardDestaque,
        styles.shadow,
      ]}>
      <Image
        style={{width: '100%', height: 200, borderRadius: 5}}
        source={{
          uri: item.image,
        }}
      />

      <Text style={{fontSize: 14, color: '#E1E1E7', lineHeight: 22}}>
        <Text>{item.text}</Text>
      </Text>

      <TouchableOpacity
        style={styles.buttonDestaque}>
        <Text style={{fontWeight: 'bold', color: '#474747'}}>
          Criar um novo anúncio
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const Card = () => {
  return (
    <View
      style={[styles.card, styles.shadow]}
    ></View>
  );
};

const Indicator = () => {
  return <View style={styles.indicator} />;
};

const App = () => {
  const [screenControl, setScreenControl] = useState('destaque');
  const [previousScreen, setPreviousScreen] = useState('destaque');

  const animationProximos = useRef(new Animated.Value(0)).current;
  const animationDestaque = useRef(new Animated.Value(0)).current;
  const animationMaps = useRef(new Animated.Value(0)).current;

  const changeScreen = value => {
    if (value === 'destaque' && previousScreen === 'proximos') {
      console.log('indo da direita para esquerda');
      Animated.timing(animationDestaque, {
        toValue: -173,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        animationDestaque.setValue(0);
      });
    }

    if (value === 'destaque' && previousScreen === 'maps') {
      console.log('indo da direita para esqueda');
      Animated.timing(animationDestaque, {
        toValue: 173,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        animationDestaque.setValue(0);
      });
    }

    if (value === 'proximos' && previousScreen === 'destaque') {
      console.log('indo da esquerda para direita');
      Animated.timing(animationProximos, {
        toValue: 175,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        animationProximos.setValue(0);
      });
    }

    if (value === 'proximos' && previousScreen === 'maps') {
      console.log('indo da esquerda para direita');
      Animated.timing(animationProximos, {
        toValue: 175,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        animationProximos.setValue(0);
      });
    }

    if (value === 'maps' && previousScreen === 'destaque') {
      console.log('indo da esquerda para direita');
      Animated.timing(animationMaps, {
        toValue: 175,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        animationMaps.setValue(0);
      });
    }

    if (value === 'maps' && previousScreen === 'proximos') {
      console.log('indo da esquerda para direita');
      Animated.timing(animationMaps, {
        toValue: -175,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        animationMaps.setValue(0);
      });
    }
    setPreviousScreen(value);
    setScreenControl(value);
  };

  return (
    <SafeAreaView style={styles.sectionContainer}>
      <View style={styles.tabs}>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => changeScreen('maps')}>
          <Text style={{color: '#FFF', fontWeight: 'bold'}}>Ver Mapa</Text>
          {screenControl === 'maps' && <Indicator />}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tab}
          onPress={() => changeScreen('destaque')}>
          <Text style={{color: '#FFF', fontWeight: 'bold'}}>Destaques</Text>
          {screenControl === 'destaque' && <Indicator />}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tab}
          onPress={() => changeScreen('proximos')}>
          <Text style={{color: '#FFF', fontWeight: 'bold'}}>Próximos</Text>
          {screenControl === 'proximos' && <Indicator />}
        </TouchableOpacity>
      </View>

      <View style={styles.main}>
        {screenControl === 'maps' && (
          <Animated.View
            style={{
              width: '100%',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 18,
              backgroundColor: '#333',
              transform: [
                {translateX: animationMaps},
              ],
            }}
          >
            <View
              style={[
                {
                  width: '90%',
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                  backgroundColor: '#474747',
                },
                styles.shadow,
              ]}>
              <Text style={{fontSize: 18, color: '#E1E1E7'}}>Maps here!</Text>
            </View>
          </Animated.View>
        )}

        {screenControl === 'destaque' && (
          <Animated.View
            style={{
              flex: 1,
              paddingVertical: 18,
              transform: [
                {translateX: animationDestaque},
              ],
            }}>
            <Carousel
              data={carouselItems}
              layout="default"
              layoutCardOffset={3}
              sliderWidth={340}
              itemWidth={250}
              renderItem={renderItem}
            />
          </Animated.View>
        )}

        {screenControl === 'proximos' && (
          <Animated.View
            style={{
              width: '100%',
              flex: 1,
              alignItems: 'center',
              backgroundColor: '#333',
              transform: [
                {translateX: animationProximos},
              ],
            }}>
            <View
              style={styles.cardContainer}
            >
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
            </View>
          </Animated.View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#333',
  },
  tabs: {
    width: '100%',
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#333',
  },
  tab: {
    height: 27,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  indicator: {
    width: '100%',
    height: 4,
    borderRadius: 4,
    backgroundColor: '#FF9800',
  },
  main: {
    width: '100%',
    flex: 1,
  },
  cardContainer: {
    width: '90%',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingTop: 18,
  },
  card:  {
    width: (width - 50) / 2,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 14,
    backgroundColor: '#474747',
  },
  textStrong: {
    fontWeight: '800',
    color: '#FFF',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  cardDestaque: {
    width: '100%',
    maxWidth: 300,
    height: 440,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 40,
    paddingVertical: 30,
    paddingHorizontal: 23,
    backgroundColor: '#474747',
  },
  buttonDestaque: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#FF9800',
  },
});
