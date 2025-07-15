import * as react from 'react';
import * as react_native_webview_lib_WebViewTypes from 'react-native-webview/lib/WebViewTypes';
import { WebView } from 'react-native-webview';

declare enum Environments {
    STAGING = "STAGING",
    PRODUCTION = "PRODUCTION"
}

type User = {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  dob: string;
  address: {
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    postCode: string;
    countryCode: string;
  };
};

type WalletAddresses = {
  networks?: Record<string, { address: string; addressAdditionalData?: string }>;
  coins?: Record<string, { address: string; addressAdditionalData?: string }>;
};

type NFT = {
  tokenID: string[];
  collectionAddress: string;
  price: number[];
  quantity: number;
  nftType: string;
  nftName?: string;
  imageURL?: string;
};

type ColorMode = 'LIGHT' | 'DARK';

type SourceTokenData = {
  sourceTokenCode: string;
  sourceTokenAmount: number;
};

type CryptoCurrencyData = {
  cryptoCurrencyCode: string;
  cryptoCurrencyName: string;
  cryptoCurrencyImageURL: string;
};

type TokenData = {
  tokenID: string[];
  collectionAddress: string;
  marketplace: string;
  normalizeRoyalties: boolean;
  nftName?: string;
  imageURL?: string;
};

type QueryParams = {
  apiKey: string;
  exchangeScreenTitle?: string;
  productsAvailed?: string | string[];
  defaultFiatCurrency?: string;
  fiatCurrency?: string;
  countryCode?: string;
  excludeFiatCurrencies?: string | string[];
  defaultNetwork?: string;
  network?: string;
  networks?: string | string[];
  defaultPaymentMethod?: string;
  paymentMethod?: string;
  disablePaymentMethods?: string | string[];
  defaultCryptoAmount?: number;
  defaultCryptoCurrency?: string;
  cryptoCurrencyCode?: string;
  cryptoCurrencyList?: string | string[];
  isFeeCalculationHidden?: boolean;
  hideExchangeScreen?: boolean;
  email?: string;
  userData?: User;
  isAutoFillUserData?: boolean;
  themeColor?: string;
  hideMenu?: boolean;
  redirectURL?: string;
  partnerOrderId?: string;
  partnerCustomerId?: string;
  defaultFiatAmount?: number;
  fiatAmount?: number;
  walletAddress?: string;
  walletAddressesData?: WalletAddresses;
  disableWalletAddressForm?: boolean;
  isNFT?: boolean;
  tokenId?: number;
  tradeType?: string;
  contractAddress?: string;
  calldata?: string;
  smartContractAddress?: string;
  nftData?: NFT[];
  estimatedGasLimit?: number;
  cryptoAmount?: number;
  walletRedirection?: boolean;
  referrerDomain?: string;
  colorMode?: ColorMode;
  backgroundColors?: string | string[];
  textColors?: string | string[];
  borderColors?: string | string[];
  isTransakOne?: boolean;
  sourceTokenData?: SourceTokenData[];
  cryptoCurrencyData?: CryptoCurrencyData[];
  contractId?: string;
  tokenData?: TokenData[];
  isTransakStreamOffRamp?: boolean;
};

type PaymentOptionField = {
  name: string;
  value: string;
};

type PaymentOption = {
  currency: string;
  id: string;
  name: string;
  fields: PaymentOptionField[];
};

type CardPaymentData = {
  orderId: string;
  paymentId: string;
  pgData: {
    paymentOptions: PaymentOption[];
    liquidityProvider: string;
    status: string;
  };
  liquidityProvider: string;
  updatedAt: string;
};

type StatusHistory = {
  status: string;
  createdAt: string;
  message: string;
  isEmailSentToUser: boolean;
  partnerEventId: string;
};

type Order = {
  id: string;
  walletAddress: string;
  createdAt: string;
  status: string;
  fiatCurrency: string;
  userId: string;
  cryptoCurrency: string;
  isBuyOrSell: string;
  fiatAmount: number;
  ipAddress: string;
  amountPaid: number;
  paymentOptionId: string;
  walletLink: string;
  orderProcessingType: string;
  addressAdditionalData: boolean;
  network: string;
  conversionPrice: number;
  cryptoAmount: number;
  totalFeeInFiat: number;
  fiatAmountInUsd: number;
  countryCode: string;
  referenceCode: number;
  paymentOptions: PaymentOption[];
  autoExpiresAt: string;
  stateCode: string;
  userKycType: string;
  cardPaymentData: CardPaymentData;
  statusHistories: StatusHistory[];
};

declare enum Events {
    ORDER_CREATED = "ORDER_CREATED",
    ORDER_PAYMENT_VERIFYING = "ORDER_PAYMENT_VERIFYING",
    ORDER_PROCESSING = "ORDER_PROCESSING",
    ORDER_COMPLETED = "ORDER_COMPLETED",
    ORDER_FAILED = "ORDER_FAILED"
}

type EventTypes = keyof typeof Events;

type TransakConfig = {
  environment: Environments.STAGING | Environments.PRODUCTION;
} & QueryParams;

type OnTransakEvent = (event: EventTypes, data: Order) => void;

declare const TransakWebView: react.ForwardRefExoticComponent<{
    transakConfig: TransakConfig;
    onTransakEvent: OnTransakEvent;
} & react_native_webview_lib_WebViewTypes.IOSWebViewProps & react_native_webview_lib_WebViewTypes.AndroidWebViewProps & react_native_webview_lib_WebViewTypes.WindowsWebViewProps & react.RefAttributes<WebView<{}>>>;

export { Environments, type EventTypes, Events, type Order, type TransakConfig, TransakWebView };
