import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  SectionList,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Icon from 'react-native-ionicons';

import styles from '../Style';

import axios from 'axios';
// import {httpClient} from '../components/HttpClient';

const SearchCompany = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('userToken').then((token) => {
      const headers = {Authorization: `Bearer ${token}`};
      axios
        .get('/Companies', {headers})
        .then((response) => {
          setFilteredDataSource(response.data);
          setMasterDataSource(response.data);
        })
        .catch((error) => {
          console.error(error);
          alert(error);
        });
    });
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
  }, [masterDataSource]);

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const ItemView = ({item}) => {
    return (
      <Text style={styles.itemStyle} onPress={() => showCompanyDetail(item)}>
        {item.name.toUpperCase()}
        {item.position ? (
          <>
            {'\n'}
            <Text>ตำแหน่งงาน: </Text> {item.position}
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
        }}
      />
    );
  };

  /// ทำตรงนี้
  const showCompanyDetail = (item) => {
    // alert(
    //   'Id : ' +
    //     item.id +
    //     ' name : ' +
    //     item.name +
    //     ' description : ' +
    //     item.description,
    // );
    navigation.navigate('CompanyProfile', {
      id: item.id,
      name: item.name,
      description: item.description,
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.inputIcon}>
            <Icon name="search" style={styles.ImageIconStyle} />
            <TextInput
              style={styles.textInput}
              placeholder="ค้นหาบริษัท"
              onChangeText={(text) => searchFilterFunction(text)}
              value={search}
              underlineColorAndroid="transparent"
            />
          </View>

          <View style={styles.inputIcon}>
            <Icon name="search" style={styles.ImageIconStyle} />
            <TextInput
              style={styles.textInput}
              placeholder="ตำแหน่งงาน"
              underlineColorAndroid="transparent"
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('CompanyProfile');
          }}>
          <Text style={styles.searchBtn}>ค้นหา</Text>
        </TouchableOpacity>

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
        <FlatList
          data={filteredDataSource}
          keyExtractor={(index, item) => index.toString() + item}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />
      </View>
    </SafeAreaView>
  );
};

export default SearchCompany;
