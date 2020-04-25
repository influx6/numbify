import React, { useState,  useCallback } from 'react';
import { Alert, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

import { Data } from '../../shared/types'
import { validateNumber } from './api/index'

import { NumberForm } from  './components/form'
import DataTable from  './components/table'


function App() {
  const [submitFailed, setSubmitFailed] = useState<boolean>(false);
  const [records, setRecords] = useState<Data[]>([]);

  const submit = useCallback(async (number: string, invalid: boolean) => {
    if (invalid) {
      setSubmitFailed(true);
      return
    }

     validateNumber(number).then(({ data }) => {
      // since we are doing clear on reload, we need to manage duplicates ourselves
      const hasRecord = records.some((d: Data) => d.number === data.number);

      // if we do not have it, update state.
      if (!hasRecord) setRecords([...records, data]);

      setSubmitFailed(false);
     }).catch(() => {
      setSubmitFailed(true);
     })
  }, [records])

  return (
    <div className="App">
      <div className="topSection">
        <Container>
            <div className="form-header">
              <h2>Enter to verify Phone Number</h2>
            </div>
            <NumberForm 
              onSubmit={submit} 
              onType={() => setSubmitFailed(false)}
            />
          { submitFailed && (
            <Alert key="failed-fetch" variant="danger">
              {`Failed to submit number, please try again`}
            </Alert>
          )}
        </Container>
      </div>
      <div className="bottomSection">
          <DataTable data={records} />
      </div>
    </div>
  );
}

export default App;
