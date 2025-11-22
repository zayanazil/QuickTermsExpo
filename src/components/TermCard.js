import { Text, TouchableOpacity, StyleSheet } from 'react-native';

//simple term card component for displaying term in a list
export default function TermCard({ term, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Text style={styles.title}>{term.term}</Text>
      <Text style={styles.definition} numberOfLines={1}>{term.definition}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
      backgroundColor: '#fff',
      padding: 16,
      borderRadius: 10,
      marginBottom: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      elevation: 2,
  },
  title: { fontSize: 18, fontWeight: '700' },
  definition: { color: '#555', marginTop: 6 }
});
