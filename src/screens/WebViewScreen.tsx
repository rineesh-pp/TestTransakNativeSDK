import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {WebView} from 'react-native-webview';

import React, {useEffect, useState} from 'react';
import {ColorValue, StyleSheet, Text, View} from 'react-native';
import transakConfig from '../configs/transakConfig';
import {AppStackParamsList} from '../types/screens';

interface WebViewProps
  extends NativeStackScreenProps<AppStackParamsList, 'RN_WEBVIEW'> {}

const WebViewScreen: React.FC<WebViewProps> = ({}) => {
  const [borderColor] = useState<ColorValue>('purple');
  const [partnerOrderId, setPartnerOrderId] = useState<string>('');
  const [currentPath, setCurrentPath] = useState<string>('');

  useEffect(() => {
    const userEmail = transakConfig.email || '';

    function generateUniqueId() {
      return Date.now();
    }

    function getOrderId(uId: string) {
      const uniqueNumber = generateUniqueId();
      const emailParts = uId.split('@');
      const uniqueEmail = `${emailParts[0]}${uniqueNumber}@${emailParts[1]}`;
      return uniqueEmail;
    }

    const uniqueEmail = getOrderId(userEmail);
    setPartnerOrderId(uniqueEmail);
  }, []);

  const config = {
    // baseUrl: 'http://192.168.0.139:5005',
    baseUrl: 'https://global-stg.transak.com',
    ...transakConfig,
    partnerOrderId,
  };

  const constructQueryParams = (configObj: Record<string, any>) => {
    return Object.entries(configObj)
      .map(([key, value]) =>
        !['environment', 'baseUrl'].includes(key)
          ? `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
          : null,
      )
      .filter(item => item !== null)
      .join('&');
  };

  const urlWithParams = `${config.baseUrl}/?${constructQueryParams(config)}`;

  console.log('config', urlWithParams);

  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      flex: 1,
    },
    transakWebview: {
      flex: 1,
      flexGrow: 1,
    },
    webviewContainer: {
      borderColor,
      borderWidth: 5,
      flex: 1,
      flexGrow: 1,
    },
    partnerOrderIdText: {
      color: 'red',
      textAlign: 'center',
      margin: 10,
    },
  });
  const handleWebViewMessage = (event: any) => {
    // console.log('Webview >>>>', event);
    if (!event?.nativeEvent?.data) return;
    const message = JSON.parse(event.nativeEvent.data);

    console.log(`------------------start-------------------`);
    console.log(`[WebView Event] Event ID: ${message.event_id}`);
    console.log(`[WebView Event] Event Data:`, message.data);
    console.log(`------------------end-------------------`);

    // if (message.event_id === 'TRANSAK_WIDGET_CLOSE') {
    //   const eventData = message.data || {};
    //   // setTableData({
    //   //   crypto: eventData.cryptoCurrency,
    //   //   network: eventData.network,
    //   //   offRampStreamWalletAddress: eventData.walletAddress,
    //   //   withdrawalInstrument: eventData.withdrawalInstrument,
    //   //   withdrawalMethod: eventData.withdrawalMethod,
    //   // });
    //   console.log(eventData);

    //   // navigation.navigate('preview', {tableData: eventData});
    // } else {
    //   console.log('Unhandled WebView Event:', message.event_id, message.data);
    // }
  };
  const handleNavigationStateChange = (navState: any) => {
    console.log('navState', navState);
    const newPath = navState.url;
    console.log('newPath', newPath);
    if (newPath?.pathname !== currentPath) {
      console.log('Path changed to:', newPath);
      // Alert.alert('Path Changed', `New Path: ${newPath}`);
      setCurrentPath(newPath.pathname);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.partnerOrderIdText}>
        Partner Order ID: {partnerOrderId}
      </Text>

      {partnerOrderId && (
        <View style={styles.webviewContainer}>
          <WebView
            source={{uri: urlWithParams}}
            style={styles.transakWebview}
            onNavigationStateChange={handleNavigationStateChange}
            // mixedContentMode="always"
            onMessage={handleWebViewMessage}
            useWebKit={true}
            javaScriptEnabled={true}
            domStorageEnabled={true}
          />
        </View>
      )}
    </View>
  );
};

export default WebViewScreen;
