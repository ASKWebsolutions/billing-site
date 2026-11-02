import mongoose from 'mongoose'

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, default: '' },
  content: { type: String, required: true },
  rating: { type: Number, default: 5, min: 1, max: 5 },
  image: { type: String, default: '' },
  videoUrl: { type: String, default: '' },
  active: { type: Boolean, default: true },
  approved: { type: Boolean, default: false },
  source: { type: String, enum: ['admin', 'user'], default: 'admin' },
  order: { type: Number, default: 0 },
}, { timestamps: true })

export default mongoose.model('Testimonial', testimonialSchema)
