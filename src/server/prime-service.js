'use strict';

// Import NPM modules
const React = require('react');
const { renderToString } = require('react-dom/server');
const { ResponseBodyObject } = require('risen-js');

// Import application
const { getPrimeList } = require('../shared/Functions');
const App = require('../shared/App').default;

module.exports = {
  calculatePrime: (socket, data) => {
    const resObject = new ResponseBodyObject();
    const primeUpTo = data.body.primeUpTo;
    resObject.status.transport.responseSource = process.env.name;
    resObject.resultBody.resData = {
      status: true,
      message: 'The operation completed successfully!',
      pageOutput: renderToString(
        <App
          listOfPrimes={getPrimeList(primeUpTo)}
          primeUpTo={primeUpTo}
          name={process.env.name}
          processId={process.env.processId}
        />
      )
    };
    return socket.reply(resObject);
  }
};
