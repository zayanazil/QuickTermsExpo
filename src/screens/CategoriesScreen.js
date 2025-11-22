import { useContext, useMemo, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    TextInput,
    Alert
} from 'react-native';

//import both contexts (TermsContext + CategoriesContext)
import { TermsContext } from '../context/TermsContext';
import { CategoriesContext } from '../context/CategoriesContext';

export default function CategoriesScreen({ navigation }) {

    //access the categories from CategoriesContext and the list of terms from TermsContext
    const { terms } = useContext(TermsContext);
    const { categories, addCategory, deleteCategory } = useContext(CategoriesContext);

    //state to hold the text input for creating a new category
    const [newCategory, setNewCategory] = useState('');

    //useMemo is used to calculate category counts efficiently.
    const categoryCounts = useMemo(() => {
        const counts = {};
        categories.forEach(cat => {
            //count terms that match the current category
            counts[cat] = terms.filter(t => t.category === cat).length;
        });
        return counts;
    }, [terms, categories]);

    //when user taps "Add", a new category is created (if valid)
    const handleAddCategory = () => {
        if (newCategory.trim().length === 0) {
            Alert.alert("Error", "Please enter a category name");
            return;
        }

        addCategory(newCategory.trim());
        setNewCategory('');              //clear input after adding
    };

    //show confirmation popup before deleting a category
    const handleDeleteCategory = (category) => {
        Alert.alert(
            "Delete Category",
            `Are you sure you want to delete "${category}"?`,
            [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", style: "destructive", onPress: () => deleteCategory(category) }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Categories</Text>

            {/* input + add */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Add new category"
                    value={newCategory}
                    onChangeText={setNewCategory}
                />
                <TouchableOpacity style={styles.addButton} onPress={handleAddCategory}>
                    <Text style={styles.addButtonText}>Add</Text>
                </TouchableOpacity>
            </View>

            {/* list categories w/ count */}
            <FlatList
                data={categories}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() =>
                            navigation.navigate('CategoryDetail', { category: item })
                        }
                    >
                        <View style={styles.cardContent}>
                            {/* category name + terms */}
                            <View>
                                <Text style={styles.categoryName}>{item}</Text>
                                <Text style={styles.countText}>{categoryCounts[item]} terms</Text>
                            </View>

                            {/* delete */}
                            <TouchableOpacity onPress={() => handleDeleteCategory(item)}>
                                <Text style={styles.deleteButton}>✕</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

//stylesheet for the categories screen
const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#E8EDDF' },
    header: { fontSize: 25, fontFamily:'Georgia', fontWeight: 'bold', marginBottom: 20, color: '#333' },
    inputContainer: { flexDirection: 'row', marginBottom: 20, gap: 10 },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        backgroundColor: '#fff',
    },
    addButton: {
        backgroundColor: '#F5CB5C',
        paddingHorizontal: 16,
        borderRadius: 8,
        justifyContent: 'center'
    },
    addButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
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
    cardContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    categoryName: { fontSize: 18, fontWeight: 'bold', marginBottom: 4, color: '#333' },
    countText: { fontSize: 14, color: '#999' },
    deleteButton: { fontSize: 20, color: '#ff4444', fontWeight: 'bold', padding: 8 },
});
