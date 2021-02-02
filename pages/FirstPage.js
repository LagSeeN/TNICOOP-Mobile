import React , {useState,useEffect} from 'react'
import { 
  Text, 
  StyleSheet, 
  View , 
  SafeAreaView , 
  TextInput ,
  Image,
  TouchableOpacity,
  SectionList,
  FlatList
} from 'react-native';

import Icon from 'react-native-ionicons';

const FirstPage = ({ navigation }) => {
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
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  const getItem = (item) => {
    alert('Id : ' + item.id + ' Title : ' + item.title + ' Body : ' + item.body);
  };

  return (
   <SafeAreaView style={{flex:1 }}>
        <View style={styles.container}>

          <View style={{flexDirection: "row"}}>
            <View  style={styles.inputIcon}>
              <Image
                source={{uri:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Vector_search_icon.svg/945px-Vector_search_icon.png'}}
                style= {styles.ImageIconStyle}
              />
              <TextInput 
                style = {styles.textInput}
                placeholder = "ค้นหาบริษัท"
                onChangeText={(text) => searchFilterFunction(text)}
                value={search}
                underlineColorAndroid="transparent"
              />
            </View>
            
            <View  style={styles.inputIcon}>
              <Image
                source={{uri:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Vector_search_icon.svg/945px-Vector_search_icon.png'}}
                style= {styles.ImageIconStyle}
              />
              <TextInput 
                style = {styles.textInput}
                placeholder = "ตำแหน่งงาน"
                underlineColorAndroid="transparent"
              />
            </View>
          </View>
        
        
        <TouchableOpacity>
          <Text style = {styles.searchBtn}>ค้นหา</Text>
        </TouchableOpacity>

        {/* <SectionList
          sections={DATA}
          keyExtractor={(item,index)=>item+index}
          renderItem={({ item }) => (
            <Text style={styles.listItem}>{item}</Text>)}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.listHeader}>{title}</Text>
          )}
        /> */}

        <FlatList
          data={filteredDataSource}
          keyExtractor= {(index,item)=>index.toString()+item}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />

        </View>
        </SafeAreaView>
  );
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

export default FirstPage;