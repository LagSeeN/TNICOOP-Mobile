import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
// import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {AuthContext} from '../components/Context';

export default function CompanyProfile({navigation, route}) {
  // console.warn(navigation);
  // const [companyId, setCompanyId] = useState(props.params.companyId);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [permission, setpermission] = useState('');

  const {signOut} = React.useContext(AuthContext);

  useEffect(() => {
    AsyncStorage.getItem('userData').then((data) => {
      data = JSON.parse(data);
      setpermission(data.permission);
      const headers = {Authorization: `Bearer ${data.token}`};
      axios
        .get('/Companies/' + route.params.id, {headers})
        .then((response) => {
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
  }, []);

  return (
    <ScrollView>
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
        {permission == 3 || permission == 4 ? (
          <>
            <View style={styles.textView}>
              <View style={styles.fixToText}>
                <TouchableOpacity
                  style={[styles.buttonStyle, {backgroundColor: '#3366FF'}]}
                  onPress={() => {
                    navigation.navigate('AddEditCompany', {
                      id: masterDataSource.id,
                      mode: 'Edit',
                    });
                  }}>
                  <Text style={styles.buttonText}>แก้ไข</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.buttonStyle, {backgroundColor: 'red'}]}
                  onPress={() => {
                    Alert.alert(
                      'ลบ',
                      'คุณต้องการลบ ' + masterDataSource.name + ' หรือไม่',
                      [
                        {
                          text: 'ยกเลิก',
                          style: 'cancel',
                        },
                        {
                          text: 'ตกลง',
                          onPress: () => {
                            AsyncStorage.getItem('userData').then((data) => {
                              data = JSON.parse(data);
                              const headers = {
                                Authorization: `Bearer ${data.token}`,
                              };
                              axios
                                .delete('/Companies/' + masterDataSource.id, {
                                  headers,
                                })
                                .then((response) => {
                                  //alert(response.data);
                                  alert('ลบข้อมูลสำเร็จ');
                                  navigation.goBack();
                                })
                                .catch((error) => {
                                  console.error(error);
                                  alert(error);
                                });
                            });
                          },
                        },
                      ],
                      {cancelable: false},
                    );
                  }}>
                  <Text style={styles.buttonText}>ลบ</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        ) : null}
      </SafeAreaView>
    </ScrollView>
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
    fontFamily: 'Prompt-Bold',
  },
  textView: {
    marginLeft: 50,
  },
  textStyle: {
    fontFamily: 'Prompt-Bold',
    fontSize: 16,
    color: 'blue',
    marginBottom: 15,
  },
  textStyleInner: {
    fontSize: 16,
    color: 'blue',
    marginBottom: 20,
    fontFamily: 'Prompt-Regular'
  },
  lineStyle: {
    borderWidth: 0.5,
    borderColor: 'blue',
    marginRight: 50,
    marginBottom: 15,
  },
  textView: {
    marginLeft: 30,
    marginRight: 30,
  },
  buttonStyle: {
    height: 40,
    width: 90,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Prompt-Regular'
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 40,
  },
});
