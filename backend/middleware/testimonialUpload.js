import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import { v2 as cloudinary } from 'cloudinary'

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    if (file.mimetype.startsWith('image/')) {
      return {
        folder: 'mbx-testimonials',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        transformation: [{ width: 800, height: 800, crop: 'limit' }],
        resource_type: 'image',
      }
    } else if (file.mimetype.startsWith('video/')) {
      return {
        folder: 'mbx-testimonials',
        allowed_formats: ['mp4', 'webm', 'mov'],
        resource_type: 'video',
      }
    }
    return {
      folder: 'mbx-testimonials',
      resource_type: 'auto',
    }
  },
})

const testimonialUpload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB for videos
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
      cb(null, true)
    } else {
      cb(new Error('Only image and video files are allowed'), false)
    }
  },
})

export default testimonialUpload
