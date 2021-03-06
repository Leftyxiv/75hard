const express = require('express');

const app = express();
const port = 3000;

const mongoose = require('mongoose');
const dotenv = require('dotenv');
process.on('uncaughtException', (err) => {
  // eslint-disable-next-line no-console
  console.log(err.name, err.message);
  // eslint-disable-next-line no-console
  // console.log('uncaught exception.... SHUTTING DOWN');
  // eslint-disable-next-line no-use-before-define
  server.close(() => {
    process.exit(1);
  });
});

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // eslint-disable-next-line no-console
     console.log('db connected');
  });

const server = app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`app running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  // eslint-disable-next-line no-console
  console.log(err.name, err.message);
  // eslint-disable-next-line no-console
  console.log('unhandled rejection.... SHUTTING DOWN');
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('SIGNTERM RECEIVED, shutting down gracefully :>>>>>>>>');
  server.close(() => {
    console.log('process terminated');
  });
});

