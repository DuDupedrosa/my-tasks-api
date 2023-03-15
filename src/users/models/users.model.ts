import { Document } from 'mongoose';

export interface User extends Document {
  name: string;
  email: string;
  password: string;
}

export interface UserCreatedReturn {
  name: string;
  email: string;
  jwtToken: string;
  id: string;
}
