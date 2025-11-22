import { createContext, useState, useEffect } from 'react';
import { loadTerms, saveTerms } from '../storage/termsStorage';
import { Alert } from 'react-native';

//context to manage terms data and provide CRUD operations
export const TermsContext = createContext();

//wraps the app to provide terms data and functions
export const TermsProvider = ({ children }) => {
  const [terms, setTerms] = useState([]); //local state for list of terms
  const [loading, setLoading] = useState(true); //loadfing state
  const [error, setError] = useState(null); //error state

  useEffect(() => {
    const init = async () => {
      setLoading(true); //to show loader in UI while fetch occurs
      try {
        const stored = await loadTerms(); //load saved terms from termsStorage
        setTerms(stored || []);
      } catch (err) {
        console.error('Failed loading terms', err); //log error
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  useEffect(() => {
    //save whenever terms change 
    const persist = async () => {
      try {
        await saveTerms(terms); //save current terms to storage
      } catch (err) {
        console.error('Save failed', err);
        Alert.alert('Storage error', 'Could not save your terms.'); //error alert
      }
    };
    persist();
  }, [terms]);


  //crud helper functions
  const addTerm = async (term) => {
    setTerms(prev => [...prev, term]);
  };

  const editTerm = (id, updated) => {
    setTerms(prev => prev.map(t => (t.id === id ? updated : t)));
  };

  const deleteTerm = (id) => {
    setTerms(prev => prev.filter(t => t.id !== id));
  };


  //provide context values to children components
  return (
    <TermsContext.Provider value={{
      terms, setTerms, addTerm, editTerm, deleteTerm, loading, error
    }}>
      {children}
    </TermsContext.Provider>
  );
};
