import { useContext, useState } from 'react';
import { View, FlatList, TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { TermsContext } from '../context/TermsContext';
import TermCard from '../components/TermCard';
import SearchBar from '../components/SearchBar';

export default function HomeScreen({ navigation }) {
  const { terms, loading } = useContext(TermsContext);
  const [query, setQuery] = useState('');

  //filter terms by the search query (case-insensitive)
  const filtered = terms.filter(t =>
    t.term.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* simple search bar that updates query */}
      <SearchBar query={query} setQuery={setQuery} />

      {/* show spinner while loading, otherwise show the list */}
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            //card for each term and you can tap to open details
            <TermCard
              cardStyle={styles.card}
              term={item}
              onPress={() => navigation.navigate('TermDetail', { term: item })}
            />
          )}
          ListEmptyComponent={<Text style={styles.empty}>No terms yet; tap + to add.</Text>}
        />
      )}

      {/* floating button to add a new term */}
      <TouchableOpacity
        onPress={() => navigation.navigate('AddTerm')}
        style={styles.fab}
      >
        <Text style={{ color: '#fff', fontSize: 28 }}>＋</Text>
      </TouchableOpacity>
    </View>
  );
}

//styklesheet for the home screen
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  fab: {
    position: 'absolute', bottom: 24, right: 20,
    backgroundColor: '#242423', padding: 16, borderRadius: 30, elevation: 3
  },
  empty: { textAlign: 'center', marginTop: 20, color: '#666' },
});
