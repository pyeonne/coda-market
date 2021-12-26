import mongoose from 'mongoose';
import getCurrentDate from '../utils/getTime.js';
const { Schema, model } = mongoose;

const ChatRoomSchema = new Schema({
  shortId: { type: String, required: true },
  post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  buyer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  seller: { type: Schema.Types.ObjectId, ref: 'User' },
  createdTime: { type: Date, default: getCurrentDate() },
  updatedTime: { type: Date, default: getCurrentDate() },
});

export default model('ChatRoom', ChatRoomSchema);
