import React, {useState, useContext} from 'react';
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';

import styles from '../Style';
import axios from 'axios';

import { AuthContext } from "../components/context";

//import DocumentPicker from "react-native-document-picker";

const Login = ({navigation}) => {
  const {signIn} = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginHandle = (username, password) => {
    signIn(username, password);
  }

  const loginAPI = () => {
    axios
      .post("https://yostem.ddns.net:8393/api/Users/authentication", {
        username: username,
        password: sha256(password)
      }).then(response => {
        alert(response.data.token);
        navigation.navigate("contentStack", {JWT : response.data.token});

      })
      .catch(error => {
        console.error(error)
        alert(error);
      })
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
            // loginAPI();
            loginHandle(username, password);
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
