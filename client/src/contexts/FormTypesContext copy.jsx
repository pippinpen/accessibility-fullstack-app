import React, { createContext, useState } from 'react';
import { useToasts } from 'react-toast-notifications';

export const FormTypesContext = createContext({
  fetchFormTypes: () => [],
  loaded: false,
  loading: false,
  error: null,
  formTypes: [],
});

const allFormsEndpoint = '/form';

export const AllFormsProvider = (props) => {
  const [allForms, setAllForms] = useState(() => {
    return JSON.parse(localStorage.getItem('allForms')) || [];
  });

  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllForms = async () => {
    // if (loading || loaded || error) {
    //   return;
    // }
    if (loading || error) {
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(allFormsEndpoint);
      if (response.status !== 200) {
        throw response;
      }
      const data = await response.json();
      localStorage.setItem('allForms', JSON.stringify(data));
      setAllForms(data);
    } catch (err) {
      setError(err.message || err.statusText);
    } finally {
      setLoading(false);
      setLoaded(true);
    }
  };

  return (
    <AllFormsContext.Provider
      value={{
        fetchAllForms,
        loading,
        error,
        allForms,
      }}
    >
      {props.children}
    </AllFormsContext.Provider>
  );
};
