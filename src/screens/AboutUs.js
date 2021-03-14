import * as React from 'react';
import {Text, View, StyleSheet, SafeAreaView} from 'react-native';

export default function AboutUs({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.headingText}>รายชื่อผู้พัฒนา</Text>
      </View>

      <View style={styles.textView}>
        <Text style={styles.textStyle}>ออกแบบและพัฒนาส่วนติดต่อผู้ใช้ (UX/UI)</Text>
        <Text style={styles.textStyleInner}>60121062-8 กัสชมาภรณ์ ลิ้มพงศานุรักษ์</Text>
        <Text style={styles.textStyleInner}>60121029-7 ณัฐชยา ยิ้มถนอม</Text>
        <Text style={styles.textSpace}></Text>
        <Text style={styles.textStyle}>React Native (Front-End)</Text>
        <Text style={styles.textStyleInner}>60121053-7 ดนุพล อินทรานุรักษ์</Text>
        <Text style={styles.textSpace}></Text>
        <Text style={styles.textStyle}>.NET Core Web API (Back-End)</Text>
        <Text style={styles.textStyleInner}>60121002-4 ยศพล จันทรโรจน์</Text>
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
    marginTop: 50,
    marginBottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingText: {
    fontSize: 24,
    color: 'black',
    fontFamily: 'Prompt-Bold',
  },
  textView: {
    marginLeft: 50,
  },
  textSpace: {
    marginBottom: 20,
  },
  textStyle: {
    fontFamily: 'Prompt-Bold',
    fontSize: 18,
    color: 'black',
    marginBottom: 20,
  },
  textStyleInner: {
    fontSize: 18,
    color: 'black',
    marginBottom: 10,
    fontFamily: 'Prompt-Regular'
  },
});
