import mongoose, { model, Schema } from 'mongoose';
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

blogSchema.statics.getBlogById = async function (
  id: mongoose.Schema.Types.ObjectId,
) {
  return await this.findById(id);
};

blogSchema.statics.getBlogByAuthor = async function (
  id: mongoose.Schema.Types.ObjectId,
  blogId: mongoose.Schema.Types.ObjectId,
) {
  return await this.findOne({
    _id: blogId.toString(),
    author: id.toString(),
  });
};

export const Blog = model<IBlog, BlogModel>('Blog', blogSchema);
