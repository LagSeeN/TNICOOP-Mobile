import React, {useState, useEffect, useMemo, useReducer} from 'react';
import {View, TouchableOpacity, ActivityIndicator, Text} from 'react-native';

import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import AsyncStorage from '@react-native-async-storage/async-storage';
import sha256 from 'sha256';
import axios from 'axios';

import Icon from 'react-native-ionicons';

import {AuthContext} from './components/Context';

import Contact from './screens/Contact';
import Login from './screens/Login';
import MainScreen from './screens/MainScreen';
import UserProfile from './screens/UserProfile';
import SearchCompany from './screens/SearchCompany';
import CompanyProfile from './screens/CompanyProfile';
import AddEditCompany from './screens/AddEditCompany';
import SubmitDocument from './screens/SubmitDocument';
import StudentProfile from './screens/StudentProfile';
import showPdf from './screens/Pdf';

import styles from './Style';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

axios.defaults.baseURL = 'https://yostem.ddns.net:8393/api';

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
function mainScreenScreen({Navigation}) {
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

function userProfileScreen({Navigation}) {
  return (
    <Stack.Navigator initialRouteName="UserProfile">
      <Stack.Screen
        name="UserProfile"
        component={UserProfile}
        options={{
          title: 'ข้อมูลผู้ใช้',
          headerStyle: {
            backgroundColor: '#3366FF',
          },
          headerTintColor: 'white',
          headerTitleStyle: {fontFamily: 'Prompt-Bold'},
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
}

function companyProfileScreen({Navigation, route}) {
  return (
    <Stack.Navigator initialRouteName="CompanyProfile">
      <Stack.Screen
        name="CompanyProfile"
        component={CompanyProfile}
        // สร้างแล้วยัดตัวแปรให้ด้วยนะครับ 😅
        initialParams={{
          id: route.params.id,
          name: route.params.name,
          description: route.params.description,
        }}
        options={{
          title: 'รายละเอียดบริษัท',
          headerStyle: {
            backgroundColor: '#3366FF',
          },
          headerTintColor: 'white',
          headerTitleStyle: {fontFamily: 'Prompt-Bold'},
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
}

function searchCompanyScreen({Navigation, route}) {
  return (
    <Stack.Navigator initialRouteName="SearchCompany">
      <Stack.Screen
        name="SearchCompany"
        component={SearchCompany}
        options={{
          title: 'รายชื่อบริษัท',
          headerStyle: {
            backgroundColor: '#3366FF',
          },
          headerTintColor: 'white',
          headerTitleStyle: {fontFamily: 'Prompt-Bold'},
          headerTitleAlign: 'center',
          // headerRight: () => (
          //   <TouchableOpacity
          //     onPress={() => {
          //       Navigation.navigate('Contact');
          //     }}>
          //     <Text
          //       style={{fontSize: 34, marginRight: 15, backgroundColor: 'red'}}>
          //       +
          //     </Text>
          //   </TouchableOpacity>
          // ),
        }}
      />
    </Stack.Navigator>
  );
}

function contactScreen({Navigation}) {
  return (
    <Stack.Navigator initialRouteName="Contact">
      <Stack.Screen
        name="Contact"
        component={Contact}
        options={{
          title: 'ข้อมูลติดต่อ',
          headerStyle: {
            backgroundColor: '#3366FF',
          },
          headerTintColor: 'white',
          headerTitleStyle: {fontFamily: 'Prompt-Bold'},
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
}

function addEditCompanyScreen({Navigation, route}) {
  return (
    <Stack.Navigator initialRouteName="AddEditCompany">
      <Stack.Screen
        name="AddEditCompany"
        component={AddEditCompany}
        initialParams={{
          id: route.params.id,
          mode: route.params.mode,
        }}
        options={{
          title: 'เพิ่ม/แก้ไขบริษัท',
          headerStyle: {
            backgroundColor: '#3366FF',
          },
          headerTintColor: 'white',
          headerTitleStyle: {fontFamily: 'Prompt-Bold'},
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
}

function submitDocument({Navigation, route}) {
  return (
    <Stack.Navigator initialRouteName="SubmitDocument">
      <Stack.Screen
        name="SubmitDocument"
        component={SubmitDocument}
        options={{
          title: 'เอกสาร',
          headerStyle: {
            backgroundColor: '#3366FF',
          },
          headerTintColor: 'white',
          headerTitleStyle: {fontFamily: 'Prompt-Bold'},
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
}
function studentProfileScreen({Navigation}) {
  return (
    <Stack.Navigator initialRouteName="StudentProfile">
      <Stack.Screen
        name="StudentProfile"
        component={StudentProfile}
        options={{
          title: 'ข้อมูลนักศึกษา',
          headerStyle: {
            backgroundColor: '#3366FF',
          },
          headerTintColor: 'white',
          headerTitleStyle: {fontFamily: 'Prompt-Bold'},
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
}
function showPdfScreen({Navigation, route}) {
  return (
    <Stack.Navigator initialRouteName="StudentProfile">
      <Stack.Screen
        name="ShowPdf"
        component={showPdf}
        initialParams={{
          id: route.params.id,
        }}
        options={{
          title: 'PDF',
          headerStyle: {
            backgroundColor: '#3366FF',
          },
          headerTintColor: 'white',
          headerTitleStyle: {fontFamily: 'Prompt-Bold'},
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
}
//#endregion

const contentStack = ({route}) => {
  return (
    <Stack.Navigator
      initialRouteName="MainScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="MainScreen" component={mainScreenScreen} />
      <Stack.Screen name="SearchCompany" component={searchCompanyScreen} />
      <Stack.Screen name="Contact" component={contactScreen} />
      <Stack.Screen name="UserProfile" component={userProfileScreen} />
      <Stack.Screen name="CompanyProfile" component={companyProfileScreen} />
      <Stack.Screen name="AddEditCompany" component={addEditCompanyScreen} />
      <Stack.Screen name="SubmitDocument" component={submitDocument} />
      <Stack.Screen name="StudentProfile" component={studentProfileScreen} />
      <Stack.Screen name="ShowPdf" component={showPdfScreen} />
    </Stack.Navigator>
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
        .post('/Users/authentication', {
          username: userName,
          password: sha256(password),
        })
        .then(async (response) => {
          // alert(response.data.token);
          userToken = response.data.token;
          try {
            // await AsyncStorage.setItem('userToken', userToken);
            await AsyncStorage.setItem(
              'userData',
              JSON.stringify(response.data),
            );
          } catch (e) {
            console.log(e);
          }
          dispatch({type: 'LOGIN', id: userName, token: userToken});
        })
        .catch((error) => {
          if (error.response.status == '404' || error.response.status == '401') {
            console.error(error.response.data.message);
            alert(error.response.data.message);
          } else if (error.response.status == '400'){
            alert("กรุณากรอกชื่อผู้ใช้และรหัสผ่าน");
          }
           else {
            console.error(error);
            alert(error);
          }
        });
    },
    signOut: async () => {
      try {
        await AsyncStorage.removeItem('userData');
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
        userToken = await AsyncStorage.getItem('userData');
      } catch (e) {
        console.log(e);
      }
      dispatch({type: 'RETRIEVE_TOKEN', token: userToken});
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: 'blue',
        }}>
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
