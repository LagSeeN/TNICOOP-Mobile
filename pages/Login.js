import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import sha256 from 'sha256';
import styles from '../Style';

//import DocumentPicker from "react-native-document-picker";

const Login = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // const GetSHA1 = (Password) => {
  //   const result = await RNSimpleCrypto.SHA.sha1(Password);
  //   return result;
  // }

  const loginAPI = () => {
    fetch('https://yostem.ddns.net:8393/api/Users/authentication', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: sha256(password),
      }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        Alert.alert(responseData.title,responseData.message);
        Alert.alert("Your role",responseData.permissionDesc);
        console.log('RESULTS HERE:', responseData);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const FileSelecter = async () =>{
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      console.log(
        res.uri,
        res.type, // mime type
        res.name,
        res.size
      );
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
    
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.heading}>TNI COOP Application</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Username"
          onChangeText={(textInputUsername) => {
            setUsername(textInputUsername);
          }}
        />
        <TextInput
          secureTextEntry={true}
          style={styles.textInput}
          placeholder="Password"
          onChangeText={(textInputPassword) => {
            setPassword(textInputPassword);
          }}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            loginAPI();
          }}>
          <Text style={{color: "#FFFFFF"}}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            FileSelecter();
          }}>
          <Text>Do Select File</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;
