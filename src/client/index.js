'use strict';

// Load NPM modules
import React from 'react';
import { hydrate } from 'react-dom';

// Import application
import App from '../shared/App';
import { getPrimeList } from '../shared/Functions';

// Get DOM variables
const serverInfo = document.getElementById('server-info');
const primeUpTo = serverInfo.getAttribute('data-current-prime');
const name = serverInfo.getAttribute('data-name');
const processId = serverInfo.getAttribute('data-process-id');

// Render application but only hydrate the DOM
hydrate(
  <App
    listOfPrimes={getPrimeList(primeUpTo)}
    primeUpTo={primeUpTo}
    name={name}
    processId={processId}
  />,
  document.getElementById('root')
);
