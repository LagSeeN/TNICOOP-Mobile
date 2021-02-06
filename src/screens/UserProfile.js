import * as React from 'react';
import { Text, View ,StyleSheet, SafeAreaView} from 'react-native';

import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export default function UserProfile({navigation}){
    const [userProfile, setUserProfile] = React.useState({})

    React.useEffect(() => {
        AsyncStorage.getItem('userData').then((data) => {
            data = JSON.parse(data);
          const headers = {Authorization: `Bearer ${data.token}`};
          axios
            .get('/Users/' + data.userId, {headers})
            .then((response) => {
                setUserProfile(response.data);
                console.log(response.data);
            })
            .catch((error) => {
              console.error(error);
              alert(error);
            });
        });
      }, []);

    return (
        <SafeAreaView style={styles.container}>
          
          <View style = {styles.heading}>
            <Text style = {styles.headingText}>
              ข้อมูลผู้ใช้
            </Text>
          </View>
            
          <View style = {styles.textView}>
            <Text style = {styles.textSpace}>
              <Text style = {styles.textStyle}>
              ชื่อ-นามสกุล
              </Text>
              <Text style = {styles.textStyleInner}>    {userProfile.firstName} {userProfile.lastName}
              </Text>
            </Text>
            <Text style = {styles.textSpace}>
              <Text style = {styles.textStyle}>
              รหัสนักศึกษา
              </Text>
              <Text style = {styles.textStyleInner}>    60121062-8
              </Text>
            </Text>
            <Text style = {styles.textSpace}>
              <Text style = {styles.textStyle}>
              คณะ
              </Text>
              <Text style = {styles.textStyleInner}>    {userProfile.facultyName ? userProfile.facultyName : "(ไม่มีข้อมูล)"}
              </Text>
            </Text>
            <Text style = {styles.textSpace}>
              <Text style = {styles.textStyle}>
              สาขา
              </Text>
              <Text style = {styles.textStyleInner}>    {userProfile.programName ? userProfile.programName : "(ไม่มีข้อมูล)"}
              </Text>
            </Text>
            <Text style = {styles.textSpace}>
              <Text style = {styles.textStyle}>
              อีเมล
              </Text>
              <Text style = {styles.textStyleInner}>    {userProfile.email}
              </Text>
            </Text>
            {userProfile.companyName ? (
                <>
                <Text style = {styles.textStyle}>
                บริษัทที่สหกิจศึกษา
                </Text>
                <Text style = {styles.textStyleInner}>
                {userProfile.companyName}
                </Text> 
                </>): null
            }
            { userProfile.adviserName ? (
                <>
                <Text style = {styles.textStyle}>
                อาจารย์ที่สหกิจศึกษา
                </Text>
                <Text style = {styles.textStyleInner}>
                { userProfile.adviserName}
                </Text>
                </>): null
            }
          </View>
        </SafeAreaView>
    )
};
    
    const styles = StyleSheet.create({
       container:{
          flex: 1,
          backgroundColor: 'white'
        },
        heading:{
          marginTop: 70,
          marginBottom:50,
          justifyContent:'center',
          alignItems:'center',
        },
        headingText:{
          fontSize: 24,
          color:'blue',
          fontWeight:'bold'
        },
        textView:{
          marginLeft: 50
        },
        textSpace:{
          marginBottom:20,
        },
        textStyle:{
          fontWeight: 'bold',
          fontSize: 18,
          color: 'blue',
          marginBottom:15
        },
        textStyleInner:{
          fontSize: 18,
          color: 'blue',
          marginBottom: 20,
        },
    });