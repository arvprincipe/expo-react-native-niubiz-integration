import React from 'react';
import { StyleSheet } from 'react-native';
import RoutesNavigation from './src/routes/navigation';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <RoutesNavigation />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
