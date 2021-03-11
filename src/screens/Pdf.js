import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';

import {AuthContext} from '../components/Context';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

import Pdf from 'react-native-pdf';

export default function showPdf({navigation, route}) {
  //const source = {uri:'http://samples.leanpub.com/thereactnativebook-sample.pdf',cache:true};
  //const source = require('./test.pdf');  // ios only
  //const source = {uri:'bundle-assets://test.pdf'};

  //const source = {uri:'file:///sdcard/test.pdf'};
  //const source = {uri:"data:application/pdf;base64,JVBERi0xLjcKJc..."};

  const source = {
    uri: 'data:application/pdf;base64,' + route.params.source,
  };

  return (
    <View style={styles.container}>
      <Pdf
        source={source}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`current page: ${page}`);
        }}
        onError={(error) => {
          console.log(error);
          alert(error);
        }}
        onPressLink={(uri) => {
          console.log(`Link presse: ${uri}`);
        }}
        style={styles.pdf}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
