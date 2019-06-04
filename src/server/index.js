'use strict';

// Import Risen.JS
const { Risen } = require('risen-js');

// The path '/' will send a request to 'primeCalculator' service
// and send the response back to the client.
const getPrimeNumber = {
  method: 'GET',
  uri: '/',
  handler: (req, res, { sendRequest, CommandBodyObject }) =>
    sendRequest(
      Object.assign(new CommandBodyObject(), {
        destination: 'primeCalculator',
        funcName: 'calculatePrime',
        body: {
          primeUpTo: req.query.primeUpTo
        }
      }),
      'primeCalculator',
      false,
      void 0,
      void 0,
      response => res.send(response.resultBody.resData.pageOutput)
    )
};

// Define framework options
const frameworkOptions = {
  mode: 'server',
  http: [
    {
      port: 3000,
      ssl: false,
      harden: true,
      static: ['public'],
      routes: [getPrimeNumber]
    }
  ],
  verbose: true // To see whats going on :)
};

// Initialise instance, you have not started it yet but simply set the configuration
const RisenInstance = new Risen(frameworkOptions);

// Define path to the file which will define the operations a service can perform (without .js extension)
const primeNumberServiceOperations = './src/server/babel-wrapper';

// Define a micro service
RisenInstance.defineService('primeCalculator', primeNumberServiceOperations, {
  instances: 5 // Lets have 5 identical instances of this "service" running on startup
});

// Start the framework
RisenInstance.startServer();
