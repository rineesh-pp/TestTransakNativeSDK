import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Button, StyleSheet, View} from 'react-native';
import Transak from '../components/Transak';
import {AppStackParamsList} from '../types/screens';

interface HomeScreenProps
  extends NativeStackScreenProps<AppStackParamsList, 'HOME'> {}

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Transak />

      <View style={styles.button}>
        <Button
          title="Payment Screen"
          onPress={() => navigation.navigate('PAYMENT')}
        />

        <Button
          title="RN Webview Screen"
          onPress={() => navigation.navigate('RN_WEBVIEW')}
        />

        <Button
          title="Inapp Browser Test"
          onPress={() => navigation.navigate('INAPP_BROWSER_TEST')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginBottom: 10,
    display: 'flex',
  },
});

export default HomeScreen;
