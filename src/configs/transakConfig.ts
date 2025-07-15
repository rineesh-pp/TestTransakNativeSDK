import {Environments, TransakConfig} from '@transak/react-native-sdk';

export default {
  environment: 'STAGING' as Environments.STAGING,
  // apiKey: 'a2374be4-c59a-400e-809b-72c226c74b8f',
  apiKey: '2c43db39-94db-4018-8ad2-68bfda5bbb87', // dev apiKey
  walletAddress: '0xfF21f4F75ea2BbEf96bC999fEB5Efec98bB3f6F4',
  fiatCurrency: 'GBP',
  fiatAmount: 33,
  email: 'geyebi1152@exoacre.com',
  // partnerOrderId: 'test_id',
  redirectURL: 'https://tagocash-b73ac.firebaseapp.com/?depositTXN=true',
} as TransakConfig;
