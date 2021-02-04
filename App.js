import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, View, Image, TouchableOpacity} from 'react-native';

import Icon from 'react-native-ionicons';

import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import FirstPage from './pages/FirstPage';
import Login from './pages/Login';
import demoSHA1 from './pages/DemoSha1';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const companyAPI = () => {
  fetch('https://yostem.ddns.net:8393/api/Companies', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJTeXN0ZW0iLCJlbWFpbCI6Im1vcy5wb3AyQGdtYWlsLmNvbSIsImdpdmVuX25hbWUiOiIiLCJmYW1pbHlfbmFtZSI6IiIsIlVzZXJJZCI6IjEiLCJVc2VyVHlwZSI6IjEiLCJqdGkiOiI3ZjJlYWI4Ni1hNTNmLTQ4NmUtODU4ZS0wNGMwYTUxMmZjZTMiLCJleHAiOjE2MTI0NDY5NjYsImlzcyI6Illvc3NhcG9uIEphbnRhcm90ZSAoVE5JQ09PUENvcmUpIiwiYXVkIjoiWW9zc2Fwb24gSmFudGFyb3RlIChUTklDT09QQ29yZSkifQ.p2_wvuRnXVg2maVkcRpH7-sSS0c-mGDmVQV35UyH8Z0',
    },
  })
    .then((response) => response.json())
    .then((responseData) => {
      Alert.alert(responseData.title, responseData.message);
      Alert.alert('Your role', responseData.permissionDesc);
      console.log('RESULTS HERE:', responseData);
    })
    .catch((error) => {
      console.error(error);
    });
};

const DATA = [
  {
    title: 'A-Host Company Limited',
    data: ['ตำแหน่งงาน : Programmer , Software Engineer'],
  },
  {
    title: 'E-Stage Company Limited',
    data: ['ตำแหน่งงาน : Programmer , Web Designer'],
  },
  {
    title: 'E-Stage Company Limited2',
    data: ['ตำแหน่งงาน : Programmer , Web Designer'],
  },
  {
    title: 'E-Stage Company Limited3',
    data: ['ตำแหน่งงาน : Programmer , Web Designer'],
  },
];

function firstScreenStack({navigation}) {
  return (
    <Stack.Navigator initialRouteName="FirstPage">
      <Stack.Screen
        name="FirstPage"
        component={FirstPage}
        options={{
          title: 'รายชื่อบริษัท',
          headerLeft: () => (
            <NavigationDrawerStructor navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: 'blue',
          },
          headerTintColor: 'white',
          headerTitleStyle: {fontWeight: 'bold'},
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
} //end of firstScreenStack

function loginScreenStack({navigation}) {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: 'Login',
          headerLeft: () => (
            <NavigationDrawerStructor navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: 'blue',
          },
          headerTintColor: 'white',
          headerTitleStyle: {fontWeight: 'bold'},
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
} //end of firstScreenStack

function demosha1ScreenStack({navigation}) {
  return (
    <Stack.Navigator initialRouteName="demoSHA1">
      <Stack.Screen
        name="demoSHA1"
        component={demoSHA1}
        options={{
          title: 'Demo SHA1',
          headerLeft: () => (
            <NavigationDrawerStructor navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: 'blue',
          },
          headerTintColor: 'white',
          headerTitleStyle: {fontWeight: 'bold'},
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
} //end of firstScreenStack

const NavigationDrawerStructor = (props) => {
  const toggleDrawer = () => {
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={() => toggleDrawer()}>
        <Image
          source={require('./asset/drawerWhite.png')}
          style={{width: 25, height: 25, marginLeft: 5}}
        />
      </TouchableOpacity>
    </View>
  );
}; // end NavigationDrawerStructor

const App = ({}) => {
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((responseJson) => {
        setFilteredDataSource(responseJson);
        setMasterDataSource(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const ItemView = ({item}) => {
    return (
      <Text style={styles.itemStyle} onPress={() => getItem(item)}>
        {item.title.toUpperCase()}
      </Text>
    );
  };

  const ItemSeparatorView = () => {
    return (
      <View style={{height: 0.5, width: '100%', backgroundColor: '#C8C8C8'}} />
    );
  };

  const getItem = (item) => {
    alert(
      'Id : ' + item.id + ' Title : ' + item.title + ' Body : ' + item.body,
    );
  };

  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContentOptions={{
          activeTintColor: 'blue',
          itemStyle: {marginVertical: 5},
        }}>
        <Drawer.Screen
          name="demoSHA1"
          component={demosha1ScreenStack}
          options={{drawerLabel: 'First page Option'}}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'blue',
    marginTop: 20,
    marginBottom: 10,
  },
  textInput: {
    height: 40,
  },
  ImageIconStyle: {
    height: 15,
    width: 15,
    resizeMode: 'stretch',
  },
  inputIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'blue',
    borderWidth: 2,
    borderRadius: 50,
    paddingLeft: 15,
    marginVertical: 5,
    flex: 1,
    marginHorizontal: 5,
  },
  searchBtn: {
    color: 'white',
    backgroundColor: 'blue',
    padding: 10,
    textAlign: 'center',
    height: 40,
    width: 100,
    borderRadius: 20,
    marginLeft: 200,
    marginTop: 5,
    marginBottom: 30,
  },
  listHeader: {
    color: 'blue',
    fontSize: 18,
  },
  listItem: {
    color: 'cornflowerblue',
    fontSize: 15,
    marginTop: 5,
    marginBottom: 30,
  },
  footer: {
    height: 60,
    width: '100%',
    backgroundColor: 'blue',
    flexDirection: 'row',
  },
});

export default App;
