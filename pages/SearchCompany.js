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

import Icon from 'react-native-ionicons';

import styles from '../Style';

const SearchCompany = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
    fetch('https://yostem.ddns.net:8393/api/Companies', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJTeXN0ZW0iLCJlbWFpbCI6Im1vcy5wb3AyQGdtYWlsLmNvbSIsImdpdmVuX25hbWUiOiIiLCJmYW1pbHlfbmFtZSI6IiIsIlVzZXJJZCI6IjEiLCJVc2VyVHlwZSI6IjEiLCJqdGkiOiIyMTNiNzI2ZC0wZjBkLTQ0MzEtYmQ0OS1hNjgxMDg3MTQ1ODkiLCJleHAiOjE2MTI0NDkzMjYsImlzcyI6Illvc3NhcG9uIEphbnRhcm90ZSAoVE5JQ09PUENvcmUpIiwiYXVkIjoiWW9zc2Fwb24gSmFudGFyb3RlIChUTklDT09QQ29yZSkifQ.Du5PSuMQwvdGHd9QI4zSI0j07QLp7J0rO7iBdZb1X2Q',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setFilteredDataSource(responseJson);
        setMasterDataSource(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
      <Text style={styles.itemStyle} onPress={() => getItem(item)}>
        {item.name.toUpperCase()}
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

  const getItem = (item) => {
    alert(
      'Id : ' +
        item.id +
        ' name : ' +
        item.name +
        ' description : ' +
        item.description,
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.inputIcon}>
            <Icon name="search" style={styles.ImageIconStyle}/>
            <TextInput
              style={styles.textInput}
              placeholder="ค้นหาบริษัท"
              onChangeText={(text) => searchFilterFunction(text)}
              value={search}
              underlineColorAndroid="transparent"
            />
          </View>

          <View style={styles.inputIcon}>
            <Icon name="search" style={styles.ImageIconStyle}/>
            <TextInput
              style={styles.textInput}
              placeholder="ตำแหน่งงาน"
              underlineColorAndroid="transparent"
            />
          </View>
        </View>

        <TouchableOpacity>
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
