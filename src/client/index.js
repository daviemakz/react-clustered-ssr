'use strict';

// Load NPM modules
import React from 'react';
import { hydrate } from 'react-dom';
import App from '../shared/App';

// Render application
hydrate(<App />, document.getElementById('root'));
