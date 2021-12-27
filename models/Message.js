import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const MessageSchema = new Schema({
  chatroom: { type: Schema.Types.ObjectId, ref: 'ChatRoom' },
  sender: { type: Schema.Types.ObjectId, ref: 'User' },
  text: { type: String, required: true },
  createdTime: { type: String },
  updatedTime: { type: String },
});

export default model('Message', MessageSchema);
