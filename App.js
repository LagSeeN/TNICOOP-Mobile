import React , {useState,useEffect} from 'react'
import { 
  Text, 
  StyleSheet, 
  View , 
  Image,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-ionicons';

import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';


import FirstPage from './pages/FirstPage';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DATA = [
{
  title: "A-Host Company Limited",
  data: ["ตำแหน่งงาน : Programmer , Software Engineer"]
},
{
  title: "E-Stage Company Limited",
  data: ["ตำแหน่งงาน : Programmer , Web Designer"]
},
{
  title: "E-Stage Company Limited2",
  data: ["ตำแหน่งงาน : Programmer , Web Designer"]
},
{
  title: "E-Stage Company Limited3",
  data: ["ตำแหน่งงาน : Programmer , Web Designer"]
},
];

function  firstScreenStack({navigation}){
  return(
    <Stack.Navigator initialRouteName="FirstPage">
      <Stack.Screen
        name = "FirstPage"
        component = {FirstPage}
        options={{
          title : 'รายชื่อบริษัท',
          headerLeft: ()=> <NavigationDrawerStructor navigationProps={navigation}/>,
          headerStyle:{
            backgroundColor:'blue'
          },
          headerTintColor:'white',
          headerTitleStyle:{fontWeight:'bold'},
          headerTitleAlign:'center',
        }}
      />
    </Stack.Navigator>
  );
}//end of firstScreenStack

const NavigationDrawerStructor = (props)=>{
  const toggleDrawer =()=>{
    props.navigationProps.toggleDrawer();
  }

  return(
    <View style={{flexDirection:'row'}}>
      <TouchableOpacity onPress = {()=>toggleDrawer()}>
        <Image 
        source = {require('./asset/drawerWhite.png')} 
        style = {{width:25,height:25,marginLeft:5}}
        />
      </TouchableOpacity>
    </View>
  );
}// end NavigationDrawerStructor

const App =({  })=>{
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
      const newData = masterDataSource.filter(
        function (item) {
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
      <Text
        style={styles.itemStyle}
        onPress={() => getItem(item)}>
        {item.title.toUpperCase()}
      </Text>
    );
  };

  const ItemSeparatorView = () => {
    return (
      <View
        style={{ height: 0.5,width: '100%',backgroundColor: '#C8C8C8'}}
      />
    );
  };

  const getItem = (item) => {
    alert('Id : ' + item.id + ' Title : ' + item.title + ' Body : ' + item.body);
  };
  
    return (
      <NavigationContainer>
      <Drawer.Navigator 
        drawerContentOptions={{
          activeTintColor:'blue',
          itemStyle : {marginVertical:5}
        }}
      >
        <Drawer.Screen 
          name="FirstPage" 
          component={firstScreenStack}
          options={{drawerLabel: 'First page Option'}}
        />
      </Drawer.Navigator>
    </NavigationContainer>
    )
  
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: 'white',
    alignItems: 'center'
  },
  heading:{
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color:'blue',
    marginTop:20,
    marginBottom:10,
  },
  textInput:{
    height:40,
  },
  ImageIconStyle: {
    height: 15,
    width: 15,
    resizeMode: 'stretch',
  },
  inputIcon:{
    flexDirection: 'row',
    alignItems: 'center',
    borderColor:'blue',
    borderWidth:2,
    borderRadius:50,
    paddingLeft:15,
    marginVertical:5,
    flex:1,
    marginHorizontal:5
  },
  searchBtn:{
    color:'white',
    backgroundColor:'blue',
    padding:10,
    textAlign:'center',
    height:40,
    width:100,
    borderRadius:20,
    marginLeft:200,
    marginTop:5,
    marginBottom:30
  },
  listHeader:{
    color:'blue',
    fontSize:18
  },
  listItem:{
    color:'cornflowerblue',
    fontSize:15,
    marginTop:5,
    marginBottom:30,
  },
  footer:{
    height:60,
    width:'100%',
    backgroundColor:'blue',
    flexDirection:'row',
  }
})

export default App;