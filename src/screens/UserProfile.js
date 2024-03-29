import * as React from 'react';
import {Text, View, StyleSheet, SafeAreaView, ActivityIndicator} from 'react-native';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../components/Context';

export default function UserProfile({navigation}) {
  const [userProfile, setUserProfile] = React.useState({});
  const [userData, setUserData] = React.useState({});
  const [loading, setLoading] = React.useState(true)

  const {signOut} = React.useContext(AuthContext);

  React.useEffect(() => {
    AsyncStorage.getItem('userData').then((data) => {
      data = JSON.parse(data);
      setUserData(data);
      const headers = {Authorization: `Bearer ${data.token}`};
      axios
        .get('/Users/' + data.userId, {headers})
        .then((response) => {
          setUserProfile(response.data);
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
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (<>
          <View
            style={[
              {flex: 1, justifyContent: 'center'},
              {
                flexDirection: 'row',
                justifyContent: 'space-around',
                padding: 10,
              },
            ]}>
            <ActivityIndicator size="large" color="#3366FF" />
          </View>
        </>):(<View style={styles.textView}>
        <Text style={styles.textSpace}>
          <Text style={styles.textStyle}>ชื่อ-นามสกุล</Text>
          <Text style={styles.textStyleInner}>
            {' '}
            {userProfile.firstName} {userProfile.lastName}
          </Text>
        </Text>
        <Text style={styles.textSpace}>
          <Text style={styles.textStyle}>อีเมล</Text>
          <Text style={styles.textStyleInner}> {userProfile.email}</Text>
        </Text>
        {userProfile.userTypeName == 'Student' ? (
          <>
            <Text style={styles.textSpace}>
              <Text style={styles.textStyle}>รหัสนักศึกษา</Text>
              <Text style={styles.textStyleInner}> {userProfile.userName}</Text>
            </Text>
            <Text style={styles.textSpace}>
              <Text style={styles.textStyle}>คณะ</Text>
              <Text style={styles.textStyleInner}>
                {' '}
                {userProfile.facultyName
                  ? userProfile.facultyName
                  : '(ไม่มีข้อมูล)'}
              </Text>
            </Text>
            <Text style={styles.textSpace}>
              <Text style={styles.textStyle}>สาขา</Text>
              <Text style={styles.textStyleInner}>
                {' '}
                {userProfile.programName
                  ? userProfile.programName
                  : '(ไม่มีข้อมูล)'}
              </Text>
            </Text>
            <Text style={styles.textStyle}>บริษัทที่สหกิจศึกษา</Text>
            <Text style={styles.textStyleInner}>
              {userProfile.companyName
                ? userProfile.companyName
                : '(ไม่พบบริษัทที่สหกิจศึกษาในระบบ)'}
            </Text>
            <Text style={styles.textStyle}>อาจารย์ที่ปรึกษาสหกิจศึกษา</Text>
            <Text style={styles.textStyleInner}>
              {userProfile.adviserName
                ? userProfile.adviserName
                : '(ไม่พบข้อมูลอาจารย์ที่ปรึกษาในระบบ)'}
            </Text>
          </>
        ) : (
          <>
            <Text style={styles.textStyle}>สิทธิ์การใช้งาน</Text>
            <Text style={styles.textStyleInner}>
              {userProfile.userTypeName == 'Teacher'
                ? 'อาจารย์ที่ปรึกษา'
                : 'เจ้าหน้าที่ศูนย์สหกิจศึกษา'}
            </Text>
          </>
        )}
      </View>)}

{/*       <View style={styles.heading}>
        <Text style={styles.headingText}>ข้อมูลผู้ใช้</Text>
      </View> */}

      
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
    color: '#3366FF',
    fontFamily: 'Prompt-Bold'
  },
  textView: {
    marginLeft: 50,
    marginTop: 80
  },
  textSpace: {
    marginBottom: 20,
  },
  textStyle: {
    fontFamily: 'Prompt-Bold',
    fontSize: 18,
    color: '#3366FF',
    marginBottom: 15,
  },
  textStyleInner: {
    fontSize: 18,
    color: 'black',
    marginBottom: 20,
    fontFamily: 'Prompt-Regular'
  },
});
