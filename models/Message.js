import mongoose from 'mongoose';
import getCurrentDate from '../utils/getTime.js';

const { Schema, model } = mongoose;

const MessageSchema = new Schema({
  chatroom: { type: Schema.Types.ObjectId, ref: 'ChatRoom' },
  sender: { type: Schema.Types.ObjectId, ref: 'User' },
  text: { type: String, required: true },
  createdAt: { type: Date, default: () => getCurrentDate() },
  updatedAt: { type: Date, default: () => getCurrentDate() },
});

export default model('Message', MessageSchema);
