import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const ChatRoomSchema = new Schema(
  {
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
    buyer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    seller: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  },
);

export default model('ChatRoom', ChatRoomSchema);
