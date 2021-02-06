import AsyncStorage from '@react-native-community/async-storage';
import * as React from 'react';
import { useContext, useState } from 'react';
import { Text, View ,StyleSheet,TouchableOpacity, Dimensions, SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {AuthContext} from '../components/Context';

export default function MainScreen({navigation}){
  const [userData, setUserData] = useState({});
  AsyncStorage.getItem("userData")
    .then((data) => {
      setUserData(JSON.parse(data))
    });

  const DeviceWidth = Dimensions.get('window').width

  const { signOut } = useContext(AuthContext);
  
    return (
        <SafeAreaView style={styles.container}>
          <View style={styles.container}>
            <View style ={{ flex : 1}}>
          <View style={styles.heading}>
            <Text style={styles.headingText}>
              {userData.firstname} {userData.lastname}
            </Text>
            <Text style={styles.headingTextTestDate}>
              วันสอบ 29 กุมภาพันธ์ 2561
            </Text>
            </View>
            <View style={styles.menu}>
                <TouchableOpacity
                  style={styles.item}
                  onPress={() =>navigation.navigate("UserProfile")}
                  >
                    <Icon name="user" size={60} color="blue"/>  
                  <Text style={styles.itemTitle}>
                    ข้อมูลผู้ใช้
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.item}
                  onPress={() =>navigation.navigate("SearchCompany")}
                  >
                    <Icon name="building" size={60} color="blue"/>  
                  <Text style={styles.itemTitle}>
                    รายชื่อบริษัท
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.item}>
                    <Icon name="copy" size={60} color="blue"/> 
                  <Text style={styles.itemTitle}>
                    ส่งเอกสาร
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.item}
                  onPress={() =>navigation.navigate("Contact")}
                  >
                    <Icon name="phone" size={60} color="blue"/> 
                  <Text style={styles.itemTitle}>
                    ติดต่อ
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.item}
                  onPress={() => 
                    {
                      setUserData({});
                      signOut();
                    }
                  }
                  >
                    <Icon name="sign-out" size={60} color="blue"/> 
                  <Text style={styles.itemTitle}>
                    ออกจากระบบ
                  </Text>
                </TouchableOpacity>
                </View>
                </View>
{/* 
                <View style = {styles.footer}>
                <TouchableOpacity
                  style={styles.footerItem}>
                    <Icon name="home" size={45} color="white"/> 
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.footerItem}>
                    <Icon name="question-circle" size={45} color="white"/> 
                </TouchableOpacity>
                </View> */}
                </View>
        </SafeAreaView>
    )
};
    
    var styles = StyleSheet.create({
       container:{
          flex: 1,
          flexDirection: 'column',
          alignItems: 'stretch',
          backgroundColor: 'white'
        },
        heading:{
          height: 130,
          backgroundColor: 'blue'
        },
        headingText:{
          marginLeft: 60,
          marginTop: 50,
          fontSize: 20,
          fontWeight: "bold",
          color: 'white'
        },
        headingTextTestDate:{
          marginLeft: 60,
          marginTop: 10,
          fontSize: 14,
          fontWeight: "bold",
          color: 'white'
        },
        menu: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop: 100,
        },
        item: {
            width: Dimensions.get('window').width * 0.33,
            height: 100,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 50     
        },
        itemTitle: {
            marginTop: 10,
            color: 'blue'
        },
        // footer: {
        //   flexDirection: 'row',
        //     flexWrap: 'wrap',
        //     marginTop: 100,
        // },
        // footerItem:{
        //     width: Dimensions.get('window').width * 0.50,
        //     height: 80,
        //     alignItems: 'center',
        //     justifyContent: 'center',
        //     backgroundColor: 'blue'      
        // },
    });