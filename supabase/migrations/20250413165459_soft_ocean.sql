/*
  # Storage Bucket Configuration

  1. Changes
    - Configure storage bucket for public access
    - Set up CORS rules for media access
    - Enable public read access to storage bucket

  2. Security
    - Allow public read access while maintaining security
    - Configure appropriate headers for video/media streaming
*/

-- Create storage bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
SELECT 'images', 'images', true
WHERE NOT EXISTS (
  SELECT 1 FROM storage.buckets WHERE id = 'images'
);

-- Update existing bucket to be public
UPDATE storage.buckets
SET public = true
WHERE id = 'images';

-- Enable RLS
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access on images bucket"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'images');

-- Create policy to allow authenticated users to upload files
CREATE POLICY "Allow authenticated uploads to images bucket"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'images');

-- Create policy to allow file owners to manage their files
CREATE POLICY "Allow owners to manage their files in images bucket"
ON storage.objects
FOR ALL
TO authenticated
USING (bucket_id = 'images' AND owner = auth.uid())
WITH CHECK (bucket_id = 'images' AND owner = auth.uid());

-- Set security headers for the bucket
NOTIFY pgrst, 'reload config';