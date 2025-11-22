import { View, TextInput, StyleSheet } from 'react-native';

//simple search bar component
export default function SearchBar({ query, setQuery }) {
  return (
    <View style={styles.container}>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search terms..."
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 8 },
  input: {
    backgroundColor: '#eee',
    padding: 12,
    borderRadius: 10
  }
});
