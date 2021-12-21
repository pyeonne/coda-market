import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const CartSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  post: { type: Schema.Types.ObjectId, ref: 'Post' },
});

export default model('Cart', CartSchema);
