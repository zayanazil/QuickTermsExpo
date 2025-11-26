import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TermsProvider } from './src/context/TermsContext';

import AddTermScreen from './src/screens/AddTermScreen';
import TermDetailScreen from './src/screens/TermDetailScreen';
import EditTermScreen from './src/screens/EditTermScreen';
import BottomTabs from './src/navigation/BottomTabs';
import AppHeader from './src/components/AppHeader';
import CategoryDetailScreen from './src/screens/CategoryDetailScreen';
import { CategoriesProvider } from './src/context/CategoriesContext';

//custom app background theme
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#E8EDDF',
  },
};

/* Home screen displays list of terms
   AddTerm screen allows adding new terms
   TermDetail screen shows details of a selected term
   EditTerm screen allows editing an existing term
   Settings screen provides app settings and data management */

/* Navigation container to manage app navigation state */

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <TermsProvider>
      <CategoriesProvider>
        <NavigationContainer theme={MyTheme}>
          
          {/* global header */}
          <AppHeader />

          {/* nav without headers as using custom one */}
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            
            {/* has homescreen settings, categories and statistics */}
            <Stack.Screen name="Main" component={BottomTabs}/> 

            <Stack.Screen name="AddTerm" component={AddTermScreen} />
            <Stack.Screen name="EditTerm" component={EditTermScreen} />
            <Stack.Screen name="TermDetail" component={TermDetailScreen} />
            <Stack.Screen name="CategoryDetail" component={CategoryDetailScreen} />

          </Stack.Navigator>

        </NavigationContainer>
      </CategoriesProvider>
    </TermsProvider>
  );
}
