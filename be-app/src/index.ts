#!/usr/bin/env node

/**
 * Module dependencies.
 */

import app from './app';
const debug = require('debug')('be-app:server');
import http from 'http';
import cluster from 'cluster';
import { cpus } from 'os';
import process from 'process';
/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '4000');
app.set('port', port);

const numCPUs = cpus().length;

if (cluster.isMaster) {
  console.log(`Primary ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  /**
   * Create HTTP server.
   */

  const server = http.createServer(app);

  /**
   * Listen on provided port, on all network interfaces.
   */

  server.listen(port, () => {
    console.log('App listening at port ' + port);
    console.log(`Worker ${process.pid} started`);
  });

  /**
   * Event listener for HTTP server "listening" event.
   */

  server.on('error', onError);
  server.on('listening', onListening);
  function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    debug('Listening on ' + bind);
  }
}

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: string) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}
