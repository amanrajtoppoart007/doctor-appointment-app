import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  SafeAreaView,
  Platform,
  Button,
  FlatList,
  Alert,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';

import NavigationHeader1 from '../../../components/NavigationHeaders/NavigationHeader';
import styles from './styles';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Images from '../../../config/images';
import {CATEGORIES} from '../../../data/dummy-data';
import CategoryGridTile from '../../../components/CategoryGridTile';
export default function HomeScreen(props) {
  const [email, setEmail] = useState();

  const test01 = () => {
    // setValue('')
    // Alert.alert(error);
    // props.navigation.navigate('Welcome');
  };
  const renderGridItem = itemData => {
    return (
      <CategoryGridTile
        title={itemData.item.title}
        color={itemData.item.color}
        onSelect={() => {
          props.navigation.navigate('ActvityDetailDr', {
            Title: itemData.item.title,
            specality_id: itemData.item.id,
          });
          // Alert.alert('testid : ' + itemData.item.id);
        }}
      />
    );
  };
  return (
    <SafeAreaView style={styles.safeContainer}>
      <NavigationHeader1
        isShowLocation
        // didTapOnCart
        showCart
        // navigationBackgroundColor={'#d8e3e7'}
        // title={'HOME SCREEN'}
        didTapOnBackButton={() => props.navigation.pop()}
      />
      <View style={styles.container}>
        <View style={styles.box01}>
          <View style={styles.searchbox}>
            <Image
              source={Images.search}
              resizeMode={'contain'}
              style={{
                marginLeft: 15,
                width: 24,
                height: 24,
                tintColor: '#d8e3e7',
              }}
            />
            {/* <Text style={{color: '#d8e3e7', marginLeft: 20, fontSize: 20}}>
              Search here
            </Text> */}
            <TextInput
              style={styles.input}
              placeholder="Search .."
              onChangeText={setEmail}
              value={email}
              autoCapitalize={false}
              //maxLength={6}
            />
          </View>
          <View
            style={{
              backgroundColor: '#0061a8',
              height: 130,
              width: '90%',
              marginTop: 5,
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.6,
              shadowRadius: 3.84,

              elevation: 5,
            }}>
            <Text style={{color: 'white', fontSize: 22}}>
              Take a COVID-19{'\n'}Self Assignment
            </Text>
            <View>
              <Image
                // source={{
                //   uri:
                //     'https://zm.goodinternet.org/media/images/01_About_coronavirus.width-320.png',
                // }}
                source={Images.corona}
                resizeMode={'contain'}
                style={{
                  marginLeft: 15,
                  width: 130,
                  height: 130,
                  tintColor: 'white',
                  opacity: 0.2,
                }}
              />
              {/* <Image
                source={{
                  uri:
                    'https://zm.goodinternet.org/media/images/01_About_coronavirus.width-320.png',
                }}
                resizeMode={'contain'}
                style={{
                  marginLeft: 15,
                  width: 50,
                  height: 50,
                  tintColor: 'white',
                  opacity: 0.7,
                }}
              /> */}
            </View>
          </View>
        </View>

        <View style={styles.box02}>
          <Text style={styles.titleText}> Find Your doctor by speciality</Text>

          <FlatList
            keyExtractor={(item, index) => item.id}
            data={CATEGORIES}
            renderItem={renderGridItem}
            horizontal={true}
            //  numColumns={2}
          />
          <View style={{marginLeft: 20, marginTop: 7}}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('ActiveScreen')}>
              <Text style={styles.titleText01}> View All</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.box03}>
          <View
            style={{
              backgroundColor: '#0061a8',
              height: 120,
              width: '90%',
              marginTop: 10,
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              shadowColor: '#000',
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                fontWeight: '500',
                textAlign: 'center',
              }}>
              God can not come for us all the time{'\n'} that’s why he sent
              doctors for us.
            </Text>
            <View>
              <Image
                source={{
                  uri: 'https://zm.goodinternet.org/media/images/01_About_coronavirus.width-320.png',
                }}
                resizeMode={'contain'}
                style={{
                  width: 140,
                  height: 140,
                  // tintColor: 'white'  ,
                  position: 'absolute',
                  bottom: -10,
                  right: -80,
                  opacity: 0.9,
                }}
              />
              <Image
                source={{
                  uri: 'https://zm.goodinternet.org/media/images/01_About_coronavirus.width-320.png',
                }}
                resizeMode={'contain'}
                style={{
                  width: 130,
                  height: 130,
                  // tintColor: 'white'  ,
                  position: 'absolute',
                  bottom: -105,
                  right: 257,
                  opacity: 0.4,
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
