import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleProp,
  ViewStyle,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import AppNavigator from './src/routes/AppNavigator';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle: StyleProp<ViewStyle> = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <AppNavigator />
    </SafeAreaView>
  );
};

export default App;
