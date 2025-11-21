import mongoose from 'mongoose';

const transformationSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },  // 'resize', 'filter', etc.
    value: { type: mongoose.Schema.Types.Mixed, required: true },
  },
  { _id: false }
);

const imageSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    path: { type: String, required: true },
    originalWidth: Number,
    originalHeight: Number,
    sizeBytes: Number,
    transformations: [transformationSchema],
  },
  { timestamps: true }
);

export default mongoose.model('Image', imageSchema);