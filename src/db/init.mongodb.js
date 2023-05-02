'use strict';

const mongoose = require('mongoose');
const { countConnect } = require('../helpers/check.connect');
const connectString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.luy1pcu.mongodb.net/?retryWrites=true&w=majority`;

class Database {
  constructor() {
    this.connect();
  }

  connect() {
    if (1 === 0) {
      mongoose.set('debug', true);
      mongoose.set('debug', { color: true });
    }

    mongoose
      .connect(connectString)
      .then((_) => {
        console.log(`Connected MongoDB Success PRO`);
      })
      .catch((err) => console.log(err));
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }
}

const instanceMongo = Database.getInstance();

module.exports = instanceMongo;
