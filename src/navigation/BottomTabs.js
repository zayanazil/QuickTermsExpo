import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import StatisticsScreen from '../screens/StatisticsScreen';

//bottom tab navigator for home, categories, and settings
const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // header handled by stack
        tabBarStyle: {
          backgroundColor: '#333533',
          height: 60,
          paddingBottom: 6,
        },
        tabBarActiveTintColor: '#F5CB5C',
        tabBarInactiveTintColor: '#888',

        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'HomeTab') {
            iconName = 'book';
          } else if (route.name === 'SettingsTab') {
            iconName = 'settings';
          } else if (route.name === 'CategoriesTab') {
            iconName = 'list';
          } else if (route.name === 'StatisticsTab') {
            iconName = 'stats-chart';
          }

          return <Ionicons name={iconName} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={HomeScreen} 
        options={{ title: 'Home' }} 
      />
      
      <Tab.Screen 
        name="CategoriesTab" 
        component={CategoriesScreen} 
        options={{ title: 'Categories' }} 
      />

      <Tab.Screen 
        name="StatisticsTab" 
        component={StatisticsScreen} 
        options={{ title: 'Statistics' }} 
      />

            <Tab.Screen 
        name="SettingsTab" 
        component={SettingsScreen} 
        options={{ title: 'Settings' }} 
      />

    </Tab.Navigator>
  );
}
