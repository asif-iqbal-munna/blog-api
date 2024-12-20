import { model, Schema } from 'mongoose';
import { BlogModel, IBlog } from './blog.interface';

const blogSchema = new Schema<IBlog, BlogModel, IBlog>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Blog = model<IBlog, BlogModel>('Blog', blogSchema);
