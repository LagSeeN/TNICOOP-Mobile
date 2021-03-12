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

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../components/Context';

export default function AddEditCompany({navigation, route}) {
  let [comName, setComName] = React.useState('');
  let [comDesc, setComDesc] = React.useState('');
  let [comPosition, setComPosition] = React.useState('');
  let [comAddress, setComAddress] = React.useState('');
  let [comWebsite, setComWebSite] = React.useState('');
  let [comPhone, setComPhone] = React.useState('');
  let [comEmail, setComEmail] = React.useState('');
  let [comWelfare, setComWelfare] = React.useState('');

  const {signOut} = React.useContext(AuthContext);

  React.useEffect(() => {
    if (route.params.mode == 'Edit') {
      AsyncStorage.getItem('userData').then((data) => {
        data = JSON.parse(data);
        const headers = {Authorization: `Bearer ${data.token}`};
        axios
          .get('/Companies/' + route.params.id, {headers})
          .then((response) => {
            //setMasterDataSource(response.data);
            setComName(response.data.name);
            setComDesc(response.data.description);
            setComPosition(response.data.position);
            setComAddress(response.data.address);
            setComWebSite(response.data.website);
            setComPhone(response.data.phone);
            setComEmail(response.data.email);
            setComWelfare(response.data.welfare);
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
    }
  }, []);

  let submit = () => {
    if (!comName) {
      alert('Please fill name');
      return;
    }
    if (!comDesc) {
      alert('Please fill Desc');
      return;
    }
    if (!comPosition) {
      alert('Please fill Position');
      return;
    }
    if (!comAddress) {
      alert('Please fill Address');
      return;
    }
    if (!comWebsite) {
      alert('Please fill Website');
      return;
    }
    if (!comPhone) {
      alert('Please fill Phone');
      return;
    }
    if (!comEmail) {
      alert('Please fill Email');
      return;
    }
    if (!comWelfare) {
      alert('Please fill Welfare');
      return;
    }
    if (route.params.mode == 'Edit') {
      AsyncStorage.getItem('userData').then((data) => {
        data = JSON.parse(data);
        const headers = {Authorization: `Bearer ${data.token}`};
        axios
          .put(
            '/Companies/' + route.params.id,
            {
              id: route.params.id,
              name: comName,
              description: comDesc,
              position: comPosition,
              welfare: comWelfare,
              website: comWebsite,
              phone: comPhone,
              email: comEmail,
              address: comAddress,
            },
            {headers},
          )
          .then((response) => {
            //alert(response.data);
            alert('แก้ไขข้อมูลสำเร็จ');
            navigation.navigate('SearchCompany');
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
    } else {
      AsyncStorage.getItem('userData').then((data) => {
        data = JSON.parse(data);
        const headers = {Authorization: `Bearer ${data.token}`};
        axios
          .post(
            '/Companies/',
            {
              name: comName,
              description: comDesc,
              position: comPosition,
              welfare: comWelfare,
              website: comWebsite,
              phone: comPhone,
              email: comEmail,
              address: comAddress,
            },
            {headers},
          )
          .then((response) => {
            //alert(response.data);
            alert('เพิ่มข้อมูลสำเร็จ');
            navigation.navigate('SearchCompany', {loading: true});
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
            defaultValue={comName}
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
            defaultValue={comDesc}
          />
        </View>

        <View style={styles.textView}>
          <Text style={styles.textStyle}>ตำแหน่งงาน</Text>
          <TextInput
            style={styles.textInputStyle}
            placeholder="ตำแหน่งงาน"
            onChangeText={(comPosition) => setComPosition(comPosition)}
            defaultValue={comPosition}
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
            defaultValue={comAddress}
          />
        </View>

        <View style={styles.textView}>
          <Text style={styles.textStyle}>เบอร์โทร</Text>
          <TextInput
            style={styles.textInputStyle}
            placeholder="เบอร์โทร"
            onChangeText={(comPhone) => setComPhone(comPhone)}
            defaultValue={comPhone}
          />
        </View>

        <View style={styles.textView}>
          <Text style={styles.textStyle}>อีเมล</Text>
          <TextInput
            style={styles.textInputStyle}
            placeholder="อีเมล"
            onChangeText={(comEmail) => setComEmail(comEmail)}
            defaultValue={comEmail}
          />
        </View>

        <View style={styles.textView}>
          <Text style={styles.textStyle}>เว็บไซด์</Text>
          <TextInput
            style={styles.textInputStyle}
            placeholder="เว็บไซต์"
            onChangeText={(comWebsite) => setComWebSite(comWebsite)}
            defaultValue={comWebsite}
          />
        </View>

        <View style={styles.textView}>
          <Text style={styles.textStyle}>สวัสดิการ</Text>
          <TextInput
            style={styles.textInputStyle}
            placeholder="สวัสดิการ"
            onChangeText={(comWelfare) => setComWelfare(comWelfare)}
            defaultValue={comWelfare}
          />
        </View>

        <View style={styles.textView}>
          <View style={styles.fixToText}>
            <TouchableOpacity
              style={[styles.buttonStyle, {backgroundColor: '#3366FF'}]}
              onPress={submit}>
              <Text style={styles.buttonText}>ยืนยัน</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonStyle, {backgroundColor: 'orange'}]}
              onPress={() => navigation.goBack()}>
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
