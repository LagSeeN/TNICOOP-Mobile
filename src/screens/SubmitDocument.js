import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  PermissionsAndroid,
  Alert,
  ScrollView,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

import {AuthContext} from '../components/Context';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';

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

function SubmitDocument({navigation}) {
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [loading, setLoading] = useState(true);

  const {signOut} = useContext(AuthContext);

  useEffect(() => {
    AsyncStorage.getItem('userData').then((data) => {
      data = JSON.parse(data);
      const headers = {Authorization: `Bearer ${data.token}`};
      axios
        .get('/InternshipFiles/user/' + data.userId, {headers})
        .then((response) => {
          //setFilteredDataSource(response.data);
          setMasterDataSource(response.data);
          //console.log(response.data);
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
  }, [loading]);

  const requestReadStoragePermission = async (item) => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'TNI CO-OP ต้องการเข้าถึงพื้นที่จัดเก็บของคุณ',
          message: 'เพื่อที่จะสามารถอัปโหลดเอกสารได้',
          buttonPositive: 'ตกลง',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        uploadfile(item.id);
      } else {
        Alert.alert(
          'ไม่สามารถเลือกไฟล์ได้เนื่องจากไม่มีสิทธิ์เข้าถึง',
          'กรุณาเปิดตั้งค่าแอป แล้วเปิดสิทธิ์การใช้งานที่แอปเรา',
        );
        //console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const uploadfile = async (fileid) => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      RNFetchBlob.fs
        .readFile(res.uri, 'base64')
        .then((file) => {
          AsyncStorage.getItem('userData').then((data) => {
            data = JSON.parse(data);
            const headers = {Authorization: `Bearer ${data.token}`};
            axios
              .put(
                '/InternshipFiles/' + fileid,
                {
                  Id: fileid,
                  File: file,
                  UpdateBy: data.userId,
                },
                {headers},
              )
              .then((response) => {
                // console.log('OK 200');
                setLoading(!loading);
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
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.container}>
        <Text style={{fontSize: 24, color: 'black', fontFamily: 'Prompt-Bold'}}>
          กรุณาเลือกเอกสารที่ต้องการส่ง
        </Text>
        {/* <DropDownPicker
          items={[
            {label: 'เอกสารสมัครสหกิจศึกษา', value: '1'},
            {label: 'เอกสารสหกิจศึกษา', value: '2'},
            {label: 'เอกสารรายงานประจำสัปดาห์', value: '3'},
          ]}
          placeholder={'กรุณาเลือกประเภทเอกสาร'}
          defaultValue={''}
          containerStyle={{height: 40}}
          style={{backgroundColor: '#fafafa', width: 300, borderColor: 'blue'}}
          itemStyle={{
            justifyContent: 'flex-start',
          }}
          dropDownStyle={{backgroundColor: '#fafafa'}}
          arrowColor="blue"
          labelStyle={{color: 'blue'}}
          onChangeItem={(items) =>
            this.setState({
              name: items.value,
            })
          }
        /> */}
        <View
          style={{
            marginTop: 50,
            flexDirection: 'row',
            flex: 1,
            marginBottom: 40,
          }}>
          <FlatList
            contentContainerStyle={{paddingBottom: 20}}
            data={masterDataSource}
            keyExtractor={(index, item) => index.toString() + item}
            ItemSeparatorComponent={ItemSeparatorView}
            renderItem={({item}) => {
              return (
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Text>
                    <TouchableOpacity
                      onPress={() => {
                        Alert.alert(item.fileTypeDesc, item.fileAbout);
                      }}>
                      <Text style={styles.textStyle}>{item.fileTypeDesc}</Text>
                    </TouchableOpacity>
                    {'\n'}
                    <Text style={styles.textStyleInner}>
                      {'สถานะเอกสาร : '}
                      {item.approveStatus == 1 ? (
                        <Text style={{}}>{item.approveStatusDesc}</Text>
                      ) : item.approveStatus == 2 ? (
                        <Text style={{color: '#9d9d9d'}}>
                          {item.approveStatusDesc}
                        </Text>
                      ) : item.approveStatus == 3 ? (
                        <Text style={{color: 'green'}}>
                          {item.approveStatusDesc}
                        </Text>
                      ) : item.approveStatus == 4 ? (
                        <Text style={{color: 'red'}}>
                          {item.approveStatusDesc}
                        </Text>
                      ) : null}
                    </Text>
                  </Text>
                  <View
                    style={{
                      textAlign: 'center',
                      alignItems: 'center',
                      position: 'absolute',
                      marginLeft: 270,
                    }}>
                    {item.approveStatus == 1 || item.approveStatus == 4 ? (
                      <>
                        <TouchableOpacity
                          onPress={() => {
                            requestReadStoragePermission(item);
                          }}>
                          <Text style={styles.uploadStyle}>Upload</Text>
                        </TouchableOpacity>
                      </>
                    ) : null}
                  </View>
                </View>
              );
            }}
            style={{paddingLeft: 30, paddingRight: 30}}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
export default SubmitDocument;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    marginTop: 50,
  },
  textStyle: {
    fontFamily: 'Prompt-Bold',
    color: 'black',
    fontSize: 18,
  },
  textStyleInner: {
    fontSize: 16,
    color: 'black',
    marginTop: 15,
    fontFamily: 'Prompt-Regular',
  },
  uploadStyle: {
    marginTop: 5,
    color: 'blue',
    fontFamily: 'Prompt-Regular',
    borderWidth: 2,
    borderColor: 'blue',
    borderRadius: 7,
    padding: 10,

  },
});
