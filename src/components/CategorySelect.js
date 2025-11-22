import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet
} from 'react-native';

export default function CategorySelect({ value, onChange, options }) {
  const [open, setOpen] = useState(false);

  //if the incoming category value somehow doesn't exist anymore
  const displayedValue = value || (options.length > 0 ? options[0] : "Select");

  return (
    <View>
      {/* selector button shown on form */}
      <TouchableOpacity style={styles.selector} onPress={() => setOpen(true)}>
        <Text style={styles.selectorText}>{displayedValue}</Text>
      </TouchableOpacity>

      {/* modal bottom sheet */}
      <Modal
        visible={open}
        animationType="slide"
        transparent
        onRequestClose={() => setOpen(false)}
      >
        <View style={styles.backdrop}>
          <View style={styles.sheet}>
            <Text style={styles.title}>Choose a Category</Text>

            {/* list all categories dynamically from CategoriesContext */}
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => {
                    onChange(item);   //return new value to parent screen
                    setOpen(false);  
                  }}
                >
                  <Text style={styles.optionText}>{item}</Text>
                </TouchableOpacity>
              )}
            />

            {/* Cancel button */}
            <TouchableOpacity
              onPress={() => setOpen(false)}
              style={styles.cancel}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

//stylesheet for the category select component
const styles = StyleSheet.create({
  selector: {
    backgroundColor: '#eee',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  selectorText: {
    fontSize: 16,
    color: '#333'
  },

  backdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  sheet: {
    backgroundColor: 'white',
    borderTopRightRadius: 14,
    borderTopLeftRadius: 14,
    padding: 16,
    maxHeight: '60%',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10
  },

  option: {
    paddingVertical: 12,
    borderBottomColor: '#eee',
    borderBottomWidth: 1
  },
  optionText: {
    fontSize: 16,
    color: '#333'
  },

  cancel: {
    paddingVertical: 14
  },
  cancelText: {
    textAlign: 'center',
    color: '#007aff',
    fontSize: 16,
    fontWeight: '600'
  }
});
