import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

export default function AddEditCompany() {
  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.heading}>
          <Text style={styles.headingText}>เพิ่มข้อมูลบริษัท</Text>
        </View>

        <View style={styles.textView}>
          <Text style={styles.textStyle}>ชื่อบริษัท</Text>
          <TextInput style={styles.textInputStyle} placeholder="ชื่อบริษัท" />
        </View>
        <View style={styles.textView}>
          <Text style={styles.textStyle}>รายละเอียดบริษัท</Text>
          <TextInput
            style={styles.textInputStyle}
            placeholder="รายละเอียดบริษัท"
          />
        </View>

        <View style={styles.textView}>
          <Text style={styles.textStyle}>ตำแหน่งงาน</Text>
          <TextInput style={styles.textInputStyle} placeholder="ตำแหน่งงาน" />
        </View>

        <View style={styles.textView}>
          <Text style={styles.textStyle}>ที่อยู่</Text>
          <TextInput style={styles.textInputStyle} placeholder="ที่อยู่" />
        </View>

        <View style={styles.textView}>
          <Text style={styles.textStyle}>สวัสดิการ</Text>
          <TextInput style={styles.textInputStyle} placeholder="สวัสดิการ" />
        </View>

        <View style={styles.textView}>
          <View style={styles.fixToText}>
            <TouchableOpacity
              style={[styles.buttonStyle, {backgroundColor: 'blue'}]}>
              <Text style={styles.buttonText}>ยืนยัน</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonStyle, {backgroundColor: 'orange'}]}>
              <Text style={styles.buttonText}>ยกเลิก</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    fontWeight: 'bold',
  },
  textView: {
    marginLeft: 30,
    marginRight: 30,
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'blue',
    marginBottom: 15,
  },
  textInputStyle: {
    height: 40,
    borderColor: 'blue',
    borderWidth: 2,
    borderRadius: 7,
    marginBottom: 15,
  },
  buttonStyle: {
    height: 40,
    width: 90,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 40,
  },
});
