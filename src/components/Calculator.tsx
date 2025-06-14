/**
 * This is our Calculator component
 * It contains all the calculator buttons and logic
 */
import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CalculatorButton from './CalculatorButton';

// TypeScript types help us catch errors
// This tells TypeScript what our Calculator component looks like
const Calculator: React.FC = () => {
  // useState is a "hook" that lets us store data that can change
  // Think of it like a variable that the component remembers

  // This line gives the display its initial value of "0"
  const [display, setDisplay] = useState('0'); // What shows on the screen
  const [previousValue, setPreviousValue] = useState<number | null>(null); // The last number entered
  const [operation, setOperation] = useState<string | null>(null); // What operation (+, -, etc.)

  // `waitingForNewValue` acts like the "clear display on next digit" flag used by real calculators.
  // true  -> the very next digit (or decimal) will REPLACE the current display, starting a fresh number.
  // false -> the digit will be APPENDED to whatever is already on the display.
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  // This function handles when someone presses a number button
  const handleNumberPress = (num: string) => {
    if (waitingForNewValue) {
      // If we're waiting for a new number, replace the display
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      // Otherwise, add the number to what's already there
      setDisplay(display === '0' ? num : display + num);
    }
  };

  // This function handles operation buttons (+, -, ×, ÷)
  const handleOperationPress = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    // First time an operator is pressed:
    // - `previousValue` is still null, meaning no left-hand operand has
    //   been stored yet.
    // - We capture the number currently visible on the display
    //   (`inputValue`) and put it into `previousValue` so that when the
    //   user later types the second number and presses "=" (or another
    //   operator) we can evaluate:
    //       previousValue  <operator>  newNumber
    //   Without this step the calculator would forget the first operand
    //   and be unable to perform the calculation.
    if (previousValue === null) {
      // If this is the first operation, just store the current value
      setPreviousValue(inputValue);
    } else if (operation) {
      // If there's already an operation waiting, calculate the result
      // previousValue is typed number | null.
      // If previousValue already holds a number (most cases), currentValue just becomes that number.
      // If for some reason previousValue is still null or undefined (e.g., the user hit an operator twice in a row before entering a number), 
      // the logical-OR operator (||) falls back to 0.
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);
      
      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForNewValue(true); // tell Calculator that the next digit should start a new number (clear display)
    setOperation(nextOperation);
  };

  // This function does the actual math calculations
  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      default:
        return secondValue;
    }
  };

  // Handle the equals button
  const handleEqualsPress = () => {
    if (operation && previousValue !== null) {
      const inputValue = parseFloat(display);
      const newValue = calculate(previousValue, inputValue, operation);
      
      setDisplay(String(newValue));
      setPreviousValue(null);
      // Clear the stored operation so a new calculation chain
      // starts with a clean state. If we leave the previous
      // operator here, pressing "=" again or entering a new number
      // could result in the old operator being unintentionally reused,
      // and the guard `if (operation && previousValue !== null)` would
      // fail, making the calculator appear unresponsive.
      setOperation(null); // reset operator so the next calculation starts clean
      setWaitingForNewValue(true); // next digit press will overwrite the result instead of appending
    }
  };

  // Handle the clear button (AC)
  const handleClearPress = () => {
    setDisplay('0');
    setPreviousValue(null);
    // Clear the pending operator for the same reason explained above:
    // we don't want any stale operator affecting the next input.
    setOperation(null); // ensure no leftover operator remains
    setWaitingForNewValue(false);
  };

  // Handle the plus/minus button
  const handlePlusMinusPress = () => {
    const value = parseFloat(display);
    setDisplay(String(value * -1));
  };

  // Handle the percentage button
  const handlePercentagePress = () => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  };

  // Handle the decimal point button
  const handleDecimalPress = () => {
    if (waitingForNewValue) {
      setDisplay('0.');
      setWaitingForNewValue(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  // This is what gets shown on the screen
  return (
    <View style={styles.container}>
      {/* The display screen at the top */}
      <View style={styles.displayContainer}>
        {/* The UI renders the `display` state here so the user sees the current input/result */}
        <Text style={styles.displayText}>{display}</Text>
      </View>

      {/* The buttons arranged in rows */}
      <View style={styles.buttonContainer}>
        {/* First row: AC, +/-, %, ÷ */}
        <View style={styles.row}>
          <CalculatorButton
            title="AC"
            onPress={handleClearPress}
            type="function"
          />
          <CalculatorButton
            title="+/-"
            onPress={handlePlusMinusPress}
            type="function"
          />
          <CalculatorButton
            title="%"
            onPress={handlePercentagePress}
            type="function"
          />
          <CalculatorButton
            title="÷"
            onPress={() => handleOperationPress('÷')}
            type="operator"
          />
        </View>

        {/* Second row: 7, 8, 9, × */}
        <View style={styles.row}>
          <CalculatorButton
            title="7"
            onPress={() => handleNumberPress('7')}
            type="number"
          />
          <CalculatorButton
            title="8"
            onPress={() => handleNumberPress('8')}
            type="number"
          />
          <CalculatorButton
            title="9"
            onPress={() => handleNumberPress('9')}
            type="number"
          />
          <CalculatorButton
            title="×"
            onPress={() => handleOperationPress('×')}
            type="operator"
          />
        </View>

        {/* Third row: 4, 5, 6, - */}
        <View style={styles.row}>
          <CalculatorButton
            title="4"
            onPress={() => handleNumberPress('4')}
            type="number"
          />
          <CalculatorButton
            title="5"
            onPress={() => handleNumberPress('5')}
            type="number"
          />
          <CalculatorButton
            title="6"
            onPress={() => handleNumberPress('6')}
            type="number"
          />
          <CalculatorButton
            title="-"
            onPress={() => handleOperationPress('-')}
            type="operator"
          />
        </View>

        {/* Fourth row: 1, 2, 3, + */}
        <View style={styles.row}>
          <CalculatorButton
            title="1"
            onPress={() => handleNumberPress('1')}
            type="number"
          />
          <CalculatorButton
            title="2"
            onPress={() => handleNumberPress('2')}
            type="number"
          />
          <CalculatorButton
            title="3"
            onPress={() => handleNumberPress('3')}
            type="number"
          />
          <CalculatorButton
            title="+"
            onPress={() => handleOperationPress('+')}
            type="operator"
          />
        </View>

        {/* Fifth row: 0 (wide), ., = */}
        <View style={styles.row}>
          <CalculatorButton
            title="0"
            onPress={() => handleNumberPress('0')}
            type="number"
            isWide={true}
          />
          <CalculatorButton
            title="."
            onPress={handleDecimalPress}
            type="number"
          />
          <CalculatorButton
            title="="
            onPress={handleEqualsPress}
            type="operator"
          />
        </View>
      </View>
    </View>
  );
};

// Styles for our calculator layout
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 20,
  },
  displayContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingRight: 20,
    paddingBottom: 20,
  },
  displayText: {
    fontSize: 64,
    color: '#ffffff',
    fontWeight: '200',
  },
  buttonContainer: {
    flex: 2,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
  },
});

export default Calculator; 