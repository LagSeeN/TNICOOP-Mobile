import * as React from 'react';
import { Text, View ,StyleSheet, SafeAreaView} from 'react-native';

export default function Contact({navigation}){
    return (
        <SafeAreaView style={styles.container}>
          
          <View style = {styles.heading}>
            <Text style = {styles.headingText}>
              ติดต่อ
            </Text>
          </View>
            
          <View style = {styles.textView}>
            <Text style = {styles.textStyle}>
              คณะเทคโนโลยีสารสนเทศ
            </Text>
            <Text style = {styles.textStyleInner}>
              โทรศัพท์ 0-2763-2600 ต่อ 2740
            </Text>
            <Text style = {styles.textStyleInner}>
              โทรสาร 0-2763-2700
            </Text>
            <Text style = {styles.textSpace}></Text>
            <Text style = {styles.textStyle}>
              ศูนย์สหกิจศึกษา
            </Text>
            <Text style = {styles.textStyleInner}>
              โทรศัพท์ 0-2763-2600 ต่อ 2750
            </Text>
            <Text style = {styles.textStyleInner}>
              โทรสาร 0-2763-2788
            </Text>
            <Text style = {styles.textStyleInner}>
              อีเมล  coop@tni.ac.th
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
        textSpace:{
          marginBottom:20,
        },
        textStyle:{
          fontWeight: 'bold',
          fontSize: 18,
          color: 'blue',
          marginBottom: 20
        },
        textStyleInner:{
          fontSize: 18,
          color: 'blue',
          marginBottom: 10,
        },
    });