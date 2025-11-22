import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { TermsContext } from '../context/TermsContext';

export default function CategoryDetailScreen({ route, navigation }) {
    const { category } = route.params;
    const { terms, deleteTerm } = useContext(TermsContext);

    //filter terms to only show ones in this category
    const filteredTerms = terms.filter(t => t.category === category);

    return (
        <View style={styles.container}>
            {/* display category title */}
            <Text style={styles.header}>{category}</Text>

            {/* show list of terms */}
            <FlatList
                data={filteredTerms}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    //each term card
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() =>
                            navigation.navigate('TermDetail', { term: item })
                        }
                    >
                        <Text style={styles.termName}>{item.term}</Text>
                        <Text style={styles.definition}>{item.definition}</Text>

                        <TouchableOpacity
                            style={styles.deleteBtn}
                            onPress={() => deleteTerm(item.id)}
                        >
                            <Text style={styles.deleteText}>Delete</Text>
                        </TouchableOpacity>

                    </TouchableOpacity>
                )}
            />

            {/* button to add a new term in this category */}
            <TouchableOpacity
                style={styles.addBtn}
                onPress={() => navigation.navigate('AddTerm')}
            >
                <Text style={styles.addText}>+ Add Term</Text>
            </TouchableOpacity>
        </View>
    );
}

//styles for the category detail screen
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#E8EDDF' },
  header: { fontSize: 25, fontFamily:'Georgia', fontWeight: 'bold', marginBottom: 20, color: '#333' },
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
  termName: { fontSize: 18, fontWeight: 'bold' },
  definition: { fontSize: 14, color: '#444', marginBottom: 10 },
  deleteBtn: {
    backgroundColor: '#FF3B30',
    paddingVertical: 6,
    borderRadius: 8,
    marginTop: 6,
    alignItems: 'center',
  },
  deleteText: { color: '#fff', fontWeight: '600' },
  addBtn: {
    backgroundColor: '#F5CB5C',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  addText: { color: '#00000', fontSize: 16, fontWeight: '600' },
});
