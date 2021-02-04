import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableHighlight,
  TextInput,
  Alert,
} from 'react-native';
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
        password: password,
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
        <Text>TNI COOP Application</Text>
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
        <TouchableHighlight
          style={styles.loginButton}
          onPress={() => {
            loginAPI();
          }}>
          <Text>Login</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.loginButton}
          onPress={() => {
            FileSelecter();
          }}>
          <Text>Do Select File</Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  textInput: {
    paddingLeft: 5,
    marginTop: 15,
    height: 40,
    width: '100%',
    borderWidth: 1,
    borderColor: '#606070',
  },
  loginButton: {
    backgroundColor: '#01DFA5',
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
});
