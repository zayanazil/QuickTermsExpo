import { View, Text, Image, StyleSheet, SafeAreaView } from 'react-native';

//simple app header component with icon and title
//a deprecated SafeAreaView is used for better appearance on devices with notches
export default function AppHeader() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Image 
          source={require('../assets/notes.png')}
          style={styles.icon}
        />
        <Text style={styles.title}>QuickTerms</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    backgroundColor: '#333533',
  },
  header: {
    backgroundColor: '#333533',
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 32,
    height: 32,
    marginRight: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#F5CB5C',   
    fontFamily: 'Georgia',
  },
});
