/* eslint-disable no-unused-vars */
import mongoose, { Model, ObjectId } from 'mongoose';

export interface IBlog {
  title: string;
  content: string;
  author: ObjectId;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogModel extends Model<IBlog> {
  getBlogById(id: string): Promise<IBlog | null>;
  getBlogByAuthor(
    id: mongoose.Schema.Types.ObjectId,
    blogId: string,
  ): Promise<IBlog | null>;
}
