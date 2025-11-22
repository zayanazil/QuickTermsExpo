import { useContext } from 'react';
import { View, Text, Alert, StyleSheet, TouchableOpacity} from 'react-native';
import { TermsContext } from '../context/TermsContext'; 
import CategoryBadge from '../components/CategoryBadge'; 

export default function TermDetailScreen({ route, navigation }) {
  //term is passed via navigation params from the previous screen
  const { term } = route.params;
  const { deleteTerm } = useContext(TermsContext);

  //handler for deleting the term with a confirmation alert
  const handleDelete = () => {
    Alert.alert(
      'Delete term',           // alert title
      'Are you sure?',         // alert message
      [
        { text: 'Cancel', style: 'cancel' }, 
        {
          text: 'Delete',
          style: 'destructive',               
          onPress: () => {
            //call context function to delete the term by id
            deleteTerm(term.id);
            //after deletion navigate back to the Home screen
            navigation.navigate('Home');
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Term title */}
      <Text style={styles.title}>{term.term}</Text>

      {/* Category badge component */}
      <CategoryBadge category={term.category} />

      {/* Term definition */}
      <Text style={styles.definition}>{term.definition}</Text>

      {/* Edit button */}
      <TouchableOpacity 
        style={[styles.button, styles.editButton]} 
        onPress={() => navigation.navigate('EditTerm', { term })}
      >
        <Text style={styles.buttonText}>Edit</Text>
      </TouchableOpacity>

      {/* Delete button */}
      <TouchableOpacity 
        style={[styles.button, styles.deleteButton]} 
        onPress={handleDelete}
      >
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}

//styles used in the screen
const styles = StyleSheet.create({
  container: { padding: 30 },                 
  title: { fontSize: 25, fontWeight: 'bold', fontFamily:'Georgia', marginBottom: 10, color: '#333' },
  definition: {   
      backgroundColor: '#fff',
      padding: 16,
      borderRadius: 10,
      marginBottom: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      elevation: 2,
      marginTop: 20,
  }, // Definition styling
  button: {
    backgroundColor: '#F5CB5C',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#F5CB5C',
    marginTop: 50   
  },
  deleteButton: {
    backgroundColor: '#FF3B30', 
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
