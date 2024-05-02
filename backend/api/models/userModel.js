// auth/models/userModel.js

import mongoose from 'mongoose';

// Definir el esquema del usuario
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favorites: { type: Array },
});

export default mongoose.model('User', UserSchema);