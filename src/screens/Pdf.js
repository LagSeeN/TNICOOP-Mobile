import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';

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

  const [pdfUri, setpdfUri] = useState('');
  const [loading, setLoading] = useState(true);

  const {signOut} = useContext(AuthContext);

  // const source = {
  //   uri: 'data:application/pdf;base64,' + route.params.source,
  // };

  useEffect(() => {
    AsyncStorage.getItem('userData').then((data) => {
      data = JSON.parse(data);
      const headers = {
        Authorization: `Bearer ${data.token}`,
      };
      axios
        .get('/InternshipFiles/' + route.params.id, {
          headers,
        })
        .then((response) => {
          setpdfUri('data:application/pdf;base64,' + response.data);
          setLoading(false);
        })
        .catch((error) => {
          if (error.response.status == '401') {
            alert('Session หมดอายุ');
            signOut();
          } else {
            console.error(error);
            alert(error);
          }
        });
    });
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <>
          <View
            style={[
              {flex: 1, justifyContent: 'center'},
              {
                flexDirection: 'row',
                justifyContent: 'space-around',
                padding: 10,
              },
            ]}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        </>
      ) : (
        <>
          <Pdf
            source={{uri: pdfUri}}
            onError={(error) => {
              console.log(error);
              alert(error);
            }}
            style={styles.pdf}
          />
        </>
      )}
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
