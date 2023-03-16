import * as mongoose from 'mongoose';

export const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  priority: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Types.ObjectId,
  },
  status: {
    type: Number,
    required: true,
  },
});
