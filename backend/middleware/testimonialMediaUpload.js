import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import { v2 as cloudinary } from 'cloudinary'

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'mbx-testimonials',
    resource_type: 'auto',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'mp4', 'webm', 'mov', 'avi'],
  },
})

const testimonialMediaUpload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 },
})

export default testimonialMediaUpload
