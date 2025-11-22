import { useContext, useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { TermsContext } from '../context/TermsContext';
import { CategoriesContext } from '../context/CategoriesContext';
import generateId from '../utils/generateID';
import CategorySelect from '../components/CategorySelect';

export default function AddTermScreen({ navigation }) {
  const { addTerm } = useContext(TermsContext);
  const { categories } = useContext(CategoriesContext);
  
  const [term, setTerm] = useState('');
  const [definition, setDefinition] = useState('');
  //state for selected category (defaults to first category if available)
  const [category, setCategory] = useState(categories.length > 0 ? categories[0] : '');

  //function to handle saving a new term
  const handleSave = () => {
    if (!term.trim() || !definition.trim()) return;
    
    //add the new term to the context
    addTerm({
      id: generateId(),
      term: term.trim(),
      definition: definition.trim(),
      category,
    });
    
    //return to previous screen
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* input field for the term */}
      <TextInput placeholder="Term" value={term} onChangeText={setTerm} style={styles.input} />
      
      {/* input field for the definition */}
      <TextInput placeholder="Definition" value={definition} onChangeText={setDefinition} style={[styles.input, styles.textarea]} multiline />

      {/* dropdown to select a category */}
      <CategorySelect
        value={category}
        onChange={setCategory}
        options={categories}
      />

      {/* save */}
      <Button title="Save Term" onPress={handleSave} />
    </View>
  );
}

//stylesheet for add term screen
const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  input: { backgroundColor: '#eee', padding: 12, borderRadius: 10, marginBottom: 10 },
  textarea: { height: 120 },
});
