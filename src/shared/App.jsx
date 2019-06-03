'use strict';

// Import NPM modules
import React from 'react';
import PropTypes from 'prop-types';

// Load antDesign modules
import { Layout, Breadcrumb, Tag, Divider } from 'antd';
const { Content, Footer } = Layout;

// Define react component
const App = () => ({ primeUpTo, listOfPrimes }) => (
  <html>
    <head>
      <title>{`All Prime Numbers Up To ${primeUpTo}`}</title>
      <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.18.2/antd.min.css" />
    </head>
    <body>
      <div id="root">
        <Layout className="layout">
          <Content style={{ padding: '0 50px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>Prime Number Finder</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
              <div
                style={{
                  background: '#fff',
                  padding: 24,
                  minHeight: 'calc(100vh - 170px)'
                }}>
                <h2
                  style={{
                    textAlign: 'center'
                  }}>{`Below is a list of all prime numbers up to ${primeUpTo}`}</h2>
                <br />
                <Divider />
                {listOfPrimes.map((number, index) => (
                  <Tag style={{ marginBottom: '8px' }} key={index}>
                    {number}
                  </Tag>
                ))}
              </div>
            </div>
          </Content>
          <Footer
            style={{
              textAlign: 'center'
            }}>{`This page was rendered on the server by an instance of the ${process.env.name} service. Instance ID: ${
            process.env.processId
          }`}</Footer>
        </Layout>
      </div>
    </body>
  </html>
);

// Define prop types
App.propTypes = {
  primeUpTo: PropTypes.number,
  listOfPrimes: PropTypes.array
};

// Export Component
export default App;
