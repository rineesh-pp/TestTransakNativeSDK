import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {AppStackParamsList} from '../types/screens';

interface ErrorScreenProps
  extends NativeStackScreenProps<AppStackParamsList, 'ERROR'> {}

const ErrorScreen: React.FC<ErrorScreenProps> = ({navigation}) => {
  return (
    <View>
      <Text>Payment Screen</Text>

      <View style={styles.button}>
        <Button
          title="Home Screen"
          onPress={() => navigation.navigate('HOME')}
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
    margin: 10,
  },
});

export default ErrorScreen;
