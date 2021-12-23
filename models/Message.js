import mongoose from 'mongoose';

const { model, Schema } = mongoose;

const MessageSchema = new Schema(
  {
    conversation: { type: String, ref: 'Conversation' },
    sender: { type: Schema.Types.ObjectId, ref: 'User' },
    text: String,
  },
  { timestamps: true },
);

export default model('Message', MessageSchema);
