'use strict';

const mongoose = require('mongoose');
const os = require('os');
const process = require('process');
const _SECOND = 5000;
// Count connect
const countConnect = () => {
  const numConnection = mongoose.connections.length;
  console.log(`Number Of Connection  ${numConnection}`);
};

// Check overload connect => check monitor follow second
const checkOverloadConnect = () => {
  setInterval(() => {
    const numConnection = mongoose.connections.length;
    const numCores = os.cpus().length;
    const memoryUsage = process.memoryUsage().rss;

    console.log(`Active Number of Connection:: ${numConnection}`);

    console.log(`Memory Usage:: ${memoryUsage / 1024 / 1024}MB`);

    // Example maximum number of connections based on number of cores
    const maxConnection = numCores * 5;

    if (numConnection > maxConnection) {
      console.log(`Connection overload detected!`);
    }
  }, _SECOND); // Monitor every 5 seconds
};

module.exports = {
  countConnect,
  checkOverloadConnect,
};
