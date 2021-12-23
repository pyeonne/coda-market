import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const UserSchema = new Schema({
  shortId: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  posts: { type: [Schema.Types.ObjectId] },
  thumbnail: { type: String },
  location: { type: String, required: true },
});

export default model('User', UserSchema);
