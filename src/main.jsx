
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

// Deliberate syntax error to trigger CodeRabbit check failure
const thisWillBreak = { 
  key1: "value1",
  key2: "value2"  // Missing comma
  key3: "value3"
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <Suspense>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Suspense>,
)
