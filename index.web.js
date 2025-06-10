/**
 * Web entry point for our React Native calculator
 * This file is specifically for running the app in a web browser
 */
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './package.json';

// Register the main App component for web
AppRegistry.registerComponent(appName, () => App);

// Run the app in the web browser
AppRegistry.runApplication(appName, {
  initialProps: {},
  rootTag: document.getElementById('root'),
}); 