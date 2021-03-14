import React, {useState, useContext} from 'react';
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
  ActivityIndicator,
} from 'react-native';

import styles from '../Style';
import axios from 'axios';

import {AuthContext} from '../components/Context';

//import DocumentPicker from "react-native-document-picker";

const Login = ({navigation}) => {
  const {signIn} = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  //const [loading, setLoading] = useState(false);

  const loginHandle = (username, password) => {
    signIn(username, password);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        {/* {loading ? (
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
        ) : null} */}
        <Image
          source={require('../asset/COOPLogo1.png')}
          style={{width: 200, height: 200}}
        />
        <Text style={styles.heading}>TNI COOP Application</Text>
        <TextInput
          style={styles.inputUser}
          placeholder="Username"
          onChangeText={(textInputUsername) => {
            setUsername(textInputUsername);
          }}
        />
        <TextInput
          secureTextEntry={true}
          style={styles.inputUser}
          placeholder="Password"
          onChangeText={(textInputPassword) => {
            setPassword(textInputPassword);
          }}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (!username) {
              alert('กรุณากรอกชื่อผู้ใช้');
              return;
            }
            if (!password) {
              alert('กรุณากรอกรหัสผ่าน');
              return;
            }

            loginHandle(username, password);
            //setLoading(!loading);
          }}>
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 18,
              textAlign: 'center',
              fontFamily: 'Prompt-Regular',
            }}>
            Login
          </Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={styles.button}
          onPress={() => {
            FileSelecter();
          }}>
          <Text style={{color: "#FFFFFF",fontSize: 18,textAlign:'center'}}>Do Select File</Text>
        </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
};

export default Login;
