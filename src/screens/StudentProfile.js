import React, {useState, useEffect} from 'react';
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

import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const StudentProfile = ({navigation}) => {
  const [showModal, setShowModal] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const [date, setDate] = useState(new Date());
  const time = date.toTimeString().split(' ', 1).join(' ');

  useEffect(() => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    setCurrentDate(date + '/' + month + '/' + year);
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

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={{marginTop: 20}}>
          <DropDownPicker
            items={[
              {label: 'นักศึกษา1', value: '1'},
              {label: 'นักศึกษา2', value: '2'},
              {label: 'นักศึกษา3', value: '3'},
            ]}
            placeholder={'ชื่อ - นามสกุลนักศึกษา'}
            defaultValue={''}
            containerStyle={{height: 40}}
            style={{
              backgroundColor: '#fafafa',
              width: 300,
              borderColor: 'blue',
            }}
            itemStyle={{
              justifyContent: 'flex-start',
            }}
            arrowColor="blue"
            labelStyle={{color: 'blue'}}
            dropDownStyle={{backgroundColor: '#fafafa'}}
            onChangeItem={(items) =>
              this.setState({
                name: items.value,
              })
            }
          />
        </View>

        <View style={{marginTop: 20, flexDirection: 'row'}}>
          <Text style={styles.titleText}>ชื่อ-นามสกุลนักศึกษา</Text>
        </View>

        <View style={{marginTop: 20, flexDirection: 'row'}}>
          <Text style={styles.titleText}>ชื่อบริษัท</Text>
        </View>

        <View style={{marginTop: 20, flexDirection: 'row'}}>
          <Text style={styles.titleText}>วันที่สอบ</Text>
          <View style={{textAlign: 'left', marginRight: 30, flex: 1}}>
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
            data={[
              {
                type: 'CO-01',
                status: 'สถานะเอกสาร : รอการยืนยัน',
                icon1: <Icon name="check-circle" size={30} color="green" />,
                icon2: <Icon name="times-circle" size={30} color="red" />,
              },
              {
                type: 'CO-02',
                status: 'สถานะเอกสาร : ส่งแล้ว',
                icon1: <Icon name="check-circle" size={30} color="green" />,
                icon2: <Icon name="times-circle" size={30} color="red" />,
              },
              {
                type: 'CO-03',
                status: 'สถานะเอกสาร : ส่งแล้ว',
                icon1: <Icon name="check-circle" size={30} color="green" />,
                icon2: <Icon name="times-circle" size={30} color="red" />,
              },
              {
                type: 'CO-04',
                status: 'สถานะเอกสาร : รอการยืนยัน',
                icon1: <Icon name="check-circle" size={30} color="green" />,
                icon2: <Icon name="times-circle" size={30} color="red" />,
              },
            ]}
            keyExtractor={(index, item) => index.toString() + item}
            ItemSeparatorComponent={ItemSeparatorView}
            renderItem={({item}) => {
              return (
                <View style={{flexDirection: 'row'}}>
                  <Text>
                    <Text>{item.type}</Text>
                    {'\n'}
                    <Text>{item.status}</Text>
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      position: 'absolute',
                      marginLeft: 230,
                    }}>
                    <TouchableOpacity style={{}}>
                      <Text>{item.icon1}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft: 10}}>
                      <Text>{item.icon2}</Text>
                    </TouchableOpacity>
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
