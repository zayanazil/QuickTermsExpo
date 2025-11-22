//locally saving data and loading with AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

//key for storing terms data
const KEY = 'QUICKTERMS_DATA_v1';

export const saveTerms = async (terms) => {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(terms)); //asynchronously save terms as string
  } catch (err) {
    console.log('Save error: ', err);
    throw err;
  }
};

export const loadTerms = async () => {
  try {
    const json = await AsyncStorage.getItem(KEY); //recalling json string 
    return json ? JSON.parse(json) : []; //convert back to array or return empty array
  } catch (err) {
    console.log('Load error: ', err);
    throw err;
  }
};
