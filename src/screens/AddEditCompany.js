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
  let [comName, setComName] = React.useState('');
  let [comDesc, setComDesc] = React.useState('');
  let [comPosition, setComPosition] = React.useState('');
  let [comAddress, setComAddress] = React.useState('');
  let [comWelfare, setComWelfare] = React.useState('');

  let submit = () => {
    if (!comName) {
      alert('Please fill name');
      return;
    }
    if (!comDesc) {
      alert('Please fill name');
      return;
    }
    if (!comPosition) {
      alert('Please fill name');
      return;
    }
    if (!comAddress) {
      alert('Please fill name');
      return;
    }
    if (!comWelfare) {
      alert('Please fill name');
      return;
    }
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.heading}>
          <Text style={styles.headingText}>เพิ่มข้อมูลบริษัท</Text>
        </View>

        <View style={styles.textView}>
          <Text style={styles.textStyle}>ชื่อบริษัท</Text>
          <TextInput
            style={styles.textInputStyle}
            placeholder="ชื่อบริษัท"
            onChangeText={(comName) => setComName(comName)}
          />
        </View>
        <View style={styles.textView}>
          <Text style={styles.textStyle}>รายละเอียดบริษัท</Text>
          <TextInput
            placeholder="รายละเอียดบริษัท"
            style={styles.textBigInputStyle}
            maxLength={255}
            multiline={true}
            numberOfLines={5}
            onChangeText={(comDesc) => setComDesc(comDesc)}
          />
        </View>

        <View style={styles.textView}>
          <Text style={styles.textStyle}>ตำแหน่งงาน</Text>
          <TextInput
            style={styles.textInputStyle}
            placeholder="ตำแหน่งงาน"
            onChangeText={(comPosition) => setComPosition(comPosition)}
          />
        </View>

        <View style={styles.textView}>
          <Text style={styles.textStyle}>ที่อยู่</Text>
          <TextInput
            placeholder="ที่อยู่"
            style={styles.textBigInputStyle}
            maxLength={255}
            multiline={true}
            numberOfLines={5}
            onChangeText={(comAddress) => setComAddress(comAddress)}
          />
        </View>

        <View style={styles.textView}>
          <Text style={styles.textStyle}>สวัสดิการ</Text>
          <TextInput
            style={styles.textInputStyle}
            placeholder="สวัสดิการ"
            onChangeText={(comWelfare) => setComWelfare(comWelfare)}
          />
        </View>

        <View style={styles.textView}>
          <View style={styles.fixToText}>
            <TouchableOpacity
              style={[styles.buttonStyle, {backgroundColor: 'blue'}]}
              onPress={submit}>
              <Text style={styles.buttonText}>ยืนยัน</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonStyle, {backgroundColor: 'orange'}]}
              onPress={submit}>
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
  textBigInputStyle: {
    borderColor: 'blue',
    borderWidth: 2,
    borderRadius: 7,
    marginBottom: 15,
    textAlignVertical: 'top',
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
