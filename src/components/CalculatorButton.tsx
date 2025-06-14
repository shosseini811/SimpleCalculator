/**
 * This is our CalculatorButton component
 * It represents a single button on the calculator (like "1", "+", "AC", etc.)
 */
import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

// TypeScript interface - this defines what "props" our button can receive
// Props are like settings you can pass to a component
interface CalculatorButtonProps {
  title: string; // The text shown on the button
  onPress: () => void; // What happens when you press the button
  type: 'number' | 'operator' | 'function'; // What kind of button it is
  isWide?: boolean; // Optional: should the button be wide? (like the 0 button)
}

// Our button component
// What React.FC<YourProps> gives you • Type-checks the component’s props: YourProps.
const CalculatorButton: React.FC<CalculatorButtonProps> = ({
  title,
  onPress,
  type,
  isWide = false, // Default to false if not specified
}) => {
  // Choose the button style based on the type
  //  the function dynamically composes the correct background color 
  // and width for each button depending on its role.
  const getButtonStyle = () => {
    // styles.button is the common “default” style object for every calculator key (padding, border-radius, etc.).
    const baseStyle: any[] = [styles.button];
    
    if (isWide) {
      baseStyle.push(styles.wideButton);
    }
    
    switch (type) {
      case 'operator':
        baseStyle.push(styles.operatorButton);
        break;
      case 'function':
        baseStyle.push(styles.functionButton);
        break;
      default:
        baseStyle.push(styles.numberButton);
    }
    
    return baseStyle;
  };

  // Choose the text style based on the type
  const getTextStyle = () => {
    switch (type) {
      case 'operator':
        return styles.operatorText;
      case 'function':
        return styles.functionText;
      default:
        return styles.numberText;
    }
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      activeOpacity={0.7} // Makes button slightly transparent when pressed
    >
      {/*
        Render the button label.
        - `title` is the text passed from the parent component (e.g., "7", "+", "AC").
      */}
      <Text style={getTextStyle()}>{title}</Text>
    </TouchableOpacity>
  );
};

// Styles for our buttons
const styles = StyleSheet.create({
  button: {
    flex: 1,
    height: 80,
    marginHorizontal: 5,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wideButton: {
    flex: 2, // Takes up twice the space
  },
  numberButton: {
    backgroundColor: '#333333', // Dark gray for numbers
  },
  operatorButton: {
    backgroundColor: '#ff9500', // Orange for operators (+, -, ×, ÷, =)
  },
  functionButton: {
    backgroundColor: '#a6a6a6', // Light gray for functions (AC, +/-, %)
  },
  numberText: {
    fontSize: 32,
    color: '#ffffff', // White text
    fontWeight: '400',
  },
  operatorText: {
    fontSize: 32,
    color: '#ffffff', // White text
    fontWeight: '600',
  },
  functionText: {
    fontSize: 32,
    color: '#000000', // Black text for function buttons
    fontWeight: '400',
  },
});

export default CalculatorButton; 