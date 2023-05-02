'use strict';

const mongoose = require('mongoose');
const connectString =
  'mongodb+srv://hhq851999:hongquan1999@cluster0.luy1pcu.mongodb.net/?retryWrites=true&w=majority';

mongoose
  .connect(connectString)
  .then((_) => console.log(`Connect MongoDB Success`))
  .catch((err) => console.log(err));

// dev
if (1 === 0) {
  mongoose.set('debug', true);
  mongoose.set('debug', { color: true });
}

module.exports = mongoose;
