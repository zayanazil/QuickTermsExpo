import { useContext, useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { TermsContext } from '../context/TermsContext';
import { CategoriesContext } from '../context/CategoriesContext';
import CategorySelect from '../components/CategorySelect';

export default function EditTermScreen({ route, navigation }) {
  const { term } = route.params;
  const { editTerm } = useContext(TermsContext);
  const { categories } = useContext(CategoriesContext);

  //set initial form values from selected term
  const [t, setT] = useState(term.term);
  const [definition, setDefinition] = useState(term.definition);

  //add category state
  const [category, setCategory] = useState(term.category);

  //save changes back into TermsContext
  const handleSave = () => {
    if (!t.trim() || !definition.trim()) return;

    editTerm(term.id, {
      ...term,
      term: t.trim(),
      definition: definition.trim(),
      category: category, 
    });

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Term"
        value={t}
        onChangeText={setT}
        style={styles.input}
      />

      <TextInput
        placeholder="Definition"
        value={definition}
        onChangeText={setDefinition}
        style={[styles.input, styles.textarea]}
        multiline
      />

      {/* Category selector component */}
      <CategorySelect
        value={category}
        onChange={setCategory}
        options={categories}
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
}

//stylesheet for the edit term screen
const styles = StyleSheet.create({
  container: { padding: 20 },
  input: {
      backgroundColor: '#fff',
      padding: 16,
      borderRadius: 10,
      marginBottom: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      elevation: 2,
  },
  textarea: { height: 120 },
  button: {
    backgroundColor: '#F5CB5C',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
