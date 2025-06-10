/**
 * This is our main App component
 * Think of it as the "container" that holds our entire calculator
 */
import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import Calculator from './components/Calculator';

// This is a TypeScript "function component"
// It's like a blueprint that tells React what to show on screen
const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <Calculator />
    </SafeAreaView>
  );
};

// These are our styles - like CSS for React Native
// They tell our app how things should look
const styles = StyleSheet.create({
  container: {
    flex: 1, // Takes up the full screen
    backgroundColor: '#000000', // Black background like macOS calculator
  },
});

export default App; 