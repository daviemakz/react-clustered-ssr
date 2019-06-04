'use strict';

// Import Risen.JS
const { Risen } = require('risen-js');
const LruCache = require('lru-cache');

// An example of caching in the route handler
const cacheInstance = new LruCache({
  max: 500,
  length: () => 1,
  maxAge: 1000 * 60 * 60
});

// The path '/' will send a request to 'primeCalculator' service
// and send the response back to the client.
const getPrimeNumber = {
  method: 'GET',
  uri: '/',
  handler: (req, res, { sendRequest, CommandBodyObject }) => {
    cacheInstance.peek(req.query.primeUpTo)
      ? res.send(cacheInstance.get(req.query.primeUpTo))
      : sendRequest(
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
          response => {
            const result = response.resultBody.resData.pageOutput;
            cacheInstance.set(req.query.primeUpTo, result);
            res.send(result);
          }
        );
  }
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
