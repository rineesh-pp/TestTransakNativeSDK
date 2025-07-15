import React from 'react';
import {Button, Linking, View} from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';

const InAppBrowserTest = () => {
  const openBrowser = async () => {
    try {
      const url = 'https://transak.com';
      if (await InAppBrowser.isAvailable()) {
        await InAppBrowser.open(url, {
          // Options (optional)
          dismissButtonStyle: 'close',
          toolbarColor: '#6200EE',
          secondaryToolbarColor: 'black',
        });
      } else {
        // Fallback to Linking.openURL if InAppBrowser is not available
        Linking.openURL(url);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Button title="Open Browser" onPress={openBrowser} />
    </View>
  );
};

export default InAppBrowserTest;
