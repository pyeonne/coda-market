import mongoose from 'mongoose';
import getCurrentDate from '../utils/getTime.js';

const { Schema, model } = mongoose;

const PostSchema = new Schema({
  shortId: { type: String },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  location: { type: String, required: true },
  images: { type: [String] },
  content: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  purchased_user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  isSoldOut: { type: Boolean, default: false },
  thumbnail: { type: String },
  current_status: { type: String, default: 'posted' },
  createdAt: { type: Date, default: getCurrentDate() },
  updatedAt: { type: Date, default: getCurrentDate() },
});

export default model('Post', PostSchema);
