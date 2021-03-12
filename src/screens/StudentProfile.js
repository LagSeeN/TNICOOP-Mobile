import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Modal,
  StyleSheet,
} from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';

import DatePicker from 'react-native-date-picker';

import Icon from 'react-native-vector-icons/FontAwesome';

import styles from '../Style';

import {AuthContext} from '../components/Context';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StudentProfile = ({navigation}) => {
  const [showModal, setShowModal] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const [date, setDate] = useState(new Date());
  const time = date.toTimeString().split(' ', 1).join(' ');

  const [masterDataSource, setMasterDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const [studentList, setStudentList] = useState([]);
  const [studentDetail, setStudentDetail] = useState([]);

  const {signOut} = useContext(AuthContext);

  useEffect(() => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    setCurrentDate(date + '/' + month + '/' + year);

    AsyncStorage.getItem('userData').then((data) => {
      data = JSON.parse(data);
      const headers = {Authorization: `Bearer ${data.token}`};
      axios
        .get('/Users/advisee/' + data.userId, {headers})
        .then((response) => {
          var students = [];
          response.data.forEach((element) => {
            var student = {
              label:
                element.userName +
                ' ' +
                element.firstName +
                ' ' +
                element.lastName,
              value: element.userId,
            };
            //console.log(student);
            students.push(student);
          });
          setStudentList(students);
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

  const fileApprove = (item, status) => {
    AsyncStorage.getItem('userData').then((data) => {
      data = JSON.parse(data);
      const headers = {Authorization: `Bearer ${data.token}`};
      axios
        .post(
          '/InternshipFiles/approve',
          {
            Id: item.id,
            UpdateBy: data.userId,
            ApproveStatus: status,
          },
          {headers},
        )
        .then((response) => {
          //console.log('OK 200');
          alert(response.data.message);
          axios
            .get('/InternshipFiles/user/' + item.userId, {headers})
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
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={{marginTop: 20}}>
          <DropDownPicker
            // items={[
            //   {label: 'นักศึกษา1', value: '1'},
            //   {label: 'นักศึกษา2', value: '2'},
            //   {label: 'นักศึกษา3', value: '3'},
            // ]}
            items={studentList}
            placeholder={'ชื่อ - นามสกุลนักศึกษา'}
            defaultValue={''}
            containerStyle={{height: 40}}
            style={{
              backgroundColor: '#fafafa',
              width: 350,
              borderColor: 'black',
            }}
            itemStyle={{
              justifyContent: 'flex-start',
            }}
            arrowColor="black"
            labelStyle={{color: 'black'}}
            dropDownStyle={{backgroundColor: '#fafafa'}}
            onChangeItem={(items) => {
              AsyncStorage.getItem('userData').then((data) => {
                data = JSON.parse(data);
                const headers = {Authorization: `Bearer ${data.token}`};
                axios
                  .get('/InternshipDetails/' + items.value, {headers})
                  .then((response) => {
                    //setFilteredDataSource(response.data);
                    //setMasterDataSource(response.data);
                    //console.log(response.data);

                    var student = {
                      name:
                        response.data.firstName + ' ' + response.data.lastName,
                      companyName: response.data.companyName,
                      examineDate: response.data.examineDate,
                      userId: items.value,
                    };
                    setStudentDetail(student);
                    setDate(
                      response.data.examineDate === '0001-01-01T00:00:00'
                        ? new Date()
                        : new Date(response.data.examineDate),
                    );
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

                axios
                  .get('/InternshipFiles/user/' + items.value, {headers})
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
            }}
          />
        </View>

        <View style={{marginTop: 20, flexDirection: 'row'}}>
          <Text style={styles.titleText}>
            ชื่อ{' '}
            <Text style={{fontWeight: 'normal', color: 'black'}}>
              {studentDetail.name}
            </Text>
          </Text>
        </View>

        <View style={{marginTop: 20, flexDirection: 'row'}}>
          <Text style={styles.titleText}>
            ชื่อบริษัท{' '}
            <Text style={{fontWeight: 'normal', color: 'black'}}>
              {studentDetail.companyName}
            </Text>
          </Text>
        </View>

        <View style={{marginTop: 20, flexDirection: 'row'}}>
          <Text style={[styles.titleText, {width: 100, flex: 0}]}>
            วันที่สอบ
          </Text>
          <View style={{textAlign: 'left', flex: 1}}>
            {studentDetail.userId ? (
              <TouchableOpacity
                onPress={() => {
                  setShowModal(!showModal);
                }}>
                <Text style={styles.dateStyle}>
                  {date.toDateString()}
                  {'\n'}
                  {time}
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>

          {/* modal */}
          <Modal animationType="fade" transparent={true} visible={showModal}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={{alignItems: 'center'}}>
                  <DatePicker
                    date={date}
                    onDateChange={setDate}
                    androidVariant="nativeAndroid"
                  />
                  <TouchableOpacity
                    onPress={() => {
                      setShowModal(!showModal);
                      AsyncStorage.getItem('userData').then((data) => {
                        data = JSON.parse(data);
                        const headers = {
                          Authorization: `Bearer ${data.token}`,
                        };
                        console.log(studentDetail.userId, date);
                        axios
                          .post(
                            '/InternshipDetails/SetExamineDate',
                            {
                              studentId: studentDetail.userId,
                              examineDate: date,
                            },
                            {headers},
                          )
                          .then((response) => {})
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
                    }}>
                    <Text style={styles.modalButton}>เลือกวันที่</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          {/* end modal */}
        </View>

        <Text
          style={{
            marginTop: 30,
            marginRight: 30,
            textAlign: 'right',
            alignSelf: 'stretch',
            color: 'blue',
          }}>
          ยืนยันเอกสาร
        </Text>

        <View style={{marginTop: 20, flexDirection: 'row'}}>
          <FlatList
            // data={[
            //   {
            //     type: 'CO-01',
            //     status: 'สถานะเอกสาร : รอการยืนยัน',
            //     icon1: <Icon name="check-circle" size={30} color="green" />,
            //     icon2: <Icon name="times-circle" size={30} color="red" />,
            //   },
            //   {
            //     type: 'CO-02',
            //     status: 'สถานะเอกสาร : ส่งแล้ว',
            //     icon1: <Icon name="check-circle" size={30} color="green" />,
            //     icon2: <Icon name="times-circle" size={30} color="red" />,
            //   },
            //   {
            //     type: 'CO-03',
            //     status: 'สถานะเอกสาร : ส่งแล้ว',
            //     icon1: <Icon name="check-circle" size={30} color="green" />,
            //     icon2: <Icon name="times-circle" size={30} color="red" />,
            //   },
            //   {
            //     type: 'CO-04',
            //     status: 'สถานะเอกสาร : รอการยืนยัน',
            //     icon1: <Icon name="check-circle" size={30} color="green" />,
            //     icon2: <Icon name="times-circle" size={30} color="red" />,
            //   },
            // ]}
            data={masterDataSource}
            keyExtractor={(index, item) => index.toString() + item}
            ItemSeparatorComponent={ItemSeparatorView}
            renderItem={({item}) => {
              return (
                <View style={{flexDirection: 'row'}}>
                  <Text>
                    <Text style={{fontWeight: 'bold'}}>
                      {item.fileTypeDesc}
                    </Text>
                    {'\n'}
                    <Text>{'สถานะเอกสาร : ' + item.approveStatusDesc}</Text>
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      position: 'absolute',
                      marginLeft: 230,
                    }}>
                    {item.approveStatus == 2 ? (
                      <>
                        <TouchableOpacity
                          style={{}}
                          onPress={() => {
                            fileApprove(item, 3);
                          }}>
                          <Text>
                            <Icon name="check-circle" size={30} color="green" />
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{marginLeft: 10}}
                          onPress={() => {
                            fileApprove(item, 4);
                          }}>
                          <Text>
                            <Icon name="times-circle" size={30} color="red" />
                          </Text>
                        </TouchableOpacity>
                      </>
                    ) : (
                      <View style={{marginLeft: 60}}></View>
                    )}

                    {item.approveStatus != 1 ? (
                      <>
                        <TouchableOpacity
                          style={{marginLeft: 10}}
                          onPress={() => {
                            navigation.navigate('ShowPdf', {
                              id: item.id,
                            });
                          }}>
                          <Text>
                            <Icon name="file-o" size={30} color="black" />
                          </Text>
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
};

export default StudentProfile;
