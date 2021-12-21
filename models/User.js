import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const UserSchema = new Schema({
  id: { type: String, required: true },
  pwd: { type: String, required: true },
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  posts: { type: [Schema.Types.ObjectId] },
  user_thumbnail: { type: String },
  location: { type: String, required: true },
});

export default model('User', UserSchema);
