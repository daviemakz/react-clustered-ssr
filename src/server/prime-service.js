'use strict';

// Import NPM modules
import React from 'react';
import { renderToString } from 'react-dom/server';
import { ResponseBodyObject } from 'risen-js';

// Import app
import App from '../shared/App';

// Is the number a prime?
function isPrime(num) {
  for (let i = 2; i < num; i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}

// Build an array of prime numbers
function getPrimeList(n) {
  let arr = [2];
  for (let i = 3; i < n; i = i + 2) {
    if (isPrime(i)) {
      arr.push(i);
    }
  }
  return arr;
}

module.exports = {
  calculatePrime: (socket, data) => {
    const resObject = new ResponseBodyObject();
    const primeUpTo = data.body.primeUpTo;
    // Assign the process name to the response
    resObject.status.transport.responseSource = process.env.name;
    // Assign result to response body
    resObject.resultBody.resData = {
      status: true,
      message: 'The operation completed successfully!',
      pageOutput: renderToString(<App listOfPrimes={getPrimeList(primeUpTo)} primeUpTo={primeUpTo} />)
    };
    return socket.reply(resObject);
  }
};
