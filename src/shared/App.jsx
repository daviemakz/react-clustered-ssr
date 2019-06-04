'use strict';

// Import NPM modules
import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

// Load antDesign modules
import { Layout, Breadcrumb, Tag, Divider, Input, Button, message } from 'antd';
const { Content, Footer } = Layout;
const BreadcrumbItem = Breadcrumb.Item;

// Set configuration
message.config({
  top: 5
});

// Handle on click
const handleOnClick = primeNumber => {
  if (primeNumber <= 100000) {
    location.href = `./?primeUpTo=${primeNumber}`;
  } else {
    message.warn('The number entered is too high, the limit is 10000!');
  }
};

// Define react component
const App = ({ primeUpTo, listOfPrimes, name, processId }) => {
  // Use a hook to store the prime number upto
  const [currentPrime, changePrime] = useState(primeUpTo);
  // Return JSX
  return (
    <html>
      <head>
        <title>{`All Prime Numbers Up To ${currentPrime}`}</title>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.18.2/antd.min.css"
        />
      </head>
      <body>
        <div id="root">
          <Layout className="layout">
            <Content style={{ padding: '0 50px' }}>
              <div>
                <Breadcrumb style={{ margin: '16px 0' }}>
                  <BreadcrumbItem>Home</BreadcrumbItem>
                  <BreadcrumbItem>Prime Number Finder</BreadcrumbItem>
                </Breadcrumb>
                <span style={{ float: 'left', padding: '24px' }}>
                  <h2
                    style={{
                      textAlign: 'left'
                    }}>
                    {currentPrime
                      ? primeUpTo === currentPrime
                        ? `Below is a list of all prime numbers up to ${currentPrime}:`
                        : 'Click "Get Primes" button to refresh the list of prime numbers:'
                      : 'Please enter a number to calculate prime numbers below:'}
                  </h2>
                  <Input
                    style={{ maxWidth: '200px', marginRight: '16px' }}
                    value={currentPrime}
                    onChange={e =>
                      changePrime((e.target.value || '').replace(/\D/g, ''))
                    }
                  />
                  <Button onClick={() => handleOnClick(currentPrime)}>
                    Get Primes
                  </Button>
                  <p style={{ marginTop: '24px', marginBottom: '0px' }}>
                    <i>
                      NOTE: Your request will be sent to the server for
                      processing and HTML markup returned! React then takes care
                      of user interaction afterwards.
                    </i>
                  </p>
                </span>
              </div>
              <div
                style={{
                  background: '#fff',
                  padding: 0,
                  paddingBottom: 24,
                  minHeight: 280
                }}>
                <div
                  style={{
                    background: '#fff',
                    padding: 24,
                    minHeight: 'calc(100vh - 146px)'
                  }}>
                  <br />
                  <Divider />
                  {currentPrime ? (
                    <Fragment>
                      {(primeUpTo === currentPrime ? listOfPrimes : []).map(
                        (number, index) => (
                          <Tag style={{ marginBottom: '8px' }} key={index}>
                            {number}
                          </Tag>
                        )
                      )}
                    </Fragment>
                  ) : (
                    <p />
                  )}
                </div>
              </div>
            </Content>
            <Footer
              style={{
                textAlign: 'center'
              }}>
              {'This page was rendered on the server by an instance of the '}
              <b>{`${name}`}</b>
              {' service. Instance ID: '}
              <b>{`${processId}`}</b>
            </Footer>
          </Layout>
        </div>
        <div
          id="server-info"
          data-process-id={processId}
          data-name={name}
          data-current-prime={currentPrime}
        />
        <script src="/bundle.js" />
      </body>
    </html>
  );
};

// Define prop types
App.propTypes = {
  primeUpTo: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  listOfPrimes: PropTypes.array,
  name: PropTypes.string,
  processId: PropTypes.string
};

// Default props
App.defaultProps = {
  primeUpTo: 2,
  listOfPrimes: [],
  name: process.env.name,
  processId: process.env.processId
};

// Export Component
export default App;
