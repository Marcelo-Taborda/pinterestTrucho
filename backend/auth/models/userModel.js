// auth/models/userModel.js

const mongoose = require('mongoose');

// Definir el esquema del usuario
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favorites: { type: Array },
});

// Crear el modelo de usuario
const User = mongoose.model('User', userSchema);

module.exports = User;
