import React from 'react';
import {View, TouchableOpacity} from 'react-native';

import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import styles from './Style';

import Icon from 'react-native-ionicons';

import SearchCompany from './pages/SearchCompany';
import Login from './pages/Login';
import demoSHA256 from './pages/DemoSha256';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function searchCompanyScreenStack({navigation}) {
  return (
    <Stack.Navigator initialRouteName="SearchCompany">
      <Stack.Screen
        name="SearchCompany"
        component={SearchCompany}
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
}

function loginScreenStack({navigation}) {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: 'เข้าสู่ระบบ',
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
} 

function demosha256ScreenStack({navigation}) {
  return (
    <Stack.Navigator initialRouteName="demoSHA256">
      <Stack.Screen
        name="demoSHA256"
        component={demoSHA256}
        options={{
          title: 'Demo SHA256',
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
}

const NavigationDrawerStructor = (props) => {
  const toggleDrawer = () => {
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={() => toggleDrawer()}>
        <Icon name="menu" style={{color: "#FFFFFF", width: 25, height: 25, marginLeft: 10}}/>
        {/* <Image
          source={require('./asset/drawerWhite.png')}
          style={{width: 25, height: 25, marginLeft: 5}}
        /> */}
      </TouchableOpacity>
    </View>
  );
}; // end NavigationDrawerStructor

const App = ({}) => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContentOptions={{
          activeTintColor: 'blue',
          itemStyle: {marginVertical: 5},
        }}>
        <Drawer.Screen
          name="demoSHA256"
          component={demosha256ScreenStack}
          options={{drawerLabel: 'First page Option'}}
        />
        <Drawer.Screen
          name="Login"
          component={loginScreenStack}
          options={{drawerLabel: 'Show Login'}}
        />
        <Drawer.Screen
          name="SearchCompany"
          component={searchCompanyScreenStack}
          options={{drawerLabel: 'Show Search Company'}}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
