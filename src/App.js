import React, {useState, useEffect, useMemo, useReducer} from 'react';
import {View, TouchableOpacity, ActivityIndicator} from 'react-native';

import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import AsyncStorage from '@react-native-community/async-storage';
import sha256 from 'sha256';
import axios from 'axios';

import styles from './Style';

import Icon from 'react-native-ionicons';

import {AuthContext} from './components/context';

import MainScreen from './screens/MainScreen';
import SearchCompany from './screens/SearchCompany';
import Login from './screens/Login';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function NavigationDrawerStructor(props) {
  const toggleDrawer = () => {
    props.navigationProps.toggleDrawer();
  };
  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={() => toggleDrawer()}>
        <Icon
          name="menu"
          style={{color: '#FFFFFF', width: 25, height: 25, marginLeft: 10}}
        />
      </TouchableOpacity>
    </View>
  );
}

//#region Screen stack
function mainScreenStack({Navigation}) {
  return (
    <Stack.Navigator initialRouteName="MainScreen">
      <Stack.Screen
        name="MainScreen"
        component={MainScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

function searchCompanyStack({Navigation}) {
  return (
    <Stack.Navigator initialRouteName="SearchCompany">
      <Stack.Screen
        name="SearchCompany"
        component={SearchCompany}
        options={{
          title: 'รายชื่อบริษัท',
          headerLeft: () => (
            <NavigationDrawerStructor navigationProps={Navigation} />
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
}
//#endregion

const contentStack = ({route}) => {
  return (
    <Drawer.Navigator
      drawerContentOptions={{
        activeTintColor: 'blue',
        itemStyle: {marginVertical: 5},
      }}>
      <Drawer.Screen
        name="MainScreen"
        component={mainScreenStack}
        options={{drawerLabel: 'หน้าแรก'}}
      />
      <Drawer.Screen
        name="SearchCompany"
        component={searchCompanyStack}
        options={{drawerLabel: 'ค้นหาบริษัท'}}
      />
    </Drawer.Navigator>
  );
};

export default function App() {
  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  const authContext = useMemo(() => ({
    signIn: async (userName, password) => {
      let userToken;
      userToken = null;
      axios
        .post('https://yostem.ddns.net:8393/api/Users/authentication', {
          username: userName,
          password: sha256(password),
        })
        .then(async (response) => {
          alert(response.data.token);
          userToken = response.data.token;
          try {
            await AsyncStorage.setItem('userToken', userToken);
          } catch (e) {
            console.log(e);
          }
          dispatch({type: 'LOGIN', id: userName, token: userToken});
        })
        .catch((error) => {
          console.error(error);
          alert(error);
        });
    },
    signOut: async () => {
      try {
        await AsyncStorage.removeItem('userToken');
      } catch (e) {
        console.log(e);
      }
      dispatch({type: 'LOGOUT'});
    },
  }));

  useEffect(() => {
    setTimeout(async () => {
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log(e);
      }
      dispatch({type: 'RETRIEVE_TOKEN', token: userToken});
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {loginState.userToken !== null ? (
            <Stack.Screen name="contentStack" component={contentStack} />
          ) : (
            <Stack.Screen name="Login" component={Login} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
