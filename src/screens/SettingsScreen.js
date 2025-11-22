
import { useContext } from 'react';
import { View, Button, Alert, StyleSheet, Text } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { TermsContext } from '../context/TermsContext';

export default function SettingsScreen() {
  const { terms, setTerms } = useContext(TermsContext);

  const handleExport = async () => {
    try {
      const json = JSON.stringify(terms, null, 2);
      await Clipboard.setStringAsync(json);
      Alert.alert('Export', 'All terms copied to clipboard as JSON.');
    } catch (err) {
      Alert.alert('Export failed', 'Could not copy to clipboard.');
    }
  };

  const handleClear = () => {
    Alert.alert('Clear all', 'This will delete all terms. Proceed?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => setTerms([]) }
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>
      <Button title="Copy all terms (JSON) to clipboard" onPress={handleExport} />
      <View style={{ height: 12 }} />
      <Button title="Clear all terms" color="red" onPress={handleClear} />
    </View>
  );
}

//stylesheet for the settings screen
const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  header: { fontSize: 25, fontFamily:'Georgia', fontWeight: 'bold', marginBottom: 20, color: '#333' },
  info: { marginBottom: 16, color: '#555' }
});
