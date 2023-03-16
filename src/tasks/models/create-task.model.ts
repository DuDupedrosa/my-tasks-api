import { Document } from 'mongoose';

export interface CreateTaskModel extends Document {
  name: string;
  description: string;
  priority: number;
  color: string;
  userId: string;
  status: number;
}
