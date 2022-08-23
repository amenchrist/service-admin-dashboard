import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AdminContextProvider } from './contexts/AdminContextProvider';
import { ContextProvider } from './contexts/ContextProvider';
// import { AdminContextProvider } 

ReactDOM.render(
  <ContextProvider>

      <React.StrictMode>
        <App />
      </React.StrictMode>

  </ContextProvider>,
  document.getElementById('root')
);
