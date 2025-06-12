/**
 * This is the entry point for our React Native app
 * It tells React Native which component to show when the app starts
 */
import {AppRegistry} from 'react-native';
import App from './src/App';
// React Native’s AppRegistry.registerComponent needs a string 
// that identifies the app when the native code boots it. 
import {name as appName} from './package.json';

// Register the main App component with React Native
// When your iOS/Android app boots, the native code asks JavaScript, 
// “Give me the component registered under the name stored in appName.”
//  The AppRegistry finds that name, executes () => App, receives the App component, 
// and mounts it as the root of your application’s UI tree.

AppRegistry.registerComponent(appName, () => App); 