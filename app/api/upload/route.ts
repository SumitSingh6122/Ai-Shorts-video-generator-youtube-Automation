import type { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';
import formidable, { File, Files, Fields } from 'formidable';
import { promises as fs } from 'fs';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

// Disable built-in body parsing to handle multipart/form-data
export const config = {
  api: {
    bodyParser: false,
  },
};

type UploadResponse = {
  success: boolean;
  url?: string;
  duration?: number;
  bytes?: number;
  errors?: string[];
  error?: string;
};

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME ?? '',
  api_key: process.env.CLOUDINARY_API_KEY ?? '',
  api_secret: process.env.CLOUDINARY_API_SECRET ?? '',
  secure: true,
});

// Helper to parse multipart form data with file size limit (500MB)
const parseForm = (req: NextApiRequest): Promise<{ fields: Fields; files: Files }> => {
  const form = formidable({ multiples: false, maxFileSize: 500 * 1024 * 1024 });
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UploadResponse>
) {
  // Enable CORS
  await NextCors(req, res, {
    methods: ['POST'],
    origin: '*',
    optionsSuccessStatus: 200,
  });

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  try {
    const { fields, files } = await parseForm(req);
    const fileField = files.video;
    if (!fileField) {
      return res.status(400).json({ success: false, error: 'No video file uploaded' });
    }

    const videoFile: File = Array.isArray(fileField) ? fileField[0] : fileField;
    const tempFilePath = videoFile.filepath;

    // Upload to Cloudinary
    const result: UploadApiResponse = await cloudinary.uploader.upload(
      tempFilePath,
      {
        resource_type: 'video',
        folder: "renders",
        overwrite: true,
      }
    );

    return res.status(200).json({
      success: true,
      url: result.secure_url,
      duration: result.duration,
      bytes: result.bytes,
    });
  } catch (err: any) {
    console.error('Upload error:', err);
    if (err.http_code === 413) {
      return res.status(413).json({ success: false, error: 'File too large', errors: [err.message] });
    }
    return res.status(500).json({ success: false, error: 'Upload failed', errors: [err.message] });
  }
}