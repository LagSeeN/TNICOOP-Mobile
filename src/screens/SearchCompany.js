import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';

import {AuthContext} from '../components/Context';

import AsyncStorage from '@react-native-async-storage/async-storage';

// import Icon from 'react-native-ionicons';

import Icon from 'react-native-vector-icons/FontAwesome';

import styles from '../Style';

import axios from 'axios';
// import {httpClient} from '../components/HttpClient';

const SearchCompany = ({navigation}) => {
  const [searchName, setSearchName] = useState('');
  const [searchPos, setSearchPos] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [permission, setpermission] = useState('');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      AsyncStorage.getItem('userData').then((data) => {
        data = JSON.parse(data);
        setpermission(data.permission);
        const headers = {Authorization: `Bearer ${data.token}`};
        axios
          .get('/Companies/', {headers})
          .then((response) => {
            setFilteredDataSource(response.data);
            setMasterDataSource(response.data);
          })
          .catch((error) => {
            if (error.response.status == '401') {
              alert('Session หมดอายุ');
              signOut();
            } else {
              console.error(error);
              alert(error);
            }
          });
      });
      //console.log('useEffect Re-run');
    });
    return unsubscribe;
    // console.log(masterDataSource);
    // httpClient
    //   .get("Companies")
    //   .then((response) => {
    //           setFilteredDataSource(response.data);
    //           setMasterDataSource(response.data);
    //         })
    //         .catch((error) => {
    //           console.error(error);
    //           alert(error);
    //         });
  }, [navigation]);

  const {signOut} = useContext(AuthContext);

  const searchNameFilterFunction = (text) => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearchName(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearchName(text);
    }
  };

  const searchPosFilterFunction = (text) => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.position
          ? item.position.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearchPos(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearchPos(text);
    }
  };

  const ItemView = ({item}) => {
    return (
      <Text style={styles.itemStyle} onPress={() => showCompanyDetail(item)}>
        <Text style={{fontSize: 18, fontFamily: 'Prompt-Bold'}}>
          {item.name.toUpperCase()}
        </Text>

        {item.position ? (
          <>
            {'\n'}
            <Text style={{fontSize: 16, fontFamily: 'Prompt-Regular'}}>
              ตำแหน่งงาน:{' '}
            </Text>
            <Text style={{fontSize: 16, fontFamily: 'Prompt-Regular'}}>
              {item.position}
            </Text>
          </>
        ) : null}
      </Text>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
          marginVertical: 10,
        }}
      />
    );
  };

  const showCompanyDetail = (item) => {
    navigation.navigate('CompanyProfile', {
      id: item.id,
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={{flexDirection: 'row',marginTop: 5}}>
          <View style={styles.inputIcon}>
            <Icon name="search" style={styles.ImageIconStyle} />
            <TextInput
              style={styles.textInput}
              placeholder="ค้นหาบริษัท"
              onChangeText={(text) => searchNameFilterFunction(text)}
              value={searchName}
              underlineColorAndroid="transparent"
            />
          </View>

          <View style={styles.inputIcon}>
            <Icon name="search" style={styles.ImageIconStyle} />
            <TextInput
              style={styles.textInput}
              placeholder="ตำแหน่งงาน"
              onChangeText={(text) => searchPosFilterFunction(text)}
              value={searchPos}
              underlineColorAndroid="transparent"
            />
          </View>
        </View>
        <View style={styles.searchBtnLeftandRight}>
          {permission == 3 || permission == 4 ? (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('AddEditCompany', {
                  id: null,
                  mode: 'Add',
                });
              }}>
              <Text style={styles.searchBtn}>เพิ่ม</Text>
            </TouchableOpacity>
          ) : null}

          <TouchableOpacity
            onPress={() => {
              if (searchName != '' || searchPos != '') {
                AsyncStorage.getItem('userData').then((data) => {
                  data = JSON.parse(data);
                  const headers = {Authorization: `Bearer ${data.token}`};
                  axios
                    .post(
                      '/Companies/search',
                      {name: searchName, position: searchPos},
                      {headers},
                    )
                    .then((response) => {
                      //setMasterDataSource(response.data);
                      navigation.navigate('CompanyProfile', {
                        id: response.data[0].id,
                      });
                      //console.log(response.data[0].id);
                    })
                    .catch((error) => {
                      if (error.response.status == '404') {
                        alert('ไม่พบข้อมูลดังเกล่า');
                      } else {
                        console.error(error);
                        alert(error);
                      }
                    });
                });
              } else {
                return;
              }
            }}>
            <Text style={styles.searchBtnLeft}>ค้นหา</Text>
          </TouchableOpacity>
        </View>

        {/* <SectionList
          sections={DATA}
          keyExtractor={(item,index)=>item+index}
          renderItem={({ item }) => (
            <Text style={styles.listItem}>{item}</Text>)}
          renderSectionHeader={({ section: { name } }) => (
            <Text style={styles.listHeader}>{name}</Text>
          )}
        /> */}

        {/* 
        
          แก้ตรงนี้นะ

          ปัญหาที่พบ ข้อความชื่อบริษัทแสดงอยู่ตรงกลางหน้าจอเสมอ
        
        */}
        <View style={{flex: 1, marginBottom: 40}}>
          <FlatList
            data={filteredDataSource}
            keyExtractor={(index, item) => index.toString() + item}
            ItemSeparatorComponent={ItemSeparatorView}
            renderItem={ItemView}
            style={{paddingLeft: 20, paddingRight: 20}}
            contentContainerStyle={{width: 370, paddingBottom: 20}}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SearchCompany;
