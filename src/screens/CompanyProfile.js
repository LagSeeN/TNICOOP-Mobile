import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, SafeAreaView} from 'react-native';
// import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

export default function CompanyProfile({navigation, route}) {
  // console.warn(navigation);
  // const [companyId, setCompanyId] = useState(props.params.companyId);
  const [masterDataSource, setMasterDataSource] = useState([]);
  useEffect(() => {
    AsyncStorage.getItem('userToken').then((token) => {
      const headers = {Authorization: `Bearer ${token}`};
      axios
        .get('/Companies/' + route.params.id, {headers})
        .then((response) => {
          setMasterDataSource(response.data);
        })
        .catch((error) => {
          console.error(error);
          alert(error);
        });
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.headingText}>{masterDataSource.name}</Text>
      </View>

      <View style={styles.textView}>
        <Text style={styles.textStyle}>รายละเอียดบริษัท</Text>
        <Text style={styles.textStyleInner}>
          {masterDataSource.description}
        </Text>
        <View style={styles.lineStyle}></View>
        <Text style={styles.textStyle}>ตำแหน่งงาน</Text>
        <Text style={styles.textStyleInner}>{masterDataSource.position}</Text>
        <View style={styles.lineStyle}></View>
        <Text style={styles.textStyle}>ที่อยู่</Text>
        <Text style={styles.textStyleInner}>{masterDataSource.address}</Text>
        <View style={styles.lineStyle}></View>
        <Text style={styles.textStyle}>สวัสดิการ</Text>
        <Text style={styles.textStyleInner}>{masterDataSource.welfare}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  heading: {
    marginTop: 70,
    marginBottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingText: {
    fontSize: 24,
    color: 'blue',
    fontWeight: 'bold',
  },
  textView: {
    marginLeft: 50,
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'blue',
    marginBottom: 15,
  },
  textStyleInner: {
    fontSize: 16,
    color: 'blue',
    marginBottom: 20,
  },
  lineStyle: {
    borderWidth: 0.5,
    borderColor: 'blue',
    marginRight: 50,
    marginBottom: 15,
  },
});
