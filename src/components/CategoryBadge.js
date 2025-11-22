import { View, Text, StyleSheet } from 'react-native';

//simple badge component for displaying category
export default function CategoryBadge({ category }) {
  return (
    <View style={styles.badge}>
      <Text style={styles.text}>{category}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: '#ffe59fff',
    alignSelf: 'flex-start',
    marginTop: 8
  },
  text: { color: '#00000', fontWeight: '600' }
});
