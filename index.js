/**
 * This is the entry point for our React Native app
 * It tells React Native which component to show when the app starts
 */
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './package.json';

// Register the main App component with React Native
AppRegistry.registerComponent(appName, () => App); 