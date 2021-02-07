import React, {useState, useEffect} from 'react';
import { Text, View ,StyleSheet, SafeAreaView} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function CompanyProfile({navigation}){
    console.warn(navigation);
    //const [companyId, setCompanyId] = useState(props.params.companyId);
    return (
        <SafeAreaView style={styles.container}>
          
          <View style = {styles.heading}>
            <Text style = {styles.headingText}>
              A-HOST Company Limited
            </Text>
          </View>
          
          <View style = {styles.textView}>
            <Text style = {styles.textStyle}>
              รายละเอียดบริษัท
            </Text>
            <Text style = {styles.textStyleInner}>
              ให้บริการด้าน ERP และ ผลิตภัณฑ์ Oracle
            </Text>
            <View style = {styles.lineStyle}></View>
            <Text style = {styles.textStyle}>
              ตำแหน่งงาน
            </Text>
            <Text style = {styles.textStyleInner}>
              Programmer, Software Engineer
            </Text>
            <View style = {styles.lineStyle}></View>
            <Text style = {styles.textStyle}>
              ที่อยู่
            </Text>
            <Text style = {styles.textStyleInner}>
              979, 52-55 ถ.พหลโยธิน แขวงพญาไท เขตพญาไท {'\n'}กรุงเทพมหานคร 10400
            </Text>
            <View style = {styles.lineStyle}></View>
            <Text style = {styles.textStyle}>
              สวัสดิการ
            </Text>
            <Text style = {styles.textStyleInner}>
              เบี้ยเลี้ยง 3,500/เดือน
            </Text>
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
        textStyle:{
          fontWeight: 'bold',
          fontSize: 16,
          color: 'blue',
          marginBottom:15
        },
        textStyleInner:{
          fontSize: 16,
          color: 'blue',
          marginBottom: 20,
        },
        lineStyle:{
          borderWidth: 0.5,
          borderColor:'blue',
          marginRight: 50,
          marginBottom: 15
        }
    });