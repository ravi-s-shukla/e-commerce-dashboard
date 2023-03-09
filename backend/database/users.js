const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const usersModel = mongoose.model('users' , usersSchema);

module.exports = usersModel;