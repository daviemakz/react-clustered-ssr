'use strict';

require('@babel/register')({
  presets: ['@babel/preset-react', '@babel/preset-env']
});

module.exports = require('./prime-service');
