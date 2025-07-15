import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  EventTypes,
  Events,
  Order,
  TransakConfig,
  TransakWebView,
} from '@transak/react-native-sdk';
import React, {useEffect, useState} from 'react';
import {ColorValue, StyleSheet, Text, View} from 'react-native';
import transakConfig from '../configs/transakConfig';
import {AppStackParamsList} from '../types/screens';

interface PaymentScreenProps
  extends NativeStackScreenProps<AppStackParamsList, 'PAYMENT'> {}

const PaymentScreen: React.FC<PaymentScreenProps> = ({navigation}) => {
  const [borderColor, setBorderColor] = useState<ColorValue>('black');
  const [partnerOrderId, setPartnerOrderId] = useState<string>('');

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
    ...transakConfig,
    partnerOrderId,
  } as TransakConfig;

  console.log(config);

  const onTransakEventHandler = (event: EventTypes, data: Order) => {
    console.log('Event >>>', event, data);
    switch (event) {
      case Events.ORDER_CREATED:
        // API call to register ORDER_CREATED
        setBorderColor('yellow');
        break;

      case Events.ORDER_PAYMENT_VERIFYING:
        // API call to register ORDER_PAYMENT_VERIFYING
        setBorderColor('green');
        break;

      case Events.ORDER_PROCESSING:
        // API call to register ORDER_PROCESSING
        setBorderColor('purple');
        // navigation.navigate('HOME');
        break;

      case Events.ORDER_COMPLETED:
        setBorderColor('orange');
        navigation.navigate('HOME');
        break;

      case Events.ORDER_FAILED:
        setBorderColor('red');
        navigation.navigate('ERROR');
        break;

      default:
        console.log(event, data);
    }
  };

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
    },
    partnerOrderIdText: {
      color: 'red',
      textAlign: 'center',
      margin: 10,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.partnerOrderIdText}>
        Partner Order ID: {partnerOrderId}
      </Text>

      {partnerOrderId && (
        <TransakWebView
          transakConfig={config}
          onTransakEvent={onTransakEventHandler}
          style={styles.transakWebview}
          containerStyle={styles.webviewContainer}
        />
      )}
    </View>
  );
};

export default PaymentScreen;
