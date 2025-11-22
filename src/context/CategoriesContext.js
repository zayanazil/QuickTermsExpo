import { createContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { loadCategories, saveCategories } from '../storage/categoriesStorage';

//context to manage context data and provide CRUD operations
export const CategoriesContext = createContext();

//default categories that every user starts with
const DEFAULT_CATEGORIES = [
  "General",
  "Tech",
  "School",
  "Slang",
  "Custom"
];

//wraps the app to provide terms data and functions
export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const init = async () => {
      setLoading(true); //to show loader in UI while fetch occurs
      try {
        const stored = await loadCategories(); 

        // If stored categories exist AND the array is not empty, use them. This ensures backwards compatibility.
        if (Array.isArray(stored) && stored.length > 0) {
          setCategories(stored);
        } else {
          //if empty/corrupted, use defaults
          setCategories(DEFAULT_CATEGORIES);

          //save defaults back to storage
          await saveCategories(DEFAULT_CATEGORIES);
        }

      } catch (err) {
        console.error("Failed loading categories:", err);
        setError(err); 
        setCategories(DEFAULT_CATEGORIES); //safe fallback
      } finally {
        setLoading(false); 
      }
    };

    init();
  }, []);

  useEffect(() => {
    const persist = async () => {
      try {
        await saveCategories(categories); //save updated categories
      } catch (err) {
        console.error("Save failed:", err);
        Alert.alert(
          "Storage Error",
          "Could not save your categories. Your changes might not persist."
        );
      }
    };

    //only try saving once initial load is complete
    if (!loading) {
      persist();
    }
  }, [categories, loading]);


  //add a new category
  const addCategory = (name) => {
    const clean = name.trim();

    //ignore empty names
    if (clean.length === 0) return;

    //prevent duplicates
    if (categories.includes(clean)) {
      Alert.alert("Duplicate Category", `"${clean}" already exists.`);
      return;
    }

    //add new category
    setCategories(prev => [...prev, clean]);
  };


  //delete a category by name
  const deleteCategory = (name) => {

    //safety check: prevent removing "General"
    if (name === "General") {
      Alert.alert(
        "Not Allowed",
        `"General" is a core category and cannot be deleted.`
      );
      return;
    }

    //remove selected category
    setCategories(prev => prev.filter(c => c !== name));
  };

  return (
    <CategoriesContext.Provider
      value={{
        categories,      //list of available categories
        addCategory,     //function to add a category
        deleteCategory,  //function to delete a category
        loading,         //loading state 
        error            //error state
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};
