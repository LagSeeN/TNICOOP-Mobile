// import React in our code
import React, {useState} from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

//import sha256 to use sha256()
import sha256 from 'sha256';

const demoSHA256 = () => {
  const [inputText, setInputText] = useState('');
  const [text, setText] = useState('');

  const convertsha256 = () => {
    let encodedVal = sha256(inputText);
    setText(encodedVal);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.titleStyle}>
          Example to Convert any Input Value in sha256 in React Native
        </Text>
        <Text style={styles.textStyle}>{text}</Text>
        <Text style={styles.textStyle}>
          Please insert any value to convert in sha256
        </Text>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={
            (inputText) => setInputText(inputText)
          }
          placeholder="Enter Any Value"
          value={inputText}
        />
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={convertsha256}>
          <Text style={styles.buttonTextStyle}>
            Conver to sha256
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default demoSHA256;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 10,
  },
  titleStyle: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  textStyle: {
    textAlign: 'center',
    margin: 10,
  },
  textInputStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#51D8C7',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#51D8C7',
    height: 40,
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 30,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
});