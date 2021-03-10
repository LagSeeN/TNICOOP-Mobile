import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

const ItemSeparatorView = () => {
  return (
    // Flat List Item Separator
    <View
      style={{
        height: 0.5,
        width: '100%',
        backgroundColor: '#C8C8C8',
        marginVertical: 10,
      }}
    />
  );
};

function SubmitDocument() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <DropDownPicker
          items={[
            {label: 'เอกสารสมัครสหกิจศึกษา', value: '1'},
            {label: 'เอกสารสหกิจศึกษา', value: '2'},
            {label: 'เอกสารรายงานประจำสัปดาห์', value: '3'},
          ]}
          placeholder={'กรุณาเลือกประเภทเอกสาร'}
          defaultValue={''}
          containerStyle={{height: 40}}
          style={{backgroundColor: '#fafafa', width: 300, borderColor: 'blue'}}
          itemStyle={{
            justifyContent: 'flex-start',
          }}
          dropDownStyle={{backgroundColor: '#fafafa'}}
          arrowColor="blue"
          labelStyle={{color: 'blue'}}
          onChangeItem={(items) =>
            this.setState({
              name: items.value,
            })
          }
        />

        <View style={{marginTop: 60, flexDirection: 'row'}}>
          <FlatList
            data={[
              {
                title1: 'CO-01 ใบสมัครเป็นนักศึกษาสหกิจศึกษา',
                title2: 'สถานะเอกสาร : ไม่ได้ส่ง',
                key: 'CO-01',
                icon: <Icon name="upload" size={30} color="blue" />,
              },
              {
                title1: 'CO-02 Resume',
                title2: 'สถานะเอกสาร : ไม่ได้ส่ง',
                key: 'CO-02',
                icon: <Icon name="upload" size={30} color="blue" />,
              },
            ]}
            //ที่ใส่ key ไปแบบนี้เพราะจะจัด style ขออภัย
            keyExtractor={(index, item) => index.toString() + item}
            ItemSeparatorComponent={ItemSeparatorView}
            renderItem={({item}) => {
              return (
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Text>
                    <Text style={styles.textStyle}>{item.title1}</Text>
                    {'\n'}
                    <Text style={styles.textStyleInner}>{item.title2}</Text>
                  </Text>
                  <View
                    style={{
                      textAlign: 'center',
                      alignItems: 'center',
                      position: 'absolute',
                      marginLeft: 300,
                    }}>
                    <TouchableOpacity>
                      <Text style={styles.uploadStyle}>Upload</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
            style={{paddingLeft: 30, paddingRight: 30}}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
export default SubmitDocument;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    marginTop: 50,
  },
  textStyle: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 14,
  },
  textStyleInner: {
    fontSize: 12,
    color: 'black',
    marginTop: 15,
  },
  uploadStyle: {
    marginTop: 15,
    color: 'blue',
  },
});
