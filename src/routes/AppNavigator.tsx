import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import ErrorScreen from '../screens/ErrorScreen';
import HomeScreen from '../screens/HomeScreen';
import PaymentScreen from '../screens/PaymentScreen';
import {AppStackParamsList} from '../types/screens';
import WebViewScreen from '../screens/WebViewScreen';
import InAppBrowserTest from '../screens/InappBrowserTest';

const Stack = createNativeStackNavigator<AppStackParamsList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HOME"
        screenOptions={{
          headerTitleAlign: 'center',
        }}>
        <Stack.Screen name="HOME" component={HomeScreen} />
        <Stack.Screen name="INAPP_BROWSER_TEST" component={InAppBrowserTest} />
        <Stack.Screen
          name="PAYMENT"
          component={PaymentScreen}
          options={{
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen name="RN_WEBVIEW" component={WebViewScreen} />
        <Stack.Screen name="ERROR" component={ErrorScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
