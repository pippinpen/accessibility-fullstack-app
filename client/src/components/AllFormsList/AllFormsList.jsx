import React, { useContext, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// only if want to link to somewhere with form generation
import { AllFormsContext } from '../../contexts/AllFormsContext';

function AllFormsList() {
  const { fetchAllForms, loading, error, allForms } = useContext(AllFormsContext);

  useEffect(() => {
    fetchAllForms();
  }, [allForms]);

  return (
    <>
    <h1>Form(s)</h1>
    {loading && <p>Loading...</p>}
    {error && <p>{error}</p>}
    {allForms?.length ? (
      <ul>
      {allForms.map(({ id, firstName, lastName, email }) => (
        <p>
          {id} {firstName} {lastName} {email}
        </p>
      ))}
      </ul>
    ) : (
      <p>No Forms to display</p>
    )}
    </>
  );
};

export default AllFormsList;