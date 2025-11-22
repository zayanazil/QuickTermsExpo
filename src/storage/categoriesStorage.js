//locally saving data and loading with AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

//key for storing terms data
const CATEGORY_KEY = 'QUICKTERMS_CATEGORIES_v1';

export const saveCategories = async (terms) => {
  try {
    await AsyncStorage.setItem(CATEGORY_KEY, JSON.stringify(terms)); //asynchronously save terms as string
  } catch (err) {
    console.log('Save error: ', err);
    throw err;
  }
};

export const loadCategories = async () => {
  try {
    const json = await AsyncStorage.getItem(CATEGORY_KEY); //recalling json string 
    return json ? JSON.parse(json) : []; //convert back to array or return empty array
  } catch (err) {
    console.log('Load error: ', err);
    throw err;
  }
};
